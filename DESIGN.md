# Design System: KUKURYDZA

<!-- impeccable:design-schema 1 -->

## Direction

Kernel Facade · composition B (Grid). Corn cob as dusk architecture: kernel cells as lit windows, husk as theatrical reveal, scroll as floor-by-floor lighting.

## Color

| Token | Value | Role |
| --- | --- | --- |
| ink | `#1A1208` | page ground |
| ink-2 | `#0D0A06` | deep ground |
| kernel | `#F2C14E` | enamel brand / lit cell |
| kernel-deep | `#D4A017` | cell shade |
| bloom | `#E85D04` | window glow / CTA heat |
| husk | `#F7F1E1` | body text / peel cream |
| seam | `#3D6B2F` | leaf seam accents |

Strategy: **Committed / drenched dusk** — charcoal ground, gold enamel carries brand and lit cells, orange bloom for energy.

## Typography

| Role | Face | Notes |
| --- | --- | --- |
| Display | Big Shoulders Display | architectural condensed; brand + titles |
| Body | Figtree | readable Polish UI copy |

Display ceiling: 6rem. Tracking floor: −0.03em on brand.

## Components

- **Kernel CTA**: organic capsule shape, enamel gradient, bloom glow, uppercase display label
- **Live facade grid**: kernel-shaped cells that light row-by-row on scroll
- **Fact strip**: top-bordered metrics, no cards
- **Material list**: two-column dt/dd inventory

## Imagery

- `assets/hero-kernel-facade.webp` — full-bleed kernel facade with husk peel (authored)
- Canvas ambient shimmer overlays the hero photo
- Illustrative stats labeled as demonstration, not agronomy claims

## Motion

- Scroll lights facade rows (one authored intent)
- CTA glow pulse
- Canvas kernel shimmer (disabled under prefers-reduced-motion)
- Content always visible by default (no opacity-gated reveals)

## Surfaces

- `index.html` — Experience mode showcase landing
