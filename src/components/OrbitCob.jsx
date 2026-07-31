import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cobOrbitImage } from "../data.js";

export default function OrbitCob() {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(12);
  const rotY = useSpring(rawX, { stiffness: 120, damping: 18 });
  const rotX = useSpring(rawY, { stiffness: 120, damping: 18 });
  const shine = useTransform(rotY, [-35, 35], ["120%", "-20%"]);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * 42);
    rawY.set(py * -28);
  };

  const onLeave = () => {
    if (dragging) return;
    rawX.set(0);
    rawY.set(12);
  };

  return (
    <section className="band band--orbit" id="orbita">
      <div className="band__inner band__inner--split orbit-layout">
        <div>
          <h2 className="band__title">Kolba w orbicie</h2>
          <p className="band__text">
            Przesuń kursorem. Bryła reaguje jak model w pracowni: emalia łapie
            światło, łuska trzyma sylwetkę, fasada nie jest flat collage.
          </p>
          <p className="note">Na telefonie przechyl urządzenie albo przeciągnij palcem.</p>
        </div>

        <div
          className="orbit"
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
        >
          <motion.div
            className="orbit__stage"
            style={{
              rotateX: rotX,
              rotateY: rotY,
              transformPerspective: 900,
            }}
          >
            <img src={cobOrbitImage} alt="" className="orbit__img" draggable={false} />
            <motion.div
              className="orbit__shine"
              style={{ backgroundPosition: shine }}
              aria-hidden="true"
            />
            <div className="orbit__ring" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
