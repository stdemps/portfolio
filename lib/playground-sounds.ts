"use client";

import * as Tone from "tone";

let audioReady = false;

async function ensureAudioReady(): Promise<void> {
  if (audioReady) return;
  await Tone.start();
  audioReady = true;
}

/** Piano key notes: 2 octaves C3–B4 for Moog keyboard (14 white + 10 black) */
export const PIANO_NOTES = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
] as const;

/* ---- UI Click: mechanical button sound ---- */
let clickSynth: Tone.MembraneSynth | null = null;

function getClickSynth(): Tone.MembraneSynth {
  if (!clickSynth) {
    clickSynth = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      octaves: 0.1,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.001,
        decay: 0.05,
        sustain: 0,
        release: 0.02,
      },
      volume: -18,
    }).toDestination();
  }
  return clickSynth;
}

/**
 * Play a short percussive click (for patch nav buttons).
 */
export async function playClickSound(): Promise<void> {
  try {
    await ensureAudioReady();
    const synth = getClickSynth();
    synth.triggerAttackRelease("C1", 0.03);
  } catch {
    // no-op if audio unavailable
  }
}

/* ---- Moog Synth Patches (0–4: Hero, Work, Experience, Testimonials, Contact) ---- */
type PatchIndex = 0 | 1 | 2 | 3 | 4;

let polySynth:
  | Tone.PolySynth<Tone.MonoSynth>
  | Tone.PolySynth<Tone.DuoSynth>
  | null = null;
let currentPatchIndex: PatchIndex | null = null;
let limiter: Tone.Limiter | null = null;

function getLimiter(): Tone.Limiter {
  if (!limiter) {
    limiter = new Tone.Limiter(-1).toDestination();
  }
  return limiter;
}

let freeverb: Tone.Freeverb | null = null;
let initialReverbWet = 0.2;

export function getFreeverb(): Tone.Freeverb {
  if (!freeverb) {
    freeverb = new Tone.Freeverb({ roomSize: 0.7, dampening: 4000 }).connect(
      getLimiter(),
    );
    freeverb.wet.value = initialReverbWet;
  }
  return freeverb;
}

export function setGlobalReverb(amount: number) {
  initialReverbWet = amount;
  if (freeverb) {
    freeverb.wet.value = amount;
  }
}

function createPatch0(): Tone.PolySynth<Tone.MonoSynth> {
  /* Patch 1 (Hero): Minimoog Bass — sawtooth, lowpass high Q, punchy */
  const poly = new Tone.PolySynth(Tone.MonoSynth, {
    oscillator: { type: "sawtooth" },
    filter: { type: "lowpass", frequency: 1200, Q: 8, rolloff: -24 },
    filterEnvelope: {
      attack: 0.01,
      decay: 0.3,
      sustain: 0.4,
      release: 0.5,
      baseFrequency: 200,
      octaves: 2,
    },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.5, release: 0.4 },
    volume: -10,
  });
  poly.maxPolyphony = 8;
  return poly.connect(getFreeverb()) as Tone.PolySynth<Tone.MonoSynth>;
}

function createPatch1(): Tone.PolySynth<Tone.DuoSynth> {
  /* Patch 2 (Work): Prog Lead — square, vibrato, portamento */
  const poly = new Tone.PolySynth(Tone.DuoSynth, {
    portamento: 0.05,
    vibratoAmount: 0.08,
    vibratoRate: 5,
    harmonicity: 1,
    voice0: {
      oscillator: { type: "square" },
      filter: { type: "lowpass", frequency: 2000, Q: 2 },
      filterEnvelope: {
        attack: 0.02,
        decay: 0.2,
        sustain: 0.6,
        release: 0.3,
        baseFrequency: 400,
        octaves: 2,
      },
      envelope: { attack: 0.01, decay: 0.25, sustain: 0.6, release: 0.5 },
    },
    voice1: {
      oscillator: { type: "square" },
      filter: { type: "lowpass", frequency: 1800, Q: 2 },
      filterEnvelope: {
        attack: 0.02,
        decay: 0.2,
        sustain: 0.6,
        release: 0.3,
        baseFrequency: 400,
        octaves: 2,
      },
      envelope: { attack: 0.01, decay: 0.25, sustain: 0.6, release: 0.5 },
    },
    volume: -8,
  });
  poly.maxPolyphony = 8;
  return poly.connect(getFreeverb()) as Tone.PolySynth<Tone.DuoSynth>;
}

