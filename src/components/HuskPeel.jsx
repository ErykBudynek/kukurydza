import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function HuskPeel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-78%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.7], ["0%", "78%"]);
  const leftRot = useTransform(scrollYProgress, [0, 0.7], [0, -11]);
  const rightRot = useTransform(scrollYProgress, [0, 0.7], [0, 11]);
  const reveal = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.92, 1.05]);
  const glow = useTransform(scrollYProgress, [0.2, 0.8], [0.2, 1]);

  return (
    <section className="peel" id="peel" ref={ref}>
      <div className="peel__sticky">
        <motion.div
          className="peel__core"
          style={{ scale, opacity: glow }}
          aria-hidden="true"
        >
          {Array.from({ length: 48 }).map((_, i) => (
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
