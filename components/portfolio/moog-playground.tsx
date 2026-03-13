"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useViewMode } from "@/hooks/use-view-mode";
import {
  playClickSound,
  playKeyNote,
  applyMoogFilterParams,
  moogParams,
  PIANO_NOTES,
  stopAllSounds,
  type WaveformType,
  setGlobalReverb,
  syncSynthParams,
  PATCH_PRESETS,
} from "@/lib/playground-sounds";
import { Hero } from "@/components/portfolio/hero";
import { WorkSection } from "@/components/portfolio/work-section";
import { WorkExperienceSection } from "@/components/portfolio/work-experience-section";
import { TestimonialsSection } from "@/components/portfolio/testimonials-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { SynthTour } from "@/components/portfolio/synth-tour";
import { cn } from "@/lib/utils";

/* ---- Bassline data ---- */
type BasslineStep = { idx: number; durationMs: number };
type Bassline = {
  id: string;
  label: string;
  patchIndex: number;
  steps: BasslineStep[];
};

/**
 * Note indices map to PIANO_NOTES (C3=0 … B4=23).
 * Durations approximate 120bpm: 8th note ≈ 250ms, 16th note ≈ 125ms, quarter ≈ 500ms.
 */
const BASSLINES: Bassline[] = [
  {
    id: "c_major_scale_asc",
    label: "C MAJOR SCALE (ASCENDING)",
    patchIndex: 0, // Minimoog Bass
    steps: [
      { idx: 0, durationMs: 250 }, // C3
      { idx: 2, durationMs: 250 }, // D3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 5, durationMs: 250 }, // F3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 9, durationMs: 250 }, // A3
      { idx: 11, durationMs: 250 }, // B3
      { idx: 12, durationMs: 500 }, // C4
    ],
  },
  {
    id: "c_major_scale_desc",
    label: "C MAJOR SCALE (DESCENDING)",
    patchIndex: 0, // Minimoog Bass
    steps: [
      { idx: 12, durationMs: 250 }, // C4
      { idx: 11, durationMs: 250 }, // B3
      { idx: 9, durationMs: 250 }, // A3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 5, durationMs: 250 }, // F3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 2, durationMs: 250 }, // D3
      { idx: 0, durationMs: 500 }, // C3
    ],
  },
  {
    id: "c_major_arpeggio_asc",
    label: "C MAJOR ARPEGGIO (ASCENDING)",
    patchIndex: 1, // Prog Lead
    steps: [
      { idx: 0, durationMs: 250 }, // C3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 12, durationMs: 500 }, // C4
    ],
  },
  {
    id: "c_major_arpeggio_desc",
    label: "C MAJOR ARPEGGIO (DESCENDING)",
    patchIndex: 1, // Prog Lead
    steps: [
      { idx: 12, durationMs: 250 }, // C4
      { idx: 7, durationMs: 250 }, // G3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 0, durationMs: 500 }, // C3
    ],
  },
  {
    id: "c_major_7_arpeggio_asc",
    label: "C MAJOR 7 ARPEGGIO (ASCENDING)",
    patchIndex: 2, // Taurus Sub Bass
    steps: [
      { idx: 0, durationMs: 250 }, // C3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 11, durationMs: 250 }, // B3
      { idx: 12, durationMs: 500 }, // C4
    ],
  },
  {
    id: "c_major_7_arpeggio_desc",
    label: "C MAJOR 7 ARPEGGIO (DESCENDING)",
    patchIndex: 2, // Taurus Sub Bass
    steps: [
      { idx: 12, durationMs: 250 }, // C4
      { idx: 11, durationMs: 250 }, // B3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 0, durationMs: 500 }, // C3
    ],
  },
  {
    id: "c_major_scale_asc_desc",
    label: "C MAJOR SCALE (ASC/DESC)",
    patchIndex: 0, // Minimoog Bass
    steps: [
      // Ascending
      { idx: 0, durationMs: 250 }, // C3
      { idx: 2, durationMs: 250 }, // D3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 5, durationMs: 250 }, // F3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 9, durationMs: 250 }, // A3
      { idx: 11, durationMs: 250 }, // B3
      { idx: 12, durationMs: 250 }, // C4
      // Descending
      { idx: 11, durationMs: 250 }, // B3
      { idx: 9, durationMs: 250 }, // A3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 5, durationMs: 250 }, // F3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 2, durationMs: 250 }, // D3
      { idx: 0, durationMs: 500 }, // C3 (Final boss hold)
    ],
  },
  {
    id: "c_major_arpeggio_asc_desc",
    label: "C MAJOR ARPEGGIO (ASC/DESC)",
    patchIndex: 1, // Prog Lead
    steps: [
      // Ascending
      { idx: 0, durationMs: 250 }, // C3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 12, durationMs: 250 }, // C4
      // Descending
      { idx: 7, durationMs: 250 }, // G3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 0, durationMs: 500 }, // C3 (Final boss hold)
    ],
  },
  {
    id: "c_major_7_arpeggio_asc_desc",
    label: "C MAJOR 7 ARPEGGIO (ASC/DESC)",
    patchIndex: 2, // Taurus Sub Bass
    steps: [
      // Ascending
      { idx: 0, durationMs: 250 }, // C3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 11, durationMs: 250 }, // B3
      { idx: 12, durationMs: 250 }, // C4
      // Descending
      { idx: 11, durationMs: 250 }, // B3
      { idx: 7, durationMs: 250 }, // G3
      { idx: 4, durationMs: 250 }, // E3
      { idx: 0, durationMs: 500 }, // C3 (Final boss hold)
    ],
  },
];

const KEYBOARD_SEEN_KEY = "moog-keyboard-seen";

/** Patches match the portfolio section order: Hero → Work → Experience → Testimonials → About → Contact */
const PATCHES = [
  {
    id: "hero",
    label: "HERO",
    tone: "BASS LEAD",
    content: Hero,
    carousel: true,
  },
  {
    id: "projects",
    label: "PROJECTS",
    tone: "PROG LEAD",
    content: WorkSection,
    carousel: true,
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    tone: "SUB BASS",
    content: WorkExperienceSection,
    carousel: true,
  },
  {
    id: "testimonials",
    label: "TESTIMONIALS",
    tone: "WARM PAD",
    content: TestimonialsSection,
    carousel: true,
  },
  {
    id: "about",
    label: "ABOUT",
    tone: "WARM PAD",
    content: AboutSection,
    carousel: true,
  },
  {
    id: "contact",
    label: "CONTACT",
    tone: "SCI-FI ARP",
    content: ContactSection,
    carousel: true,
  },
] as const;

