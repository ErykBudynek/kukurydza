import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Monument() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const clip = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section className="band band--monument" id="monument" ref={ref}>
      <div className="band__inner monument">
        <motion.h2 className="monument__title" style={{ y }}>
          <span className="monument__ghost" aria-hidden="true">
            Kukurydza to
            <br />
            architektura
            <br />
            powtórzeń.
          </span>
          <motion.span className="monument__fill" style={{ clipPath: clip }}>
            Kukurydza to
            <br />
            architektura
            <br />
            powtórzeń.
          </motion.span>
        </motion.h2>
        <p className="band__text monument__text">
          Moduł. Rytm. Światło w komórce. Reszta strony tylko to udowadnia.
        </p>
      </div>
    </section>
  );
}
