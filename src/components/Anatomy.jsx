import { motion } from "motion/react";
import { facts } from "../data.js";

export default function Anatomy() {
  return (
    <section className="band band--anatomy" id="fasada">
      <div className="band__inner">
        <motion.h2
          className="band__title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Fasada, nie pejzaż
        </motion.h2>
        <motion.p
          className="band__text"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Typowa strona o kukurydzy pokazuje pole o zachodzie. Ta nie. Kolba stoi
          frontalnie, jak elewacja: moduł, rytm, światło w komórkach. To samo
          ziarno, które jesz, jest tu jednostką architektury.
        </motion.p>
        <ul className="facts" role="list">
          {facts.map((f, i) => (
            <motion.li
              key={f.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </motion.li>
          ))}
        </ul>
        <p className="note">
          Liczby poglądowe, na potrzeby demonstracji designu — nie raport agronomiczny.
        </p>
      </div>
    </section>
  );
}
