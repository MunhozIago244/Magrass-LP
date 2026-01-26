import React, { useState, useEffect, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { MessageCircle, Sparkles, Clock, ShieldCheck, Award, ArrowRight, Zap } from "lucide-react";
import { isBusinessOpen } from "@/utils/businessHours";

const CTASection = () => {
  const { cta } = CONFIG;
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    setIsOpen(isBusinessOpen());

    const interval = setInterval(() => {
      setIsOpen(isBusinessOpen());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 lg:py-40 bg-gradient-to-br from-[#0d0f2e] via-[#131842] to-[#1a1d4a] overflow-hidden">
      {/* Background Pattern com Animação */}
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #C5A059 1.5px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glow Effects Animados */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059] rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C5A059] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-full blur-[100px]"
        />
      </div>

      {/* Linhas Decorativas Superiores */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center space-y-10"
        >
          {/* Badge Superior Premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
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

            <Sparkles className="w-5 h-5 text-[#C5A059] relative z-10" aria-hidden="true" />
            <span className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] relative z-10">
              Oportunidade Exclusiva
            </span>
            <Zap className="w-4 h-4 text-[#C5A059]/60 relative z-10" aria-hidden="true" />
          </motion.div>

          {/* Headline Monumental */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] tracking-[-0.01em] px-4 sm:px-0">
              {cta.title.split("?")[0]}
              <span className="relative inline-block ml-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#d4b068] to-[#C5A059]">
                  ?
                </span>
                {/* Glow no ponto de interrogação */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 bg-[#C5A059] blur-2xl opacity-30"
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Underline Decorativo */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#C5A059] to-transparent origin-center"
              aria-hidden="true"
            />
          </motion.div>

          {/* Descrição Emocional */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light leading-relaxed italic max-w-3xl mx-auto px-4 sm:px-8"
          >
            <span className="text-white/40 text-2xl sm:text-3xl">"</span>
            {cta.description}
            <span className="text-white/40 text-2xl sm:text-3xl">"</span>
          </motion.p>

          {/* CTA Button Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-4"
          >
            <motion.a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar avaliação gratuita via WhatsApp"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.05,
                      y: -5,
                    }
              }
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-4 px-12 sm:px-16 py-6 sm:py-8 bg-gradient-to-r from-[#C5A059] to-[#d4b068] text-white rounded-full font-bold text-lg sm:text-xl shadow-[0_20px_60px_rgba(197,160,89,0.4)] hover:shadow-[0_30px_80px_rgba(197,160,89,0.6)] transition-all duration-500 overflow-hidden min-h-[72px] sm:min-h-[80px]"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </div>

              {/* Pulse Background */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white rounded-full opacity-20"
                aria-hidden="true"
              />

              <MessageCircle
                className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 group-hover:rotate-12 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="relative z-10 uppercase tracking-tight font-black">
                {cta.button}
              </span>
              <ArrowRight
                className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 group-hover:translate-x-2 transition-transform duration-300"
                aria-hidden="true"
              />
            </motion.a>

            {/* Texto Auxiliar Abaixo do Botão */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-5 text-white/50 text-sm flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
              <span>Atendimento em até 2 minutos</span>
            </motion.p>
          </motion.div>

          {/* Trust Indicators & Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-12 space-y-6"
          >
            {/* Status Online / Horário */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-sm"
                  role="status"
                  aria-live="polite"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
                  </span>
                  <span className="text-green-400 text-sm sm:text-base font-bold uppercase tracking-wide">
                    Especialistas Online Agora
                  </span>
                </motion.div>
              ) : (
                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-white/40" aria-hidden="true" />
                  <span className="text-white/60 text-sm sm:text-base font-medium">
                    Atendimento: Seg-Sex 9h-19h | Sáb 8h-12h
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm group hover:border-[#C5A059]/30 transition-all duration-300">
                <ShieldCheck
                  className="w-5 h-5 text-[#C5A059] group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
                <span className="text-white/70 text-sm sm:text-base font-medium group-hover:text-white/90 transition-colors">
                  Certificado ANVISA
                </span>
              </div>
            </div>

            {/* Separador Decorativo */}
            <div className="flex items-center justify-center gap-3" aria-hidden="true">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
              <Award className="w-5 h-5 text-[#C5A059]/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
            </div>

            {/* Footer Info */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="text-xs sm:text-sm text-white/30 uppercase tracking-[0.3em] font-bold"
            >
              Hortolândia • Resultados Reais para Todos
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Linhas Decorativas Inferiores */}
      <div
        className="absolute bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
};

export default memo(CTASection);
