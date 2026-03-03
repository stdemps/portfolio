"use client"

import * as Tone from "tone"

let audioReady = false

async function ensureAudioReady(): Promise<void> {
  if (audioReady) return
  await Tone.start()
  audioReady = true
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
] as const

/* ---- UI Click: mechanical button sound ---- */
let clickSynth: Tone.MembraneSynth | null = null

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
    }).toDestination()
  }
  return clickSynth
}

/**
 * Play a short percussive click (for patch nav buttons).
 */
export async function playClickSound(): Promise<void> {
  try {
    await ensureAudioReady()
    const synth = getClickSynth()
    synth.triggerAttackRelease("C1", 0.03)
  } catch {
    // no-op if audio unavailable
  }
}

/* ---- Moog Synth Patches (0–4: Hero, Work, Experience, Testimonials, Contact) ---- */
type PatchIndex = 0 | 1 | 2 | 3 | 4

let polySynth: Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth> | null = null
let currentPatchIndex: PatchIndex | null = null
let limiter: Tone.Limiter | null = null

function getLimiter(): Tone.Limiter {
  if (!limiter) {
    limiter = new Tone.Limiter(-1).toDestination()
  }
  return limiter
}

function createPatch0(): Tone.PolySynth<Tone.MonoSynth> {
  /* Patch 1 (Hero): Minimoog Bass — sawtooth, lowpass high Q, punchy */
  const poly = new Tone.PolySynth(Tone.MonoSynth, {
    oscillator: { type: "sawtooth" },
    filter: { type: "lowpass", frequency: 1200, Q: 8, rolloff: -24 },
    filterEnvelope: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 0.5, baseFrequency: 200, octaves: 2 },
    envelope: { attack: 0.005, decay: 0.3, sustain: 0.5, release: 0.4 },
    volume: -10,
  })
  poly.maxPolyphony = 8
  return poly.connect(getLimiter()) as Tone.PolySynth<Tone.MonoSynth>
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
      filterEnvelope: { attack: 0.02, decay: 0.2, sustain: 0.6, release: 0.3, baseFrequency: 400, octaves: 2 },
      envelope: { attack: 0.01, decay: 0.25, sustain: 0.6, release: 0.5 },
    },
    voice1: {
      oscillator: { type: "square" },
      filter: { type: "lowpass", frequency: 1800, Q: 2 },
      filterEnvelope: { attack: 0.02, decay: 0.2, sustain: 0.6, release: 0.3, baseFrequency: 400, octaves: 2 },
      envelope: { attack: 0.01, decay: 0.25, sustain: 0.6, release: 0.5 },
    },
    volume: -8,
  })
  poly.maxPolyphony = 8
  return poly.connect(getLimiter()) as Tone.PolySynth<Tone.DuoSynth>
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
  })
  poly.maxPolyphony = 6
  return poly.connect(getLimiter()) as Tone.PolySynth<Tone.DuoSynth>
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
  })
  poly.maxPolyphony = 8
  return poly.connect(getLimiter()) as Tone.PolySynth<Tone.DuoSynth>
}

function createPatch4(): Tone.PolySynth<Tone.MonoSynth> {
  /* Patch 5 (Contact): Sci-Fi Arp — plucky pulse, fast filter snap */
  const poly = new Tone.PolySynth(Tone.MonoSynth, {
    oscillator: { type: "pulse", width: 0.4 },
    filter: { type: "lowpass", frequency: 3000, Q: 12 },
    filterEnvelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1, baseFrequency: 800, octaves: 3 },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0.1, release: 0.2 },
    volume: -8,
  })
  poly.maxPolyphony = 8
  return poly.connect(getLimiter()) as Tone.PolySynth<Tone.MonoSynth>
}

const PATCH_CREATORS: [
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
  () => Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth>,
] = [createPatch0, createPatch1, createPatch2, createPatch3, createPatch4]

function getSynthForPatch(patchIndex: number): Tone.PolySynth<Tone.MonoSynth> | Tone.PolySynth<Tone.DuoSynth> {
  const mapping: PatchIndex[] = [0, 1, 2, 3, 3, 4] // Hero, Work, Experience, Testimonials, About→Polymoog, Contact
  const idx = mapping[Math.max(0, Math.min(5, patchIndex))]
  if (polySynth && currentPatchIndex === idx) {
    return polySynth
  }
  if (polySynth) {
    polySynth.releaseAll()
    polySynth.disconnect()
    polySynth.dispose()
    polySynth = null
  }
  polySynth = PATCH_CREATORS[idx]()
  currentPatchIndex = idx
  return polySynth
}

/**
 * Play a synth key note for the Moog keyboard. Returns release function.
 * Uses the patch at patchIndex (0–4 maps to Hero, Work, Experience, Testimonials, Contact).
 */
export async function playKeyNote(
  note: string,
  patchIndex: number
): Promise<() => void> {
  try {
    await ensureAudioReady()
    const synth = getSynthForPatch(patchIndex)
    synth.triggerAttack(note)
    return () => {
      synth.triggerRelease(note)
    }
  } catch {
    return () => {}
  }
}
