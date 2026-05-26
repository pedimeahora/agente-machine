export function HeroVisual() {
  return (
    <div className="relative h-[520px] w-full">
      {/* Floating orbs */}
      <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 -right-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-glow/20 blur-3xl" />

      {/* Main dashboard card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md animate-float">
          <div className="glass-strong border-gradient rounded-3xl p-6 shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_oklch(0.78_0.18_220)]" />
                <span className="text-xs font-medium text-muted-foreground">Live · Automation</span>
              </div>
              <div className="flex gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
              </div>
            </div>

            <div className="mt-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Ingresos generados</div>
              <div className="mt-1 text-3xl font-bold tracking-tight text-gradient">
                $128,420
              </div>
              <div className="text-xs text-accent mt-1">▲ 32.4% esta semana</div>
            </div>

            {/* Chart */}
            <svg viewBox="0 0 320 100" className="mt-4 w-full h-24">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.68 0.20 255)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="oklch(0.68 0.20 255)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.68 0.20 255)" />
                  <stop offset="100%" stopColor="oklch(0.82 0.16 220)" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 C40,70 60,40 100,45 C140,50 160,20 200,25 C240,30 270,15 320,10 L320,100 L0,100 Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0,80 C40,70 60,40 100,45 C140,50 160,20 200,25 C240,30 270,15 320,10"
                fill="none"
                stroke="url(#chartStroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Leads", v: "248" },
                { l: "Convs", v: "62" },
                { l: "ROI", v: "4.8x" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl bg-surface-2/60 border border-border py-2">
                  <div className="text-sm font-semibold">{m.v}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating side card 1 */}
      <div
        className="absolute top-8 right-2 sm:right-0 glass rounded-2xl p-3 w-48 animate-float-slow shadow-[0_20px_50px_-10px_oklch(0_0_0/0.6)]"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent to-primary grid place-items-center text-xs">⚡</div>
          <div>
            <div className="text-xs font-medium">Workflow IA</div>
            <div className="text-[10px] text-muted-foreground">Ejecutado · 1.2s</div>
          </div>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent" />
        </div>
      </div>

      {/* Floating side card 2 */}
      <div
        className="absolute bottom-10 left-0 glass rounded-2xl p-3 w-52 animate-float shadow-[0_20px_50px_-10px_oklch(0_0_0/0.6)]"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Nuevo lead</div>
        <div className="mt-1 text-sm font-medium">María G. — Plan Pro</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex -space-x-1.5">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-accent border border-background" />
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-accent to-violet-glow border border-background" />
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-glow to-primary border border-background" />
          </div>
          <span className="text-[10px] text-muted-foreground">+18 hoy</span>
        </div>
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 520" fill="none">
        <path
          d="M120 80 C 200 120, 250 200, 350 240"
          stroke="oklch(0.78 0.18 220 / 0.35)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <path
          d="M80 420 C 180 380, 240 340, 320 320"
          stroke="oklch(0.68 0.20 255 / 0.3)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
      </svg>
    </div>
  );
}
