"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { MessageCircle, Star, ShieldCheck, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { AnimatedTextGenerate } from "@/components/ui/animated-text-generate";

const HeroSection = () => {
  const { hero } = CONFIG;
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D5F5F] via-[#0A4D4D] to-[#063838]">
      {/* Background com imagem e overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#063838]/95 via-[#0A4D4D]/85 to-[#063838]/90 z-10" />
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0.5 } : { scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <img
            src="/assets/images/hero-section-image.webp"
            alt="Magrass Hortolândia - Ambiente Premium"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Luzes de Ambientação Duplas - Dourado */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-20 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-[#D4AF37]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#F4D03F]/15 rounded-full blur-[100px]"
        />
      </div>

      {/* Grid Pattern Sutil */}
      <div
        className="absolute inset-0 z-10 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 py-12 sm:py-16 flex flex-col items-center justify-center min-h-[100dvh]">
        <div className="flex flex-col items-center text-center w-full max-w-7xl mx-auto">
          {/* Badge Superior Premium - Mantido */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex items-center gap-2.5 px-6 py-3 mb-8 sm:mb-12 rounded-full border border-[#D4AF37]/40 bg-gradient-to-r from-[#D4AF37]/10 via-[#F4D03F]/5 to-[#D4AF37]/10 backdrop-blur-xl min-h-[44px] overflow-hidden"
          >
            {/* Shimmer Effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <Trophy className="w-5 h-5 text-[#D4AF37] relative z-10" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-[0.25em] relative z-10">
              27x Destaque Nacional Magrass
            </span>
            <Sparkles className="w-4 h-4 text-[#F4D03F]/60 relative z-10" aria-hidden="true" />
          </motion.div>

          {/* Headline com Tipografia Otimizada */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[1.05] text-white mb-6 sm:mb-10 tracking-[-0.02em] max-w-[18ch] sm:max-w-none px-2 sm:px-0"
          >
            {hero.headline}
            <br className="hidden sm:block" />
            <span className="relative inline-block mt-2 sm:mt-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] italic font-bold">
                {hero.headlineHighlight}
              </span>

              {/* Underline Animado Refinado */}
              <motion.svg
                viewBox="0 0 300 20"
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#F4D03F" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 12 Q 150 6 295 12"
                  fill="none"
                  stroke="url(#goldGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline com Contraste Melhorado */}
          <div className="max-w-xl md:max-w-3xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
            <AnimatedTextGenerate
              text={hero.subheadline}
              className="text-center"
              textClassName="text-slate-300/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed tracking-wide"
              highlightWords={["ciência", "tecnologia", "personalizado", "autoestima"]}
              highlightClassName="text-[#D4AF37] font-semibold"
            />
          </div>

          {/* CTA Premium com Estados Visuais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="w-full sm:w-auto px-4 sm:px-0 mb-2"
          >
            <a
              href={getWhatsAppLink("Olá! Desejo iniciar minha transformação com a Magrass.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-7 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#063838] rounded-full font-bold text-base sm:text-xl shadow-[0_20px_60px_rgba(212,175,55,0.4)] hover:shadow-[0_30px_80px_rgba(212,175,55,0.6)] transition-all duration-500 hover:-translate-y-1.5 active:scale-[0.98] overflow-hidden min-h-[60px] sm:min-h-[72px]"
            >
              {/* Shine Effect no Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>

              <MessageCircle
                className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="tracking-tight uppercase relative z-10 font-black">{hero.cta}</span>
              <ArrowRight
                className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Texto auxiliar do CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-slate-400 text-xs sm:text-sm mb-16 sm:mb-20"
          >
            ✨ Atendimento em até 2 minutos
          </motion.p>

          {/* Trust Bar Premium Redesenhada - GRID 4 COLUNAS RESTAURADO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="w-full max-w-6xl"
          >
            {/* Linha Decorativa Superior */}
            <div className="relative mb-10 sm:mb-12">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <div className="bg-secundary px-4">
                  <div className="flex items-center gap-2 text-[#D4AF37]/60">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                      Excelência Comprovada em Números e Resultados
                    </span>
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-4 sm:grid-cols-4 gap-4 xs:gap-4 sm:gap-6 items-start relative">
              {/* Divisores Verticais (Desktop) */}
              <div
                className="hidden xs:block absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                aria-hidden="true"
              />
              <div
                className="hidden xs:block absolute left-2/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                aria-hidden="true"
              />
              <div
                className="hidden xs:block absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                aria-hidden="true"
              />

              {/* Item 1: Padrão ANVISA */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative">
                    <ShieldCheck className="text-[#D4AF37] w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
                    <div
                      className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-white font-bold text-lg sm:text-xl">Padrão ANVISA</p>
                </div>
                <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                  Segurança Total
                </p>
              </motion.div>

              {/* Item 2: 12 Toneladas Eliminadas */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="relative">
                  <p className="text-white font-serif text-4xl sm:text-5xl font-bold group-hover:text-[#D4AF37] transition-colors duration-500 tracking-tight mb-1">
                    +12t
                  </p>
                  <div
                    className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                  Peso Eliminado
                </p>
              </motion.div>

              {/* Item 3: Vidas Transformadas */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="relative">
                  <p className="text-white font-serif text-4xl sm:text-5xl font-bold group-hover:text-[#D4AF37] transition-colors duration-500 tracking-tight mb-1">
                    +5.000
                  </p>
                  <div
                    className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                  Vidas Transformadas
                </p>
              </motion.div>

              {/* Item 4: Unidade Premium */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6 fill-[#D4AF37] group-hover:rotate-180 transition-transform duration-700" />
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tighter">
                    Premium
                  </p>
                </div>
                <p className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                  Unidade Hortolândia
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Refinado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[9px] text-[#D4AF37] uppercase tracking-[0.6em] font-black opacity-60">
            Role para Explorar
          </span>
          <div className="relative w-6 h-10 border-2 border-[#D4AF37]/40 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(HeroSection);
