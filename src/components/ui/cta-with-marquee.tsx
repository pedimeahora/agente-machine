import { useState } from "react";
import { Mail, MessageCircle, Calendar, Database, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

/* ─── Scramble Button ─── */
function ScrambleButton({ text, onClick }: { text: string; onClick?: () => void }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) =>
          index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <button
      onMouseEnter={scramble}
      onClick={onClick}
      className="px-5 sm:px-8 py-3.5 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-zinc-100 transition-all shadow-lg shadow-white/10 pointer-events-auto"
    >
      {displayText}
    </button>
  );
}

/* ─── Automation Flow Visual ─── */
function AutomationFlow() {
  const nodes = [
    { icon: Mail, label: "Email / Lead", color: "from-blue-500 to-indigo-600", glow: "group-hover:shadow-blue-500/40" },
    { icon: MessageCircle, label: "WhatsApp", color: "from-green-400 to-emerald-600", glow: "group-hover:shadow-emerald-500/40" },
    { icon: Calendar, label: "Reunión", color: "from-purple-500 to-violet-600", glow: "group-hover:shadow-purple-500/40" },
    { icon: Database, label: "CRM / DB", color: "from-cyan-400 to-sky-600", glow: "group-hover:shadow-cyan-500/40" },
    { icon: Mail, label: "Email auto", color: "from-orange-400 to-rose-500", glow: "group-hover:shadow-orange-500/40" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 py-6 px-4">
      {/* Central AI node */}
      <div className="relative mb-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-pulse">
          <Zap className="w-7 h-7 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-zinc-950 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>
        <p className="text-center text-[10px] text-purple-300 font-black uppercase tracking-widest mt-1.5">Agente IA</p>
      </div>

      {/* Incoming arrows */}
      <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">← recibe →</div>

      {/* Source nodes */}
      <div className="flex gap-3 flex-wrap justify-center">
        {nodes.slice(0, 3).map((n, i) => (
          <div key={i} className={`group flex flex-col items-center gap-1.5`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center shadow-lg ${n.glow} transition-shadow duration-300`}>
              <n.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[9px] text-zinc-400 font-semibold">{n.label}</span>
          </div>
        ))}
      </div>

      {/* Arrow down */}
      <ArrowRight className="w-4 h-4 text-purple-400 rotate-90 animate-bounce" />

      {/* Output nodes */}
      <div className="flex gap-3 flex-wrap justify-center">
        {nodes.slice(3).map((n, i) => (
          <div key={i} className={`group flex flex-col items-center gap-1.5`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center shadow-lg ${n.glow} transition-shadow duration-300`}>
              <n.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[9px] text-zinc-400 font-semibold">{n.label}</span>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 mt-3 pt-3 border-t border-zinc-900/40 w-full justify-center">
        {[
          { label: "24/7", desc: "Activo" },
          { label: "< 1s", desc: "Respuesta" },
          { label: "0", desc: "Errores" },
        ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-sm font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{s.label}</div>
            <div className="text-[9px] text-zinc-600 uppercase tracking-widest">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Highlights ─── */
const highlights = [
  "Respondés leads en segundos, no en horas",
  "Seguimiento automático sin intervención humana",
  "Integración con WhatsApp, email y tu CRM",
];

interface CTAWithMarqueeProps {
  onCTAClick?: () => void;
}

export function CTAWithMarquee({ onCTAClick }: CTAWithMarqueeProps) {
  return (
    <div
      className="w-full rounded-3xl overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, rgba(10,5,22,0.97) 0%, rgba(20,10,40,0.97) 100%)",
        border: "1px solid rgba(168,85,247,0.2)",
        boxShadow: "0 0 60px rgba(168,85,247,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

      <div className="grid lg:grid-cols-2 gap-0 items-center">
        {/* Left — Copy */}
        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12 space-y-5 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Trabajamos Contigo
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight text-white mb-3">
              El futuro del{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                trabajo digital
              </span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Mientras tu competencia responde mails manualmente,{" "}
              <strong className="text-white">vos ya cerraste 3 ventas más con tu agente de IA.</strong>
            </p>
          </div>

          {/* Highlight list */}
          <ul className="space-y-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                {h}
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <ScrambleButton text="Agendar Llamada Gratis" onClick={onCTAClick} />
          </div>
        </div>

        {/* Right — Automation Flow Visual */}
        <div
          className="relative min-h-[240px] sm:min-h-[320px] border-t lg:border-t-0 lg:border-l overflow-hidden"
          style={{ borderColor: "rgba(168,85,247,0.15)" }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(to right, rgba(168,85,247,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <AutomationFlow />
        </div>
      </div>
    </div>
  );
}
