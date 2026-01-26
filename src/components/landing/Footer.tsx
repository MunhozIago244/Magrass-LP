"use client";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { MapPin, MessageCircle, Instagram, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

const Footer = () => {
  const { company, footer } = CONFIG;

  // URL de busca para o Google Maps baseada no endereço da CONFIG
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  return (
    <footer className="bg-magrass-blue text-white pt-24 pb-12 relative overflow-hidden">
      {/* Luz Atmosférica de Fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-8 mb-20"
        >
          {/* Coluna 1: Branding */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-3xl text-gold font-bold tracking-tighter">
                {footer.brand.split(" ")[0]}
                <span className="text-white ml-1 font-light italic">
                  {footer.brand.split(" ")[1]}
                </span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[260px] font-light italic">
                A maior rede de emagrecimento saudável e estética de elite da América Latina, agora
                em Hortolândia.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[
                {
                  icon: Instagram,
                  href: company.instagram,
                  label: "Instagram",
                },
                {
                  icon: MessageCircle,
                  href: getWhatsAppLink(),
                  label: "WhatsApp",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(197, 160, 89, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-colors shadow-xl backdrop-blur-sm"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Localização Estratégica */}
          <div className="space-y-6">
            <h4 className="text-gold font-black text-[10px] uppercase tracking-[0.3em]">
              Onde Estamos
            </h4>
            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-4 -m-4 rounded-3xl hover:bg-white/[0.03] transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="mt-1 p-3 rounded-2xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-magrass-blue transition-all shadow-inner">
                <MapPin size={20} strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <address className="text-slate-300 text-sm leading-6 not-italic font-medium">
                  {company.address}
                </address>
                <span className="flex items-center gap-1 text-gold text-[10px] font-bold uppercase tracking-wider group-hover:underline">
                  Abrir no GPS <ArrowUpRight size={12} />
                </span>
              </div>
            </motion.a>
          </div>

          {/* Coluna 3: Atendimento Boutique */}
          <div className="space-y-6">
            <h4 className="text-gold font-black text-[10px] uppercase tracking-[0.3em]">
              Atendimento
            </h4>
            <div className="flex items-start gap-4">
              <div className="mt-1 p-3 rounded-2xl bg-white/5 text-slate-400">
                <Clock size={20} />
              </div>
              <div className="text-sm text-slate-300 space-y-2 font-light">
                <div className="flex flex-col">
                  <span className="text-white font-semibold">Segunda a Sexta</span>
                  <span>09h às 19h</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold">Sábado</span>
                  <span>08h às 12h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 4: Selo de Autoridade */}
          <div className="flex flex-col lg:items-end justify-start">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 border border-gold/20 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md text-center lg:text-right relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/10 transition-colors" />
              <ShieldCheck
                className="text-gold mb-4 mx-auto lg:ml-auto lg:mr-0"
                size={40}
                strokeWidth={1.5}
              />
              <p className="text-white font-serif italic text-xl mb-1 italic">Padrão Ouro</p>
              <p className="text-gold/60 text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed">
                Clínica Certificada <br /> Tecnologia ANVISA
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Rodapé Legal */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
              {footer.copyright}
            </p>
            <p className="text-[9px] text-slate-600 font-light">
              Magrass Hortolândia - Estética de Resultados e Emagrecimento Saudável.
            </p>
          </div>

          <div className="flex gap-8">
            {["Privacidade", "Termos"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold hover:text-gold transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Marca d'água de Background (SEO Friendly) */}
      <div className="absolute -bottom-12 -right-12 font-serif text-[180px] text-white/[0.02] font-black pointer-events-none select-none tracking-tighter">
        MAGRASS
      </div>
    </footer>
  );
};

export default memo(Footer);
