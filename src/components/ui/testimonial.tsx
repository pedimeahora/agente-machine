import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
    quote: "Automatizaron todo nuestro proceso de presupuestos. Pasamos de 2 horas manuales a respuesta instantánea por WhatsApp.",
    name: "Martín Gómez",
    role: "CEO — Constructora",
  },
  {
    image: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=600",
    quote: "La landing que nos hicieron convierte 3x más que la anterior. El diseño es increíblemente moderno y carga muy rápido.",
    name: "Diego Fernández",
    role: "Director Comercial",
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600",
    quote: "El agente de IA maneja todo nuestro onboarding de clientes. Ahorramos 20 horas semanales desde el primer mes.",
    name: "Laura Sánchez",
    role: "Fundadora — SaaS",
  },
];

export function TestimonialCards() {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-6">
      {testimonials.map((t, i) => (
        <div 
          key={i} 
          className="max-w-80 bg-zinc-950 text-white rounded-3xl border border-zinc-900/60 hover:border-purple-500/40 hover:shadow-[0_10px_30px_rgba(168,85,247,0.05)] transition-all duration-500 p-6 flex flex-col justify-between"
        >
          <div>
            {/* Stars rating */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            {/* Quote */}
            <p className="text-xs font-light text-zinc-300 leading-relaxed mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
          </div>
          
          {/* Smaller Circular Avatar & Info */}
          <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-900/40">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-zinc-800">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{t.name}</p>
              <p className={cn(
                "text-[10px] font-semibold bg-gradient-to-r from-purple-400 to-orange-400 text-transparent bg-clip-text truncate"
              )}>
                {t.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TestimonialAvatars() {
  const avatars = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150",
    "https://images.unsplash.com/photo-1489980508314-941910ded1f4?q=80&w=150",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150",
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-3">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-zinc-950 hover:-translate-y-1 transition-transform"
            style={{ zIndex: i + 1 }}
          />
        ))}
      </div>
      <div className="border-l border-zinc-900 pl-4">
        <div className="flex items-center gap-1 mb-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-zinc-400 font-semibold ml-1 text-xs">5.0</span>
        </div>
        <p className="text-[10px] text-zinc-500">
          Confiado por <span className="font-semibold text-zinc-300">+100 empresas</span>
        </p>
      </div>
    </div>
  );
}

