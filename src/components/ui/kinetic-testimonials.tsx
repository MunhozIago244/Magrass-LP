"use client";

import React, { memo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  image: string;
  description: string;
  handle: string;
  result?: string;
}

/**
 * Card Vertical (Portrait) - Mantido conforme design anterior
 */
const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => (
  <div
    className={cn(
      "group relative flex h-[480px] w-[300px] md:w-[350px] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-[3rem] border border-white/10 bg-magrass-blue transition-all duration-500 hover:border-gold/50 shadow-2xl hover:-translate-y-2",
      className
    )}
  >
    <div className="absolute inset-0 z-0">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-magrass-blue via-magrass-blue/40 to-transparent opacity-90" />
    </div>

    <div className="relative z-10 flex flex-col p-8 md:p-10 items-end text-right">
      <Quote className="text-gold/30 rotate-180 mb-4 self-end" size={32} />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-gold text-gold" />
        ))}
      </div>
      <p className="text-white text-lg font-light italic leading-relaxed mb-6 line-clamp-6">
        "{testimonial.description}"
      </p>
      <div className="flex flex-col items-end border-r-2 border-gold pr-4 py-1">
        <span className="text-white font-bold text-sm uppercase tracking-widest mb-1">
          {testimonial.name}
        </span>
        <span className="text-gold font-black text-[10px] uppercase tracking-[0.2em] opacity-80">
          {testimonial.result || "Resultado Magrass"}
        </span>
      </div>
    </div>
  </div>
);

/**
 * Linha de Scroll Horizontal Independente
 */
const ScrollRow = ({ data, reverse = false }: { data: Testimonial[], reverse?: boolean }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inverte a ordem dos dados para a segunda linha se solicitado
  const displayData = reverse ? [...data].reverse() : data;

  return (
    <div className="relative group w-full">
      <div
        ref={scrollRef}
        className={cn(
          "flex w-full overflow-x-auto gap-8 pb-12 pt-4 px-[10vw] no-scrollbar snap-x snap-mandatory scroll-smooth",
          "cursor-grab active:cursor-grabbing"
        )}
      >
        {displayData.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
        {/* Padding final para permitir scroll até o último item */}
        <div className="shrink-0 w-[10vw]" />
      </div>
    </div>
  );
};

export const AnimatedTestimonials = ({
  data,
  className,
}: {
  data: Testimonial[];
  className?: string;
}) => {
  const half = Math.ceil(data.length / 2);
  const firstRow = data.slice(0, half);
  const secondRow = data.slice(half);

  return (
    <section 
      className={cn(
        "relative w-full bg-magrass-blue overflow-hidden py-24",
        // Sombras de profundidade nas bordas
        "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-24 before:bg-gradient-to-b before:from-black/30 before:to-transparent before:z-10",
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-24 after:bg-gradient-to-t after:from-black/30 after:to-transparent after:z-10",
        className
      )}
    >
      <div className="container mx-auto px-6 mb-12 relative z-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black mb-4 block">
              Hortolândia em transformação
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              Vidas que <span className="text-gold italic font-normal">Inspiram</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-4 mb-2">
             <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold items-center flex gap-2">
               Arraste para explorar <ChevronRight size={14} className="animate-pulse" />
             </span>
          </div>
        </div>
      </div>

      {/* Container de Scroll Independente */}
      <div className="flex flex-col gap-4 relative z-20">
        <ScrollRow data={firstRow} />
        <ScrollRow data={secondRow} reverse />
      </div>

      {/* Máscaras laterais fixas para dar o efeito de desfoque nas bordas do scroll */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-20 md:w-40 bg-gradient-to-r from-magrass-blue to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-20 md:w-40 bg-gradient-to-l from-magrass-blue to-transparent" />
    </section>
  );
};

export default memo(AnimatedTestimonials);