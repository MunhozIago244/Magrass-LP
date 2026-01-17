import { motion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { MessageCircle, Star, ShieldCheck, ArrowRight, Trophy, Weight } from "lucide-react";
import { AnimatedTextGenerate } from "@/components/ui/animated-text-generate";

const HeroSection = () => {
  const { hero } = CONFIG;

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#131842]">
      {/* 1. Background Layer com Otimização de LCP */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#131842]/95 via-[#131842]/80 to-[#131842] z-10" />
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }} // Opacidade controlada para legibilidade do texto
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
          alt="Resultados Reais Magrass Hortolândia"
          fetchPriority="high" // Prioridade máxima para o navegador
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Partículas e Ambient Light */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C5A059]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-20 px-6 py-20">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge: Ranking Nacional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-6 py-2.5 mb-10 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 backdrop-blur-xl shadow-[0_0_20px_rgba(197,160,89,0.1)]"
          >
            <Trophy className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] md:text-xs font-black text-[#C5A059] uppercase tracking-[0.3em]">
              27x Destaque Nacional na Rede Magrass
            </span>
          </motion.div>

          {/* Headline Monumental */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8 tracking-tight"
          >
            {hero.headline} <br />
            <span className="text-[#C5A059] italic relative inline-block">
              {hero.headlineHighlight}
              {/* Underline Animado */}
              <motion.svg
                viewBox="0 0 300 20"
                className="absolute -bottom-4 left-0 w-full h-5 text-[#C5A059]/50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
              >
                <path d="M10 15 Q 150 5 290 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline Otimizada */}
          <div className="max-w-3xl mx-auto mb-14">
            <AnimatedTextGenerate
              text={hero.subheadline}
              className="text-center"
              textClassName="text-slate-200 text-lg md:text-xl font-light leading-relaxed"
              highlightWords={["ciência", "tecnologia", "personalizado", "autoestima"]}
              highlightClassName="text-[#C5A059] font-semibold"
            />
          </div>

          {/* Call to Action Sênior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <a
              href={getWhatsAppLink("Olá! Desejo iniciar minha transformação com a Magrass.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-12 py-7 bg-[#C5A059] text-white rounded-full font-bold text-xl shadow-[0_20px_50px_rgba(197,160,89,0.4)] hover:shadow-[0_25px_60px_rgba(197,160,89,0.6)] transition-all duration-500 hover:-translate-y-2"
            >
              <MessageCircle className="w-7 h-7 fill-white/10 group-hover:rotate-12 transition-transform" />
              <span className="tracking-tighter">{hero.cta.toUpperCase()}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

          {/* Trust Bar Premium com +12 Toneladas */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 items-center justify-center border-t border-white/5 pt-12"
          >
            {/* KPI 1: Peso Eliminado */}
            <div className="flex flex-col items-center group">
              <div className="flex items-center gap-3 mb-1">
                <Weight className="text-[#C5A059] w-6 h-6 group-hover:scale-110 transition-transform" />
                <p className="text-white font-serif text-3xl font-bold">+12 Toneladas</p>
              </div>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium">Peso Eliminado em Hortolândia</p>
            </div>

            {/* KPI 2: Vidas Transformadas */}
            <div className="flex flex-col items-center group">
              <div className="flex items-center gap-3 mb-1">
                <ShieldCheck className="text-[#C5A059] w-6 h-6 group-hover:scale-110 transition-transform" />
                <p className="text-white font-serif text-3xl font-bold">+5.000</p>
              </div>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium">Vidas Transformadas</p>
            </div>

            {/* KPI 3: Status da Unidade */}
            <div className="flex flex-col items-center group">
              <div className="flex items-center gap-3 mb-1">
                <Star className="text-[#C5A059] w-6 h-6 fill-[#C5A059] group-hover:rotate-45 transition-transform" />
                <p className="text-white font-serif text-3xl font-bold uppercase tracking-tighter">Premium</p>
              </div>
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium">Qualidade garantida</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none opacity-40">
        <span className="text-[9px] text-[#C5A059] uppercase tracking-[0.5em] font-bold">Scroll</span>
        <div className="w-[1px] h-14 bg-gradient-to-b from-[#C5A059] to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;