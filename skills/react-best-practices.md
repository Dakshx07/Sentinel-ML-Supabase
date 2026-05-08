# React Performance Best Practices

*Extracted from vercel-labs/agent-skills/react-best-practices*

## 1. Eliminate Data Waterfalls (CRITICAL)
- **Problem:** Sequential `await` calls that block the UI.
- **Solution:** Use `Promise.all()` for independent requests.
- **Example:** 
  ```ts
  // Avoid
  const user = await fetchUser();
  const repos = await fetchRepos();
  
  // Use
  const [user, repos] = await Promise.all([fetchUser(), fetchRepos()]);
  ```

## 2. Dynamic Component Loading
- **Rule:** Use `React.lazy()` for any component that isn't immediately visible (e.g., Modals, Dashboards, complex visualizations).
- **Benefit:** Reduces the initial JavaScript bundle size, improving Largest Contentful Paint (LCP).

## 3. Prevent Unnecessary Re-renders
- **Rule:** Use `useMemo` and `useCallback` for expensive calculations or callback props passed to memoized children.
- **State Management:** Keep state as local as possible. Do not lift state to `App.tsx` unless absolutely necessary.

## 4. Animation Performance
- **Rule:** Animate transform and opacity only. 
- **Tool:** Use `framer-motion`'s `layout` prop for smooth layout transitions instead of animating `height` or `width`.
- **Hardware Acceleration:** Ensure `framer-motion` is using `will-change` on complex animations.
