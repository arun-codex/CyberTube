# CyberTube — Design System Specification

**Theme Direction:** Technical Editorial + Restrained Cybersecurity Utility  
**Version:** 1.0.0 (Production)  

---

## 1. Aesthetic Philosophy & Personality

CyberTube is a professional, trustworthy cybersecurity education environment.
- **Calm, deliberate, technical**: No gratuitous neon glow, matrix rain, or decorative terminal widgets.
- **High-contrast readability**: Crisp typography, clear hierarchical sizing, generous line heights.
- **Predictable surfaces**: Elevated dark slate/graphite for cards, crisp borders, and subtle cyan/emerald status highlights.

---

## 2. Design Tokens & Color Matrix

### Light & Dark Semantics (`app/globals.css`)

```css
:root {
  color-scheme: light;
  --canvas: #FFFFFF;
  --surface: #F8FAFC;
  --surface-subtle: #F1F5F9;
  --surface-elevated: #FFFFFF;
  --card-bg: #FFFFFF;

  --border: #E2E8F0;
  --border-strong: #CBD5E1;

  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #64748B;

  --accent-cyan: #0891B2;
  --accent-cyan-hover: #0E7490;
  --accent-cyan-subtle: rgba(8, 145, 178, 0.08);

  --accent-emerald: #059669;
  --accent-amber: #D97706;
  --accent-rose: #E11D48;
}

.dark {
  color-scheme: dark;
  --canvas: #090D14;
  --surface: #0F1724;
  --surface-subtle: #141E2E;
  --surface-elevated: #182335;
  --card-bg: #111A27;

  --border: #1E2D42;
  --border-strong: #2A3E5C;

  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;

  --accent-cyan: #22D3EE;
  --accent-cyan-hover: #67E8F9;
  --accent-cyan-subtle: rgba(34, 211, 238, 0.12);

  --accent-emerald: #34D399;
  --accent-amber: #FBBF24;
  --accent-rose: #FB7185;
}
```

---

## 3. Typography Hierarchy

- **Headings (H1/H2)**: `Rubik` / `Space Grotesk`, tight tracking (`-0.02em`), semibold/bold.
- **Section Subtitles / Eyebrows**: `IBM Plex Mono` / `font-mono`, uppercase, tracking-wider (`0.05em`), 11–12px.
- **Body Text**: `Rubik` / `sans-serif`, relaxed leading (`1.6`), 14–16px.
- **Code & Metadata**: `IBM Plex Mono`, monospace, tabular numbers.

---

## 4. Spacing, Radii & Layout Scale

- **Container Max**: `1280px` (`container-max`), with responsive gutters (`px-4 sm:px-6 lg:px-8`).
- **Border Radii**:
  - Buttons & Inputs: `rounded-lg` (`6px - 8px`)
  - Cards & Panels: `rounded-xl` (`12px`)
  - Badges & Pills: `rounded-full` / `rounded-md`
- **Touch Target Floor**: Minimum `44px × 44px` for interactive mobile elements.
- **Interactive Focus Rings**: `focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2`.

---

## 5. Shared Component Inventory

1. **`Button`**: Primary (Cyan/Indigo fill), Secondary (Surface + Border), Outline, Ghost, Danger.
2. **`Card`**: Clean border, subtle background, hover:border accent on interactive variants.
3. **`Badge`**: Difficulty (Beginner/Intermediate/Advanced), Resource Type, Pricing (Free/Paid).
4. **`PageHeader`**: Unified title, description, badge, and action slot for all top-level routes.
5. **`NavigationMenu`**: Responsive desktop grouped links with mobile drawer drawer-trap and Escape handling.
