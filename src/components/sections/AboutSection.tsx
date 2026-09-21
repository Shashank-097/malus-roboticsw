"use client";

import { useCallback, useEffect, useRef, useState, type ReactElement } from "react";

/* =========================================
   TYPES + CONTENT

   Every clip has a main "camera" view (src). Add extra sensor views with
   `views`. They must have the same duration and frame rate as the camera
   export so they stay in sync when the viewer switches.

   Put files in /public/sims, e.g.
     arm-pick-place.mp4          (camera)
     arm-pick-place-depth.mp4    (depth)
========================================= */

type Metric = { label: string; value: number; unit?: string; decimals?: number };

/** id "depth" | "lidar" | "torque" get built-in icons; any other id works too. */
export type SimView = { id: string; label: string; src: string };

export type SimClip = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster?: string;
  tags: string[];
  metrics: Metric[];
  views?: SimView[];
};

const DEFAULT_CLIPS: SimClip[] = [
  {
    id: "arm-pick-place",
    title: "Six-axis arm: bin pic",
    description:
      "A manipulator sorts randomly placed parts, trained entirely in simulation before it touches real hardware.",
    src: "/sims/simulation1.mp4",
    poster: "/sims/posters/arm-pick-place.jpg",
    tags: ["Manipulation", "Reinforcement learning"],
    metrics: [
      { label: "Parallel envs", value: 2048 },
      { label: "Success rate", value: 97.8, unit: "%", decimals: 1 },
      { label: "Sim speed", value: 24, unit: "×" },
    ],
    views: [
      { id: "depth", label: "Depth", src: "/sims/arm-pick-place-depth.mp4" },
      { id: "torque", label: "Torque", src: "/sims/arm-pick-place-torque.mp4" },
    ],
  },
  {
    id: "quadruped-terrain",
    title: "Quadruped on broken terrain",
    description:
      "Legged locomotion across stairs, rubble and slopes, with thousands of robots training in parallel.",
    src: "/sims/simulation2.mp4",
    poster: "/sims/posters/HD Logo.png",
    tags: ["Locomotion", "Sim-to-real"],
    metrics: [
      { label: "Parallel envs", value: 4096 },
      { label: "Terrain types", value: 12 },
      { label: "Fall rate", value: 0.8, unit: "%", decimals: 1 },
    ],
    views: [
      { id: "depth", label: "Depth", src: "/sims/quadruped-terrain-depth.mp4" },
      { id: "lidar", label: "LiDAR", src: "/sims/quadruped-terrain-lidar.mp4" },
      { id: "torque", label: "Torque", src: "/sims/quadruped-terrain-torque.mp4" },
    ],
  },
  {
    id: "warehouse-fleet",
    title: "Warehouse fleet routing",
    description:
      "Forty autonomous carts share one floor without a central planner, stress-tested at peak load.",
    src: "/sims/simulation3.mp4",
    poster: "/sims/posters/HD Logo.png",
    tags: ["Multi-robot", "Path planning"],
    metrics: [
      { label: "Robots", value: 40 },
      { label: "Collisions", value: 0 },
      { label: "Throughput gain", value: 31, unit: "%" },
    ],
    views: [{ id: "lidar", label: "LiDAR", src: "/sims/warehouse-fleet-lidar.mp4" }],
  },
  {
    id: "drone-inspection",
    title: "Drone inspection run",
    description:
      "An aerial robot scans a wind turbine blade and holds a fixed distance in gusty conditions.",
    src: "/sims/drone-inspection.mp4",
    poster: "/sims/posters/HD Logo.png",
    tags: ["Aerial", "Perception"],
    metrics: [
      { label: "Wind gusts", value: 14, unit: "m/s" },
      { label: "Hold error", value: 3.2, unit: "cm", decimals: 1 },
      { label: "Coverage", value: 100, unit: "%" },
    ],
    views: [
      { id: "depth", label: "Depth", src: "/sims/drone-inspection-depth.mp4" },
      { id: "lidar", label: "LiDAR", src: "/sims/drone-inspection-lidar.mp4" },
    ],
  },
  {
    id: "humanoid-balance",
    title: "Humanoid balance recovery",
    description:
      "A biped recovers from shoves in every direction, tuned across thousands of randomized pushes.",
    src: "/sims/humanoid-balance.mp4",
    poster: "/sims/posters/HD Logo.png",
    tags: ["Humanoid", "Control"],
    metrics: [
      { label: "Random pushes", value: 8000 },
      { label: "Recovery", value: 96.4, unit: "%", decimals: 1 },
      { label: "Reaction time", value: 120, unit: "ms" },
    ],
    views: [{ id: "torque", label: "Torque", src: "/sims/humanoid-balance-torque.mp4" }],
  },
];