function createPatch2(): Tone.PolySynth<Tone.DuoSynth> {
  /* Patch 3 (Experience): Taurus Pedal — low saw + triangle sub */
  const poly = new Tone.PolySynth(Tone.DuoSynth, {
    voice0: {
      oscillator: { type: "sawtooth" },
      filter: { type: "lowpass", frequency: 400, Q: 4, rolloff: -24 },
      envelope: { attack: 0.08, decay: 0.4, sustain: 0.7, release: 0.8 },
    },
    voice1: {
      oscillator: { type: "triangle" },
      filter: { type: "lowpass", frequency: 300, Q: 2 },
      envelope: { attack: 0.1, decay: 0.5, sustain: 0.6, release: 1 },
    },
    harmonicity: 0.5,
    volume: -8,
  });
  poly.maxPolyphony = 6;
  return poly.connect(getFreeverb()) as Tone.PolySynth<Tone.DuoSynth>;
}

function createPatch3(): Tone.PolySynth<Tone.DuoSynth> {
  /* Patch 4 (Testimonials): Polymoog Pad — two detuned saws, warm/brassy */
  const poly = new Tone.PolySynth(Tone.DuoSynth, {
    voice0: {
      oscillator: { type: "sawtooth" },
      filter: { type: "lowpass", frequency: 800, Q: 1 },
      envelope: { attack: 0.4, decay: 0.5, sustain: 0.8, release: 1.2 },
    },
    voice1: {
      oscillator: { type: "sawtooth" },
      filter: { type: "lowpass", frequency: 900, Q: 1 },
      envelope: { attack: 0.5, decay: 0.5, sustain: 0.75, release: 1 },
    },
    harmonicity: 1.005, // slight detune for warm brassy thickness
    volume: -12,
  });
  poly.maxPolyphony = 8;
  return poly.connect(getFreeverb()) as Tone.PolySynth<Tone.DuoSynth>;
}

function createPatch4(): Tone.PolySynth<Tone.MonoSynth> {
  /* Patch 5 (Contact): Sci-Fi Arp — plucky pulse, fast filter snap */
  const poly = new Tone.PolySynth(Tone.MonoSynth, {
    oscillator: { type: "pulse", width: 0.4 },
    filter: { type: "lowpass", frequency: 3000, Q: 12 },
    filterEnvelope: {
      attack: 0.001,
      decay: 0.15,
      sustain: 0,
      release: 0.1,
      baseFrequency: 800,
      octaves: 3,
    },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0.1, release: 0.2 },
    volume: -8,
  });
  poly.maxPolyphony = 8;
  return poly.connect(getFreeverb()) as Tone.PolySynth<Tone.MonoSynth>;
}

const PATCH_CREATORS: [
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
] = [createPatch0, createPatch1, createPatch2, createPatch3, createPatch4];

function getSynthForPatch(
  patchIndex: number,
): Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth> {
  const mapping: PatchIndex[] = [0, 1, 2, 3, 3, 4]; // Hero, Work, Experience, Testimonials, About→Polymoog, Contact
  const idx = mapping[Math.max(0, Math.min(5, patchIndex))];
  if (polySynth && currentPatchIndex === idx) {
    return polySynth;
  }
  if (polySynth) {
    const oldSynth = polySynth;
    // Let current notes release naturally, then dispose
    setTimeout(() => {
      try {
        oldSynth.releaseAll();
        oldSynth.disconnect();
        oldSynth.dispose();
      } catch {
        /* ok */
      }
    }, 2000);
    polySynth = null;
  }
  polySynth = PATCH_CREATORS[idx]();
  currentPatchIndex = idx;

  // Apply current UI parameters to the new synth
  applyCurrentSynthParams();

  return polySynth;
}

