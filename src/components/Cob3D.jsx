import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Cob3DCanvas = lazy(() => import("./Cob3DCanvas.jsx"));

export default function Cob3D() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { rootMargin: "200px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="band band--cob3d" id="orbita" ref={ref}>
      <div className="band__inner cob3d">
        <div className="cob3d__copy">
          <h2 className="band__title">Kolba w 3D</h2>
          <p className="band__text">
            Prawdziwy model WebGL: ziarna jako emaliowane komórki, łuska jako
            płaszczyzny, światło zmierzchu na fasadzie. Przeciągnij, żeby obrócić.
          </p>
          <p className="note">React Three Fiber · Three.js · proceduralna kolba, nie stock asset.</p>
        </div>
        <div className="cob3d__stage" role="img" aria-label="Interaktywny model 3D kolby kukurydzy">
          {active ? (
            <Suspense fallback={<div className="cob3d__loading">Ładowanie modelu…</div>}>
              <Cob3DCanvas />
            </Suspense>
          ) : (
            <div className="cob3d__loading">Model 3D czeka na scroll</div>
          )}
        </div>
      </div>
    </section>
  );
}
