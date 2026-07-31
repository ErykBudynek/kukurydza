import { useEffect, useRef } from "react";
import { pollenImage } from "../data.js";

export default function PollenField() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.5 };
    let frame = 0;
    let running = true;

    const particles = Array.from({ length: reduce ? 28 : 90 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      s: 0.4 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 0.00035,
      phase: Math.random() * Math.PI * 2,
      silk: i % 7 === 0,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (t) => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;

      for (const p of particles) {
        if (!reduce) {
          p.y += 0.00025 + p.z * 0.0004;
          p.x += p.drift + (pointer.x - 0.5) * 0.0008 * p.z;
          if (p.y > 1.1) p.y = -0.1;
          if (p.x < -0.1) p.x = 1.1;
          if (p.x > 1.1) p.x = -0.1;
        }

        const px = p.x * width + Math.sin(time + p.phase) * 8 * p.z;
        const py = p.y * height;
        const pullX = (pointer.x * width - px) * 0.04 * p.z;
        const pullY = (pointer.y * height - py) * 0.04 * p.z;

        if (p.silk) {
          ctx.strokeStyle = `rgba(247, 241, 225, ${0.12 + p.z * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px + pullX, py + pullY - 18 * p.s);
          ctx.quadraticCurveTo(px + pullX + 6, py + pullY, px + pullX - 4, py + pullY + 22 * p.s);
          ctx.stroke();
        } else {
          const g = ctx.createRadialGradient(px + pullX, py + pullY, 0, px + pullX, py + pullY, 6 * p.s);
          g.addColorStop(0, `rgba(255, 224, 138, ${0.35 + p.z * 0.4})`);
          g.addColorStop(0.5, `rgba(242, 193, 78, ${0.18 + p.z * 0.2})`);
          g.addColorStop(1, "rgba(232, 93, 4, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px + pullX, py + pullY, 3.2 * p.s * (0.6 + p.z), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce) frame = requestAnimationFrame(paint);
    };

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    };

    resize();
    paint(0);
    if (!reduce) frame = requestAnimationFrame(paint);
    window.addEventListener("resize", resize);
    section.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      section.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section className="band band--pollen" id="pylek" ref={sectionRef}>
      <img className="pollen__bg" src={pollenImage} alt="" aria-hidden="true" />
      <canvas className="pollen__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="band__inner pollen__copy">
        <h2 className="band__title">Pyłek i jedwab</h2>
        <p className="band__text">
          Mikroświat wokół fasady. Nitki jedwabiu i złoty pył reagują na ruch
          dłoni — atmosfera pola, bez pejzażu o zachodzie.
        </p>
      </div>
    </section>
  );
}
