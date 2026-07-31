import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { corridor } from "../data.js";

export default function Corridor() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-55%"]);

  return (
    <section className="band band--corridor" id="korytarz" ref={ref}>
      <div className="corridor-head">
        <h2 className="band__title">Korytarz fasady</h2>
        <p className="band__text">
          Scroll przesuwa rząd komórek bokiem — jakbyś szedł wzdłuż elewacji po zmroku.
        </p>
      </div>
      <div className="corridor-track">
        <motion.ul className="corridor-row" style={{ x }} aria-hidden="true">
          {[...corridor, ...corridor].map((label, i) => (
            <li key={`${label}-${i}`} className="corridor-pill">
              <span className="corridor-pill__kernel" />
              <span>{label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
