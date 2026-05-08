# High-End UI & UX Design Guidelines

*Synthesized from top design skills on skills.sh*

## 1. The Sentinel Aesthetic (Glassmorphism)
- **Backgrounds:** Use deep blacks (`#020202`) with subtle radial gradients.
- **Surface:** Panels should use `bg-white/[0.03]` with `backdrop-blur-xl`.
- **Borders:** Use thin, semi-transparent borders (`border-white/10`).

## 2. Micro-interactions
- **Feedback:** Every button click should have a scale down (`0.98`) and scale up (`1.02`) spring animation.
- **Loading:** Use skeleton loaders that mimic the actual component structure, with a subtle pulse animation.
- **Hover States:** Use "Magnetic" effects for primary buttons where the icon or text subtly follows the cursor.

## 3. Visual Hierarchy
- **Typography:** Contrast large, bold headings with small, uppercase, widely-spaced labels for metadata.
- **Color:** Use monochromatic palettes with a single accent color (e.g., Emerald for success, Rose for danger).
- **Depth:** Use multiple layers of shadows and blurs to create a sense of physical space.

## 4. Animation Guidelines
- **Staggered Lists:** Always stagger the entrance of list items or grid elements (`delay: i * 0.1`).
- **Smooth Scrolling:** Use `lenis` for smooth, inertial scrolling across the entire application.
- **Transitions:** Use `AnimatePresence` for all component mounting/unmounting.
