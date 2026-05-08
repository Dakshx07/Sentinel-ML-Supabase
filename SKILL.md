---
name: sentinel-core-developer
description: >
  Specialized knowledge for maintaining and evolving the Sentinel-ML-Supabase project.
  Includes rules for Local-First privacy, high-end visual design (Glassmorphism), 
  and hybrid ML architecture. Use this whenever refactoring or adding new features to Sentinel.
---

# Sentinel Core Developer Skill

## Objective
To ensure that all development on the Sentinel project maintains its professional, "premium" status as a local-first, AI-powered security architect.

## 1. Performance & React Best Practices
*Inspired by vercel-labs/react-best-practices*

- **Async Waterfalls:** When scanning multiple repositories or files, use `Promise.all()` to fetch data in parallel. Never `await` in a loop.
- **Code Splitting:** Always use `React.lazy()` for heavy feature components (e.g., `RefactorSimulator`, `READMEGenerator`) and all top-level `pages`.
- **Barrel Files:** Avoid using barrel files (`index.ts` exporting everything) to keep the Vite dev server fast and bundle size small.

## 2. The "Sentinel" Design System
*Focus on high-end developer tool aesthetics*

- **Theme:** Strictly dark mode (`bg-[#020202]`). Use `bg-white/5` and `backdrop-blur-xl` for cards and panels.
- **Interactions:** Every UI element must use `framer-motion`. 
  - Standard Entrance: `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}`.
  - Hover: Use subtle scale (`1.02`) and border-white/20 transitions.
- **Typography:** Use Inter or heading-specific sans-serif fonts with tight tracking (`tracking-tight`).

## 3. Privacy & "Zero-Knowledge" Policy
- **No Central DB:** We do NOT store user scan results, code, or personal info in Supabase. Supabase is used ONLY for Auth/Identity.
- **Local Persistence:** Use `dbService.ts` (browser storage) for all scan records and user metadata.
- **BYOK (Bring Your Own Key):** All AI logic must flow through the user's provided API keys stored locally.

## 4. Architecture Standards
- **Folder Hierarchy:**
  - `src/components/ui`: Base atoms (Buttons, Inputs, Icons).
  - `src/components/layout`: Global panels (Sidebar, Header).
  - `src/components/features`: Complex domain logic (Scanners, Generators).
  - `src/services`: Business logic and API wrappers.
- **Types:** Strict TypeScript. No use of `any`. Define all interfaces in `types.ts`.

## 5. ML Integration (Hybrid Pass)
- **Classification:** Use the planned CodeBERT model for fast, local vulnerability detection.
- **Generation:** Use Gemini only for high-value tasks like writing patches, explaining bugs, or generating documentation.
