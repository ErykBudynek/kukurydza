import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CursorGlow() {
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.35 });
  const scale = useSpring(1, { stiffness: 260, damping: 20 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;
    setOn(true);
    document.documentElement.classList.add("has-kernel-cursor");

    const move = (e) => {
      x.set(e.clientX - 14);
      y.set(e.clientY - 18);
      const target = e.target?.closest?.("a, button, .theater__cell, .orbit, .layer-tabs button");
      const nextHot = Boolean(target);
      setHot(nextHot);
      scale.set(nextHot ? 1.55 : 1);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-kernel-cursor");
    };
  }, [x, y, scale]);

  if (!on) return null;

  return (
    <motion.div
      className={`cursor-glow${hot ? " is-hot" : ""}`}
      aria-hidden="true"
      style={{ translateX: sx, translateY: sy, scale }}
    />
  );
}
