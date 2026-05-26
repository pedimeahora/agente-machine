import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";


const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#testimonios", label: "Clientes" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Agente Machine"
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_24px_oklch(0.72_0.13_195/0.65)]"
            />
            <span className="text-base sm:text-lg font-semibold tracking-tight">
              AGENTE <span className="text-gradient">MACHINE</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="https://calendly.com/agentemachine/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground text-background text-sm font-medium px-4 py-2 hover:bg-foreground/90 transition-all hover:shadow-[0_0_30px_oklch(1_0_0/0.2)]"
          >
            Reservar llamada
          </a>
        </div>
      </div>
    </header>
  );
}
