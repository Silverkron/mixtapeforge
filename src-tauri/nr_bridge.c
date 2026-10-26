/* Cassette Maker adapter, GPL-2.0-only. Upstream changes documented in vendor/libdolbyb-1.1/INTEGRATION.md. */
#include "dolbyb.h"
#include "SidePath.h"
#include <stdlib.h>
void *cm_nr_new(unsigned int rate, double threshold, const char **error) {
    dolbyb_t *p = calloc(1, sizeof(*p));
    if (!p) { *error = "Memoria insufficiente per NR"; return NULL; }
    dolbyb_init(p);
    p->SmpSec = rate; p->NumChn = 2; p->BDepth = 24; p->ThGndB = threshold;
    /* Upstream default decode tolerance is too coarse at PCM24; test decoder uses sub-LSB tolerance. */
    p->DecAdB = -110.0;
    *error = dolbyb_start(p);
    /* Upstream cache-hit path changes calibration values without refreshing coefficients. */
    if (!*error) *error = SidePathInit(p);
    if (*error) { dolbyb_free(p); free(p); return NULL; }
    return p;
}
const char *cm_nr_process(void *p, unsigned char *in, unsigned char *out, size_t frames, int decode) {
    return decode ? dolbyb_decode(p,in,out,frames) : dolbyb_encode(p,in,out,frames);
}
void cm_nr_free(void *p) { dolbyb_free(p); free(p); }
