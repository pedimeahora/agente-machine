import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

interface CounterProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function Counter({ to, duration = 1800, prefix = "", suffix = "" }: CounterProps) {
  const { ref, inView } = useInView({ threshold: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const formatted = val.toLocaleString("en-US");
  return (
    <span ref={ref as never}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
