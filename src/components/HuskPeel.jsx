import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function HuskPeel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.75], ["0%", "-88%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.75], ["0%", "88%"]);
  const leftRot = useTransform(scrollYProgress, [0, 0.75], [0, -14]);
  const rightRot = useTransform(scrollYProgress, [0, 0.75], [0, 14]);
  const reveal = useTransform(scrollYProgress, [0.22, 0.58], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.75], [0.88, 1.08]);
  const glow = useTransform(scrollYProgress, [0.15, 0.75], [0.35, 1]);

  return (
    <section className="peel" id="peel" ref={ref}>
      <div className="peel__sticky">
        <motion.div
          className="peel__core"
          style={{ scale, opacity: glow }}
          aria-hidden="true"
        >
          {Array.from({ length: 70 }).map((_, i) => (
            <span key={i} className="peel__kernel" style={{ "--i": i }} />
          ))}
        </motion.div>

        <motion.div
          className="peel__husk peel__husk--left"
          style={{ x: leftX, rotate: leftRot }}
          aria-hidden="true"
        />
        <motion.div
          className="peel__husk peel__husk--right"
          style={{ x: rightX, rotate: rightRot }}
          aria-hidden="true"
        />

        <motion.div className="peel__copy" style={{ opacity: reveal }}>
          <p className="peel__brand">Otwórz łuskę</p>
          <h2 className="peel__title">
            Za osłoną
            <br />
            jest fasada.
          </h2>
          <p className="peel__text">
            Scroll rozchyla kurtynę. Ziarna zostają jako elewacja — rytm, światło,
            powtórzenie.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
