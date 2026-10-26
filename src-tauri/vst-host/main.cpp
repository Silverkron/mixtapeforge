// SPDX-License-Identifier: GPL-3.0-only
#include <juce_audio_utils/juce_audio_utils.h>
#include <iostream>
#include <cmath>
using namespace juce;
static void fail(const String& s) { throw std::runtime_error(s.toStdString()); }
int main(int argc, char** argv) {
    ScopedJuceInitialiser_GUI gui;
    try {
        if (argc != 3) fail("Expected request.json response.json");
        auto req = JSON::parse(File(String::fromUTF8(argv[1])));
        auto response = File(String::fromUTF8(argv[2]));
        auto path = req["path"].toString();
        if (!File(path).exists() || !path.endsWithIgnoreCase(".vst3")) fail("Plugin VST3 assente");
        AudioPluginFormatManager manager;
        manager.addDefaultFormats();
        OwnedArray<PluginDescription> descriptions;
        for (auto* format : manager.getFormats()) format->findAllTypesForFile(descriptions, path);
        if (descriptions.size() != 1) fail("Il bundle deve contenere un singolo effetto VST3");
        auto& desc = *descriptions[0];
        if (desc.isInstrument) fail("Seleziona un effetto audio, non uno strumento");
        String error;
        double rate = req.hasProperty("rate") ? double(req["rate"]) : 48000.;
        auto plugin = manager.createPluginInstance(desc, rate, 512, error);
        if (!plugin) fail(error);
        plugin->setPlayConfigDetails(2, 2, rate, 512);
        if (plugin->getTotalNumInputChannels() != 2 || plugin->getTotalNumOutputChannels() != 2)
            fail("Il plugin non supporta ingresso e uscita stereo");
        String uid = desc.createIdentifierString();
        auto& params = plugin->getParameters();
        if (req["mode"].toString() == "inspect") {
            auto* result = new DynamicObject();
            result->setProperty("name", desc.name);
            result->setProperty("uid", uid);
            Array<var> values;
            for (int i = 0; i < params.size(); ++i) {
                auto* item = new DynamicObject();
                item->setProperty("name", params[i]->getName(128));
                item->setProperty("value", params[i]->getValue());
                item->setProperty("text", params[i]->getCurrentValueAsText());
                values.add(var(item));
            }
            result->setProperty("parameters", values);
            if (!response.replaceWithText(JSON::toString(var(result)))) fail("Scrittura risposta fallita");
            return 0;
        }
        if (req["uid"].toString() != uid) fail("Identità del plugin cambiata: selezionalo di nuovo");
        auto* values = req["parameters"].getArray();
        if (!values || values->size() != params.size()) fail("Parametri plugin incompatibili");
        for (int i = 0; i < params.size(); ++i) {
            float v = float(values->getReference(i));
            if (!std::isfinite(v) || v < 0 || v > 1) fail("Parametro non valido");
            params[i]->setValueNotifyingHost(v);
        }
        AudioFormatManager files; files.registerBasicFormats();
        std::unique_ptr<AudioFormatReader> reader(files.createReaderFor(File(req["input"].toString())));
        if (!reader || reader->numChannels != 2 || reader->sampleRate != rate) fail("WAV stereo non valido");
        plugin->setNonRealtime(true);
        plugin->prepareToPlay(rate, 512);
        const int latency = plugin->getLatencySamples();
        const double tail = double(req["tail_seconds"]);
        if (latency < 0 || latency > rate * 30 || !std::isfinite(tail) || tail < 0 || tail > 30) fail("Latenza o coda non valida");
        const int64 frames = reader->lengthInSamples + int64(std::llround(tail * rate));
        File output(req["output"].toString());
        if (output == File(req["input"].toString())) fail("Input e output devono essere diversi");
        auto stream = output.createOutputStream();
        if (!stream) fail("Impossibile creare il master VST3");
        stream->setPosition(0); stream->truncate();
        WavAudioFormat wav;
        std::unique_ptr<AudioFormatWriter> writer(wav.createWriterFor(stream.release(), rate, 2, 32, {}, 0));
        if (!writer) fail("Impossibile creare WAV");
        AudioBuffer<float> block(2, 512); MidiBuffer midi;
        for (int64 pos = 0; pos < frames + latency; pos += 512) {
            int n = int(jmin<int64>(512, frames + latency - pos));
            block.setSize(2, n, false, false, true); block.clear();
            if (pos < reader->lengthInSamples) reader->read(&block, 0, int(jmin<int64>(n, reader->lengthInSamples-pos)), pos, true, true);
            midi.clear(); plugin->processBlock(block, midi);
            for (int c=0;c<2;++c) for (int i=0;i<n;++i) if (!std::isfinite(block.getSample(c,i))) fail("Il plugin ha prodotto campioni non finiti");
            int skip = int(jlimit<int64>(0,n,latency-pos));
            if (n > skip && !writer->writeFromAudioSampleBuffer(block,skip,n-skip)) fail("Scrittura audio fallita");
        }
        writer.reset(); plugin->releaseResources();
        response.replaceWithText("{\"ok\":true}");
        return 0;
    } catch (const std::exception& e) { std::cerr << e.what() << std::endl; return 1; }
}
