import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border mt-32">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Agente Machine" className="h-8 w-8 object-contain" />
              <span className="text-sm font-semibold">
                AGENTE <span className="text-gradient">MACHINE</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Agencia de automatización con IA. Construimos sistemas que venden por ti, 24/7.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Servicios
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#servicios" className="hover:text-foreground text-muted-foreground transition">Diseño Web</a></li>
              <li><a href="#servicios" className="hover:text-foreground text-muted-foreground transition">Automatización IA</a></li>
              <li><a href="#servicios" className="hover:text-foreground text-muted-foreground transition">Funnels</a></li>
              <li><a href="#servicios" className="hover:text-foreground text-muted-foreground transition">Integraciones</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Social
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-foreground text-muted-foreground transition">Twitter / X</a></li>
              <li><a href="#" className="hover:text-foreground text-muted-foreground transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground text-muted-foreground transition">Instagram</a></li>
              <li><a href="#" className="hover:text-foreground text-muted-foreground transition">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground border-t border-border pt-6">
          <div>© {new Date().getFullYear()} Agente Machine. Todos los derechos reservados.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">Privacidad</a>
            <a href="#" className="hover:text-foreground transition">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
