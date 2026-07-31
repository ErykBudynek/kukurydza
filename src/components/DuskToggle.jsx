import { useEffect, useRef, useState } from "react";

export default function DuskToggle() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    return () => {
      try {
        if (nodesRef.current) {
          nodesRef.current.gain.gain.value = 0;
          nodesRef.current.oscA.stop();
          nodesRef.current.oscB.stop();
        }
        if (ctxRef.current) ctxRef.current.close();
      } catch {
        /* ignore teardown races */
      }
    };
  }, []);

  const start = async () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);

    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    const gA = ctx.createGain();
    const gB = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscA.type = "sine";
    oscB.type = "sine";
    oscA.frequency.value = 92;
    oscB.frequency.value = 138;
    gA.gain.value = 0.03;
    gB.gain.value = 0.018;
    filter.type = "lowpass";
    filter.frequency.value = 420;

    oscA.connect(gA);
    oscB.connect(gB);
    gA.connect(filter);
    gB.connect(filter);
    filter.connect(master);
    oscA.start();
    oscB.start();

    master.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 1.4);
    ctxRef.current = ctx;
    nodesRef.current = { oscA, oscB, gain: master };
    setReady(true);
    setOn(true);
  };

  const toggle = async () => {
    if (!ready) {
      await start();
      return;
    }
    const { gain } = nodesRef.current;
    const ctx = ctxRef.current;
    const next = !on;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(next ? 1 : 0.0001, ctx.currentTime + 0.6);
    setOn(next);
  };

  return (
    <button
      type="button"
      className={`dusk-toggle${on ? " is-on" : ""}`}
      onClick={toggle}
      aria-pressed={on}
    >
      {on ? "Dźwięk zmierzchu · on" : "Dźwięk zmierzchu · off"}
    </button>
  );
}
