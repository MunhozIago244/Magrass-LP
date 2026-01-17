"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  avatar: string; 
  review: string;
  result?: string;
}

const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => (
  /* Ajustado para largura menor (320px-380px) e altura maior (500px) para fotos verticais */
  <div className="group relative h-[480px] w-[320px] md:h-[550px] md:w-[380px] shrink-0 overflow-hidden rounded-[3rem] border border-white/10 bg-magrass-blue shadow-2xl transition-all duration-500 hover:border-gold/50">
    
    {/* Foto Vertical de Fundo */}
    <div className="absolute inset-0 z-0">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      {/* Overlay Vertical: Escurece mais na base para legibilidade do nome e texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-magrass-blue via-magrass-blue/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
    </div>

    {/* Conteúdo do Card - Foco na base (estilo Instagram Stories/TikTok) */}
    <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
      
      {/* Ícone de Aspas Flutuante */}
      <div className="absolute top-8 right-8 opacity-20">
        <Quote className="text-gold rotate-180" size={40} strokeWidth={1} />
      </div>

      <div className="flex flex-col items-start gap-4">
        {/* Estrelas */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-gold text-gold" />
          ))}
        </div>

        {/* Depoimento: Agora com mais espaço vertical para leitura */}
        <p className="text-white text-lg md:text-xl font-light italic leading-snug drop-shadow-md line-clamp-6">
          "{testimonial.review}"
        </p>

        {/* Identidade com linha vertical de destaque */}
        <div className="flex flex-col border-l-2 border-gold pl-4 mt-2">
          <span className="text-white font-bold text-base uppercase tracking-widest leading-none mb-1">
            {testimonial.name}
          </span>
          {testimonial.result && (
            <span className="text-gold font-black text-[10px] uppercase tracking-[0.2em]">
              {testimonial.result}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
));

TestimonialCard.displayName = "TestimonialCard";

const HorizontalCanopyRow = ({ 
  testimonials, 
  reverse, 
  duration 
}: { 
  testimonials: Testimonial[], 
  reverse: boolean, 
  duration: string 
}) => (
  <div 
    className="group relative flex w-full overflow-hidden py-8 [--gap:32px]"
    style={{ "--duration": duration } as React.CSSProperties}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={cn(
          "flex shrink-0 [gap:var(--gap)] animate-canopy-horizontal px-[calc(var(--gap)/2)]",
          "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {testimonials.map((t, idx) => (
          <TestimonialCard key={`${i}-${idx}`} testimonial={t} />
        ))}
      </div>
    ))}
  </div>
);

const KineticTestimonial = ({
  testimonials = [],
  speed = 0.8, // Velocidade um pouco menor para facilitar a leitura em cards altos
  title = "Transformações Reais",
  subtitle = "O que nossas clientes de Hortolândia dizem sobre sua jornada Magrass.",
}) => {
  return (
    <section className="py-24 bg-magrass-blue relative overflow-hidden">
      {/* Máscaras Laterais */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-magrass-blue to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-magrass-blue to-transparent z-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 mb-16 text-center md:text-left">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black">Resultados Magrass</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-serif text-white mb-6 tracking-tighter">
            {title.split(' ')[0]} <span className="text-gold italic font-normal">{title.split(' ')[1]}</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl mx-auto md:mx-0">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Como os cards são verticais e altos, uma única linha costuma ser mais elegante e menos poluída */}
      <div className="flex flex-col w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <HorizontalCanopyRow 
          testimonials={testimonials} 
          reverse={false} 
          duration={`${60 / speed}s`} 
        />
      </div>
    </section>
  );
};

export default memo(KineticTestimonial);