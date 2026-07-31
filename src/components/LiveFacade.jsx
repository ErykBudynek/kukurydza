import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function LiveFacade() {
  const ref = useRef(null);
  const [cols, setCols] = useState(12);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });

  useEffect(() => {
    const sync = () => setCols(window.matchMedia("(max-width: 640px)").matches ? 8 : 12);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const rows = 9;
  const cells = useMemo(
    () => Array.from({ length: cols * rows }, (_, i) => i),
    [cols],
  );

  return (
    <section className="band band--rows" id="rzedy" ref={ref}>
      <div className="rows-stage">
        <div className="rows-copy">
          <h2 className="band__title">Rzędy zapalają się z scrolla</h2>
          <p className="band__text">
            Żywa fasada. Im głębiej schodzisz, tym więcej komórek dostaje
            emaliowany blask — jakby ktoś włączał światła piętro po piętrze.
          </p>
        </div>
        <div
          className="live-facade"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          aria-hidden="true"
        >
          {cells.map((i) => {
            const row = Math.floor(i / cols);
            const threshold = (row + 0.15) / rows;
            return <Cell key={`${cols}-${i}`} progress={scrollYProgress} threshold={threshold} />;
          })}
        </div>
      </div>
    </section>
  );
}

function Cell({ progress, threshold }) {
  const opacity = useTransform(progress, [threshold - 0.08, threshold + 0.05], [0.28, 1]);
  const glow = useTransform(progress, [threshold - 0.08, threshold + 0.05], [0, 1]);
  const filter = useTransform(glow, (v) => `saturate(${1 + v * 0.25})`);
  const background = useTransform(glow, (v) =>
    v > 0.55
      ? "radial-gradient(120% 90% at 32% 24%, #ffe7a0, #f2c14e 42%, #d4a017 78%, #e85d04 120%)"
      : "linear-gradient(160deg, #3a2a12, #1c140c 70%)",
  );
  const boxShadow = useTransform(glow, (v) =>
    v > 0.55
      ? "0 0 18px color-mix(in oklab, #e85d04 45%, transparent), inset 0 -6px 12px color-mix(in oklab, #e85d04 30%, transparent), inset 0 5px 10px color-mix(in oklab, white 28%, transparent)"
      : "inset 0 0 0 1px color-mix(in oklab, #3d6b2f 25%, transparent)",
  );

  return (
    <motion.div className="cell" style={{ opacity, background, boxShadow, filter }} />
  );
}
