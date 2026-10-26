/*
 * Calibrate.c - a library of routines to automatically
 * figure out the calibration values for the program.
 * Some initialization will be needed by the main program.
 *
 * Copyright (C) 2025 Martin Guy <martinwguy@gmail.com>
 * based on dolbybcsoftwaredecode by Richard Evans 2018.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation. See COPYING for details.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
 * Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

#include "dolbyb.h"

#include "Calibrate.h"
#include "Mixers.h"
#include "Param.h"
#include "SidePath.h"

#include <stdlib.h>	/* for malloc() etc */
#include <inttypes.h>	/* to printf 64-bit quantities */
#include <math.h>

/* These are not defined/declared when compiling -ansi (C90) */
#ifndef M_PI
# define M_PI 3.14159265358979323846
#endif
extern double round(double x);

#define CalibrateTestAmp  17.5   /* 17.5 mv * root 2 */
#define CalibrateTstFrq  5000
#define CalibrateNumFltTyp  4

/* We want to make a table of sin values to be able to look them up
 * instead of calculating them all, but one cycle isn't enough because
 * at 44100 samples per second, one cycle of a 5kHz sine wave takes
 * 44100/5000 samples, which is 8.82. If we had 100 cycles, it would
 * fit exactly (into 882 samples). 50 cycles would be 441 samples and
 * that's the minimum because they have no common divisor.
 * The highest common divisor of 44100 and 5000 is 100 so
 * the number of cycles is freq/hcd and the number of samples is
 * SmpFrq/hcd.
 * In the worst case, when the sample rate is 47999 and there is
 * no common divisor, it still only uses 2.5MB of memory.
 */
static int64_t hcd64(int64_t a, int64_t b)
{
   while (a != b)
     if (a > b) a = a - b;
     else b = b - a;
   return a;
}

static char *CalibrateMakeSinTab(dolbyb_t *Param)
{
  double dt = 2.0 * M_PI * CalibrateTstFrq / Param->SmpSec;
  double SinArg = 0.0;
  uint32_t SmpCnt;

  Param->CalibrateSinTabMax = Param->SmpSec / hcd64(Param->SmpSec, CalibrateTstFrq);
  Param->CalibrateSinTab = malloc(Param->CalibrateSinTabMax * sizeof(*Param->CalibrateSinTab));
  if (!Param->CalibrateSinTab) return "Out of memory";
  for (SmpCnt = 0; SmpCnt < Param->CalibrateSinTabMax; SmpCnt++) {
    Param->CalibrateSinTab[SmpCnt] = round(sin(SinArg) * Param->CalibrateSmpMux);
    SinArg += dt;
  }
  return NULL;
}

static char *CalibrateInit(dolbyb_t *Param, int32_t WarmUp, int32_t TstLen)
{
  Param->CalibrateSmpDiv = ((double)Param->SmpSec / CalibrateTstFrq) / (2 * M_PI);
  Param->CalibrateSmpMux = CalibrateTestAmp * sqrt(2.0) * ParamVltMux / 1000.0;
  Param->CalibrateWrmSam = WarmUp * Param->SmpSec;
  Param->CalibrateEndSam = (TstLen + WarmUp) * Param->SmpSec;
  return CalibrateMakeSinTab(Param);
}

static void CalibrateDeInit(dolbyb_t *Param)
{
  if (Param->CalibrateSinTab) {
    free(Param->CalibrateSinTab);
    Param->CalibrateSinTab = NULL;
  }
}

/****  Routines to run calibration tests  ****/

static int32_t CalibrateSmpCnt;

static int64_t CalibrateNextTestToneSamp(dolbyb_t *Param)
{
  return Param->CalibrateSinTab[CalibrateSmpCnt++ % Param->CalibrateSinTabMax];
}

static int64_t CalibrateTestEncode(dolbyb_t *Param, int64_t SmpVal)
{
  return MixersEncode(SmpVal, SidePath(Param, SmpVal, 1));
}

static int64_t CalibrateRunNoNRTest(dolbyb_t *Param)
{
  int64_t SmpVal, SmpTot = 0;

  CalibrateInit(Param, 0, 5);

  CalibrateSmpCnt = 0;
  while (CalibrateSmpCnt < Param->CalibrateEndSam) {
    /* Apply mixer as if encoding */
    SmpVal = MixersEncode(CalibrateNextTestToneSamp(Param), 0);
    SmpTot += SmpVal < 0 ? -SmpVal : SmpVal;
  }

  CalibrateDeInit(Param);

  /* Return the result */
  return SmpTot / Param->CalibrateEndSam;
}

