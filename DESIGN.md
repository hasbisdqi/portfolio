---
name: rnghbt Portfolio
description: A rigorous technical playground
colors:
  primary: "hsl(47.9, 95.8%, 53.1%)"
  primary-foreground: "hsl(26, 83.3%, 14.1%)"
  background: "hsl(0, 0%, 100%)"
  foreground: "hsl(20, 14.3%, 4.1%)"
  background-dark: "hsl(20, 14.3%, 4.1%)"
  foreground-dark: "hsl(60, 9.1%, 97.8%)"
  muted: "hsl(60, 4.8%, 95.9%)"
  border: "hsl(20, 5.9%, 90%)"
typography:
  display:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontWeight: 700
  body:
    fontFamily: "var(--font-geist-sans), sans-serif"
    fontWeight: 400
  label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
---

# Design System: rnghbt Portfolio

## Overview

**Creative North Star: "The Rigorous Playground"**

This portfolio marries serious, uncompromising technical execution with the relaxed, slightly goofy energy of the "rnghbt / Doofus Rick" persona. The aesthetic philosophy is warm and approachable: softened edges and a comfortable reading rhythm invite the user in, while the structured, highly-readable layout proves the technical depth. It is a space where rigorous engineering deep-dives feel friendly rather than intimidating.

**Key Characteristics:**
- Unpretentious but technically flawless.
- Warm, high-contrast accents (Doofus Yellow) against clean, analytical backgrounds.
- Frictionless, long-form reading experience.
- Tactile, confident interactive components.

## Colors

The palette uses a high-contrast neutral foundation punctuated by a single, energetic brand accent.

### Primary
- **Doofus Yellow** (`hsl(47.9, 95.8%, 53.1%)`): The core brand accent. Used sparingly for primary actions, active states, and deliberate visual highlights. Brings a playful nod to the brand without overwhelming the technical content.

### Neutral
- **Clean Paper** (`hsl(0, 0%, 100%)` / Dark: `hsl(20, 14.3%, 4.1%)`): The foundational background. Serves as a quiet container that lets the writing speak.
- **Deep Ink** (`hsl(20, 14.3%, 4.1%)` / Dark: `hsl(60, 9.1%, 97.8%)`): High-contrast foreground text ensuring maximum legibility for long-form writeups.
- **Muted Surface** (`hsl(60, 4.8%, 95.9%)` / Dark: `hsl(12, 6.5%, 15.1%)`): Used for secondary backgrounds, code block surfaces, and subtle container differentiation.
- **Structural Border** (`hsl(20, 5.9%, 90%)` / Dark: `hsl(12, 6.5%, 15.1%)`): Provides crisp architectural hierarchy between sections and cards.

### Named Rules
**The Spotlight Rule.** Doofus Yellow is used for emphasis, not decoration. It should draw the eye to exactly one primary action or key takeaway per viewport.

## Typography

**Display Font:** Geist Sans
**Body Font:** Geist Sans
**Label/Mono Font:** Geist Mono

**Character:** Modern, geometric, and exceptionally clean. Geist provides the serious, engineered precision that contrasts perfectly with the playful brand identity.

### Hierarchy
- **Display** (Bold): Article titles and major section headers. Unapologetic and clear.
- **Body** (Regular, comfortable line-height): The workhorse for deep technical writeups. Max line length stays around 70ch to ensure a frictionless reading experience.
- **Label / Code** (Geist Mono, Regular): Used for code snippets, metadata, and technical notation. Signals "engineering rigor."

## Layout

The layout prioritizes a distraction-free reading rhythm. Content is centered in a single column for deep-dives, with ample whitespace (`spacing.lg`) between major conceptual blocks. The grid is structured but never feels crowded, ensuring the cognitive load remains purely on the technical subject matter.

## Elevation & Depth

Structured & Layered. The system uses a clear architectural hierarchy. 

### Shadow Vocabulary
- **Card Base** (`border` + `shadow-sm`): Elements sit in distinct containers with crisp borders and very slight, tight drop shadows to separate them from the canvas.
- **Interactive Lift** (`shadow-md`): On hover, clickable elements lift slightly to signal interactivity.

### Named Rules
**The Tactile Boundary Rule.** Interactive containers (cards, buttons) must have a clear, visible boundary (a border or a shadow) at rest. They never blend vaguely into the background.

## Shapes

Warm but structured. The standard corner radius is `rounded-lg` (8px) for major containers and `rounded-md` (6px) for inner components like buttons. This softens the edges just enough to feel approachable without losing the engineered precision.

## Components

Interactive elements are tactile and confident, with clear boundaries, noticeable hover states, and satisfying click targets.

### Buttons
- **Shape:** `rounded-md` (6px)
- **Primary:** Doofus Yellow background with Deep Ink text. Noticeable hover state (e.g., opacity shift or slight lift).
- **Secondary:** Muted background with Deep Ink text, used for alternative actions.
- **Hover / Focus:** Tactile response; a visible ring on focus for accessibility.

### Cards / Containers
- **Corner Style:** `rounded-lg` (8px)
- **Background:** Clean Paper (solid background).
- **Border:** Crisp 1px Structural Border.
- **Shadow Strategy:** Tight `shadow-sm` to lift off the canvas.

### Code Blocks
- **Style:** Rendered with Geist Mono. Housed in a Muted Surface container with `rounded-md` corners. Syntax highlighting is legible and high-contrast.

## Do's and Don'ts

### Do:
- **Do** use Doofus Yellow sparingly to guide the user's eye to the most important action.
- **Do** maintain a strict maximum line length (~70ch) for all technical writeups.
- **Do** ensure every interactive element has a clear, tactile hover state.

### Don't:
- **Don't** use large washes of bright color that distract from the reading experience.
- **Don't** rely solely on color to indicate hierarchy; use borders and tight shadows to create architectural structure.
- **Don't** use overly decorative typefaces; keep the typography strictly functional and engineered (Geist).
