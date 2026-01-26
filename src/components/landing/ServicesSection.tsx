"use client";

import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import {
  Scale,
  Sparkles,
  Heart,
  Leaf,
  ArrowRight,
  Droplets,
  Thermometer,
  Wind,
  User,
  Waves,
  PlayCircle,
  Star,
  Zap,
} from "lucide-react";
import { MorphyButton } from "@/components/ui/morphy-button";

/**
 * Mapa de ícones para garantir tipagem e segurança
 */
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
 * Sublinhado Orgânico Premium com Gradiente
 */
const OrganicUnderline = () => (
  <motion.svg
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 pointer-events-none"
    viewBox="0 0 300 12"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C5A059" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#C5A059" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path
      d="M2 9c40-4.5 80-4.5 120-1.5 40 3 120 4 178-3.5"
      stroke="url(#underlineGradient)"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </motion.svg>
);

const ServicesSection = () => {
  const { services } = CONFIG;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="servicos"
      className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-white via-[#fafafa] to-white overflow-hidden"
    >
      {/* Background Decorativo Aprimorado */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Pattern de Pontos Animado */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #C5A059 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow Effects Sutis */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C5A059] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#131842] rounded-full blur-[140px]"
        />
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        {/* Header da Seção Premium */}
        <div className="flex flex-col gap-8 sm:gap-10 mb-16 sm:mb-24 max-w-7xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Eyebrow com Animação */}
            <div className="flex items-center gap-3 overflow-hidden">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-[2px] w-10 sm:w-14 bg-gradient-to-r from-[#C5A059] to-[#d4b068] origin-left"
                aria-hidden="true"
              />
              <span className="text-[#C5A059] font-black tracking-[0.3em] text-[11px] sm:text-xs uppercase flex items-center gap-2">
                Expertise Magrass
                <Star className="w-3 h-3 fill-[#C5A059]" aria-hidden="true" />
              </span>
            </div>

            {/* Headline Monumental */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-[#131842] leading-[1.08] tracking-[-0.02em] max-w-5xl">
              Protocolos de{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#d4b068] to-[#C5A059] italic font-medium">
                  Elite
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent origin-left"
                  aria-hidden="true"
                />
              </span>{" "}
              para sua
              <br className="hidden sm:block" />
              <span className="relative inline-block mt-2">
                Transformação Real
                <OrganicUnderline />
              </span>
            </h2>
          </motion.div>

          {/* Subheadline com Ícone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative max-w-2xl"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C5A059] via-[#C5A059]/50 to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-start gap-4 pl-6">
              <Zap
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059] flex-shrink-0 mt-1"
                aria-hidden="true"
              />
              <p className="text-slate-600 font-sans text-base sm:text-lg lg:text-xl leading-relaxed italic">
                Tecnologia de ponta e acompanhamento especializado para{" "}
                <span className="text-[#131842] font-semibold not-italic">
                  resultados que elevam sua autoestima.
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Grid Responsivo de Serviços */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 max-w-7xl mx-auto px-2 xs:px-0">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            const waMessage = `Olá! Vi o procedimento de *${service.title}* no site e gostaria de saber mais.`;

            return (
              <motion.div
                key={service.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                {/* Glow Effect no Hover */}
                <div
                  className="absolute -inset-1 bg-gradient-to-br from-[#C5A059]/0 via-[#C5A059]/20 to-[#C5A059]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"
                  aria-hidden="true"
                />

                <div className="relative flex flex-col h-full p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_24px_60px_rgba(197,160,89,0.15)] group-hover:border-[#C5A059]/30 transition-all duration-500 group-hover:-translate-y-3 overflow-hidden">
                  {/* Accent Line Top */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C5A059] via-[#d4b068] to-[#C5A059] origin-left"
                    aria-hidden="true"
                  />

                  {/* Número do Index (Sutil) */}
                  <div
                    className="absolute top-4 right-4 text-5xl font-serif text-[#C5A059]/5 font-bold leading-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex flex-col h-full relative z-10 space-y-6">
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#131842] to-[#1f2554] flex items-center justify-center text-[#C5A059] shadow-lg group-hover:shadow-2xl group-hover:shadow-[#C5A059]/30 transition-all duration-500"
                      >
                        <IconComponent size={28} strokeWidth={2} aria-hidden="true" />
                      </motion.div>

                      <span className="text-[10px] sm:text-[11px] font-black text-[#C5A059] uppercase tracking-[0.2em] px-3.5 py-2 rounded-full bg-[#C5A059]/5 border border-[#C5A059]/20 group-hover:bg-[#C5A059]/10 group-hover:border-[#C5A059]/40 transition-all">
                        {service.category || "Premium"}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="flex-grow space-y-3">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#131842] leading-tight group-hover:text-[#C5A059] transition-colors duration-500">
                        {service.title}
                      </h3>

                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light italic line-clamp-4">
                        {service.description}
                      </p>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Actions Section */}
                    <div className="flex flex-col gap-3">
                      {service.videoUrl && (
                        <motion.a
                          href={service.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver vídeo detalhado sobre ${service.title}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl text-slate-400 text-[11px] font-bold hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-all border border-transparent hover:border-[#C5A059]/20 min-h-[48px] group/video"
                        >
                          <PlayCircle
                            size={18}
                            className="text-[#C5A059] group-hover/video:scale-110 transition-transform"
                            aria-hidden="true"
                          />
                          <span className="tracking-widest uppercase">Ver Método</span>
                          <ArrowRight
                            size={14}
                            className="group-hover/video:translate-x-1 transition-transform"
                            aria-hidden="true"
                          />
                        </motion.a>
                      )}

                      <MorphyButton
                        asChild
                        size="lg"
                        className="w-full bg-gradient-to-r from-[#131842] to-[#1f2554] text-white rounded-2xl shadow-xl hover:shadow-2xl py-6 sm:py-7"
                        dotClassName="bg-[#C5A059]"
                      >
                        <a
                          href={getWhatsAppLink(waMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Agendar agora para ${service.title}`}
                          className="flex items-center justify-center gap-2.5 min-h-[52px] group/cta"
                        >
                          <span className="uppercase tracking-[0.15em] text-xs sm:text-[13px] font-black">
                            Agendar Agora
                          </span>
                          <ArrowRight
                            className="w-5 h-5 group-hover/cta:translate-x-1.5 transition-transform duration-300"
                            aria-hidden="true"
                          />
                        </a>
                      </MorphyButton>
                    </div>

                    {/* Badge de Popularidade (Opcional) */}
                    {index < 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-br from-[#C5A059] to-[#d4b068] text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3" aria-hidden="true" />
                        Mais Procurado
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Secundário (Final da Seção) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-24 text-center max-w-3xl mx-auto"
        >
          <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#131842] to-[#1f2554] rounded-3xl relative overflow-hidden">
            {/* Background Decorativo */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle, #C5A059 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-tight">
                Não encontrou o que procura?
              </h3>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
                Temos diversos outros tratamentos. Fale com nossos especialistas!
              </p>

              <motion.a
                href={getWhatsAppLink("Olá! Gostaria de conhecer outros tratamentos disponíveis.")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-white rounded-full font-bold text-base shadow-[0_10px_40px_rgba(197,160,89,0.4)] hover:shadow-[0_20px_60px_rgba(197,160,89,0.6)] transition-all duration-300 min-h-[56px]"
              >
                <span className="uppercase tracking-wide">Falar com Especialista</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ServicesSection);
