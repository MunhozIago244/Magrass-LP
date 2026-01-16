import { motion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { MessageCircle, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { AnimatedTextGenerate } from "@/components/ui/animated-text-generate";

const HeroSection = () => {
  const { hero } = CONFIG;

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#131842]">
      {/* 1. Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#131842]/90 via-[#131842]/70 to-[#131842] z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
          alt="Mulher sorridente e em forma representando os resultados Magrass"
          loading="eager"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback para gradiente caso a imagem falhe
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* 2. Partículas Decorativas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-20 px-6 py-20">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge Animada */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 backdrop-blur-md"
          >
            <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
            <span className="text-xs md:text-sm font-bold text-[#C5A059] uppercase tracking-[0.2em]">
              {hero.badge}
            </span>
          </motion.div>

          {/* Headline Monumental */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8"
          >
            {hero.headline} <br />
            <span className="text-[#C5A059] italic relative">
              {hero.headlineHighlight}
              <motion.svg
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 w-full h-4 text-[#C5A059]/40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1 }}
                aria-hidden="true"
              >
                <path d="M5 15 Q 150 5 295 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline com AnimatedTextGenerate */}
          <div className="max-w-3xl mx-auto mb-12">
            <AnimatedTextGenerate
              text={hero.subheadline}
              className="text-center"
              textClassName="text-gray-300 text-lg md:text-xl font-light leading-relaxed"
              blurEffect={true}
              speed={0.8}
              highlightWords={["ciência", "tecnologia", "personalizado", "autoestima"]}
              highlightClassName="text-[#C5A059] font-medium"
            />
          </div>

          {/* Grupo de Ação Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar avaliação gratuita via WhatsApp"
              className="group relative inline-flex items-center gap-4 px-10 py-6 bg-[#C5A059] text-white rounded-full font-bold text-xl shadow-[0_20px_40px_rgba(197,160,89,0.3)] hover:shadow-[0_25px_50px_rgba(197,160,89,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <MessageCircle className="w-6 h-6 fill-white/20" />
              <span>{hero.cta.toUpperCase()}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

          {/* Trust Bar Premium */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#C5A059] w-8 h-8" aria-hidden="true" />
              <div className="text-left">
                <p className="text-white font-bold text-sm">Padrão ANVISA</p>
                <p className="text-gray-400 text-[10px] uppercase">Segurança Total</p>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block" aria-hidden="true" />
            <div className="text-center">
              <p className="text-white font-bold text-2xl">+5.000</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest">Vidas Transformadas</p>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block" aria-hidden="true" />
            <div className="text-center">
              <p className="text-[#C5A059] font-bold text-2xl">Premium</p>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest">Unidade Hortolândia</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Indicador de Scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] text-[#C5A059] uppercase tracking-[0.3em] font-bold">Descobrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#C5A059] to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;