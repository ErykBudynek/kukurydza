import { motion } from "motion/react";

const proofs = [
  {
    title: "Świat",
    body: "Kernel Facade — kolba jako budynek, nie jako plon na stocku.",
  },
  {
    title: "Kompozycja",
    body: "Pełna ściana ziaren, łuska rozchylona, marka w czarnej dziurze.",
  },
  {
    title: "Ruch",
    body: "Scroll jako włącznik świateł, sticky warstwy, teatr komórek, korytarz.",
  },
  {
    title: "Stack",
    body: "React + Motion + Lenis. Nie dla „frameworku”, tylko dla kontroli ruchu.",
  },
];

export default function Proof() {
  return (
    <section className="band band--proof" id="dowod">
      <div className="band__inner">
        <motion.h2
          className="band__title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          To jest showcase skilla
        </motion.h2>
        <motion.p
          className="band__text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Strona istnieje, żeby pokazać, co robi <em>Impeccable</em> w Cursorze:
          jeden świat wizualny, kompozycja do bólu, zero agri-szablonu. Tematem
          jest kukurydza. Dowodem jest to, jak ją widzisz.
        </motion.p>

        <div className="proof-grid proof-grid--4">
          {proofs.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.a
          className="kernel-cta kernel-cta--inline"
          href="#glowna"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="kernel-cta__glow" aria-hidden="true" />
          <span className="kernel-cta__label">Wróć na fasadę</span>
        </motion.a>
      </div>
    </section>
  );
}
