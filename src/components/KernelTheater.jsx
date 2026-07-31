import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { kernels } from "../data.js";

export default function KernelTheater() {
  const [active, setActive] = useState(0);
  const item = kernels[active];

  return (
    <section className="band band--theater" id="teatr">
      <div className="band__inner">
        <h2 className="band__title">Teatr ziaren</h2>
        <p className="band__text">
          Wybierz komórkę. Każda opowiada inny kąt tego samego świata — bez kart
          „korzyści” i bez agri-hype.
        </p>

        <div className="theater">
          <div className="theater__grid" role="list">
            {kernels.map((k, i) => (
              <motion.button
                key={k.id}
                type="button"
                role="listitem"
                className={`theater__cell${i === active ? " is-lit" : ""}`}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={i === active}
                aria-label={k.title}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={item.id}
              className="theater__copy"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="theater__index">
                {String(active + 1).padStart(2, "0")} / {String(kernels.length).padStart(2, "0")}
              </p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
