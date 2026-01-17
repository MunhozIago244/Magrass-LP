"use client";
import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import {
  Scale, Sparkles, Heart, Leaf,
  ArrowRight, Droplets, Thermometer,
  Wind, User, Waves, PlayCircle,
} from "lucide-react";
import { MorphyButton } from "@/components/ui/morphy-button";
import { cn } from "@/lib/utils";

// Mapa de ícones para garantir tipagem e segurança
const iconMap: Record<string, React.ElementType> = {
  scale: Scale,
  sparkles: Sparkles,
  heart: Heart,
  leaf: Leaf,
  droplets: Droplets,
  thermometer: Thermometer,
  wind: Wind,
  user: User,
  waves: Waves,
};

/**
 * Sub-componente: Sublinhado Orgânico Animado
 */
const OrganicUnderline = () => (
  <motion.svg
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay: 0.8 }}
    className="absolute -bottom-2 left-0 w-full h-[12px] pointer-events-none"
    viewBox="0 0 300 12"
    fill="none"
  >
    <path
      d="M2 9c40-4.5 80-4.5 120-1.5 40 3 120 4 178-3.5"
      stroke="currentColor"
      className="text-gold/40"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </motion.svg>
);

/**
 * Sub-componente: Card de Serviço Individual
 */
const ServiceCard = memo(
  ({
    service,
    index,
    shouldReduceMotion,
  }: {
    service: (typeof CONFIG.services)[0];
    index: number;
    shouldReduceMotion: boolean;
  }) => {
    const IconComponent = iconMap[service.icon] || Sparkles;
    const waMessage = `Olá! Vi o procedimento de *${service.title}* no site e gostaria de saber mais.`;

    return (
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative flex flex-col p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-gold/20 transition-all duration-500 h-full"
      >
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/[0.01] transition-colors rounded-[2.5rem]" />

        <div className="flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-magrass-blue flex items-center justify-center text-gold shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <IconComponent size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-gold/5 border border-gold/10">
              {service.category || "Premium"}
            </span>
          </div>

          <h3 className="text-2xl font-serif text-magrass-blue mb-4 leading-tight">
            {service.title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-light italic">
            {service.description}
          </p>

          <div className="flex flex-col gap-3">
            {service.videoUrl && (
              <a
                href={service.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-slate-400 text-[10px] font-bold hover:text-magrass-blue hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
              >
                <PlayCircle size={16} className="text-gold" />
                VER DETALHES DO MÉTODO
              </a>
            )}

            <MorphyButton
              asChild
              size="lg"
              className="w-full bg-magrass-blue text-white rounded-2xl shadow-xl py-6"
              dotClassName="bg-gold"
            >
              <a
                href={getWhatsAppLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <span className="uppercase tracking-widest text-[11px] font-black">
                  Agendar Agora
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </MorphyButton>
          </div>
        </div>
      </motion.div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

/**
 * Componente Principal: Seção de Serviços com Sombras de Conexão
 */
const ServicesSection = () => {
  const { services } = CONFIG;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section 
      id="servicos" 
      className={cn(
        "py-24 lg:py-40 bg-magrass-offwhite relative overflow-hidden",
        // Sombra Superior: Cria profundidade com a seção acima
        "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-24 before:bg-gradient-to-b before:from-black/[0.06] before:to-transparent before:z-20",
        // Sombra Inferior: Suaviza a transição para a próxima seção
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-24 after:bg-gradient-to-t after:from-black/[0.06] after:to-transparent after:z-20"
      )}
    >
      {/* Background decorativo sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-magrass-blue/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-black tracking-[0.4em] text-[10px] uppercase">
                O Padrão Magrass de Resultados
              </span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-serif text-magrass-blue leading-[1.05] tracking-tighter">
              Protocolos de <span className="text-gold italic font-normal">Elite</span> <br />
              para sua{" "}
              <span className="relative inline-block">
                Transformação
                <OrganicUnderline />
              </span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <p className="text-slate-500 font-sans text-lg leading-relaxed border-l-2 border-gold/30 pl-8 py-2">
              Tecnologia de ponta e métodos exclusivos para entregar o corpo e a autoestima que você deseja.
            </p>
          </motion.div>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ServicesSection);