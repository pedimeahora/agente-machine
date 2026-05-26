import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles, LayoutDashboard, Bot, Send,
  CheckCircle, MessageCircle, Calendar, ChevronDown, Zap, Clock, TrendingUp, Shield
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { TestimonialCards, TestimonialAvatars } from "@/components/ui/testimonial";
import { CTAWithMarquee } from "@/components/ui/cta-with-marquee";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { AgentInteractionShowcase } from "@/components/site/AgentInteractionShowcase";
import { DottedSurface } from "@/components/ui/dotted-surface";


/* ─────────────────────────────────────────────
   Calendly popup launcher
───────────────────────────────────────────── */
declare global { interface Window { Calendly?: { initPopupWidget: (opts: { url: string }) => void } } }

function openCalendlyPopup() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: "https://calendly.com/pedimeahora" });
  } else {
    window.open("https://calendly.com/pedimeahora", "_blank");
  }
}

/* ─────────────────────────────────────────────
   WhatsApp floating button
───────────────────────────────────────────── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/541141604269"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5e] text-white px-4 py-3 rounded-full shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-105 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-white stroke-none" />
      <span className="text-xs font-black tracking-wide uppercase pr-1">WhatsApp</span>
    </a>
  );
}

/* ─────────────────────────────────────────────
   AI Logo
───────────────────────────────────────────── */
function AILogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={`${className} text-purple-500 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-transform duration-300 group-hover:scale-110`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15L85 35V75L50 95L15 75V35L50 15Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <path d="M50 30L73 43V71L50 84L27 71V43L50 30Z" stroke="currentColor" strokeWidth="3" strokeDasharray="4 2" />
      <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
      <line x1="50" y1="15" x2="50" y2="30" stroke="currentColor" strokeWidth="4" />
      <line x1="50" y1="84" x2="50" y2="95" stroke="currentColor" strokeWidth="4" />
      <line x1="15" y1="35" x2="27" y2="43" stroke="currentColor" strokeWidth="4" />
      <line x1="85" y1="35" x2="73" y2="43" stroke="currentColor" strokeWidth="4" />
      <line x1="15" y1="75" x2="27" y2="71" stroke="currentColor" strokeWidth="4" />
      <line x1="85" y1="75" x2="73" y2="71" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

const heroPrompt = `You are given a task to integrate an existing React component in the codebase.
The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.
Determine the default path for components and styles. 
Copy-paste this component to /components/ui folder:
interactive-3d-robot.tsx (Robot Whobee spline scene)`;

const heroSteps = [
  { type: "info" as const, text: "🤖 Inicializando Agente Machine v1.0.4..." },
  { type: "command" as const, text: "verify-environment", delay: 600 },
  { type: "success" as const, text: "Estructura de proyecto Shadcn/Vite detectada.", delay: 400 },
  { type: "success" as const, text: "Tailwind CSS v4 & TypeScript configurados correctamente.", delay: 400 },
  { type: "info" as const, text: "📦 Detectando dependencias faltantes..." },
  { type: "command" as const, text: "npm install @splinetool/react-spline", delay: 800 },
  { type: "success" as const, text: "Instalado con éxito @splinetool/react-spline.", delay: 400 },
  { type: "info" as const, text: "📝 Escribiendo componente en src/components/ui/interactive-3d-robot.tsx...", delay: 600 },
  { type: "success" as const, text: "Archivo escrito correctamente (43 líneas).", delay: 500 },
  { type: "info" as const, text: "⚡ Ejecutando TypeScript compiler check...", delay: 600 }
];

const heroCode = `'use client';

import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ 
  scene, 
  className 
}: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}`;

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */

export default function Index() {
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const calendlyRef = useRef<HTMLElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nombre: "", email: "", mensaje: "" });
    }, 3000);
  };

  const scrollToCalendly = () => {
    openCalendlyPopup();
  };

  return (
    <div
      className="w-full min-h-screen text-zinc-100 font-sans relative flex flex-col overflow-x-hidden selection:bg-purple-500/20"
      style={{ backgroundColor: "#0a0516", colorScheme: "dark" }}
    >
      {/* PARTICLE BACKGROUND — full page */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: "linear-gradient(160deg,#0a0516 0%,#05060f 50%,#0c051a 100%)" }}>
        <DottedSurface />
      </div>

      {/* BACKGROUND GLOWS on top of particle layer */}
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full opacity-[0.22] blur-[160px] pointer-events-none z-0" style={{ backgroundColor: "#7c3aed" }} />
      <div className="fixed bottom-[10%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[140px] pointer-events-none z-0" style={{ backgroundColor: "#0891b2" }} />

      {/* ── NAVBAR ── */}
      <nav className="w-full bg-black/50 backdrop-blur-xl border-b border-zinc-900/80 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3 group">
          <AILogo className="w-7 h-7" />
          <span className="text-xs font-black tracking-[0.2em] text-white uppercase group-hover:text-purple-400 transition-colors">AGENTE MACHINE</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/541141604269"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/10 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
          <button
            onClick={scrollToCalendly}
            className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-bold px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Agendar Llamada
          </button>
        </div>
      </nav>

      <main className="flex-1 relative z-10">

        {/* ── HERO SECTION ── */}
        <section className="px-4 pt-8 pb-4 max-w-6xl mx-auto">
          <Card className="w-full min-h-[520px] relative overflow-hidden" style={{ backgroundColor: "rgba(10,5,22,0.85)", borderColor: "rgba(168,85,247,0.2)" }}>
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="flex flex-col lg:flex-row h-full min-h-[520px]">
              {/* Left content */}
              <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase w-fit" style={{ backgroundColor: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc" }}>
                  <Sparkles className="w-3 h-3" style={{ color: "#a855f7" }} />
                  <span>Automatización Empresarial · IA en Producción</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                  <span style={{ backgroundImage: "linear-gradient(180deg,#f9fafb,#9ca3af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    ¿Cuántas horas<br />perdés por
                  </span>
                  <br />
                  <span style={{ backgroundImage: "linear-gradient(90deg,#c084fc,#22d3ee,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    tareas que ya hace la IA?
                  </span>
                </h1>

                <p className="text-sm leading-relaxed max-w-md" style={{ color: "#a1a1aa" }}>
                  <strong style={{ color: "#e4e4e7" }}>Cada hora perdida en tareas repetitivas es capacidad que tu equipo no recupera.</strong> Implementamos agentes de IA que automatizan procesos internos en cualquier tipo de organización: administración, atención, documentación y coordinación.
                </p>

                {/* Avatar testimonials inline */}
                <div className="pt-2">
                  <TestimonialAvatars />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={scrollToCalendly}
                    className="bg-white hover:bg-zinc-200 text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar Llamada
                  </button>
                  <a
                    href="https://wa.me/541141604269"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#25D366]/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Right: 3D Robot Simulator */}
              <div className="flex-1 p-4 lg:p-8 flex items-center justify-center relative min-h-[420px] lg:min-h-full">
                <div className="w-full h-full relative z-20 min-h-[400px]">
                  <InteractiveRobotSpline
                    scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                    className="w-full h-full absolute inset-0"
                  />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ── SCROLL HINT ── */}
        <div className="flex justify-center py-4">
          <div className="flex flex-col items-center gap-1 animate-bounce" style={{ color: "#52525b" }}>
            <span className="text-[9px] font-bold tracking-widest uppercase">Explorar</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <section className="py-6 max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: "Horas ahorradas", value: "+20h", sub: "por semana por cliente", color: "#a855f7" },
              { icon: TrendingUp, label: "Conversiones", value: "3x", sub: "más que sin automatizar", color: "#22d3ee" },
              { icon: Zap, label: "Tiempo de respuesta", value: "< 1s", sub: "frente a las 4h manuales", color: "#f59e0b" },
              { icon: Shield, label: "Disponibilidad", value: "24/7", sub: "sin días libres ni feriados", color: "#10b981" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-4 text-center" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: s.color }} />
                <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "#e4e4e7" }}>{s.label}</div>
                <div className="text-[9px] mt-0.5" style={{ color: "#71717a" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICIOS (BENTO GRID) ── */}
        <section className="py-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ color: "#a855f7", backgroundColor: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <Zap className="w-3 h-3" />
              Cómo lo hacemos
            </div>
            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#ffffff" }}>Dos soluciones. Un resultado: más ventas.</h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: "#71717a" }}>Combinamos interfaces premium con flujos de IA para que tu negocio opere sólo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-8 rounded-3xl flex flex-col justify-between min-h-[240px] transition-all duration-300 relative overflow-hidden group" style={{ background: "linear-gradient(180deg,rgba(10,5,22,0.95) 0%,rgba(5,3,12,0.98) 100%)", border: "1px solid rgba(168,85,247,0.15)" }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl transition-all group-hover:opacity-100 opacity-50" style={{ backgroundColor: "rgba(168,85,247,0.12)" }} />
              <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  <LayoutDashboard className="w-5 h-5" style={{ color: "#a855f7" }} />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight transition-colors" style={{ color: "#ffffff" }}>
                  Sitio Web que Convierte
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#71717a" }}>
                  Tu próximo sitio no es solo una tarjeta de presentación. Es la presencia digital de tu organización: rápida, moderna y diseñada para transmitir confianza y facilitar el contacto con clientes, inquilinos o proveedores las 24 horas.
                </p>
              </div>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#a855f7" }}>→ Next.js · Tailwind · SEO técnico</div>
            </div>

            <div className="p-8 rounded-3xl flex flex-col justify-between min-h-[240px] transition-all duration-300 relative overflow-hidden group" style={{ background: "linear-gradient(180deg,rgba(10,5,22,0.95) 0%,rgba(5,3,12,0.98) 100%)", border: "1px solid rgba(34,211,238,0.15)" }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl transition-all group-hover:opacity-100 opacity-50" style={{ backgroundColor: "rgba(34,211,238,0.08)" }} />
              <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)" }}>
                  <Bot className="w-5 h-5" style={{ color: "#22d3ee" }} />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight transition-colors" style={{ color: "#ffffff" }}>
                  Agente IA que Trabaja Solo
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#71717a" }}>
                  Olvidáte de las tareas que tu equipo repite todos los días. Tu agente puede gestionar consultas, coordinar turnos, registrar reclamos, enviar documentos y actualizar registros — sin intervención humana, en cualquier rubro.
                </p>
              </div>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: "#22d3ee" }}>→ n8n · APIs · WhatsApp · Email</div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ── */}
        <section className="py-12 max-w-5xl mx-auto px-6">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ color: "#a855f7", backgroundColor: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <Sparkles className="w-3 h-3" />
              Resultados Reales
            </div>
            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#ffffff" }}>Empresas que dejaron de perder tiempo</h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "#71717a" }}>
              No prometemos. Demostramos con números concretos lo que la automatización hace por tu negocio.
            </p>
          </div>
          <TestimonialCards />
        </section>

        {/* ── CTA CON MARQUEE ── */}
        <section className="py-8 max-w-5xl mx-auto px-6">
          <CTAWithMarquee onCTAClick={scrollToCalendly} />
        </section>

        {/* ── CALENDLY ── */}
        <section id="calendly" className="py-12 max-w-3xl mx-auto px-6">
          <div
            className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.12) 0%,rgba(10,5,22,0.97) 60%)", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 0 80px rgba(168,85,247,0.08)" }}
          >
            {/* Glow decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(168,85,247,0.12)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(34,211,238,0.06)" }} />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ color: "#a855f7", backgroundColor: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
                <Calendar className="w-3 h-3" />
                Sesión de Diagnóstico Gratuita
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-black mb-3" style={{ color: "#ffffff" }}>Reservá tu llamada de 30 min</h2>
                <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "#a1a1aa" }}>
                  Analizamos tu negocio, identificamos qué tareas te están costando plata cada día y te mostramos cómo automatizarlas.
                  <strong style={{ color: "#e4e4e7" }}> Sin compromiso. Sin costo.</strong>
                </p>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-3 justify-center">
                {["Sin compromiso de compra", "Resultados en la primera sesión", "Expertos en tu industria"].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7" }}>
                    <CheckCircle className="w-3 h-3" />
                    {b}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={openCalendlyPopup}
                  className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105"
                  style={{ backgroundColor: "#ffffff", color: "#000000", boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
                >
                  📅 Elegir fecha y hora
                </button>
                <a
                  href="https://wa.me/541141604269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp directo
                </a>
              </div>

              <p className="text-[10px]" style={{ color: "#52525b" }}>+100 empresas ya automatizadas · Respuesta en menos de 24h</p>
            </div>
          </div>
        </section>

        {/* ── FORMULARIO DE CONTACTO ── */}
        <section id="contacto" className="py-12 max-w-md mx-auto px-6">
          <div className="text-center mb-6 space-y-1">
            <h2 className="text-xl font-black text-white">¿Preferís escribirnos?</h2>
            <p className="text-zinc-500 text-xs">También podés enviarnos un mensaje directamente.</p>
          </div>
          <div className="bg-zinc-950/80 backdrop-blur-2xl border border-zinc-900 rounded-3xl p-6 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

            <div className="flex items-center space-x-2 text-xs text-zinc-400 pb-2 border-b border-zinc-900/60">
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-zinc-200 tracking-wide uppercase text-[10px]">Configurador de Proyectos</span>
            </div>

            {enviado ? (
              <div className="py-12 text-center space-y-3 flex flex-col items-center justify-center">
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
                  <CheckCircle className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">¡Solicitud Registrada!</h4>
                <p className="text-[11px] text-zinc-500 max-w-xs leading-relaxed">Nos ponemos en contacto hoy mismo para evaluar tu estructura.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-[11px]">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-semibold tracking-wide uppercase text-[9px]">Nombre / Empresa</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-purple-500 transition-all font-medium"
                     placeholder="Ej: Mi Empresa S.A."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-semibold tracking-wide uppercase text-[9px]">Email de Contacto</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-purple-500 transition-all font-medium"
                    placeholder="tu@empresa.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 font-semibold tracking-wide uppercase text-[9px]">¿Qué necesitas delegar en la IA?</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:border-purple-500 transition-all resize-none font-medium"
                    placeholder="Ej: seguimiento de reclamos, emisión de facturas, coordinación de turnos, atención de consultas frecuentes, gestión de documentos..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl font-black flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider shadow-lg"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-black border-t border-zinc-900 py-8 px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 group">
            <AILogo className="w-6 h-6" />
            <span className="text-[11px] font-black tracking-[0.2em] text-zinc-400 uppercase group-hover:text-purple-400 transition-colors">AGENTE MACHINE</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/541141604269"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#1ebe5e] transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              +54 11 4160-4269
            </a>
            <button
              onClick={openCalendlyPopup}
              className="transition-colors text-xs font-semibold flex items-center gap-1.5 hover:text-zinc-300" style={{ color: "#71717a" }}
            >
              <Calendar className="w-3.5 h-3.5" />
              Agenda
            </button>
          </div>
          <p className="text-[10px] text-zinc-700 font-mono">
            © {new Date().getFullYear()} AGENTE MACHINE
          </p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <WhatsAppButton />
    </div>
  );
}
