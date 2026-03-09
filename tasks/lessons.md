# Lessons

Patterns captured from corrections. Review at session start.

---

## 1. Nested `<button>` inside `<button>` — hydration error

**What went wrong:** Built a pill trigger with a dismiss `<button>` nested inside the outer `<button>`. Invalid HTML, causes React hydration error.

**Why it happened:** Designing for visual appearance (all elements inside one rounded pill) without checking HTML validity.

**Rule:** When a clickable container needs a child action button, use a `<div>` as the outer wrapper and make both interactive elements sibling `<button>`s inside it. Never nest buttons.

---
