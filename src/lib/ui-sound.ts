// Subtle Nikon-style UI sound effects using WebAudio (no asset files).
// Auto-wires hover + click on interactive elements after first user gesture.

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = true;
let initialized = false;
let lastHoverAt = 0;

function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.08;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function blip(freq: number, duration = 0.08, type: OscillatorType = "sine", gain = 1) {
  const ac = ensureCtx();
  if (!ac || !master) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.6), t + duration);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

// Nikon "chit" tick — ultra-short high-freq square pop
function tick(freq: number, gain = 0.5) {
  const ac = ensureCtx();
  if (!ac || !master) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
  osc.connect(g);
  g.connect(master);
  osc.start(t);
  osc.stop(t + 0.03);
}

export function playHover() {
  if (!enabled) return;
  const now = performance.now();
  if (now - lastHoverAt < 80) return; // throttle
  lastHoverAt = now;
  tick(3200, 0.18);
}

export function playClick() {
  if (!enabled) return;
  tick(3600, 0.4);
  setTimeout(() => tick(2400, 0.3), 22);
}

export function setSoundEnabled(v: boolean) {
  enabled = v;
  try { localStorage.setItem("ui-sound", v ? "1" : "0"); } catch {}
}
export function isSoundEnabled() { return enabled; }

const INTERACTIVE = "a, button, [role='button'], input[type='submit'], summary, .ui-sound";

function isInteractive(el: Element | null): Element | null {
  if (!el) return null;
  return (el as Element).closest?.(INTERACTIVE) ?? null;
}

export function initUISound() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    const saved = localStorage.getItem("ui-sound");
    if (saved === "0") enabled = false;
  } catch {}

  const onPointerOver = (e: Event) => {
    const target = isInteractive(e.target as Element);
    if (!target) return;
    // Avoid double-fire when moving between child nodes
    const related = (e as PointerEvent).relatedTarget as Element | null;
    if (related && target.contains(related)) return;
    playHover();
  };
  const onPointerDown = (e: Event) => {
    if (!isInteractive(e.target as Element)) return;
    playClick();
  };

  // Prime audio on first user gesture (autoplay policy)
  const prime = () => { ensureCtx(); window.removeEventListener("pointerdown", prime); window.removeEventListener("keydown", prime); };
  window.addEventListener("pointerdown", prime);
  window.addEventListener("keydown", prime);

  document.addEventListener("pointerover", onPointerOver, { passive: true });
  document.addEventListener("pointerdown", onPointerDown, { passive: true });
}
