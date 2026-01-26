"use client";

import { memo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { CONFIG } from "@/config/siteConfig";
import { Check, ShieldCheck, Award, Sparkles } from "lucide-react";

/**
 * Seção de Benefícios Premium: Autoridade + Sofisticação Científica
 */
const BenefitsSection = () => {
  const { benefits } = CONFIG;
  const shouldReduceMotion = useReducedMotion() ?? false;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 30, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="beneficios"
      className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#fafafa] overflow-hidden"
    >
      {/* Background Decorativo Aprimorado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Círculos Decorativos */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-[#131842] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-1/2 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-[#C5A059] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute bottom-0 left-1/3 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-[#C5A059] rounded-full blur-[140px]"
        />

        {/* Grid Pattern Sutil */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(19, 24, 66, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(19, 24, 66, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-28 items-center max-w-7xl mx-auto">
          {/* Lado Esquerdo - Conteúdo Editorial */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 space-y-8 sm:space-y-10"
          >
            {/* Eyebrow com Animação */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 overflow-hidden"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-[2px] w-8 sm:w-12 bg-gradient-to-r from-[#C5A059] to-[#d4b068] origin-left"
                aria-hidden="true"
              />
              <span className="text-[#C5A059] uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[11px] sm:text-xs font-black flex items-center gap-2">
                A Experiência Definitiva
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
              </span>
            </motion.div>

            {/* Headline Premium */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#131842] leading-[1.08] tracking-[-0.02em] max-w-xl">
              {benefits.title}
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#d4b068] to-[#C5A059] italic font-medium">
                  {benefits.titleHighlight}
                </span>
                {/* Underline Decorativo */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent origin-left"
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Parágrafo Descritivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#C5A059] via-[#C5A059]/50 to-transparent"
                aria-hidden="true"
              />
              <p className="text-slate-600 font-sans text-base sm:text-lg lg:text-xl leading-relaxed pl-6 sm:pl-8 max-w-xl">
                Na Magrass, a sofisticação encontra o rigor científico. Unimos tecnologia de elite e
                métodos exclusivos para garantir que sua jornada seja{" "}
                <span className="text-[#131842] font-semibold">
                  segura, luxuosa e transformadora.
                </span>
              </p>
            </motion.div>

            {/* Card de Selo de Qualidade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative group max-w-md"
            >
              {/* Glow Effect */}
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#C5A059] to-[#d4b068] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700"
                aria-hidden="true"
              />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 p-6 sm:p-7 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 group-hover:border-[#C5A059]/40 group-hover:shadow-[0_20px_50px_rgba(197,160,89,0.15)] transition-all duration-500">
                {/* Ícone com Animação */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-[#131842] to-[#1a1f52] p-4 rounded-xl text-[#C5A059] flex-shrink-0 shadow-lg group-hover:shadow-[#C5A059]/30 transition-shadow duration-500"
                >
                  <ShieldCheck size={32} strokeWidth={2.5} aria-hidden="true" />
                </motion.div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[#131842] font-bold text-sm sm:text-base uppercase tracking-tight">
                      Protocolos de Elite
                    </p>
                    <Award className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                  </div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.15em]">
                    Selo de Qualidade Magrass Brasil
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Lado Direito - Cards de Benefícios */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-4 sm:gap-5 order-1 lg:order-2"
          >
            {benefits.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: 12,
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }
                }
                className="group relative"
              >
                {/* Glow Effect no Hover */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-[#C5A059]/0 via-[#C5A059]/20 to-[#C5A059]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-5 sm:gap-6 p-5 sm:p-7 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] group-hover:shadow-[0_24px_48px_rgba(197,160,89,0.12)] group-hover:border-[#C5A059]/40 group-hover:bg-white transition-all duration-500">
                  {/* Ícone Check Animado */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#131842] to-[#1f2554] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-[#C5A059]/30 transition-shadow duration-500"
                  >
                    <Check
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#C5A059]"
                      strokeWidth={3.5}
                      aria-hidden="true"
                    />
                  </motion.div>

                  <div className="flex-1 space-y-2">
                    {/* Título do Benefício */}
                    <span className="block font-serif text-[#131842] text-xl sm:text-2xl lg:text-3xl tracking-tight leading-tight group-hover:text-[#C5A059] transition-colors duration-500">
                      {item}
                    </span>

                    {/* Label Exclusividade */}
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 * index }}
                        className="h-[2px] w-5 bg-gradient-to-r from-[#C5A059] to-transparent origin-left"
                        aria-hidden="true"
                      />
                      <span className="text-slate-400 text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] group-hover:text-[#C5A059] transition-colors">
                        Exclusividade Magrass
                      </span>
                    </div>
                  </div>

                  {/* Indicador Visual */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-4 right-4 w-2 h-2 bg-[#C5A059] rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </motion.div>
            ))}

            {/* Badge Extra de Credibilidade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-4 p-5 bg-gradient-to-r from-[#131842] to-[#1a1f52] rounded-2xl text-center"
            >
              <div className="flex items-center justify-center gap-2 text-[#C5A059]">
                <Award className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-bold uppercase tracking-[0.15em]">
                  Certificação Nacional 2024
                </span>
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-white/60 text-xs mt-2 font-medium">
                Reconhecida como referência em emagrecimento saudável
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decoração Inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

export default memo(BenefitsSection);