export const PATCH_PRESETS = [
  {
    osc1Wave: "sawtooth" as WaveformType,
    osc2Wave: "sawtooth" as WaveformType,
    detune: 0.04,
    cutoff: 0.588,
    resonance: 0.428,
  },
  {
    osc1Wave: "square" as WaveformType,
    osc2Wave: "square" as WaveformType,
    detune: 0.17,
    cutoff: 0.688,
    resonance: 0.085,
  },
  {
    osc1Wave: "sawtooth" as WaveformType,
    osc2Wave: "triangle" as WaveformType,
    detune: 0.04,
    cutoff: 0.349,
    resonance: 0.2,
  },
  {
    osc1Wave: "sawtooth" as WaveformType,
    osc2Wave: "sawtooth" as WaveformType,
    detune: 0.17,
    cutoff: 0.51,
    resonance: 0.028,
  },
  {
    osc1Wave: "square" as WaveformType,
    osc2Wave: "square" as WaveformType,
    detune: 0.04,
    cutoff: 0.787,
    resonance: 0.657,
  },
] as const;

export function syncSynthParams(params: {
  osc1Wave?: WaveformType;
  osc2Wave?: WaveformType;
  detune?: number;
  cutoff?: number;
  resonance?: number;
}) {
  if (params.osc1Wave) moogParams.osc1Wave = params.osc1Wave;
  if (params.osc2Wave) moogParams.osc2Wave = params.osc2Wave;
  if (params.detune !== undefined)
    moogParams.detune = Math.round(params.detune * 50);
  if (params.cutoff !== undefined) moogParams.cutoff = params.cutoff;
  if (params.resonance !== undefined) moogParams.resonance = params.resonance;
  applyCurrentSynthParams();
}

export function applyCurrentSynthParams(): void {
  if (!polySynth || currentPatchIndex === null) return;

  const f = normalisedCutoffToHz(moogParams.cutoff);
  const q = normalisedResonanceToQ(moogParams.resonance);

  const isDuo = currentPatchIndex !== 0 && currentPatchIndex !== 4;

  try {
    if (isDuo) {
      const duo = polySynth as Tone.PolySynth<Tone.DuoSynth>;
      duo.set({
        voice0: {
          oscillator: { type: moogParams.osc1Wave },
          filter: { frequency: f, Q: q },
          filterEnvelope: { baseFrequency: f },
        },
        voice1: {
          oscillator: { type: moogParams.osc2Wave },
          filter: { frequency: f, Q: q },
          filterEnvelope: { baseFrequency: f },
        },
        harmonicity: Math.pow(2, moogParams.detune / 1200),
      });
    } else {
      const mono = polySynth as Tone.PolySynth<Tone.MonoSynth>;
      mono.set({
        oscillator: { type: moogParams.osc1Wave },
        filter: { frequency: f, Q: q },
        filterEnvelope: { baseFrequency: f },
      });
    }
  } catch {
    /* ok */
  }
}

/**
 * Play a synth key note for the Moog keyboard. Returns release function.
 * Uses the patch at patchIndex (0–4 maps to Hero, Work, Experience, Testimonials, Contact).
 */
export async function playKeyNote(
  note: string,
  patchIndex: number,
): Promise<() => void> {
  try {
    await ensureAudioReady();
    const synth = getSynthForPatch(patchIndex);
    const now = Tone.now();
    synth.triggerAttack(note, now);
    return () => {
      synth.triggerRelease(note, Tone.now());
    };
  } catch {
    return () => {};
  }
}

