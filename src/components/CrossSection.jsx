import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { layers, materials } from "../data.js";

export default function CrossSection() {
  const [active, setActive] = useState(layers[1].id);
  const current = layers.find((l) => l.id === active) ?? layers[1];

  return (
    <section className="band band--cross" id="przekroj">
      <div className="band__inner band__inner--split">
        <div>
          <h2 className="band__title">Przekrój jak elewacja</h2>
          <p className="band__text">
            Kliknij warstwę. Kolba przestaje być „zdjęciem z pola” i staje się
            rysunkiem budynku: osłona, komórki, rdzeń, anteny jedwabiu.
          </p>
          <div className="layer-tabs" role="tablist" aria-label="Warstwy kolby">
            {layers.map((layer) => (
              <button
                key={layer.id}
                type="button"
                role="tab"
                aria-selected={active === layer.id}
                className={active === layer.id ? "is-active" : undefined}
                onClick={() => setActive(layer.id)}
              >
                {layer.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="layer-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{current.title}</h3>
              <p>{current.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="cob-diagram" aria-hidden="true">
          <div className={`cob-diagram__stack is-${active}`}>
            <div className="cob-diagram__silk" data-layer="pyl" />
            <div className="cob-diagram__husk" data-layer="luska" />
            <div className="cob-diagram__kernels" data-layer="ziarno">
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
            <div className="cob-diagram__core" data-layer="rdzen" />
          </div>
          <p className="cob-diagram__caption">Schemat poglądowy · nie atlas botaniczny</p>
        </div>
      </div>

      <div className="band__inner materials-wrap">
        <h3 className="band__sub">Skóra świata</h3>
        <dl className="materials">
          {materials.map((m) => (
            <div key={m.name}>
              <dt>{m.name}</dt>
              <dd>{m.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
