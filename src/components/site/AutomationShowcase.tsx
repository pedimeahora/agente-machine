import { Phone, Mail, FileText, Calendar, MessageSquare, Clock, Zap, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const tasks = [
  { icon: Phone, label: "Llamadas de seguimiento", time: "4h / día", color: "from-primary/40 to-accent/20" },
  { icon: Mail, label: "Respuestas a emails", time: "3h / día", color: "from-accent/40 to-primary/20" },
  { icon: FileText, label: "Tareas administrativas", time: "5h / día", color: "from-primary/40 to-accent/30" },
  { icon: Calendar, label: "Agendar reuniones", time: "2h / día", color: "from-accent/40 to-primary/30" },
  { icon: MessageSquare, label: "Atención por WhatsApp", time: "6h / día", color: "from-primary/30 to-accent/40" },
];

export function AutomationShowcase() {
  return (
    <section id="automatizaciones" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-accent">Automatizaciones</div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Recupera <span className="text-gradient">+20 horas</span> a la semana.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada tarea repetitiva que automatizamos es tiempo y dinero que vuelve a tu negocio.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Animated task pipeline */}
          <div className="relative">
            <div className="space-y-3">
              {tasks.map((t, i) => (
                <Reveal key={t.label} delay={i * 100}>
                  <div
                    className="group relative glass border-gradient rounded-2xl p-4 flex items-center gap-4 overflow-hidden animate-float-task"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    {/* Moving energy line */}
                    <div className="absolute inset-y-0 left-0 w-full overflow-hidden pointer-events-none">
                      <div
                        className="absolute inset-y-0 h-full w-32 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-shimmer"
                        style={{ animationDelay: `${i * 0.6}s` }}
                      />
                    </div>

                    <div className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.color} border border-white/10 text-accent`}>
                      <t.icon className="h-5 w-5" />
                    </div>

                    <div className="relative flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{t.label}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Clock className="h-3 w-3" />
                        Antes: {t.time}
                      </div>
                    </div>

                    <div className="relative flex items-center gap-1.5 text-xs font-medium text-primary">
                      <CheckCircle2 className="h-4 w-4 animate-pulse" />
                      <span className="hidden sm:inline">Automatizado</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right side — animated dashboard */}
          <Reveal delay={200} variant="blur-in">
            <div className="relative glass-strong border-gradient rounded-3xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Tiempo ahorrado
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-gradient">20h</span>
                    <span className="text-sm text-muted-foreground">/semana</span>
                  </div>
                </div>
                <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center shadow-[0_0_40px_oklch(0.72_0.13_195/0.5)] animate-float">
                  <Zap className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>

              {/* Animated bars */}
              <div className="mt-8 space-y-4">
                {[
                  { label: "Llamadas", before: 70, after: 95 },
                  { label: "Emails", before: 55, after: 90 },
                  { label: "Admin", before: 40, after: 88 },
                  { label: "Reuniones", before: 60, after: 92 },
                ].map((b, i) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{b.label}</span>
                      <span className="text-accent font-medium">+{b.after - b.before}%</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full animate-grow-bar"
                        style={{
                          width: `${b.after}%`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-gradient">24/7</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Activo</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gradient">0</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Errores</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gradient">∞</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Escala</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
