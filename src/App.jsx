import { useEffect } from "react";
import Lenis from "lenis";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Anatomy from "./components/Anatomy.jsx";
import LiveFacade from "./components/LiveFacade.jsx";
import CrossSection from "./components/CrossSection.jsx";
import KernelTheater from "./components/KernelTheater.jsx";
import Corridor from "./components/Corridor.jsx";
import Proof from "./components/Proof.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Progress from "./components/Progress.jsx";

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#glowna">
        Pomiń do treści
      </a>
      <CursorGlow />
      <Progress />
      <Header />
      <main id="glowna">
        <Hero />
        <Anatomy />
        <LiveFacade />
        <CrossSection />
        <KernelTheater />
        <Corridor />
        <Proof />
      </main>
      <footer className="foot">
        <p>
          <strong>KUKURYDZA</strong> · przedstawienie skilla Impeccable · React + Motion
        </p>
        <p>Jeden świat wizualny. Zero agri-szablonu. Ziarno jako fasada.</p>
      </footer>
    </>
  );
}
