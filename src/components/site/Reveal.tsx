import { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade-up" | "blur-in";
}

export function Reveal({ children, delay = 0, className = "", variant = "fade-up" }: RevealProps) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? undefined : 0,
        animation: inView
          ? `${variant === "blur-in" ? "blur-in" : "fade-up"} 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