const viewsOf = (c: SimClip): SimView[] => [
  { id: "camera", label: "Camera", src: c.src },
  ...(c.views ?? []),
];
const resolveView = (c: SimClip, selected: string) =>
  viewsOf(c).some((v) => v.id === selected) ? selected : "camera";

/* =========================================
   SMALL HOOKS / PIECES
========================================= */

const GLYPHS = "01<>/\\[]{}=+*#%";

/** Decodes text from noise into the real string. */
function useScramble(text: string, disabled: boolean) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (disabled) {
      setOut(text);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 800;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const reveal = Math.floor(t * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        s += ch === " " || i < reveal ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, disabled]);
  return out;
}

/** Number that counts up whenever it mounts / value changes. */
function CountUp({ value, decimals = 0, disabled }: { value: number; decimals?: number; disabled: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) =>
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (disabled) {
      el.textContent = fmt(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = fmt(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, decimals, disabled]);
  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

const fmtTime = (s: number) => {
  if (!isFinite(s) || s < 0) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const Icon = {
  Prev: () => (
    <svg {...svgProps} className="h-6 w-6">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  ),
  Next: () => (
    <svg {...svgProps} className="h-6 w-6">
      <path d="M9 5l7 7-7 7" />
    </svg>
  ),
};

const VIEW_ICONS: Record<string, ReactElement> = {
  camera: (
    <svg {...svgProps} className="h-4 w-4">
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  ),
  depth: (
    <svg {...svgProps} className="h-4 w-4">
      <path d="M12 4l8 4-8 4-8-4z" />
      <path d="M4 12l8 4 8-4M4 16l8 4 8-4" />
    </svg>
  ),
  lidar: (
    <svg {...svgProps} className="h-4 w-4">
      <circle cx="12" cy="12" r="1.6" />
      <path d="M7.5 7.5a6.4 6.4 0 000 9M16.5 7.5a6.4 6.4 0 010 9M4.5 4.5a10.6 10.6 0 000 15M19.5 4.5a10.6 10.6 0 010 15" />
    </svg>
  ),
  torque: (
    <svg {...svgProps} className="h-4 w-4">
      <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />
    </svg>
  ),
};

function Corners() {
  const base =
    "pointer-events-none absolute h-5 w-5 border-[var(--accent)] transition-all duration-500 group-hover/stage:h-8 group-hover/stage:w-8";
  return (
    <>
      <span className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}

/* =========================================
   MAIN COMPONENT

   Clip changes: two video layers, the next clip loads underneath and is
   revealed with a vertical cyan scan line.
   Sensor changes: every view of the current clip is its own <video>. The new
   view is loaded, seeked to the same timestamp, then revealed with a
   horizontal scan line, so playback never jumps.
========================================= */

type Props = { clips?: SimClip[]; heading?: string; subheading?: string };
type Slot = 0 | 1;
type Pending = { slot: Slot; dir: 1 | -1; to: number };

const EASE = "cubic-bezier(.77,0,.18,1)";

export default function SimulationReel({
  clips = DEFAULT_CLIPS,
  heading = "Watch our robots learn before they move",
  subheading = "Every behavior below was trained and stress-tested in simulation first. Click the sides of the screen, pick a clip, and switch sensor views to see what the robot sees.",
}: Props) {
  const total = clips.length;

  const [index, setIndex] = useState(0);
  const [front, setFront] = useState<Slot>(0);
  const [slots, setSlots] = useState<[number, number]>([0, total > 1 ? 1 : 0]);
  const [pending, setPending] = useState<Pending | null>(null);
  const [revealSlot, setRevealSlot] = useState<Slot | null>(null);
  const [selectedView, setSelectedView] = useState("camera");
  const [outgoingView, setOutgoingView] = useState<string | null>(null);
  const [revealView, setRevealView] = useState<string | null>(null);
  const [switching, setSwitching] = useState<string | null>(null);
  const [failedViews, setFailedViews] = useState<Record<string, true>>({});
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const frameWrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);
  const beamHRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const videoEls = useRef<Record<string, HTMLVideoElement | null>>({});
  const wrapEls = useRef<(HTMLDivElement | null)[]>([null, null]);
  const segRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const itemProgRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const busy = useRef(false);
  const userPaused = useRef(false);
  const swipeStart = useRef<number | null>(null);

  // latest values for callbacks / the rAF loop
  const clipsRef = useRef(clips);
  const frontRef = useRef(front);
  const indexRef = useRef(index);
  const slotsRef = useRef(slots);
  const viewRef = useRef(selectedView);
  const pendingRef = useRef(pending);
  const failedRef = useRef(failedViews);
  failedRef.current = failedViews;
  clipsRef.current = clips;
  frontRef.current = front;
  indexRef.current = index;
  slotsRef.current = slots;
  viewRef.current = selectedView;
  pendingRef.current = pending;

  const clip = clips[index];
  // views whose file failed to load (404 etc.) are hidden from the toggle
  const clipViews = viewsOf(clip).filter((v) => !failedViews[`${clip.id}:${v.id}`]);
  const shownView = resolveView(clip, selectedView);
  const viewLabel = viewsOf(clip).find((v) => v.id === shownView)?.label ?? "Camera";
  const title = useScramble(clip.title, reduceMotion);

  /** The <video> currently visible (or about to be) in a slot. */
  const activeVideo = useCallback((slot: Slot) => {
    const c = clipsRef.current[slotsRef.current[slot]];
    if (!c) return null;
    return videoEls.current[`${slot}:${resolveView(c, viewRef.current)}`] ?? null;
  }, []);

  const isActive = (s: Slot, view: string) =>
    s === frontRef.current &&
    view === resolveView(clipsRef.current[slotsRef.current[s]], viewRef.current);

  /* ---------- clip navigation ---------- */
  const go = useCallback(
    (to: number, dir?: 1 | -1) => {
      if (busy.current || total < 2) return;
      const target = ((to % total) + total) % total;
      if (target === indexRef.current) return;
      busy.current = true;
      const back = (1 - frontRef.current) as Slot;
      setSlots((s) => {
        const n: [number, number] = [s[0], s[1]];
        n[back] = target;
        return n;
      });
      setPending({ slot: back, dir: dir ?? (target > indexRef.current ? 1 : -1), to: target });
    },
    [total]
  );
  const next = useCallback(() => go(indexRef.current + 1, 1), [go]);
  const prev = useCallback(() => go(indexRef.current - 1, -1), [go]);

  /* ---------- sensor view switching ---------- */
  const switchView = useCallback(
    (nextView: string) => {
      if (busy.current) return;
      const s = frontRef.current;
      const c = clipsRef.current[slotsRef.current[s]];
      const curView = resolveView(c, viewRef.current);
      if (nextView === curView || !viewsOf(c).some((v) => v.id === nextView)) return;
      const cur = videoEls.current[`${s}:${curView}`];
      const nxt = videoEls.current[`${s}:${nextView}`];
      if (!cur || !nxt) return;

      busy.current = true;
      setSwitching(nextView);
      let giveUp = 0;

      const onError = () => {
        // file missing (404) or unplayable: hide this view, stay on the current one
        nxt.removeEventListener("loadeddata", begin);
        nxt.removeEventListener("error", onError);
        window.clearTimeout(giveUp);
        setFailedViews((f) => ({ ...f, [`${c.id}:${nextView}`]: true }));
        setSwitching(null);
        busy.current = false;
      };

      const begin = () => {
        nxt.removeEventListener("loadeddata", begin);
        nxt.removeEventListener("error", onError);
        window.clearTimeout(giveUp);
        const t = cur.currentTime;
        const wasPlaying = !cur.paused;
        let seekTimer = 0;

        const reveal = () => {
          nxt.removeEventListener("seeked", reveal);
          window.clearTimeout(seekTimer);
          if (wasPlaying) nxt.play().catch(() => {});
          nxt.getAnimations().forEach((a) => a.cancel());

          viewRef.current = nextView;
          setOutgoingView(curView);
          setRevealView(nextView);
          setSelectedView(nextView);

          const dur = reduceMotion ? 1 : 650;
          const wipe = nxt.animate(
            [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }],
            { duration: dur, easing: EASE, fill: "both" }
          );
          const beam = beamHRef.current;
          if (beam && !reduceMotion) {
            beam.animate(
              [
                { top: "0%", opacity: 0, offset: 0 },
                { opacity: 1, offset: 0.12 },
                { opacity: 1, offset: 0.88 },
                { top: "100%", opacity: 0, offset: 1 },
              ],
              { duration: dur, easing: EASE }
            );
          }
          wipe.onfinish = () => {
            cur.pause();
            setOutgoingView(null);
            setRevealView(null);
            setSwitching(null);
            busy.current = false;
          };
        };

        if (nxt.readyState >= 2 && Math.abs(nxt.currentTime - t) < 0.04) reveal();
        else {
          nxt.addEventListener("seeked", reveal);
          seekTimer = window.setTimeout(reveal, 700);
          nxt.currentTime = t;
        }
      };

      nxt.preload = "auto";
      if (nxt.readyState >= 2) begin();
      else {
        nxt.addEventListener("loadeddata", begin);
        nxt.addEventListener("error", onError);
        giveUp = window.setTimeout(() => {
          // too slow: stay on the current view
          nxt.removeEventListener("loadeddata", begin);
          nxt.removeEventListener("error", onError);
          setSwitching(null);
          busy.current = false;
        }, 4000);
        if (nxt.readyState === 0 && nxt.networkState !== 2) nxt.load();
      }
    },
    [reduceMotion]
  );

  const cycleView = () => {
    const c = clipsRef.current[slotsRef.current[frontRef.current]];
    const list = viewsOf(c).filter((v) => !failedRef.current[`${c.id}:${v.id}`]);
    if (list.length < 2) return;
    const cur = list.findIndex((v) => v.id === resolveView(c, viewRef.current));
    switchView(list[(cur + 1) % list.length].id);
  };

  /* ---------- run the clip transition once the hidden layer is ready ---------- */
  useEffect(() => {
    if (!pending) return;
    const { slot, dir, to } = pending;
    const v = activeVideo(slot);
    const wrap = wrapEls.current[slot];
    if (!v || !wrap) return;

    let cancelled = false;
    let timer = 0;

    const run = () => {
      if (cancelled) return;
      wrap.getAnimations().forEach((a) => a.cancel());
      v.getAnimations().forEach((a) => a.cancel());

      v.currentTime = 0;
      if (!userPaused.current) v.play().catch(() => {});
      setIndex(to);

      const dur = reduceMotion ? 1 : 950;
      const from = dir === 1 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

      const wipe = wrap.animate([{ clipPath: from }, { clipPath: "inset(0 0 0 0)" }], {
        duration: dur,
        easing: EASE,
        fill: "both",
      });
      v.animate([{ transform: "scale(1.18)" }, { transform: "scale(1)" }], {
        duration: dur * 1.4,
        easing: "cubic-bezier(.16,1,.3,1)",
        fill: "both",
      });
      const beam = beamRef.current;
      if (beam && !reduceMotion) {
        beam.animate(
          [
            { left: dir === 1 ? "100%" : "0%", opacity: 0, offset: 0 },
            { opacity: 1, offset: 0.12 },
            { opacity: 1, offset: 0.88 },
            { left: dir === 1 ? "0%" : "100%", opacity: 0, offset: 1 },
          ],
          { duration: dur, easing: EASE }
        );
      }
      setRevealSlot(slot);

      wipe.onfinish = () => {
        if (cancelled) return;
        const old = (1 - slot) as Slot;
        frontRef.current = slot; // update before pausing so the pause event is ignored
        Object.entries(videoEls.current).forEach(([k, el]) => {
          if (k.startsWith(`${old}:`)) el?.pause();
        });
        setFront(slot);
        setRevealSlot(null);
        setPending(null);
        // preload the following clip underneath
        setSlots((s) => {
          const n: [number, number] = [s[0], s[1]];
          n[old] = (to + 1) % total;
          return n;
        });
        busy.current = false;
      };
    };

    const onReady = () => {
      v.removeEventListener("loadeddata", onReady);
      window.clearTimeout(timer);
      run();
    };
    if (v.readyState >= 2) run();
    else {
      v.addEventListener("loadeddata", onReady);
      timer = window.setTimeout(onReady, 2500); // never hang on a missing file
      if (v.readyState === 0 && v.networkState !== 2) v.load();
    }

    return () => {
      cancelled = true;
      v.removeEventListener("loadeddata", onReady);
      window.clearTimeout(timer);
    };
  }, [pending, reduceMotion, total, activeVideo]);

  /* ---------- reduced motion + first play ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    if (mq.matches) {
      userPaused.current = true;
      setPaused(true);
    } else {
      activeVideo(0)?.play().catch(() => {});
    }
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [activeVideo]);

  /* ---------- play only while visible ---------- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = activeVideo(frontRef.current);
        if (!v) return;
        if (entry.isIntersecting) {
          if (!userPaused.current) v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [activeVideo]);

  /* ---------- 60fps progress, timecode and ambient glow ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    let raf = 0;
    let n = 0;
    let lastLabel = "";
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const pend = pendingRef.current;
      const v = activeVideo(pend ? pend.slot : frontRef.current);
      if (!v) return;
      const p = v.duration ? Math.min(1, v.currentTime / v.duration) : 0;
      const idx = indexRef.current;
      segRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${i < idx ? 1 : i === idx ? p : 0})`;
      });
      itemProgRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${i === idx ? p : 0})`;
      });
      const label = `${fmtTime(v.currentTime)} / ${fmtTime(v.duration)}`;
      if (label !== lastLabel && timeRef.current) {
        timeRef.current.textContent = label;
        lastLabel = label;
      }
      if (ctx && v.readyState >= 2 && ++n % 3 === 0) {
        try {
          ctx.drawImage(v, 0, 0, 64, 36);
        } catch {
          /* ignore */
        }
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [activeVideo]);

  /* ---------- keep active playlist item in view (mobile rail) ---------- */
  useEffect(() => {
    const rail = railRef.current;
    const item = itemRefs.current[index];
    if (!rail || !item || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({
      left: item.offsetLeft - rail.clientWidth / 2 + item.clientWidth / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [index, reduceMotion]);

  /* ---------- interaction ---------- */
  const togglePlay = () => {
    const v = activeVideo(frontRef.current);
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    else if (e.key === " ") { e.preventDefault(); togglePlay(); }
    else if (e.key === "v" || e.key === "V") { e.preventDefault(); cycleView(); }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const f = frameRef.current;
    const s = frameWrapRef.current;
    if (!f || !s) return;
    const r = s.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    f.style.setProperty("--rx", `${(0.5 - py) * 5}deg`);
    f.style.setProperty("--ry", `${(px - 0.5) * 7}deg`);
    f.style.setProperty("--mx", `${px * 100}%`);
    f.style.setProperty("--my", `${py * 100}%`);
  };
  const onPointerLeave = () => {
    const f = frameRef.current;
    if (!f) return;
    f.style.setProperty("--rx", "0deg");
    f.style.setProperty("--ry", "0deg");
  };
  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = e.pointerType === "mouse" ? null : e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
  };

  const zFor = (s: Slot) => (revealSlot === s ? 20 : front === s ? 10 : 0);

  return (
    <section
      aria-label="Robotics simulation showcase"
      className="blueprint-circuit relative overflow-hidden px-4 py-20 sm:px-8 lg:py-28"
    >
      {/* blueprint grid, fading out from the top */}
      <div
        aria-hidden="true"
        className="tech-grid pointer-events-none absolute inset-0 opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 25%, #000 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 25%, #000 10%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-main)] sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">{subheading}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ================= STAGE ================= */}
          <div
            ref={stageRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            aria-roledescription="carousel"
            aria-label={`Simulation clip ${index + 1} of ${total}: ${clip.title}`}
            className="group/stage relative outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-main)]"
            style={{ perspective: 1400 }}
          >
            <div ref={frameWrapRef} className="relative">
            {/* ambient glow: a 64×36 copy of the video, blurred */}
            <canvas
              ref={canvasRef}
              width={64}
              height={36}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] opacity-70 blur-3xl saturate-150"
            />

            <div
              ref={frameRef}
              className="relative aspect-video overflow-hidden bg-[#05080f] ring-1 ring-[var(--accent)]/30"
              style={{
                transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                transition: "transform 500ms cubic-bezier(.16,1,.3,1)",
                boxShadow: "0 0 60px rgba(6,182,212,.18)",
              }}
            >
              {/* two clip layers, each holding one <video> per sensor view */}
              {([0, 1] as Slot[]).map((s) => {
                const c = clips[slots[s]];
                const shown = resolveView(c, selectedView);
                return (
                  <div
                    key={s}
                    ref={(el) => { wrapEls.current[s] = el; }}
                    className="absolute inset-0 bg-[#05080f]"
                    style={{ zIndex: zFor(s) }}
                  >
                    {viewsOf(c).map((vw) => {
                      const isShown = vw.id === shown;
                      const visible = isShown || (s === front && outgoingView === vw.id);
                      return (
                        <video
                          key={vw.id}
                          ref={(el) => { videoEls.current[`${s}:${vw.id}`] = el; }}
                          src={vw.src}
                          poster={vw.id === "camera" ? c.poster : undefined}
                          muted
                          playsInline
                          preload={isShown ? "auto" : "none"}
                          aria-hidden={!(s === front && isShown)}
                          onLoadedData={() => s === 0 && setLoaded(true)}
                          onPlay={() => isActive(s, vw.id) && setPaused(false)}
                          onPause={() => isActive(s, vw.id) && setPaused(true)}
                          onEnded={() => isActive(s, vw.id) && next()}
                          onClick={togglePlay}
                          className={`absolute inset-0 h-full w-full cursor-pointer object-cover transition-opacity duration-700 ${
                            s === 0 && !loaded ? "opacity-0" : "opacity-100"
                          }`}
                          style={{
                            visibility: visible ? "visible" : "hidden",
                            zIndex: revealView === vw.id && isShown ? 2 : 1,
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}

              {/* legibility + texture */}
              <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-[#05080f]/90 via-transparent to-[#05080f]/50" />
              <div
                className="pointer-events-none absolute inset-0 z-30 opacity-[0.06] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, #fff 0, #fff 1px, transparent 1px, transparent 3px)",
                }}
              />
              {/* cursor light */}
              <div
                className="pointer-events-none absolute inset-0 z-30 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover/stage:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(6,182,212,.16), transparent 60%)",
                }}
              />

              {/* scan lines: vertical = clip change, horizontal = sensor change */}
              <span
                ref={beamRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 top-0 z-40 w-[2px] bg-[var(--accent)] opacity-0 shadow-[0_0_24px_6px_rgba(6,182,212,0.8)]"
              />
              <span
                ref={beamHRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 z-40 h-[2px] bg-[var(--accent)] opacity-0 shadow-[0_0_24px_6px_rgba(6,182,212,0.8)]"
              />

              <div className="pointer-events-none absolute inset-0 z-40">
                <Corners />
              </div>

              {/* edge click zones */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous clip"
                className="absolute inset-y-0 left-0 z-40 flex w-[18%] items-center justify-start pl-3 text-white/0 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#06b6d4]/20 hover:to-transparent hover:text-white focus-visible:text-white max-md:text-white/70 group-hover/stage:text-white/60 hover:group-hover/stage:text-white sm:pl-5"
              >
                <span className="glass grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 group-hover/stage:-translate-x-0.5">
                  <Icon.Prev />
                </span>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next clip"
                className="absolute inset-y-0 right-0 z-40 flex w-[18%] items-center justify-end pr-3 text-white/0 transition-all duration-300 hover:bg-gradient-to-l hover:from-[#06b6d4]/20 hover:to-transparent hover:text-white focus-visible:text-white max-md:text-white/70 group-hover/stage:text-white/60 hover:group-hover/stage:text-white sm:pr-5"
              >
                <span className="glass grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 group-hover/stage:translate-x-0.5">
                  <Icon.Next />
                </span>
              </button>

              {/* caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex items-end justify-between gap-6 p-5 pb-8 sm:p-8 sm:pb-10">
                <div key={clip.id} className="max-w-xl motion-safe:animate-[reelIn_700ms_cubic-bezier(.16,1,.3,1)_both]">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {clip.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-2 py-0.5 text-xs text-[var(--accent)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-white sm:text-3xl">
                    <span className="sr-only">{clip.title}</span>
                    <span aria-hidden="true">{title}</span>
                  </h3>
                  <p className="mt-2 hidden text-sm leading-relaxed text-slate-300 sm:block">
                    {clip.description}
                  </p>
                </div>

                {/* live telemetry */}
                <dl
                  key={`m-${clip.id}`}
                  className="glass hidden shrink-0 gap-x-6 gap-y-1 rounded-sm px-4 py-3 md:grid"
                  style={{ gridTemplateColumns: "auto auto" }}
                >
                  {clip.metrics.map((m) => (
                    <div key={m.label} className="contents">
                      <dt className="text-xs text-slate-400">{m.label}</dt>
                      <dd className="text-right font-mono text-sm text-[var(--accent)]">
                        <CountUp value={m.value} decimals={m.decimals} disabled={reduceMotion} />
                        {m.unit && <span className="ml-0.5 text-slate-400">{m.unit}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* segmented progress */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-50 flex gap-1 px-5 pb-3 sm:px-8">
                {clips.map((c, i) => (
                  <span key={c.id} className="h-[3px] flex-1 overflow-hidden bg-white/15">
                    <span
                      ref={(el) => { segRefs.current[i] = el; }}
                      className="block h-full origin-left bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                ))}
              </div>
            </div>
            </div>

            {/* controls live BELOW the video so the footage (and any logo in it) stays clear */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="glass flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs text-[var(--text-main)]">
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-[var(--accent)] ${
                    paused ? "opacity-40" : "animate-pulse shadow-[0_0_8px_var(--accent)]"
                  }`}
                />
                <span className="font-medium">{viewLabel}</span>
                <span ref={timeRef} className="font-mono tabular-nums text-[var(--text-muted)]">
                  00:00 / 00:00
                </span>
                {paused && <span className="text-[var(--accent)]">Paused</span>}
              </span>

              {clipViews.length > 1 && (
                <div
                  role="radiogroup"
                  aria-label="Sensor view"
                  className="glass flex gap-0.5 rounded-sm p-0.5"
                >
                  {clipViews.map((v) => {
                    const active = v.id === shownView;
                    const icon = VIEW_ICONS[v.id];
                    return (
                      <button
                        key={v.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        aria-label={v.label}
                        title={`${v.label} view`}
                        onClick={() => switchView(v.id)}
                        className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs transition-all duration-300 ${
                          active
                            ? "bg-[var(--accent-soft)] text-[var(--accent)] shadow-[inset_0_0_0_1px_rgba(6,182,212,0.5)]"
                            : "text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text-main)]"
                        } ${switching === v.id ? "animate-pulse" : ""}`}
                      >
                        {icon}
                        <span>{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ================= PLAYLIST ================= */}
          <aside aria-label="Clip list">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-sm font-medium text-[var(--text-main)]">Up next</h3>
              <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                {index + 1} / {total}
              </span>
            </div>
            <div
              ref={railRef}
              className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:max-h-[30rem] lg:snap-none lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:pr-1"
            >
              {clips.map((c, i) => {
                const active = i === index;
                return (
                  <button
                    key={c.id}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    type="button"
                    aria-current={active ? "true" : undefined}
                    onClick={() => go(i)}
                    className={`group/item glass flex w-72 shrink-0 snap-center gap-3 p-2 text-left transition-all duration-500 lg:w-full ${
                      active
                        ? "!border-[var(--accent)]/70 !bg-[var(--accent-soft)] shadow-[0_0_24px_rgba(6,182,212,0.15)]"
                        : "opacity-70 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:opacity-100 lg:hover:translate-x-1 lg:hover:translate-y-0"
                    }`}
                  >
                    <span className="relative aspect-video w-28 shrink-0 overflow-hidden bg-[var(--steel-dark)]">
                      {c.poster && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.poster}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                        />
                      )}
                      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
                        <span
                          ref={(el) => { itemProgRefs.current[i] = el; }}
                          className="block h-full origin-left bg-[var(--accent)]"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </span>
                    </span>
                    <span className="min-w-0 py-0.5">
                      <span className="line-clamp-2 block text-sm font-medium leading-snug text-[var(--text-main)]">
                        {c.title}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <span className="truncate">{c.tags[0]}</span>
                        {(c.views?.length ?? 0) > 0 && (
                          <span className="flex shrink-0 gap-1 text-[var(--accent)]/80">
                            {c.views!.map((v) => (
                              <span key={v.id} title={v.label}>{VIEW_ICONS[v.id]}</span>
                            ))}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @keyframes reelIn {
          from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
