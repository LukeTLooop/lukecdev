import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Live prefers-reduced-motion value. `serverValue` is what the prerendered HTML
 * assumes before the browser can answer: pick whichever is safer per component.
 */
export function useReducedMotion(serverValue: boolean) {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
