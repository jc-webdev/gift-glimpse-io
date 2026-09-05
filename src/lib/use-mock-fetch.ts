import { useCallback, useEffect, useRef, useState } from "react";

type Options = { delay?: number; failFirst?: boolean };

/**
 * Simulates a network read so the prototype can show real loading and error
 * states without a backend.
 */
export function useMockFetch<T>(value: T, { delay = 750, failFirst = false }: Options = {}) {
  const [state, setState] = useState<"loading" | "error" | "ready">("loading");
  const [data, setData] = useState<T | null>(null);
  const attempt = useRef(0);

  const run = useCallback(() => {
    setState("loading");
    attempt.current += 1;
    const shouldFail = failFirst && attempt.current === 1;
    const timer = setTimeout(() => {
      if (shouldFail) {
        setState("error");
      } else {
        setData(value);
        setState("ready");
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, failFirst, value]);

  useEffect(() => {
    const cleanup = run();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state === "ready") setData(value);
  }, [value, state]);

  return { state, data, retry: run };
}
