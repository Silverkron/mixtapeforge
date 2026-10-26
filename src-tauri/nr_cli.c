/* Cassette NR WAV utility — GPL-2.0-only. Standalone CLI, no app/Rust dependencies.
 * Usage: cassette-nr encode|decode input.wav output.wav reference_dbfs
 * Accepts stereo little-endian IEEE float32 WAV. Preserves frame count and rate. */
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <math.h>
void *cm_nr_new(unsigned int,double,const char **);
const char *cm_nr_process(void *,unsigned char *,unsigned char *,size_t,int);
void cm_nr_free(void *);
static unsigned u32(const unsigned char *b) { return b[0]|(unsigned)b[1]<<8|(unsigned)b[2]<<16|(unsigned)b[3]<<24; }
int main(int argc,char **argv) {
    FILE *in=NULL,*out=NULL; void *codec=NULL; int status=1; const char *error=NULL;
    unsigned char header[65536], input[4096*6], output[4096*6]; float audio[4096*2];
    size_t h=12; unsigned rate=0, remaining=0; int format_ok=0,decode=0; double ref; char *end;
    if(argc!=5 || (strcmp(argv[1],"encode") && strcmp(argv[1],"decode"))) { fprintf(stderr,"Usage: cassette-nr encode|decode input.wav output.wav reference_dbfs\n"); return 2; }
    decode=!strcmp(argv[1],"decode"); ref=strtod(argv[4],&end);
    if(*end || !isfinite(ref) || ref < -36 || ref > 0 || !strcmp(argv[2],argv[3])) return 2;
    in=fopen(argv[2],"rb"); if(!in) { error="Cannot open input WAV"; goto done; }
    if(fread(header,1,12,in)!=12 || memcmp(header,"RIFF",4) || memcmp(header+8,"WAVE",4)) { error="Expected RIFF WAV"; goto done; }
    for(;;) {
        unsigned size;
        if(h+8>sizeof(header) || fread(header+h,1,8,in)!=8) { error="Invalid WAV header"; goto done; }
        size=u32(header+h+4);
        if(!memcmp(header+h,"data",4)) { remaining=size; h+=8; break; }
        if(size>sizeof(header)-h-8 || (size&1)>sizeof(header)-h-8-size) { error="WAV metadata too large"; goto done; }
        if(fread(header+h+8,1,size+(size&1),in)!=size+(size&1)) { error="Truncated WAV header"; goto done; }
        if(!memcmp(header+h,"fmt ",4) && size>=16) {
            const unsigned char *f=header+h+8;
            static const unsigned char float_guid[16]={3,0,0,0,0,0,16,0,128,0,0,170,0,56,155,113};
            int float_format=(f[0]==3 && f[1]==0) || (size>=40 && f[0]==254 && f[1]==255 && f[16]>=22 && f[18]==32 && f[19]==0 && !memcmp(f+24,float_guid,16));
            format_ok=float_format && f[2]==2 && f[3]==0 && f[12]==8 && f[13]==0 && f[14]==32 && f[15]==0;
            rate=u32(f+4);
        }
        h+=8+size+(size&1);
    }
    if(!format_ok || remaining%8 || !(rate==44100||rate==48000||rate==88200||rate==96000)) { error="Expected stereo float32 at supported sample rate"; goto done; }
    codec=cm_nr_new(rate,-ref,&error); if(!codec) goto done;
    out=fopen(argv[3],"wb"); if(!out) { error="Cannot create output WAV"; goto done; }
    if(fwrite(header,1,h,out)!=h) { error="WAV write failed"; goto done; }
    while(remaining) {
        size_t bytes=remaining>sizeof(audio)?sizeof(audio):remaining, samples=bytes/4, i;
        if(fread(audio,1,bytes,in)!=bytes) { error="Truncated WAV audio"; goto done; }
        for(i=0;i<samples;i++) {
            int32_t n;
            if(!isfinite(audio[i]) || fabs(audio[i])>=1) { error="NR input out of range"; goto done; }
            n=(int32_t)round((double)audio[i]*8388608.0);
            if(n<=-8388608 || n>=8388607) { error="NR input lacks PCM headroom"; goto done; }
            input[i*3]=n&255; input[i*3+1]=(n>>8)&255; input[i*3+2]=(n>>16)&255;
        }
        error=cm_nr_process(codec,input,output,samples/2,decode); if(error) goto done;
        for(i=0;i<samples;i++) {
            int32_t n=output[i*3]|(int32_t)output[i*3+1]<<8|(int32_t)output[i*3+2]<<16;
            if(n&0x800000) n-=16777216;
            if(n<=-8388608||n>=8388607) { status=3; error="NR output clipped: reduce input level"; goto done; }
            audio[i]=(float)n/8388608.0f;
        }
        if(fwrite(audio,1,bytes,out)!=bytes) { error="WAV write failed"; goto done; }
        remaining-=(unsigned)bytes;
    }
    /* Preserve ancillary chunks after data. */
    for(;;) { size_t n=fread(header,1,sizeof(header),in); if(n && fwrite(header,1,n,out)!=n) { error="WAV write failed"; goto done; } if(n<sizeof(header)) { if(ferror(in)) { error="WAV read failed"; goto done; } break; } }
    status=0;
done:
    if(codec) cm_nr_free(codec);
    if(in) fclose(in);
    if(out && fclose(out)) { status=1; error="WAV finalize failed"; }
    if(status) { if(out) remove(argv[3]); fprintf(stderr,"%s\n",error?error:"NR initialization failed"); }
    return status;
}
