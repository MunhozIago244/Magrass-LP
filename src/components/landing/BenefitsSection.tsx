"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/config/siteConfig";
import { Check, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const BenefitsSection = () => {
  const { benefits } = CONFIG;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section 
      className={cn(
        "py-24 lg:py-40 bg-[#FCFCFC] relative overflow-hidden",
        /* Conexão suave com sombras atmosféricas light */
        "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-32 before:bg-gradient-to-b before:from-black/[0.03] before:to-transparent before:z-10",
        "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-32 after:bg-gradient-to-t after:from-black/[0.03] after:to-transparent after:z-10"
      )}
    >
      {/* Elementos de Luz e Textura Soft */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Glow Champagne */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-magrass-blue/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
        
        {/* Textura de Grid Suave */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Lado Esquerdo - Narrativa Editorial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="text-gold uppercase tracking-[0.4em] text-[11px] font-black">
                A Experiência Definitiva
              </span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-serif text-magrass-blue mb-8 leading-[1.05] tracking-tighter">
              {benefits.title} <br />
              <span className="text-gold italic font-normal">{benefits.titleHighlight}</span>
            </h2>

            <p className="text-slate-500 font-sans text-lg mb-12 max-w-lg leading-relaxed font-light border-l-2 border-gold/20 pl-8">
              Na Magrass, a sofisticação encontra o rigor científico. Criamos um ecossistema 
              de cuidado onde cada detalhe é desenhado para sua 
              <span className="text-magrass-blue font-semibold"> transformação absoluta.</span>
            </p>

            {/* Badge de Autoridade Light */}
            <div className="flex items-center gap-6 p-1.5 rounded-full bg-white border border-slate-100 pr-8 max-w-fit shadow-xl shadow-gold/5 group hover:border-gold/30 transition-all duration-500">
              <div className="bg-magrass-blue p-4 rounded-full text-white shadow-lg shadow-magrass-blue/20 group-hover:bg-gold group-hover:text-magrass-blue transition-colors duration-500">
                <ShieldCheck size={24} strokeWidth={2} />
              </div>
              <div>
                <p className="text-magrass-blue font-bold text-xs uppercase tracking-widest">Protocolos de Elite</p>
                <p className="text-gold/80 text-[10px] font-black uppercase tracking-tighter">Padrão Ouro Internacional</p>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito - Cards Estilo Minimalista Luxo */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            {benefits.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group flex items-center gap-6 p-7 bg-white rounded-[2.2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(197,160,89,0.1)] hover:border-gold/30 transition-all duration-500"
              >
                {/* Check Icon com Soft Glow */}
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-gold/10 group-hover:border-gold/20">
                  <Check className="w-6 h-6 text-gold transition-transform group-hover:scale-110" strokeWidth={3} />
                </div>
                
                <div className="flex flex-col">
                  <span className="block font-serif text-magrass-blue text-xl md:text-2xl tracking-tight leading-none mb-1 group-hover:text-gold transition-colors">
                    {item}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-px w-4 bg-gold/30" />
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em]">
                      Exclusividade Magrass
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default memo(BenefitsSection);