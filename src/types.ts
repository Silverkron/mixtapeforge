export interface Analysis {
  peak: number;
  rms: number;
  lufs: number | null;
  true_peak: number;
  peak_time: number;
  rms_time: number;
  vu_peak: number;
  quasi_peak: number;
  waveform: number[];
  silence_start: number;
  silence_end: number;
}
export interface Track {
  id: string;
  path: string;
  title: string;
  artist: string;
  duration: number;
  sample_rate: number;
  hash: string;
  analysis: Analysis;
  trim_start: number;
  trim_end: number;
  gain: number;
  fade_in: number;
  fade_out: number;
  gap: number;
  locked: boolean;
}
export interface VstEffect {
  enabled: boolean;
  path: string;
  uid: string;
  name: string;
  parameters: number[];
  tail_seconds: number;
}
export interface Processing {
  vst?: VstEffect | null;
  normalize: string;
  target_lufs: number;
  ceiling: number;
  dynamics: string;
  threshold: number;
  ratio: number;
  nr: string;
  nr_reference: number;
  eq: string;
  eq_enabled: boolean;
  eq_bands: number[];
  attack_ms: number;
  release_ms: number;
  knee_db: number;
  makeup_db: number;
  crossfade: number;
  sample_rate: number;
}
export interface Calibration {
  name: string;
  deck: string;
  tape: string;
  reference: number;
  mol: number;
  snr: number;
  device: string;
  verified: boolean;
  notes: string;
}
export interface ArtworkSettings {
  font?: string;
  style: string;
  paper: string;
  ink: string;
  accent: string;
  secondary: string;
  monochrome: boolean;
}
export interface Project {
  schema: number;
  title: string;
  subtitle: string;
  tape: string;
  capacity: [number, number];
  margin: number;
  leader: number;
  trailer: number;
  tracks: Track[];
  sides: [string[], string[]];
  processing: Processing;
  calibration: Calibration | null;
  calibration_report?: CalibrationReport | null;
  recording_profile?: RecordingProfile | null;
  color: string;
  artwork?: ArtworkSettings | null;
}
export interface RecordingProfile {
  version: 1 | 2;
  id: string;
  enabled: boolean;
  conditions: {
    sample_rate: number;
    name: string;
    deck: string;
    tape: string;
    output: string;
    input: string;
    notes: string;
  };
  eq_bands: number[];
  channel_gain_db: [number, number];
  report: CalibrationReport;
  drive_limits?: { frequency: number; max_input_peak_dbfs: number }[];
}
export interface Info {
  durations: [number, number];
  gains: [string, number][];
}
export interface Device {
  is_default?: boolean;
  index: number;
  name: string;
  rate: number;
  channels: number;
}
export interface Render {
  nr: string;
  nr_reference: number;
  path: string;
  frames: number;
  duration: number;
  peak: number;
  clipped: number;
  true_peak: number;
  attenuation: number;
}
export interface Telemetry {
  calibration_complete?: boolean;
  elapsed: number;
  peak: [number, number];
  rms: [number, number];
  vu: [number, number];
  ppm: [number, number];
  spectrum: number[];
  waveform: number[];
  underruns: number;
  input: boolean;
  hd3: number;
  frequency: number;
}
export interface SessionEvent {
  time: string;
  message: string;
  error: boolean;
}
export interface Comparison {
  delay_ms: number;
  correlation: number;
  level_difference: [number, number];
  residual_percent: number;
  seconds: number;
}
export const time = (n: number) => {
  const s = Math.round(Math.abs(n));
  return `${n < 0 ? "−" : ""}${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
};
export const length = (t: Track) =>
  Math.max(0, t.duration - t.trim_start - t.trim_end);
export function contrastInk(color: string) {
  const values = [1, 3, 5].map(
    (i) => parseInt(color.slice(i, i + 2), 16) / 255,
  );
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722 < 0.45
    ? "#f3f2fa"
    : "#211830";
}
export const decibel = (n: number | null, digits = 1) =>
  n === null ? "—" : n <= -120 ? "−∞" : n.toFixed(digits);

export interface CalibrationReport {
  protocol: number;
  source: string;
  sample_rate: number;
  duration: number;
  delay_seconds: number;
  time_scale: number;
  sync_confidence: number;
  reference_dbfs: [number, number];
  imbalance_db: number;
  noise_dbfs: [number, number];
  snr_db: [number, number];
  hiss_dbfs: [number, number];
  peak_dbfs: [number, number];
  clipped_samples: [number, number];
  crosstalk_db: [number, number];
  correction_allowed: boolean;
  warnings: string[];
  extended?: CalibrationExtended | null;
  bands: {
    frequency: number;
    response_db: [number, number];
    rms_dbfs: [number, number];
  }[];
  levels: {
    input_dbfs: number;
    output_dbfs: [number, number];
    compression_db: [number, number];
    thd_percent: [number, number];
    hd3_percent: [number, number];
  }[];
}
export interface CalibrationExtended {
  medium_response_db: [number, number][];
  level_change_db: [number, number][];
  quality: {
    snr_db: [number, number];
    spread_db: [number, number];
    dropout_db: [number, number];
    repeat_delta_db: [number, number] | null;
    reliable: boolean;
  }[];
  level_tests: {
    frequency: number;
    input_dbfs: number;
    output_dbfs: [number, number];
    compression_db: [number, number];
    distortion_percent: [number, number] | null;
    harmonics_measured: number;
    snr_db: [number, number];
    stable: boolean;
  }[];
  drive_limits: { frequency: number; max_input_peak_dbfs: number }[];
  noise_change_db: [number, number];
  reference_repeat_delta_db: [number, number];
  balance_spread_db: number;
}
