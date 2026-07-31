let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

/** Smooth-scroll through the peel sticky so husks finish opening. */
export function scrollToPeelOpen(event) {
  if (event) event.preventDefault();

  const peel = document.getElementById("peel");
  if (!peel) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = peel.getBoundingClientRect().top + window.scrollY;
  const travel = Math.max(peel.offsetHeight - window.innerHeight, 0);
  // ~0.62 matches husk open + copy reveal in HuskPeel transforms
  const target = top + travel * 0.62;

  if (lenisInstance && !reduce) {
    lenisInstance.scrollTo(target, {
      duration: 2.85,
      easing: (t) => 1 - (1 - t) ** 3,
      immediate: false,
    });
    return;
  }

  window.scrollTo({
    top: target,
    behavior: reduce ? "auto" : "smooth",
  });
}
