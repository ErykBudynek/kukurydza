import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { heroImage } from "../data.js";

export default function Hero() {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let running = true;

    const paint = (t) => {
      if (!running) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = width < 640 ? 10 : 18;
      const rows = width < 640 ? 14 : 20;
      const gapX = width / cols;
      const gapY = height / rows;
      const time = t / 1000;

      ctx.clearRect(0, 0, width, height);

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = c * gapX + gapX * 0.5;
          const yCell = r * gapY + gapY * 0.5;
          const pulse = reduce
            ? 0.42
            : 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(time * 1.35 + r * 0.5 + c * 0.33));
          const rw = gapX * 0.32;
          const rh = gapY * 0.38;
          const g = ctx.createRadialGradient(x - rw * 0.2, yCell - rh * 0.3, 1, x, yCell, rw * 1.45);
          g.addColorStop(0, `rgba(255, 224, 138, ${0.2 * pulse})`);
          g.addColorStop(0.45, `rgba(242, 193, 78, ${0.15 * pulse})`);
          g.addColorStop(1, "rgba(232, 93, 4, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.ellipse(x, yCell, rw, rh, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce) frame = requestAnimationFrame(paint);
    };

    paint(0);
    if (!reduce) frame = requestAnimationFrame(paint);

    const onResize = () => paint(performance.now());
    window.addEventListener("resize", onResize);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="hero" ref={ref} aria-label="Wejście">
      <div className="hero__stage">
        <motion.img
          className="hero__photo"
          src={heroImage}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          style={{ y }}
        />
        <canvas className="hero__grid" ref={canvasRef} aria-hidden="true" />
        <motion.div className="hero__dim" style={{ opacity: veil }} aria-hidden="true" />
        <div className="hero__void">
          <motion.p
            className="hero__brand"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            KUKURYDZA
          </motion.p>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
          >
            Ściana ziaren.
            <br />
            Budynek z pola.
          </motion.h1>
          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            Każde ziarno to komórka fasady. Scroll zapala rzędy jak okna o zmierzchu.
          </motion.p>
          <motion.a
            className="kernel-cta"
            href="#teatr"
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="kernel-cta__glow" aria-hidden="true" />
            <span className="kernel-cta__label">Wejdź w kolbę</span>
          </motion.a>
        </div>
      </div>
      <p className="hero__hint" aria-hidden="true">
        Przewiń, żeby zapalić rzędy
      </p>
    </section>
  );
}
