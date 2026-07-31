import { chapters } from "../data.js";

export default function Header() {
  return (
    <header className="top">
      <a className="mark" href="#glowna" aria-label="Kukurydza, początek">
        <svg className="mark__icon" viewBox="0 0 32 40" aria-hidden="true">
          <path
            d="M16 2c-3 6-8 10-8 20 0 8 4 14 8 16 4-2 8-8 8-16 0-10-5-14-8-20z"
            fill="currentColor"
          />
          <path
            d="M12 8c1 4 1 10 0 16M20 8c-1 4-1 10 0 16M16 6v28"
            stroke="#1A1208"
            strokeWidth="1.2"
            fill="none"
            opacity=".35"
          />
        </svg>
        <span>KUKURYDZA</span>
      </a>
      <nav className="nav" aria-label="Główne">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
