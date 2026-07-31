import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "./scroll.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import HuskPeel from "./components/HuskPeel.jsx";
import Anatomy from "./components/Anatomy.jsx";
import LiveFacade from "./components/LiveFacade.jsx";
import Cob3D from "./components/Cob3D.jsx";
import CrossSection from "./components/CrossSection.jsx";
import KernelTheater from "./components/KernelTheater.jsx";
import Corridor from "./components/Corridor.jsx";
import PollenField from "./components/PollenField.jsx";
import Monument from "./components/Monument.jsx";
import Proof from "./components/Proof.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Progress from "./components/Progress.jsx";
import DuskToggle from "./components/DuskToggle.jsx";

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLenis(null);
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.15,
    });
    setLenis(lenis);

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      setLenis(null);
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
      <DuskToggle />
      <main id="glowna">
        <Hero />
        <HuskPeel />
        <Anatomy />
        <LiveFacade />
        <Cob3D />
        <CrossSection />
        <KernelTheater />
        <Corridor />
        <PollenField />
        <Monument />
        <Proof />
      </main>
      <footer className="foot">
        <p>
          <strong>KUKURYDZA</strong> · przedstawienie skilla Impeccable
        </p>
        <p>Ziarno jako fasada. Scroll jako światło. Atmosfera jako materiał.</p>
      </footer>
    </>
  );
}
