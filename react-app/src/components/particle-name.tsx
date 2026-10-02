"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

/** Type-safe CSS custom property for the stagger delay. */
const cssDelay = (delay: string): CSSProperties => ({ "--d": delay } as CSSProperties);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  col: string;
  ph: number;
}

/**
 * Davide Miron — "Particle Name".
 * The name is sampled into thousands of glowing particles on a full-screen
 * canvas. They stream in from across the viewport on load, drift/shimmer when
 * idle, and scatter away from the cursor before springing back into formation.
 * Original canvas code — no library. Falls back to chrome text if the 2D
 * context is unavailable or JavaScript is disabled.
 */
export default function ParticleName() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const canvas = canvasRef.current;
    const nameEl = nameRef.current;
    const clockEl = clockRef.current;

    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SMALL =
      window.matchMedia("(max-width:820px)").matches || window.matchMedia("(pointer:coarse)").matches;

    // ---- Live Parma clock ----
    let clockTimer = 0;
    try {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Europe/Rome",
      });
      const tick = () => {
        if (clockEl) clockEl.textContent = fmt.format(new Date());
      };
      tick();
      clockTimer = window.setInterval(tick, 1000);
    } catch {
      /* Intl unavailable */
    }
    const clearClock = () => {
      if (clockTimer) window.clearInterval(clockTimer);
    };
    const reveal = () => requestAnimationFrame(() => root.classList.add("is-loaded"));

    if (!canvas || !nameEl) {
      reveal();
      return clearClock;
    }

    const ctx = canvas.getContext("2d");
    const off = document.createElement("canvas");
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!ctx || !octx) {
      root.classList.add("no-canvas");
      reveal();
      return clearClock;
    }

    const MAX = SMALL ? 3000 : 6500;
    const STEP = SMALL ? 5 : 4;
    const R = SMALL ? 74 : 122; // cursor repulsion radius (css px)

    let dpr = 1;
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    const mouse = { x: -99999, y: -99999 };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const colorFor = (fx: number): string => {
      const cool = [184, 200, 255];
      const mid = [244, 244, 248];
      const mint = [125, 227, 176];
      let r: number, g: number, b: number;
      if (fx < 0.5) {
        const t = fx / 0.5;
        r = lerp(cool[0], mid[0], t);
        g = lerp(cool[1], mid[1], t);
        b = lerp(cool[2], mid[2], t);
      } else {
        const t = (fx - 0.5) / 0.5;
        r = lerp(mid[0], mint[0], t);
        g = lerp(mid[1], mint[1], t);
        b = lerp(mid[2], mint[2], t);
      }
      return `rgb(${r | 0},${g | 0},${b | 0})`;
    };

    const build = (first: boolean) => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rect = nameEl.getBoundingClientRect();
      const fam = window.getComputedStyle(nameEl).fontFamily || "sans-serif";

      const ow = Math.max(2, Math.round(rect.width));
      const oh = Math.max(2, Math.round(rect.height));
      off.width = ow;
      off.height = oh;

      // Each line is stretched horizontally to fill the FULL width — a
      // justified "type wall" that spans the whole screen.
      const lines = ["DAVIDE", "MIRON"];
      const lineBoxH = oh / lines.length;
      const FILL = 0.72; // the name spans ~72% of the width, centered
      const STRETCH_CAP = 1.06; // keep letters essentially natural (barely justified)

      octx.setTransform(1, 0, 0, 1, 0, 0);
      octx.font = `800 100px ${fam}`;
      const widestUnit = Math.max(...lines.map((l) => octx.measureText(l).width)) / 100;
      const fontByHeight = lineBoxH / 0.82;
      const fontByWidth = (ow * FILL) / widestUnit;
      const fontPx = Math.max(24, Math.min(fontByHeight, fontByWidth));

      octx.clearRect(0, 0, ow, oh);
      octx.fillStyle = "#fff";
      octx.textAlign = "left";
      octx.textBaseline = "middle";
      octx.font = `800 ${fontPx}px ${fam}`;
      for (let li = 0; li < lines.length; li++) {
        const nat = octx.measureText(lines[li]).width || 1;
        const scaleX = Math.min((ow * FILL) / nat, STRETCH_CAP);
        const drawW = nat * scaleX;
        const marginX = (ow - drawW) / 2; // center the line
        octx.setTransform(scaleX, 0, 0, 1, marginX, 0);
        octx.fillText(lines[li], 0, li * lineBoxH + lineBoxH / 2);
      }
      octx.setTransform(1, 0, 0, 1, 0, 0);

      const img = octx.getImageData(0, 0, ow, oh).data;
      const pts: Array<[number, number]> = [];
      for (let y = 0; y < oh; y += STEP) {
        for (let x = 0; x < ow; x += STEP) {
          if (img[(y * ow + x) * 4 + 3] > 128) pts.push([x, y]);
        }
      }
      // random subsample down to the particle cap
      if (pts.length > MAX) {
        for (let i = pts.length - 1; i > 0; i--) {
          const j = (Math.random() * (i + 1)) | 0;
          const t = pts[i];
          pts[i] = pts[j];
          pts[j] = t;
        }
        pts.length = MAX;
      }

      const next: Particle[] = [];
      for (let i = 0; i < pts.length; i++) {
        const tx = rect.left + pts[i][0];
        const ty = rect.top + pts[i][1];
        const fx = (pts[i][0]) / Math.max(1, rect.width);
        let sx: number, sy: number;
        if (first) {
          sx = Math.random() * W;
          sy = Math.random() * H;
        } else {
          const old = particles[i];
          sx = old ? old.x : tx;
          sy = old ? old.y : ty;
        }
        next.push({ x: sx, y: sy, vx: 0, vy: 0, tx, ty, col: colorFor(fx), ph: Math.random() * 6.283 });
      }
      particles = next;
    };

    const startT = performance.now();
    let raf = 0;
    let running = true;

    const frame = (now: number) => {
      const time = (now - startT) / 1000;
      const entrance = Math.min(1, time / 0.9);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const k = 0.045;
      const fr = 0.86;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const tx = p.tx + Math.sin(time * 0.9 + p.ph) * 0.6;
        const ty = p.ty + Math.cos(time * 0.8 + p.ph) * 0.6;
        let ax = (tx - p.x) * k;
        let ay = (ty - p.y) * k;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 0.001;
          const f = (1 - d / R) * 3.4;
          ax += (dx / d) * f;
          ay += (dy / d) * f;
        }
        p.vx = (p.vx + ax) * fr;
        p.vy = (p.vy + ay) * fr;
        p.x += p.vx;
        p.y += p.vy;
        ctx.globalAlpha = 0.85 * entrance;
        ctx.fillStyle = p.col;
        ctx.fillRect(p.x - 0.9, p.y - 0.9, 1.8, 1.8);
        ctx.globalAlpha = 0.13 * entrance;
        ctx.fillRect(p.x - 1.7, p.y - 1.7, 3.4, 3.4);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (running) raf = requestAnimationFrame(frame);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = p.col;
        ctx.fillRect(p.tx - 0.9, p.ty - 0.9, 1.8, 1.8);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -99999;
      mouse.y = -99999;
    };
    let rz = 0;
    const onResize = () => {
      window.clearTimeout(rz);
      rz = window.setTimeout(() => {
        build(false);
        if (REDUCED) drawStatic();
      }, 160);
    };
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("resize", onResize);

    let started = false;
    const startAll = () => {
      if (started) return;
      started = true;
      build(true);
      reveal();
      if (REDUCED) {
        drawStatic();
      } else {
        raf = requestAnimationFrame(frame);
        document.addEventListener("visibilitychange", onVis);
      }
    };

    const docFonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    const fontsReady = docFonts?.ready ?? Promise.resolve();
    fontsReady.then(startAll).catch(startAll);
    const startTimer = window.setTimeout(startAll, 800);

    return () => {
      clearClock();
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(startTimer);
      window.clearTimeout(rz);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <canvas className="particles" ref={canvasRef} aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="shell">
        <header className="nav">
          <div className="wordmark">
            miron<span>.</span>
          </div>
          <div className="nav-meta">
            <span className="loc">Parma · Italy</span>
            <span className="clock" ref={clockRef} aria-hidden="true">
              --:--:--
            </span>
          </div>
        </header>

        <main className="hero" id="main">
          <div className="hero-main">
            <p className="eyebrow">
              <span className="tick" />
              Builder &amp; Investor
            </p>
            <h1 className="name" ref={nameRef} aria-label="Davide Miron">
              <span className="line">
                <span className="ln">Davide</span>
              </span>
              <span className="line">
                <span className="ln">Miron</span>
              </span>
            </h1>
            <p className="tagline">
              <b>17</b> · <b>a16z LP</b> · turning data into intelligence
            </p>
          </div>
        </main>

        <footer className="dock">
          <nav className="links" aria-label="Profiles and CV">
            <a
              className="link"
              style={cssDelay(".9s")}
              href="https://www.linkedin.com/in/davide-miron/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Davide Miron on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5.001A2.5 2.5 0 0 1 4.98 3.5ZM3.2 8.98H6.8V21H3.2V8.98Zm5.4 0h3.45v1.64h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.4 4.33 5.52V21h-3.6v-5.35c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H8.6V8.98Z" />
              </svg>
              <span className="txt">LinkedIn</span>
            </a>
            <a
              className="link"
              style={cssDelay(".98s")}
              href="https://x.com/davidem629241"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Davide Miron on X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
              <span className="txt">X</span>
            </a>
            <a
              className="link"
              style={cssDelay("1.06s")}
              href="/curriculum/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Curriculum Vitae, PDF"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                <path d="M14 3v5h5M9 13h6M9 17h4" />
              </svg>
              <span className="txt">CV</span>
              <em className="pdf" style={{ fontStyle: "normal" }}>
                PDF
              </em>
            </a>
          </nav>

          <div className="status">
            <span className="dot" />
            Open to build
          </div>
        </footer>
      </div>
    </>
  );
}