static int64_t CalibrateRunEncodeTest(dolbyb_t *Param)
{
  /* Initialise calibration test */
  int64_t SmpVal, SmpTot = 0;

  /* Warm up */
  CalibrateSmpCnt = 0;
  while (CalibrateSmpCnt < Param->CalibrateWrmSam)
    CalibrateTestEncode(Param, CalibrateNextTestToneSamp(Param));

  while (CalibrateSmpCnt < Param->CalibrateEndSam) {
    SmpVal = CalibrateTestEncode(Param, CalibrateNextTestToneSamp(Param));
    SmpTot += SmpVal < 0 ? -SmpVal : SmpVal;
  }
  /* Return the result */
  return SmpTot / (Param->CalibrateEndSam - Param->CalibrateWrmSam);
}

/****  Routines to find best value for side Amp  ****/

static int64_t CalibrateTrySideAmp(dolbyb_t *Param, double SidAmp)
{
  Param->SidAmp = SidAmp;
  SidePathInit(Param);
  return CalibrateRunEncodeTest(Param);
}

static double CalibrateFindSideAmp(dolbyb_t *Param, int64_t Target)
{
  int64_t OldGVt;
  double HigAmp, LowAmp, PrvAmp, TryAmp;
  int64_t TryRes, PrvRes;
  int64_t HigRes, LowRes;


  OldGVt = Param->FETGVt;   /* Save Value to restore afterwards */
  CalibrateInit(Param, 0, 5);
  /* Set up some test values */
  Param->FETClp = 1;
  Param->FETGVt = 0;

  /* Find High and low values */

  /* The highest and lowest results we've seen are
   * 2.3192325 for filter type 4 at 20000Hz and
   * 4.4790271 for filter type 1 at 8001Hz
   * Use slightly larger in case of future algorithmic changes.
   */
  LowAmp = 2.3;
  HigAmp = 4.5;
  LowRes = CalibrateTrySideAmp(Param, LowAmp);
  HigRes = CalibrateTrySideAmp(Param, HigAmp);

  /* Invent the loop variables so that the loop starts */
  PrvAmp = LowAmp; PrvRes = LowRes;
  TryAmp = HigAmp; TryRes = HigRes;

  /* Now use successive linear approximations until we find
   * two close values that give the same result
   *
   * The linear approximation was derived thus:
   *                                                     ,,--
   *  HigRes|________________________________________--''____
   *  Target|-------------------|------------,,|-''|---------
   *        |                   |      ,,--''  |   |
   *  LowRes|___________________|,,--''________|___|_________
   *        |            _..--''|              |   |
   *        |      ,,--''       |              |   |
   *        |,,--''             |              |   |
   *        |                   |              |   |
   *        |                   |              |   |
   *        |___________________|______________|___|_________
   *                         LowAmp            X  HigAmp
   *
   * where X is the new estimate of TryAmp whose result is Target.
   *   By similar triangles:
   * (X - LowAmp) / (Target - LowRes) == (HigAmp - LowAmp) / (HigRes - LowRes)
   *   to get X, multiply both sides by (Target - LowRes)
   * X - LowAmp == (HigAmp - LowAmp) / (HigRes - LowRes) * (Target - LowRes)
   *   add LowAmp to both sides and you get
   * X == LowAmp + ((HigAmp - LowAmp) / (HigRes - LowRes)) * (Target - LowRes)
   */
  while (TryRes != PrvRes) {
    PrvAmp = TryAmp; PrvRes = TryRes;
    TryAmp = LowAmp + (HigAmp - LowAmp) * (Target - LowRes) / (HigRes - LowRes);
    TryRes = CalibrateTrySideAmp(Param, TryAmp);
    if (TryRes > Target) {
      HigAmp = TryAmp; HigRes = TryRes;
    } else if (TryRes < Target) {
      LowAmp = TryAmp; LowRes = TryRes;
    }
  }
  /* We have two Amplitudes that give the same result
   * so our best estimate is half way between them */
  TryAmp = (TryAmp + PrvAmp) / 2;

  /* Restore parameters and store the result */
  CalibrateDeInit(Param);
  Param->FETGVt = OldGVt;
  Param->FETClp = 0;
  return TryAmp;
}

/****  Routines to find best value for SVlt  ****/

static int64_t CalibrateTrySVlt(dolbyb_t *Param, int64_t SVlt)
{
  Param->FETSVt = SVlt;
  SidePathInit(Param);
  return CalibrateRunEncodeTest(Param);
}

