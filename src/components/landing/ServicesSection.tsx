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
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
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
      className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-br from-[#E8F4F8] via-[#D4E8F1] to-[#C9E2EE] overflow-hidden"
    >
      {/* Background Decorativo com Mix de Cores */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Overlay decorativo com mix de cores */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[150px] mix-blend-overlay" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#3CECD4] rounded-full blur-[140px] mix-blend-overlay" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#F4D03F] rounded-full blur-[160px] mix-blend-overlay" />
        </div>

        {/* Pattern de Pontos Sutil */}
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
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
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
                className="h-[2px] w-10 sm:w-14 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] origin-left"
                aria-hidden="true"
              />
              <span className="text-[#D4AF37] font-black tracking-[0.3em] text-[11px] sm:text-xs uppercase flex items-center gap-2">
                Expertise Magrass
                <Star className="w-3 h-3 fill-[#D4AF37]" aria-hidden="true" />
              </span>
            </div>

            {/* Headline Monumental */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-[#131842] leading-[1.08] tracking-[-0.02em] max-w-5xl">
              Protocolos de{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] italic font-medium">
                  Elite
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent origin-left"
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
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent"
              aria-hidden="true"
            />
            <div className="flex items-start gap-4 pl-6">
              <Zap
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] flex-shrink-0 mt-1"
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
                  className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/30 to-[#D4AF37]/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"
                  aria-hidden="true"
                />

                <div className="relative flex flex-col h-full p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#131842]/10 shadow-[0_8px_30px_rgba(19,24,66,0.08)] group-hover:shadow-[0_24px_60px_rgba(212,175,55,0.25)] group-hover:border-[#D4AF37]/30 transition-all duration-500 group-hover:-translate-y-3 overflow-hidden">
                  {/* Accent Line Top */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] origin-left"
                    aria-hidden="true"
                  />

                  {/* Número do Index (Sutil) */}
                  <div
                    className="absolute top-4 right-4 text-5xl font-serif text-[#D4AF37]/8 font-bold leading-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex flex-col h-full relative z-10">
                    {/* Ícone centralizado no topo */}
                    <div className="flex flex-col items-center mb-6">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#131842] to-[#1f2554] flex items-center justify-center text-[#D4AF37] shadow-lg group-hover:shadow-2xl group-hover:shadow-[#D4AF37]/30 transition-all duration-500 mb-3"
                      >
                        <IconComponent size={32} strokeWidth={2} aria-hidden="true" />
                      </motion.div>

                      {/* Badge categoria (se existir) */}
                      {service.category && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#F4D03F]/10 border border-[#D4AF37]/30 group-hover:bg-gradient-to-r group-hover:from-[#D4AF37]/20 group-hover:to-[#F4D03F]/20 group-hover:border-[#D4AF37]/50 transition-all">
                          <Sparkles className="w-3 h-3" aria-hidden="true" />
                          {service.category}
                        </span>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-grow space-y-4 text-center">
                      <h3 className="text-xl sm:text-2xl lg:text-2xl font-serif text-[#131842] leading-tight group-hover:text-[#D4AF37] transition-colors duration-500 px-2">
                        {service.title}
                      </h3>

                      <p className="text-slate-600/90 text-sm sm:text-base leading-relaxed font-light line-clamp-3 px-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent my-5"
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
                          className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl text-slate-400 text-[11px] font-bold hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all border border-transparent hover:border-[#D4AF37]/20 min-h-[48px] group/video"
                        >
                          <PlayCircle
                            size={18}
                            className="text-[#D4AF37] group-hover/video:scale-110 transition-transform"
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
