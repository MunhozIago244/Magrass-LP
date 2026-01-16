import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { MessageCircle, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { isBusinessOpen } from "@/utils/businessHours";

const CTASection = () => {
  const { cta } = CONFIG;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isBusinessOpen());

    const interval = setInterval(() => {
      setIsOpen(isBusinessOpen());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-[#131842] relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #C5A059 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge Superior */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">
              Oportunidade Exclusiva
            </span>
          </div>

          {/* Headline de Alto Impacto */}
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
            {cta.title.split('?')[0]}
            <span className="text-[#C5A059]">?</span>
          </h2>

          <p className="text-xl text-gray-300 font-sans font-light mb-12 max-w-2xl mx-auto leading-relaxed italic">
            "{cta.description}"
          </p>

          {/* Botão de Conversão */}
          <motion.a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar avaliação gratuita via WhatsApp"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-4 px-10 py-6 bg-[#C5A059] text-white rounded-full font-sans font-bold text-xl shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle className="w-6 h-6 animate-pulse relative z-10" aria-hidden="true" />
            <span className="relative z-10">{cta.button.toUpperCase()}</span>
          </motion.a>

          {/* Trust Indicators e Status Online */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {isOpen ? (
                <div className="flex items-center gap-2 text-[#C5A059] text-sm font-semibold" role="status" aria-live="polite">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Especialistas online agora
                </div>
              ) : (
                <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  Atendimento: Seg-Sex 9h-19h | Sáb 8h-12h
                </div>
              )}

              <div className="flex items-center gap-2 text-white/60 text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                Procedimentos Certificados ANVISA
              </div>
            </div>

            <p className="text-xs text-white/30 uppercase tracking-[0.3em] font-sans mt-4">
              Hortolândia • Resultados Reais para Todos
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;