/**
 * Force release all active notes on the current polysynth.
 * Useful for cleanup on unmount or when stopping a demo to prevent drones.
 */
export function stopAllSounds(): void {
  if (polySynth) {
    try {
      polySynth.releaseAll();
    } catch {
      // ignore
    }
  }
}

/* ---- Moog Engine: dual oscillator + ladder filter ---- */

export type WaveformType = "sawtooth" | "square" | "triangle";

/** Live-mutable params for the Moog engine — mutate these directly before playing */
export const moogParams = {
  osc1Wave: "sawtooth" as WaveformType,
  osc2Wave: "sawtooth" as WaveformType,
  /** OSC 2 detune in cents */
  detune: 8,
  /** LPF cutoff frequency in Hz (0–1 normalised → mapped to 80–8000 Hz) */
  cutoff: 0.45,
  /** Filter resonance 0–1 (mapped to Q 0.5–18) */
  resonance: 0.35,
};

/** Active Moog voice map: note → [osc1, osc2, gainNode] */
const moogVoices = new Map<
  string,
  [Tone.Oscillator, Tone.Oscillator, Tone.Gain]
>();
let moogFilter: Tone.Filter | null = null;

function getMoogFilter(): Tone.Filter {
  if (!moogFilter) {
    moogFilter = new Tone.Filter({
      type: "lowpass",
      rolloff: -24,
      frequency: normalisedCutoffToHz(moogParams.cutoff),
      Q: normalisedResonanceToQ(moogParams.resonance),
    }).connect(getFreeverb());
  }
  return moogFilter;
}

function normalisedCutoffToHz(v: number): number {
  // exponential map: 0→80Hz, 1→8000Hz
  return Math.round(80 * Math.pow(100, v));
}

function normalisedResonanceToQ(v: number): number {
  // 0→0.5, 1→18
  return 0.5 + v * 17.5;
}

/** Update filter from current moogParams — call after changing cutoff/resonance */
export function applyMoogFilterParams(): void {
  const f = getMoogFilter();
  f.frequency.rampTo(normalisedCutoffToHz(moogParams.cutoff), 0.02);
  f.Q.rampTo(normalisedResonanceToQ(moogParams.resonance), 0.02);
  applyCurrentSynthParams();
}

/**
 * Play a note through the Moog dual-oscillator engine.
 * Returns a release function.
 */
export async function playMoogNote(note: string): Promise<() => void> {
  try {
    await ensureAudioReady();
    if (moogVoices.has(note)) return () => releaseMoogNote(note);

    const filter = getMoogFilter();
    const gain = new Tone.Gain(0.4).connect(filter);

    const osc1 = new Tone.Oscillator({
      frequency: note,
      type: moogParams.osc1Wave,
    }).connect(gain);

    const osc2 = new Tone.Oscillator({
      frequency: note,
      type: moogParams.osc2Wave,
      detune: moogParams.detune,
    }).connect(gain);

    osc1.start();
    osc2.start();

    // Quick attack ramp to avoid click
    gain.gain.setValueAtTime(0, Tone.now());
    gain.gain.linearRampToValueAtTime(0.4, Tone.now() + 0.01);

    moogVoices.set(note, [osc1, osc2, gain]);

    return () => releaseMoogNote(note);
  } catch {
    return () => {};
  }
}

function releaseMoogNote(note: string): void {
  const voice = moogVoices.get(note);
  if (!voice) return;
  const [osc1, osc2, gain] = voice;
  const now = Tone.now();
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(0, now + 0.15);
  setTimeout(() => {
    try {
      osc1.stop();
      osc1.dispose();
    } catch {
      /* ok */
    }
    try {
      osc2.stop();
      osc2.dispose();
    } catch {
      /* ok */
    }
    try {
      gain.dispose();
    } catch {
      /* ok */
    }
  }, 200);
  moogVoices.delete(note);
}