/* Screw head SVG */
function ScrewHead({ className }: { className?: string }) {
  const id = React.useId().replace(/:/g, "-");
  return (
    <div className={cn("absolute z-20", className)} aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="14" y2="14">
            <stop offset="0%" stopColor="#4a4540" />
            <stop offset="50%" stopColor="#2a2520" />
            <stop offset="100%" stopColor="#3a3530" />
          </linearGradient>
        </defs>
        <circle
          cx="7"
          cy="7"
          r="6"
          fill={`url(#${id})`}
          stroke="#2a2520"
          strokeWidth="0.5"
        />
        <line x1="7" y1="2" x2="7" y2="12" stroke="#1a1714" strokeWidth="0.8" />
        <line x1="2" y1="7" x2="12" y2="7" stroke="#1a1714" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

/* Moog LED button — flat black cap, silkscreen label left, amber LED window right */
function MoogLEDButton({
  label,
  onClick,
  "aria-label": ariaLabel,
  title,
}: {
  label: string;
  onClick: () => void;
  "aria-label"?: string;
  title?: string;
}) {
  const [lit, setLit] = React.useState(false);

  const handleClick = () => {
    setLit(true);
    setTimeout(() => setLit(false), 180);
    onClick();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      whileTap={{ y: 2 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.06, ease: "easeOut" }}
      className="flex min-h-[44px] min-w-[44px] flex-row items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1814]"
      style={{
        width: 52,
        height: 22,
        background:
          "linear-gradient(180deg, #2e2b28 0%, #1c1a17 50%, #141210 100%)",
        border: "1px solid #0d0c0a",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 2,
        boxShadow:
          "0 3px 6px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        gap: 0,
        overflow: "hidden",
      }}
    >
      {/* Silkscreen label */}
      <span
        className="font-synth flex-1 text-center text-[7px] uppercase tracking-widest leading-none select-none"
        style={{ color: "hsl(var(--moog-silkscreen) / 0.8)", paddingLeft: 4 }}
      >
        {label}
      </span>
      {/* LED window — amber glow when lit */}
      <div
        style={{
          width: 14,
          height: "100%",
          flexShrink: 0,
          borderLeft: "1px solid #0d0c0a",
          background: lit
            ? "linear-gradient(180deg, #ff8c20 0%, #e05a00 60%, #c04800 100%)"
            : "linear-gradient(180deg, #3a1a08 0%, #241008 100%)",
          boxShadow: lit
            ? "inset 0 0 4px hsl(var(--moog-amber) / 0.6), 0 0 6px hsl(var(--moog-amber) / 0.8)"
            : "inset 0 1px 2px rgba(0,0,0,0.5)",
          transition: "background 0.06s ease, box-shadow 0.06s ease",
        }}
      />
    </motion.button>
  );
}

/* 3D hardware rocker switch — rectangular housing with embossed paddle that snaps between states */
function RockerSwitch({
  topLabel,
  bottomLabel,
  isTop,
  onClick,
  "aria-label": ariaLabel,
}: {
  topLabel: string;
  bottomLabel: string;
  isTop: boolean;
  onClick: () => void;
  "aria-label"?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Label above — bright when active */}
      <span
        className="font-synth text-[7px] uppercase tracking-widest"
        style={{
          color: isTop
            ? "hsl(var(--moog-silkscreen))"
            : "hsl(var(--moog-silkscreen) / 0.3)",
          transition: "color 0.05s linear",
        }}
      >
        {topLabel}
      </span>

      {/* Outer housing — inset shadow makes it look embedded in the panel */}
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        title={ariaLabel}
        aria-pressed={isTop}
        className="relative flex min-h-[44px] min-w-[44px] cursor-pointer flex-col overflow-hidden rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1814]"
        style={{
          width: 38,
          height: 38,
          background: "#0e0c0a",
          border: "1px solid #080604",
          boxShadow:
            "inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06)",
          padding: 3,
        }}
      >
        {/* Top half of paddle */}
        <div
          style={{
            flex: 1,
            borderRadius: "2px 2px 0 0",
            transition: "all 0.05s linear",
            ...(isTop
              ? {
                  // Active (pushed in): dark top, slight amber tint, inset shadow
                  background:
                    "linear-gradient(180deg, #c85a00 0%, #8a3a00 50%, #6a2c00 100%)",
                  boxShadow:
                    "inset 0 3px 6px rgba(0,0,0,0.7), inset 0 1px 3px rgba(0,0,0,0.5)",
                  borderBottom: "1px solid #3a1800",
                }
              : {
                  // Inactive (raised): light highlight on top, dark bottom
                  background:
                    "linear-gradient(180deg, #5a5550 0%, #3a3530 60%, #2a2520 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.14), 0 2px 0 rgba(0,0,0,0.5)",
                  borderBottom: "1px solid #1a1714",
                }),
          }}
        />

        {/* Bottom half of paddle */}
        <div
          style={{
            flex: 1,
            borderRadius: "0 0 2px 2px",
            transition: "all 0.05s linear",
            ...(!isTop
              ? {
                  // Active (pushed in): amber glow, inset shadow
                  background:
                    "linear-gradient(180deg, #8a3a00 0%, #c85a00 60%, #e06a00 100%)",
                  boxShadow:
                    "inset 0 -3px 6px rgba(0,0,0,0.5), inset 0 -1px 3px rgba(0,0,0,0.3)",
                  borderTop: "1px solid #3a1800",
                }
              : {
                  // Inactive (raised): light highlight, heavy bottom shadow
                  background:
                    "linear-gradient(180deg, #2a2520 0%, #3a3530 40%, #4a4540 100%)",
                  boxShadow:
                    "inset 0 -1px 0 rgba(255,255,255,0.08), 0 -2px 0 rgba(0,0,0,0.5)",
                  borderTop: "1px solid #1a1714",
                }),
          }}
        />

        {/* Amber glow overlay when active */}
        <div
          style={{
            position: "absolute",
            inset: 3,
            borderRadius: 2,
            pointerEvents: "none",
            transition: "opacity 0.05s linear",
            opacity: isTop ? 1 : 0,
            boxShadow:
              "0 0 8px hsl(var(--moog-amber) / 0.6), 0 0 16px hsl(var(--moog-amber) / 0.3)",
          }}
        />
      </button>

      {/* Label below — bright when active */}
      <span
        className="font-synth text-[7px] uppercase tracking-widest"
        style={{
          color: !isTop
            ? "hsl(var(--moog-silkscreen))"
            : "hsl(var(--moog-silkscreen) / 0.3)",
          transition: "color 0.05s linear",
        }}
      >
        {bottomLabel}
      </span>
    </div>
  );
}

/* White keys: C,D,E,F,G,A,B x2 octaves — flex: 1 for even distribution */
const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23];
/* Black keys: C#, D#, F#, G#, A# x2 — positioned over seams, width calc(100%/24) */
const BLACK_KEY_POSITIONS: { idx: number; leftPercent: number }[] = [
  { idx: 1, leftPercent: (1 / 14) * 100 - 100 / 24 / 2 }, // C# between 1st/2nd
  { idx: 3, leftPercent: (2 / 14) * 100 - 100 / 24 / 2 }, // D# between 2nd/3rd
  { idx: 6, leftPercent: (4 / 14) * 100 - 100 / 24 / 2 }, // F# between 4th/5th
  { idx: 8, leftPercent: (5 / 14) * 100 - 100 / 24 / 2 }, // G# between 5th/6th
  { idx: 10, leftPercent: (6 / 14) * 100 - 100 / 24 / 2 }, // A# between 6th/7th
  { idx: 13, leftPercent: (8 / 14) * 100 - 100 / 24 / 2 }, // C# octave 2
  { idx: 15, leftPercent: (9 / 14) * 100 - 100 / 24 / 2 }, // D#
  { idx: 18, leftPercent: (11 / 14) * 100 - 100 / 24 / 2 }, // F#
  { idx: 20, leftPercent: (12 / 14) * 100 - 100 / 24 / 2 }, // G#
  { idx: 22, leftPercent: (13 / 14) * 100 - 100 / 24 / 2 }, // A#
];