static int64_t CalibrateFindSVlt(dolbyb_t *Param, int64_t Target)
{
  int64_t HigS, LowS, PrvS, TryS;
  int64_t TryRes, PrvRes;
  int64_t HigRes, LowRes;

  CalibrateInit (Param, 2, 5);

  /* Set up some test values */
  Param->FETClp = 0;

  /* Set initial high and low values */

  /* The highest and lowest results we've seen are
   * 11257398552 for filter type 2 at 20000Hz
   * 11501205920 for filter type 1 at 3840000Hz
   * Use slightly larger in case of future algorithmic changes.
   */
  /* gcc-2.95 warns "integer constant out of range" and ANSI C disallows
   * long long constants (11365500000LL) so here's a halfway house */
  LowS = (int64_t)112500*100000;
  HigS = (int64_t)115100*100000;
  LowRes = CalibrateTrySVlt(Param, LowS);
  HigRes = CalibrateTrySVlt(Param, HigS);

  /* Invent the loop variables so that the loop starts */
  PrvS = LowS; PrvRes = LowRes;
  TryS = HigS; TryRes = HigRes;

  /* Now use successive linear approximations until we find */
  /* two close values that give the same result */
  while (TryRes != PrvRes) {
    PrvS = TryS; PrvRes = TryRes;
    /* See the diagram above for the derivation of this formula */
    TryS = LowS + (HigS - LowS) * (Target - LowRes) / (HigRes - LowRes);
    if (TryS != PrvS) {
      TryRes = CalibrateTrySVlt(Param, TryS);
      if (TryRes > Target) {
	  HigS = TryS; HigRes = TryRes;
      } else if (TryRes < Target) {
	  LowS = TryS; LowRes = TryRes;
      }
    }
  }
  /* We have two Amplitudes that give the same result
   * so out best estimate is half way between them */
  TryS = (TryS + PrvS + 1) / 2;

  CalibrateDeInit(Param);

  return TryS;
}

/******************************************/
/****  Routines to do the calibration  ****/
/******************************************/

static void CalibrateCacheSave(dolbyb_t *Param);
static int CalibrateCacheFind(dolbyb_t *Param);

void Calibrate(dolbyb_t *Param)
{
  int64_t OffRes;   /* Result with Noise Resuction off */
  int64_t GanTgt;   /* Target for gain adjustement */
  int64_t SvtTgt;   /* Target for SVlt adjustement */
  double OldThGain;

  /* First, see if it's cached */
  if (CalibrateCacheFind(Param)) return;

  /* Run calibration without threashold gain */
  OldThGain = Param->ThGain;
  Param->ThGain = 1.0;
  
  /* Try with noise reduction turned off, to get reference level */
  OffRes = CalibrateRunNoNRTest(Param);

  /* Calculate other targets */
  GanTgt = round(OffRes * ParamConvertDb(10.0));
  SvtTgt = round(OffRes * ParamConvertDb(8.0));

  /* Store the result */
  Param->SidAmp = CalibrateFindSideAmp(Param, GanTgt);
  Param->FETSVt = CalibrateFindSVlt(Param, SvtTgt);

  /* Restore variables */
  Param->ThGain = OldThGain;
  SidePathInit(Param);

  /* Save it in the cache */
  CalibrateCacheSave(Param);
}

/************************************/
/****  Calibration result cache  ****/
/************************************/
#include <stdio.h>
#include <string.h>

/* Cassette Maker integration, 2026-10-24: process-local cache only.
 * Initialization is serialized by the Rust adapter; no user-home cache I/O. */
static struct { unsigned rate; int filter; int up; double amp; int64_t sv; } cache[16];
static unsigned cache_count;
static void CalibrateCacheSave(dolbyb_t *p) {
  if (cache_count == 16) return;
  cache[cache_count].rate=p->SmpSec; cache[cache_count].filter=p->FltTyp;
  cache[cache_count].up=p->UpSamp; cache[cache_count].amp=p->SidAmp;
  cache[cache_count++].sv=p->FETSVt;
}
static int CalibrateCacheFind(dolbyb_t *p) {
  unsigned i;
  for(i=0;i<cache_count;i++) if(cache[i].rate==p->SmpSec && cache[i].filter==p->FltTyp && cache[i].up==p->UpSamp) {
    p->SidAmp=cache[i].amp; p->FETSVt=cache[i].sv; return 1;
  }
  return 0;
}
