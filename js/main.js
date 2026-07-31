const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hero = document.querySelector(".hero");
const canvas = document.querySelector("[data-kernel-canvas]");
const facade = document.querySelector("[data-live-facade]");

function openHero() {
  if (!hero) return;
  requestAnimationFrame(() => hero.classList.add("is-open"));
}

if (document.readyState === "complete") openHero();
else window.addEventListener("load", openHero, { once: true });
setTimeout(openHero, 120);

/* Ambient kernel shimmer over hero photo */
function paintHeroGrid() {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const cols = width < 640 ? 10 : 16;
  const rows = width < 640 ? 14 : 18;
  const gapX = width / cols;
  const gapY = height / rows;
  const t = performance.now() / 1000;

  ctx.clearRect(0, 0, width, height);

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const x = c * gapX + gapX * 0.5;
      const y = r * gapY + gapY * 0.5;
      const pulse = reduce ? 0.45 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.4 + r * 0.55 + c * 0.35));
      const rw = gapX * 0.34;
      const rh = gapY * 0.4;
      const g = ctx.createRadialGradient(x - rw * 0.2, y - rh * 0.3, 1, x, y, rw * 1.4);
      g.addColorStop(0, `rgba(255, 224, 138, ${0.18 * pulse})`);
      g.addColorStop(0.45, `rgba(242, 193, 78, ${0.14 * pulse})`);
      g.addColorStop(1, "rgba(232, 93, 4, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, rw, rh, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (!reduce) requestAnimationFrame(paintHeroGrid);
}

paintHeroGrid();
window.addEventListener("resize", () => {
  if (reduce) paintHeroGrid();
});

/* Scroll-lit facade */
function buildFacade() {
  if (!facade) return;
  const cols = window.matchMedia("(max-width: 640px)").matches ? 8 : 12;
  const rows = 8;
  facade.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  facade.replaceChildren();
  const frag = document.createDocumentFragment();
  for (let i = 0; i < cols * rows; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.row = String(Math.floor(i / cols));
    frag.appendChild(cell);
  }
  facade.appendChild(frag);
}

buildFacade();
window.addEventListener("resize", () => {
  const colsNow = window.matchMedia("(max-width: 640px)").matches ? 8 : 12;
  const current = getComputedStyle(facade).gridTemplateColumns.split(" ").length;
  if (current !== colsNow) buildFacade();
});

function lightRows() {
  if (!facade) return;
  const cells = [...facade.querySelectorAll(".cell")];
  if (!cells.length) return;
  const rect = facade.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
  const rows = 8;
  const litRows = reduce ? rows : Math.floor(progress * (rows + 0.2));

  for (const cell of cells) {
    const row = Number(cell.dataset.row);
    cell.classList.toggle("is-lit", row <= litRows);
  }
}

lightRows();
window.addEventListener("scroll", lightRows, { passive: true });
window.addEventListener("resize", lightRows);