/** Shift a scientific pitch note (e.g. "C#3") by octave semitones */
function shiftNoteByOctave(note: string, octave: number): string {
  if (octave === 0) return note;
  const match = note.match(/^([A-G]#?)(\d+)$/);
  if (!match) return note;
  const newOct = Math.max(0, Math.min(8, parseInt(match[2], 10) + octave));
  return `${match[1]}${newOct}`;
}

export function MoogPlayground() {
  const reducedMotion = useReducedMotion();
  const [, setViewMode] = useViewMode();
  const { setTheme } = useTheme();
  const [patchIndex, setPatchIndex] = React.useState(0);
  const screenContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTheme("dark");
  }, [setTheme]);
  const [crtKey, setCrtKey] = React.useState(0);
  const [brightness, setBrightness] = React.useState(0.75);
  const [reverb, setReverb] = React.useState(0.2);
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [activeNoteLabel, setActiveNoteLabel] = React.useState<string | null>(
    null,
  );
  const [activeKeys, setActiveKeys] = React.useState<Set<number>>(new Set());
  const [keyboardSeen, setKeyboardSeen] = React.useState(false);
  const [keyboardHintVisible, setKeyboardHintVisible] = React.useState(false);
  // Store either a release function or a boolean indicating "pending release" if the key was released before playKeyNote finished
  const releaseFns = React.useRef<Map<number, (() => void) | boolean>>(
    new Map(),
  );
  const activeKeysRef = React.useRef(activeKeys);
  activeKeysRef.current = activeKeys;

  // Learn mode state
  const [learnMode, setLearnMode] = React.useState(false);
  const [selectedSongIdx, setSelectedSongIdx] = React.useState(0);
  const [learnStep, setLearnStep] = React.useState(0);
  const [demoPlaying, setDemoPlaying] = React.useState(false);
  const demoTimers = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const currentBassline = BASSLINES[selectedSongIdx];
  const highlightKeyIdx =
    learnMode && !demoPlaying
      ? currentBassline.steps[learnStep % currentBassline.steps.length]?.idx
      : undefined;
  const highlightKeys = React.useMemo(() => {
    const s = new Set<number>();
    if (highlightKeyIdx != null) s.add(highlightKeyIdx);
    return s;
  }, [highlightKeyIdx]);

  const demoReleaseFns = React.useRef<Array<() => void>>([]);

  const stopDemo = React.useCallback(() => {
    demoTimers.current.forEach(clearTimeout);
    demoTimers.current = [];
    demoReleaseFns.current.forEach((fn) => fn());
    demoReleaseFns.current = [];
    setDemoPlaying(false);
    setActiveKeys(new Set());
  }, []);

  const runDemo = React.useCallback(() => {
    stopAllSounds();
    stopDemo();
    setDemoPlaying(true);
    const steps = currentBassline.steps;
    let elapsed = 0;
    steps.forEach((step, i) => {
      const noteOn = setTimeout(async () => {
        setActiveKeys((s) => new Set(s).add(step.idx));
        const release = await playKeyNote(
          PIANO_NOTES[step.idx],
          currentBassline.patchIndex,
        );
        demoReleaseFns.current.push(release);

        const noteOff = setTimeout(() => {
          release();
          // Clean up reference
          demoReleaseFns.current = demoReleaseFns.current.filter(
            (fn) => fn !== release,
          );

          setActiveKeys((s) => {
            const n = new Set(s);
            n.delete(step.idx);
            return n;
          });
        }, step.durationMs - 30);
        demoTimers.current.push(noteOff);
      }, elapsed);
      demoTimers.current.push(noteOn);
      elapsed += step.durationMs;
    });
    const end = setTimeout(() => setDemoPlaying(false), elapsed);
    demoTimers.current.push(end);
  }, [currentBassline, stopDemo]);

  // Moog synth engine controls
  const [octave, setOctave] = React.useState(0);
  const [osc1Wave, setOsc1Wave] = React.useState<WaveformType>("sawtooth");
  const [osc2Wave, setOsc2Wave] = React.useState<WaveformType>("sawtooth");
  const [detune, setDetune] = React.useState(0.04); // 0–1 normalised → 0–50 cents
  const [cutoff, setCutoff] = React.useState(0.45);
  const [resonance, setResonance] = React.useState(0.35);

  // Check localStorage for keyboard-seen flag and handle global unmount cleanup
  React.useEffect(() => {
    try {
      const seen = window.localStorage.getItem(KEYBOARD_SEEN_KEY) === "1";
      setKeyboardSeen(seen);
      if (!seen) {
        // Show hint after 1s on first visit
        const t = setTimeout(() => setKeyboardHintVisible(true), 1000);
        return () => {
          clearTimeout(t);
          stopAllSounds();
        };
      }
    } catch {
      // ignore
    }
    return () => {
      stopAllSounds();
    };
  }, []);

  // Sync UI controls with patch presets
  React.useEffect(() => {
    const mapping = [0, 1, 2, 3, 3, 4];
    const preset = PATCH_PRESETS[mapping[patchIndex]];
    if (preset) {
      setOsc1Wave(preset.osc1Wave);
      setOsc2Wave(preset.osc2Wave);
      setDetune(preset.detune);
      setCutoff(preset.cutoff);
      setResonance(preset.resonance);
      syncSynthParams(preset);
    }
  }, [patchIndex]);

  const dismissKeyboardHint = React.useCallback(() => {
    setKeyboardHintVisible(false);
    setKeyboardSeen(true);
    try {
      window.localStorage.setItem(KEYBOARD_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const patch = PATCHES[patchIndex];
  const PatchContent = patch.content;
  const carousel = patch.carousel ?? false;

  const handleContactClick = React.useCallback(() => {
    stopAllSounds();
    void playClickSound();
    setPatchIndex(PATCHES.findIndex((p) => p.id === "contact"));
    setCrtKey((k) => k + 1);
  }, []);

  const handlePrevPatch = () => {
    stopAllSounds();
    void playClickSound();
    setPatchIndex((i) => (i - 1 + PATCHES.length) % PATCHES.length);
    setCrtKey((k) => k + 1);
  };

  const handleNextPatch = () => {
    stopAllSounds();
    void playClickSound();
    setPatchIndex((i) => (i + 1) % PATCHES.length);
    setCrtKey((k) => k + 1);
  };

  const handleDotClick = (i: number) => {
    if (i === patchIndex) return;
    stopAllSounds();
    void playClickSound();
    setPatchIndex(i);
    setCrtKey((k) => k + 1);
  };

  const handleExitPlayground = () => {
    stopAllSounds();
    setViewMode("Simple");
  };

  // Escape key exits playground — matches user expectation for fullscreen modes
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleExitPlayground();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = React.useCallback(
    async (idx: number) => {
      if (activeKeysRef.current.has(idx)) return;
      setActiveKeys((s) => new Set(s).add(idx));
      const baseNote = PIANO_NOTES[idx];
      const shiftedNote = shiftNoteByOctave(baseNote, octave);
      setActiveNoteLabel(shiftedNote);
      dismissKeyboardHint();
      // Advance learn step when correct key is pressed
      if (learnMode && !demoPlaying) {
        const steps = currentBassline.steps;
        if (idx === steps[learnStep % steps.length].idx) {
          setLearnStep((s) => s + 1);
        }
      }
      const activePatch = learnMode ? currentBassline.patchIndex : patchIndex;

      // Mark as pending before awaiting
      releaseFns.current.set(idx, true);
      const release = await playKeyNote(shiftedNote, activePatch);

      // Check if the key was released while this promise was resolving
      if (releaseFns.current.get(idx) === false) {
        // It was released, release immediately and delete
        release();
        releaseFns.current.delete(idx);
      } else {
        // Still pressed (or not released yet), store the release fn
        releaseFns.current.set(idx, release);
      }
    },
    [
      octave,
      patchIndex,
      learnMode,
      dismissKeyboardHint,
      demoPlaying,
      currentBassline,
      learnStep,
    ],
  );

  const handleKeyUp = React.useCallback((idx: number) => {
    const state = releaseFns.current.get(idx);
    if (typeof state === "function") {
      // Release it now
      state();
      releaseFns.current.delete(idx);
    } else if (state === true) {
      // It's still resolving the play promise. Mark it as false so the promise resolver knows to immediately release.
      releaseFns.current.set(idx, false);
    }
    setActiveKeys((s) => {
      const next = new Set(s);
      next.delete(idx);
      if (next.size === 0) setActiveNoteLabel(null);
      return next;
    });
  }, []);

  return (
    <motion.div
      className="moog-playground-fullscreen fixed inset-0 flex flex-col overflow-hidden"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }
      }
    >
      {/* Main faceplate — full width, no top nav */}
      <div className="moog-wood flex flex-1 flex-col min-h-0 p-2 md:p-3">
        <div className="relative flex flex-1 min-h-0 rounded-lg border border-stone-800/60 bg-stone-900/30 p-2 md:p-3">
          <ScrewHead className="left-2 top-2" />
          <ScrewHead className="right-2 top-2" />
          <ScrewHead className="bottom-2 left-2" />
          <ScrewHead className="bottom-2 right-2" />
          <div className="moog-faceplate flex flex-1 flex-col overflow-hidden rounded-md">
            {/* Central control row: LCD + Nav + Knobs + Exit */}
            <div className="relative flex shrink-0 flex-nowrap items-end justify-center gap-4 md:gap-6 border-b border-stone-700/60 px-4 py-3 md:px-6 md:py-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Exit toggle — top-left for immediate discoverability */}
              <div className="absolute left-3 top-3 md:top-4 flex gap-3">
                <RockerSwitch
                  topLabel="EXIT"
                  bottomLabel="PLAY"
                  isTop={false}
                  onClick={handleExitPlayground}
                  aria-label="Exit to Simple view (or press Escape)"
                />
                <RockerSwitch
                  topLabel="LEARN"
                  bottomLabel="PLAY"
                  isTop={learnMode}
                  onClick={() => {
                    setLearnMode((m) => !m);
                    setLearnStep(0);
                    stopDemo();
                  }}
                  aria-label="Toggle bassline learn mode"
                />
              </div>
              <div
                className="flex flex-col items-center gap-0.5"
                data-tour="nav"
              >
                <MoogLEDButton
                  onClick={handlePrevPatch}
                  label="PREV"
                  aria-label="Previous patch"
                />
              </div>
              <div
                className="flex flex-col items-center gap-1"
                data-tour="screen"
              >
                <div
                  className="relative flex w-[340px] flex-col items-center justify-center overflow-hidden rounded border border-black/80 px-4 pb-2 pt-1.5 md:w-[380px] md:px-6"
                  style={{
                    boxShadow:
                      "inset 0px 3px 8px rgba(0,0,0,1), 0px 1px 0px rgba(255,255,255,0.08)",
                    backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)`,
                    backgroundColor: "#0a0806",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded opacity-[0.06] pointer-events-none">
                    <div className="moog-scanlines h-full w-full" />
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden rounded pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
                    }}
                  />
                  {/* Header label */}
                  <span
                    className="font-synth relative z-10 text-[8px] tracking-[0.25em] md:text-[9px]"
                    style={{
                      color: "hsl(var(--moog-silkscreen) / 0.5)",
                      textShadow: "0 0 4px hsl(var(--moog-amber) / 0.15)",
                    }}
                  >
                    SD PORTFOLIO // PLAYGROUND
                  </span>
                  {/* First-visit welcome — always reserves space, fades in/out via opacity */}
                  <motion.span
                    className="font-synth relative z-10 text-[7px] tracking-[0.15em] md:text-[8px] pointer-events-none"
                    animate={{ opacity: showWelcome ? 1 : 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: showWelcome ? 0.5 : 0, duration: 0.4 }}
                    onAnimationComplete={() => {
                      if (showWelcome)
                        setTimeout(() => setShowWelcome(false), 3500);
                    }}
                    style={{
                      color: "hsl(var(--moog-silkscreen) / 0.5)",
                      textShadow: "0 0 4px hsl(var(--moog-amber) / 0.15)",
                    }}
                  >
                    &larr; BROWSE MY WORK &rarr; PLAY THE KEYS
                  </motion.span>
                  {/* Patch name row — amber VFD glow */}
                  <span
                    className="font-synth relative z-10 flex items-center gap-1.5 text-lg tracking-[0.2em] md:text-xl whitespace-nowrap text-moog-amber-light"
                    style={{
                      textShadow:
                        "0 0 8px hsl(var(--moog-amber)), 0 0 20px hsl(var(--moog-amber) / 0.4)",
                    }}
                  >
                    PATCH {(patchIndex + 1).toString().padStart(2, "0")}:{" "}
                    {patch.label}
                    <motion.span
                      className="inline-block w-[2px] text-transparent select-none bg-moog-amber-light"
                      style={{
                        height: "0.75em",
                        verticalAlign: "-0.05em",
                        boxShadow: "0 0 6px hsl(var(--moog-amber))",
                      }}
                      animate={
                        reducedMotion
                          ? { opacity: 1 }
                          : { opacity: [1, 1, 0, 0] }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 1.1,
                              repeat: Infinity,
                              times: [0, 0.45, 0.5, 0.95],
                            }
                      }
                    >
                      _
                    </motion.span>
                  </span>
                  {/* Patch tone descriptor */}
                  <span
                    className="font-synth relative z-10 text-[7px] tracking-[0.2em] text-moog-amber-light/45 md:text-[8px]"
                    style={{
                      textShadow: "0 0 4px hsl(var(--moog-amber) / 0.15)",
                    }}
                  >
                    {learnMode ? "BASSLINE TRAINER" : patch.tone}
                  </span>
                </div>
                {/* Patch position dots — amber LEDs */}
                <div
                  className="flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Select patch"
                >
                  {PATCHES.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === patchIndex}
                      aria-label={`Go to ${p.label}`}
                      title={`Go to ${p.label}`}
                      onClick={() => handleDotClick(i)}
                      className="flex h-6 w-6 min-h-[44px] min-w-[44px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1814] rounded-full"
                    >
                      <div
                        className="rounded-full transition-all duration-200"
                        style={{
                          width: i === patchIndex ? 7 : 5,
                          height: i === patchIndex ? 7 : 5,
                          background:
                            i === patchIndex
                              ? "hsl(var(--moog-amber))"
                              : "hsl(var(--moog-amber) / 0.18)",
                          boxShadow:
                            i === patchIndex
                              ? "0 0 5px hsl(var(--moog-amber)), 0 0 10px hsl(var(--moog-amber) / 0.4)"
                              : "none",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div
                className="flex flex-col items-center gap-0.5"
                data-tour="nav-end"
              >
                <MoogLEDButton
                  onClick={handleNextPatch}
                  label="NEXT"
                  aria-label="Next patch"
                />
              </div>

              <div className="flex gap-4 md:gap-5" data-tour="knobs">
                <ControlKnob
                  label="BRIGHT"
                  value={brightness}
                  onChange={setBrightness}
                />
                <ControlKnob
                  label="REVERB"
                  value={reverb}
                  onChange={(v) => {
                    setReverb(v);
                    setGlobalReverb(v);
                  }}
                />
              </div>
            </div>

            {/* Synth engine strip — oscillators, filter, octave */}
            <SynthEngineStrip
              octave={octave}
              onOctaveDown={() => setOctave((o) => Math.max(-2, o - 1))}
              onOctaveUp={() => setOctave((o) => Math.min(2, o + 1))}
              osc1Wave={osc1Wave}
              onOsc1Wave={(w: WaveformType) => {
                setOsc1Wave(w);
                syncSynthParams({ osc1Wave: w });
              }}
              osc2Wave={osc2Wave}
              onOsc2Wave={(w: WaveformType) => {
                setOsc2Wave(w);
                syncSynthParams({ osc2Wave: w });
              }}
              detune={detune}
              onDetune={(v: number) => {
                setDetune(v);
                syncSynthParams({ detune: v });
              }}
              cutoff={cutoff}
              onCutoff={(v: number) => {
                setCutoff(v);
                syncSynthParams({ cutoff: v });
              }}
              resonance={resonance}
              onResonance={(v: number) => {
                setResonance(v);
                syncSynthParams({ resonance: v });
              }}
            />

            {/* Main content — backlit projection / embedded screen in faceplate */}
            <div
              ref={screenContentRef}
              className="relative flex-1 min-h-0 overflow-hidden rounded-b"
              style={{
                boxShadow:
                  "inset 0 8px 32px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(0,0,0,0.5)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={crtKey}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.15 }}
                  className={cn(
                    "h-full overflow-hidden",
                    crtKey > 0 && "moog-crt-flicker",
                  )}
                  style={{
                    filter: `brightness(${0.7 + brightness * 0.6})`,
                  }}
                >
                  <div className="h-full [&_.container]:max-w-none">
                    <PatchContent
                      carousel={carousel}
                      onContactClick={handleContactClick}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Learn Mode OSD HUD Overlay */}
              <AnimatePresence>
                {learnMode && (
                  <motion.div
                    key="learn-osd"
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: reducedMotion ? 0 : 0.3,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex justify-center"
                    style={{ filter: `brightness(${0.7 + brightness * 0.6})` }}
                  >
                    <div className="pointer-events-auto shadow-2xl">
                      <LearnScreen
                        basslines={BASSLINES}
                        selectedIdx={selectedSongIdx}
                        onSelect={(i) => {
                          setSelectedSongIdx(i);
                          setLearnStep(0);
                          stopDemo();
                        }}
                        step={learnStep}
                        totalSteps={currentBassline.steps.length}
                        demoPlaying={demoPlaying}
                        onDemo={runDemo}
                        onStopDemo={stopDemo}
                        onExit={() => {
                          setLearnMode(false);
                          setLearnStep(0);
                          stopDemo();
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phosphor screen vignette — warm amber falloff toward edges, like a CRT display */}
              <div
                className="pointer-events-none absolute inset-0 rounded-b"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(12,8,4,0.55) 85%, rgba(6,4,2,0.8) 100%)",
                  mixBlendMode: "multiply",
                }}
                aria-hidden
              />
              {/* Amber edge warmth — faint glow around screen perimeter, like phosphor bleed */}
              <div
                className="pointer-events-none absolute inset-0 rounded-b"
                style={{
                  boxShadow:
                    "inset 0 0 40px hsl(var(--moog-amber) / 0.05), inset 0 0 80px hsl(var(--moog-amber) / 0.03)",
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard hint — shown on first visit, dismissed on first key press */}
      <KeyboardHint
        visible={keyboardHintVisible && !keyboardSeen}
        onDismiss={dismissKeyboardHint}
        reducedMotion={!!reducedMotion}
      />

      {/* Note name HUD — shows above keyboard while a key is held */}
      <AnimatePresence>
        {activeNoteLabel && (
          <motion.div
            key={activeNoteLabel}
            className="pointer-events-none absolute bottom-[28vh] left-1/2 z-30 -translate-x-1/2"
            initial={reducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.1 }}
          >
            <span
              className="font-synth rounded border border-moog-amber/40 bg-black/70 px-2 py-0.5 text-sm tracking-widest text-moog-amber-light shadow backdrop-blur-sm"
              style={{ textShadow: "0 0 8px hsl(var(--moog-amber) / 0.6)" }}
            >
              {activeNoteLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard row — wheels on the left, keys fill remaining width */}
      <div
        className="flex shrink-0 w-full"
        style={{ height: "28vh", minHeight: 160 }}
      >
        <WheelBlock />
        <PianoKeyboard
          activeKeys={activeKeys}
          highlightKeys={highlightKeys}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onFirstHover={
            !keyboardSeen ? () => setKeyboardHintVisible(true) : undefined
          }
          reducedMotion={!!reducedMotion}
        />
      </div>

      {/* Guided onboarding tour */}
      <SynthTour />
    </motion.div>
  );
}

/* ---- Control Knob (Potentiometer) ---- */
function ControlKnob({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const knobRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const startY = React.useRef(0);
  const startValue = React.useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
    startValue.current = value;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dy = startY.current - e.clientY;
    const delta = dy / 150;
    const next = Math.max(0, Math.min(1, startValue.current + delta));
    onChange(next);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const rotation = -135 + value * 270;

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-synth text-[10px] font-medium uppercase tracking-wider text-moog-silkscreen/80">
        {label}
      </span>
      <div
        ref={knobRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-label={`${label} control`}
        title={`Drag to adjust ${label}`}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault();
            onChange(Math.min(1, value + 0.05));
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault();
            onChange(Math.max(0, value - 0.05));
          }
        }}
        className="relative flex h-11 w-11 min-h-[44px] min-w-[44px] cursor-n-resize items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1814]"
        style={{
          background: "conic-gradient(from 0deg, #333, #666, #333, #111, #333)",
          boxShadow:
            "inset 0 2px 4px rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5)",
          border: "1px solid #2a2a2a",
        }}
      >
        {/* White indicator dot at edge — rotates with value */}
        <div
          className="absolute inset-0 flex items-start justify-center pt-0.5"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div
            className="h-1.5 w-1.5 rounded-full bg-moog-amber-light"
            style={{ boxShadow: "0 0 4px hsl(var(--moog-amber) / 0.8)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---- Waveform Selector — horizontal row of ON/OFF caps (one active, rest dark) ---- */
const WAVEFORMS: WaveformType[] = ["sawtooth", "square", "triangle"];
const WAVE_LABELS: Record<WaveformType, string> = {
  sawtooth: "SAW",
  square: "SQR",
  triangle: "TRI",
};

/* Single-label cap button: active = amber glow, inactive = dark. For radio-style waveform row. */
function WaveformCap({
  label,
  active,
  onClick,
  "aria-label": ariaLabel,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      aria-pressed={active}
      className="waveform-cap group relative flex h-11 min-w-[44px] cursor-pointer items-center justify-center overflow-hidden rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1814] transition-[background,box-shadow,border-color,transform] duration-150 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
      style={{
        width: 44,
        background: active
          ? "linear-gradient(180deg, #c85a00 0%, #8a3a00 50%, #6a2c00 100%)"
          : "#0e0c0a",
        border: active ? "1px solid #6a2c00" : "1px solid #080604",
        boxShadow: active
          ? "inset 0 2px 4px rgba(0,0,0,0.6), 0 0 10px hsl(var(--moog-amber) / 0.5), 0 0 20px hsl(var(--moog-amber) / 0.2)"
          : "inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="font-synth text-[10px] uppercase tracking-widest transition-[color,text-shadow] duration-150 ease-out motion-reduce:transition-none"
        style={{
          color: active
            ? "hsl(var(--moog-silkscreen))"
            : "hsl(var(--moog-silkscreen) / 0.4)",
          textShadow: active ? "0 0 6px hsl(var(--moog-amber) / 0.8)" : "none",
        }}
      >
        {label}
      </span>
      {/* Hover feedback: subtle lightening without changing gradient */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[3px] bg-white/0 transition-colors duration-150 ease-out group-hover:bg-white/10 motion-reduce:transition-none"
      />
    </button>
  );
}

function WaveformSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: WaveformType;
  onChange: (w: WaveformType) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-synth text-[7px] uppercase tracking-widest"
        style={{ color: "hsl(var(--moog-silkscreen) / 0.7)" }}
      >
        {label}
      </span>
      <div
        className="flex flex-row flex-nowrap items-center justify-center gap-1.5"
        role="radiogroup"
        aria-label={`${label} waveform`}
      >
        {WAVEFORMS.map((w) => (
          <WaveformCap
            key={w}
            label={WAVE_LABELS[w]}
            active={w === value}
            onClick={() => onChange(w)}
            aria-label={`${label} ${WAVE_LABELS[w]}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---- SynthEngineStrip — OSC 1, OSC 2 + Detune, Filter section ---- */
function SynthEngineStrip({
  octave,
  onOctaveDown,
  onOctaveUp,
  osc1Wave,
  onOsc1Wave,
  osc2Wave,
  onOsc2Wave,
  detune,
  onDetune,
  cutoff,
  onCutoff,
  resonance,
  onResonance,
}: {
  octave: number;
  onOctaveDown: () => void;
  onOctaveUp: () => void;
  osc1Wave: WaveformType;
  onOsc1Wave: (w: WaveformType) => void;
  osc2Wave: WaveformType;
  onOsc2Wave: (w: WaveformType) => void;
  detune: number;
  onDetune: (v: number) => void;
  cutoff: number;
  onCutoff: (v: number) => void;
  resonance: number;
  onResonance: (v: number) => void;
}) {
  return (
    <div
      className="flex shrink-0 flex-nowrap items-center justify-center gap-0 border-b border-stone-700/40 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        background: "linear-gradient(180deg, #181512 0%, #141210 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        minHeight: 64,
      }}
    >
      {/* OCTAVE section */}
      <SynthSection label="OCTAVE">
        <div className="flex items-center gap-1.5">
          <MoogLEDButton
            label="OCT−"
            onClick={onOctaveDown}
            aria-label="Octave down"
          />
          <span
            className="font-synth text-sm w-6 text-center tabular-nums"
            style={{
              color: "hsl(var(--moog-amber))",
              textShadow: "0 0 6px hsl(var(--moog-amber) / 0.6)",
            }}
          >
            {octave > 0 ? `+${octave}` : octave}
          </span>
          <MoogLEDButton
            label="OCT+"
            onClick={onOctaveUp}
            aria-label="Octave up"
          />
        </div>
      </SynthSection>

      <StripDivider />

      {/* OSC 1 section */}
      <SynthSection label="OSC 1">
        <WaveformSelector label="WAVE" value={osc1Wave} onChange={onOsc1Wave} />
      </SynthSection>

      <StripDivider />

      {/* OSC 2 section */}
      <SynthSection label="OSC 2">
        <div className="flex items-center gap-3">
          <WaveformSelector
            label="WAVE"
            value={osc2Wave}
            onChange={onOsc2Wave}
          />
          <ControlKnob label="DETUNE" value={detune} onChange={onDetune} />
        </div>
      </SynthSection>

      <StripDivider />

      {/* FILTER section */}
      <SynthSection label="FILTER · LPF">
        <div className="flex items-center gap-3">
          <ControlKnob label="CUTOFF" value={cutoff} onChange={onCutoff} />
          <ControlKnob label="RESON" value={resonance} onChange={onResonance} />
        </div>
      </SynthSection>
    </div>
  );
}

function SynthSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-4 py-2">
      <span
        className="font-synth text-[7px] uppercase tracking-[0.2em]"
        style={{ color: "hsl(var(--moog-silkscreen) / 0.5)" }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function StripDivider() {
  return (
    <div
      className="self-stretch shrink-0"
      style={{
        width: 1,
        background:
          "linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent)",
      }}
    />
  );
}

/* ---- Keyboard hint — shown on first visit until dismissed ---- */
function KeyboardHint({
  visible,
  onDismiss,
  reducedMotion = false,
}: {
  visible: boolean;
  onDismiss: () => void;
  reducedMotion?: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="absolute bottom-[30vh] left-1/2 z-30 -translate-x-1/2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1814]"
          initial={reducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
          onClick={onDismiss}
          aria-label="Dismiss keyboard hint — press any key to play"
        >
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            <span
              className="font-synth text-[10px] uppercase tracking-widest"
              style={{ color: "rgba(200,185,154,0.8)" }}
            >
              Type like a keyboard piano
            </span>
            <kbd className="rounded border border-moog-amber/30 bg-black/50 px-1 py-0.5 font-synth text-[9px] text-moog-amber-light">
              A–K
            </kbd>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ---- Phillips screw head — reused in WheelBlock corners ---- */
function PhillipsScrew({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "radial-gradient(circle at 36% 30%, #5a5650, #28241e)",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)",
        ...style,
      }}
    >
      {/* Cross slot */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: 1,
            background: "rgba(0,0,0,0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 1,
            height: "60%",
            background: "rgba(0,0,0,0.7)",
          }}
        />
      </div>
    </div>
  );
}

/* ---- LED position track — 7 segments, active segment glows amber ---- */
function LedTrack({
  trackRef,
}: {
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  const SEGS = 7;
  return (
    <div
      ref={trackRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        height: "100%",
      }}
    >
      {Array.from({ length: SEGS }).map((_, i) => (
        <div
          key={i}
          data-seg={i}
          style={{
            width: 4,
            height: 6,
            borderRadius: 1,
            background: i === Math.floor(SEGS / 2) ? "#c8702a" : "#2a1a08",
            boxShadow:
              i === Math.floor(SEGS / 2)
                ? "0 0 4px #c8702a, 0 0 8px rgba(200,112,42,0.6)"
                : "none",
            transition: "background 0.06s, box-shadow 0.06s",
          }}
        />
      ))}
    </div>
  );
}

/* ---- Pitch & Mod Wheels ---- */
function WheelBlock() {
  const pitchCylRef = React.useRef<HTMLDivElement>(null);
  const modCylRef = React.useRef<HTMLDivElement>(null);
  const pitchLedRef = React.useRef<HTMLDivElement>(null);
  const modLedRef = React.useRef<HTMLDivElement>(null);

  const SEGS = 7;

  /** Update the LED track to highlight the segment closest to current wheel position */
  function updateLed(
    ledTrack: HTMLDivElement,
    topPx: number,
    housingH: number,
    cylH: number,
  ) {
    const minTop = 4,
      maxTop = housingH - cylH - 4;
    const ratio = 1 - (topPx - minTop) / Math.max(1, maxTop - minTop); // 0=bottom, 1=top
    const activeSeg = Math.round(ratio * (SEGS - 1));
    ledTrack.querySelectorAll<HTMLDivElement>("[data-seg]").forEach((el) => {
      const seg = parseInt(el.dataset.seg ?? "0", 10);
      const on = seg === activeSeg;
      el.style.background = on ? "#c8702a" : "#2a1a08";
      el.style.boxShadow = on
        ? "0 0 4px #c8702a, 0 0 8px rgba(200,112,42,0.6)"
        : "none";
    });
  }

  function makeWheelHandler(
    cylinderRef: React.RefObject<HTMLDivElement | null>,
    ledRef: React.RefObject<HTMLDivElement | null>,
    snapsBack: boolean,
  ) {
    return function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
      const housing = e.currentTarget;
      if (!cylinderRef.current) return;
      const cyl = cylinderRef.current;
      e.preventDefault();
      housing.setPointerCapture(e.pointerId);

      const housingH = housing.clientHeight;
      const cylH = cyl.clientHeight;
      const minTop = 4;
      const maxTop = housingH - cylH - 4;
      const centerTop = Math.round((housingH - cylH) / 2);
      let startY = e.clientY;
      let startTop = cyl.offsetTop;

      function onMove(ev: PointerEvent) {
        const next = Math.min(
          maxTop,
          Math.max(minTop, startTop + ev.clientY - startY),
        );
        cyl.style.top = next + "px";
        if (ledRef.current) updateLed(ledRef.current, next, housingH, cylH);
      }
      function onUp() {
        if (snapsBack) {
          cyl.style.transition = "top 0.2s ease";
          cyl.style.top = centerTop + "px";
          if (ledRef.current)
            updateLed(ledRef.current, centerTop, housingH, cylH);
          setTimeout(() => {
            cyl.style.transition = "top 0.05s ease";
          }, 220);
        }
        housing.removeEventListener("pointermove", onMove);
        housing.removeEventListener("pointerup", onUp);
      }
      housing.addEventListener("pointermove", onMove);
      housing.addEventListener("pointerup", onUp);
    };
  }

  return (
    <div
      className="relative flex shrink-0 flex-col"
      style={{
        width: 100,
        background:
          "linear-gradient(180deg, #181614 0%, #111008 60%, #0c0a07 100%)",
        borderRight: "1px solid #0a0806",
        boxShadow:
          "inset -4px 0 16px rgba(0,0,0,0.7), inset 0 6px 20px rgba(0,0,0,0.6)",
      }}
    >
      {/* Phillips screws — four corners */}
      <PhillipsScrew style={{ top: 5, left: 5 }} />
      <PhillipsScrew style={{ top: 5, right: 5 }} />
      <PhillipsScrew style={{ bottom: 18, left: 5 }} />
      <PhillipsScrew style={{ bottom: 18, right: 5 }} />

      {/* Bottom-left brushed corner accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 18,
          height: 18,
          background:
            "linear-gradient(135deg, #2a2620 0%, #1a1612 50%, transparent 100%)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}
      />

      {/* Wheels row — fills height minus label strip */}
      <div
        className="flex flex-1 items-center justify-center gap-3"
        style={{ padding: "14px 10px 8px" }}
      >
        {/* PITCH: LED track left · cutout · */}
        <div className="flex items-center gap-1.5" style={{ height: "100%" }}>
          <LedTrack trackRef={pitchLedRef} />
          {/* Cutout housing */}
          <div
            style={{
              width: 28,
              height: "78%",
              borderRadius: 4,
              background: "#050505",
              boxShadow:
                "inset 0px 15px 20px rgba(0,0,0,0.9), inset 0px -5px 10px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.08)",
              border: "1px solid #1a1a1a",
              borderBottom: "1px solid #2a2a2a",
              position: "relative",
              overflow: "hidden",
              cursor: "ns-resize",
            }}
            onPointerDown={makeWheelHandler(pitchCylRef, pitchLedRef, true)}
          >
            {/* Pitch-neutral center mark */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 1,
                background: "rgba(200,112,42,0.45)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
            {/* Wheel cylinder */}
            <div
              ref={pitchCylRef}
              style={{
                position: "absolute",
                left: 1,
                right: 1,
                top: "calc(50% - 30%)",
                height: "60%",
                borderRadius: 3,
                background:
                  "linear-gradient(to bottom, #111 0%, #333 15%, #888 35%, #999 40%, #222 60%, #0a0a0a 100%)",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.9), 0 -2px 6px rgba(0,0,0,0.6)",
                transition: "top 0.05s ease",
                overflow: "hidden",
              }}
            >
              {/* Texture overlay — horizontal ridges wrapping the 3D gradient */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(180deg, transparent 0px, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px, transparent 4px, transparent 5px, rgba(255,255,255,0.05) 5px, rgba(255,255,255,0.05) 6px)",
                  borderRadius: 3,
                  pointerEvents: "none",
                }}
              />
              {/* Center groove — vertical dark strip, no ridges */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "42%",
                  width: "16%",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.1) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* MOD: cutout · LED track right */}
        <div className="flex items-center gap-1.5" style={{ height: "100%" }}>
          {/* Cutout housing */}
          <div
            style={{
              width: 28,
              height: "78%",
              borderRadius: 4,
              background: "#050505",
              boxShadow:
                "inset 0px 15px 20px rgba(0,0,0,0.9), inset 0px -5px 10px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.08)",
              border: "1px solid #1a1a1a",
              borderBottom: "1px solid #2a2a2a",
              position: "relative",
              overflow: "hidden",
              cursor: "ns-resize",
            }}
            onPointerDown={makeWheelHandler(modCylRef, modLedRef, false)}
          >
            <div
              ref={modCylRef}
              style={{
                position: "absolute",
                left: 1,
                right: 1,
                top: "calc(50% - 30%)",
                height: "60%",
                borderRadius: 3,
                background:
                  "linear-gradient(to bottom, #111 0%, #333 15%, #888 35%, #999 40%, #222 60%, #0a0a0a 100%)",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.9), 0 -2px 6px rgba(0,0,0,0.6)",
                transition: "top 0.05s ease",
                overflow: "hidden",
              }}
            >
              {/* Texture overlay */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "repeating-linear-gradient(180deg, transparent 0px, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px, transparent 4px, transparent 5px, rgba(255,255,255,0.05) 5px, rgba(255,255,255,0.05) 6px)",
                  borderRadius: 3,
                  pointerEvents: "none",
                }}
              />
              {/* Center groove */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "42%",
                  width: "16%",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.1) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
          <LedTrack trackRef={modLedRef} />
        </div>
      </div>

      {/* Label strip */}
      <div
        className="flex shrink-0"
        style={{
          height: 18,
          paddingBottom: 2,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span
          style={{
            fontSize: 7,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a7248",
            fontFamily: "'Courier New', monospace",
          }}
        >
          PITCH
        </span>
        <span
          style={{
            fontSize: 7,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a7248",
            fontFamily: "'Courier New', monospace",
          }}
        >
          MOD
        </span>
      </div>
    </div>
  );
}

/* ---- Piano Keyboard —— professional instrument, full width, 25–30% height ---- */
function PianoKeyboard({
  activeKeys,
  highlightKeys,
  onKeyDown,
  onKeyUp,
  onFirstHover,
  reducedMotion = false,
}: {
  activeKeys: Set<number>;
  highlightKeys?: Set<number>;
  onKeyDown: (idx: number) => void;
  onKeyUp: (idx: number) => void;
  onFirstHover?: () => void;
  reducedMotion?: boolean;
}) {
  const keyMap = React.useMemo(() => {
    const map: Record<string, number> = {};
    const base = "awsedftgyhujkolp;'";
    base.split("").forEach((c, i) => {
      if (i < PIANO_NOTES.length) map[c] = i;
    });
    const shifted = 'AWSEDFTGYHUJKOLP:"';
    shifted.split("").forEach((c, i) => {
      if (i < PIANO_NOTES.length) map[c] = i;
    });
    return map;
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const idx = keyMap[e.key];
      if (idx != null) {
        e.preventDefault();
        onKeyDown(idx);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      const idx = keyMap[e.key];
      if (idx != null) {
        e.preventDefault();
        onKeyUp(idx);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyMap, onKeyDown, onKeyUp]);

  return (
    <div
      data-tour="keyboard"
      className="moog-wood moog-keybed flex flex-col flex-1 min-w-0"
      onMouseEnter={onFirstHover}
    >
      {/* Key-stop shadow where keys meet faceplate */}
      <div
        className="h-1 shrink-0 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)",
        }}
      />
      {/* Keys container — position relative, flex row, 14 white keys flex:1 */}
      <div className="relative flex flex-1 w-full flex-row">
        {/* White keys — flex: 1 for even distribution */}
        {WHITE_KEYS.map((idx) => (
          <PianoKey
            key={`w-${idx}`}
            idx={idx}
            isBlack={false}
            isActive={activeKeys.has(idx)}
            isHighlighted={highlightKeys?.has(idx) ?? false}
            onPointerDown={() => onKeyDown(idx)}
            onPointerUp={() => onKeyUp(idx)}
            style={{ flex: 1 }}
            reducedMotion={reducedMotion}
          />
        ))}
        {/* Black keys — position absolute, width calc(100%/24), over seams */}
        {BLACK_KEY_POSITIONS.map(({ idx, leftPercent }) => (
          <div
            key={`b-${idx}`}
            className="absolute top-0 h-[60%] pointer-events-auto z-[10]"
            style={{
              left: `${leftPercent}%`,
              width: "calc(100% / 24)",
            }}
          >
            <PianoKey
              idx={idx}
              isBlack
              isActive={activeKeys.has(idx)}
              isHighlighted={highlightKeys?.has(idx) ?? false}
              onPointerDown={() => onKeyDown(idx)}
              onPointerUp={() => onKeyUp(idx)}
              style={{ width: "100%", height: "100%" }}
              reducedMotion={reducedMotion}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PianoKey({
  idx,
  isBlack,
  isActive,
  isHighlighted = false,
  onPointerDown,
  onPointerUp,
  style: styleProp,
  reducedMotion = false,
}: {
  idx?: number;
  isBlack: boolean;
  isActive: boolean;
  isHighlighted?: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  style?: React.CSSProperties;
  reducedMotion?: boolean;
}) {
  const noteLabel =
    idx != null && idx < PIANO_NOTES.length ? PIANO_NOTES[idx] : "piano key";
  return (
    <motion.button
      type="button"
      aria-label={`Play note ${noteLabel}`}
      onPointerDown={(e) => {
        e.preventDefault();
        onPointerDown();
      }}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className={cn(
        "relative min-w-0 shrink-0 last:border-r-0 overflow-visible",
        isBlack
          ? "z-[10] moog-black-key rounded-bl-md rounded-br-md"
          : "z-0 moog-white-key rounded-b-[4px]",
      )}
      style={{
        ...styleProp,
        transformOrigin: "top",
        background: isBlack
          ? "linear-gradient(180deg, #2a2a2a 0%, #111 50%, #000 100%)"
          : "linear-gradient(180deg, #f5ede0 0%, #e8dace 60%, #ddd0bc 100%)",
        borderRight: isBlack ? undefined : "1px solid #d1d5db",
        boxShadow: isBlack
          ? "4px 6px 10px rgba(0,0,0,0.7), inset 1px 1px 2px rgba(255,255,255,0.2)"
          : "inset 0 2px 0 rgba(255,255,255,0.8), 0 2px 0 rgba(0,0,0,0.06)",
      }}
      whileTap={
        isBlack
          ? { scaleY: 0.98 }
          : { y: 4, borderBottomWidth: "2px", borderBottomColor: "#b0b0b0" }
      }
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {/* Key-stop shadow at top where key meets faceplate */}
      <div
        className="absolute left-0 right-0 top-0 h-1 pointer-events-none"
        style={{
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15)",
        }}
      />
      {/* Amber glow on key when active */}
      <motion.div
        className="absolute inset-0 rounded-b-[4px] pointer-events-none"
        initial={false}
        animate={{
          boxShadow: isActive
            ? "inset 0 -8px 24px rgba(232,101,10,0.35)"
            : "none",
        }}
      />
      {/* Cyan highlight — pulses to show next key in learn mode (static when reduced motion) */}
      <motion.div
        className="absolute inset-0 rounded-b-[4px] pointer-events-none"
        initial={false}
        animate={{
          boxShadow: isHighlighted
            ? reducedMotion
              ? "inset 0 -10px 28px rgba(34,211,238,0.5)"
              : [
                  "inset 0 -10px 28px rgba(34,211,238,0.5)",
                  "inset 0 -10px 28px rgba(34,211,238,0.2)",
                  "inset 0 -10px 28px rgba(34,211,238,0.5)",
                ]
            : "none",
        }}
        transition={
          isHighlighted
            ? reducedMotion
              ? { duration: 0 }
              : { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.15 }
        }
      />
      {/* Amber light bleed — spills upward onto wood/metal when active */}
      {isActive && (
        <div
          className="absolute left-0 right-0 -top-4 h-6 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(232,101,10,0.15) 40%, rgba(232,101,10,0.06) 100%)",
            boxShadow: "0 -4px 16px rgba(232,101,10,0.2)",
          }}
        />
      )}
    </motion.button>
  );
}

/* ---- Learn Screen — rendered inside the CRT area when learn mode is active ---- */
function LearnScreen({
  basslines,
  selectedIdx,
  onSelect,
  step,
  totalSteps,
  demoPlaying,
  onDemo,
  onStopDemo,
  onExit,
}: {
  basslines: Bassline[];
  selectedIdx: number;
  onSelect: (i: number) => void;
  step: number;
  totalSteps: number;
  demoPlaying: boolean;
  onDemo: () => void;
  onStopDemo: () => void;
  onExit: () => void;
}) {
  const stepInLoop = step % totalSteps;
  const loopsDone = Math.floor(step / totalSteps);

  return (
    <div
      className="flex flex-row items-center justify-between gap-4 px-4 py-3 font-synth select-none rounded backdrop-blur-md"
      style={{
        background: "rgba(10, 8, 5, 0.8)",
        border: "1px solid rgba(255, 140, 32, 0.2)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center gap-4 border-r border-white/5 pr-4">
        <select
          value={selectedIdx}
          onChange={(e) => onSelect(Number(e.target.value))}
          className="font-synth text-[9px] uppercase tracking-widest rounded px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-black cursor-pointer"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,140,32,0.3)",
            color: "hsl(var(--moog-amber))",
            textShadow: "0 0 6px hsl(var(--moog-amber) / 0.5)",
          }}
          aria-label="Select bassline"
        >
          {basslines.map((b, i) => (
            <option key={b.id} value={i}>
              {b.label}
            </option>
          ))}
        </select>

        {/* Step dots */}
        <div
          className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full border border-white/5"
          aria-label={`Step ${stepInLoop + 1} of ${totalSteps}`}
        >
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-150"
              style={{
                width: i === stepInLoop ? 7 : 4,
                height: i === stepInLoop ? 7 : 4,
                background:
                  i < stepInLoop
                    ? "hsl(var(--moog-amber) / 0.5)"
                    : i === stepInLoop
                      ? "hsl(var(--moog-amber))"
                      : "hsl(var(--moog-amber) / 0.12)",
                boxShadow:
                  i === stepInLoop
                    ? "0 0 6px hsl(var(--moog-amber)), 0 0 12px hsl(var(--moog-amber) / 0.4)"
                    : "none",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 justify-center min-w-[140px]">
        {/* Instruction */}
        <span
          className="text-[9px] tracking-[0.15em] whitespace-nowrap"
          style={{ color: "hsl(var(--moog-silkscreen) / 0.8)" }}
        >
          {demoPlaying ? "LISTENING…" : "PRESS THE GLOWING KEY"}
        </span>

        {/* Loops badge — only rendered when loops have been completed */}
        <AnimatePresence mode="popLayout">
          {loopsDone > 0 && (
            <motion.span
              key={`loop-${loopsDone}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="block text-[8px] tracking-widest whitespace-nowrap font-bold"
              style={{
                color: "hsl(var(--moog-amber))",
                textShadow: "0 0 8px hsl(var(--moog-amber)/0.5)",
              }}
            >
              ×{loopsDone} LOOPS COMPLETE!
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 pl-4 border-l border-white/5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={demoPlaying ? onStopDemo : onDemo}
          className="font-synth text-[8px] uppercase tracking-widest rounded px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-black"
          style={{
            background: demoPlaying
              ? "rgba(232,101,10,0.2)"
              : "rgba(0,0,0,0.6)",
            border: demoPlaying
              ? "1px solid rgba(232,101,10,0.5)"
              : "1px solid rgba(255,255,255,0.1)",
            color: demoPlaying
              ? "hsl(var(--moog-amber))"
              : "hsl(var(--moog-silkscreen) / 0.7)",
            textShadow: demoPlaying
              ? "0 0 6px hsl(var(--moog-amber) / 0.5)"
              : "none",
          }}
          aria-label={demoPlaying ? "Stop demo" : "Play demo"}
        >
          {demoPlaying ? "■ STOP" : "▶ DEMO"}
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={onExit}
          className="group font-synth text-[8px] uppercase tracking-widest rounded px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moog-amber focus-visible:ring-offset-1 focus-visible:ring-offset-black transition-colors hover:border-[rgba(255,140,32,0.3)] hover:text-[hsl(var(--moog-silkscreen)/0.9)]"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "hsl(var(--moog-silkscreen) / 0.7)",
          }}
          aria-label="Exit learn mode"
          title="Exit learn mode"
        >
          ✕ EXIT
        </motion.button>
      </div>
    </div>
  );
}
