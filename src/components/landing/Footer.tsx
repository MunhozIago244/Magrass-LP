import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { MapPin, MessageCircle, Instagram, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const { company, footer } = CONFIG;

  return (
    <footer className="bg-[#131842] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Detalhe Decorativo Superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-50" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Coluna 1: Branding & Identidade */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl lg:text-3xl text-[#C5A059] font-bold tracking-tight">
              {footer.brand.split(' ')[0]}
              <span className="text-white ml-2 font-light italic">{footer.brand.split(' ')[1]}</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Transformando vidas em Hortolândia através da ciência, estética de elite e acolhimento personalizado.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ y: -3, textShadow: "0 0 8px #C5A059" }}
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siga-nos no Instagram"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Entre em contato via WhatsApp"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
              >
                <MessageCircle size={18} />
              </motion.a>
            </div>
          </div>

          {/* Coluna 2: Localização */}
          <div className="space-y-6">
            <h4 className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em]">Localização</h4>
            <div className="flex items-start gap-3 group cursor-pointer">
              <div className="mt-1 p-2 rounded-lg bg-white/5 group-hover:bg-[#C5A059]/20 transition-colors">
                <MapPin size={18} className="text-[#C5A059]" aria-hidden="true" />
              </div>
              <address className="text-gray-300 text-sm leading-6 not-italic">
                {company.address}
              </address>
            </div>
          </div>

          {/* Coluna 3: Horários */}
          <div className="space-y-6">
            <h4 className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em]">Atendimento</h4>
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-lg bg-white/5">
                <Clock size={18} className="text-[#C5A059]" aria-hidden="true" />
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Segunda a Sexta: 09h às 19h</p>
                <p>Sábado: 08h às 12h</p>
                <p className="text-[#C5A059] text-[10px] font-bold uppercase mt-2 italic">Unidade Hortolândia</p>
              </div>
            </div>
          </div>

          {/* Coluna 4: Selo de Qualidade */}
          <div className="flex flex-col justify-center items-center lg:items-end">
            <div className="p-6 border border-[#C5A059]/30 rounded-2xl bg-white/[0.02] backdrop-blur-sm text-center lg:text-right">
              <ShieldCheck className="text-[#C5A059] mb-4 mx-auto lg:ml-auto lg:mr-0" size={32} aria-hidden="true" />
              <p className="text-white font-serif italic text-lg mb-1">Padrão Ouro</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">Tecnologia Certificada ANVISA</p>
            </div>
          </div>
        </div>

        {/* Linha Final de Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-500 uppercase tracking-widest">
            {footer.copyright}
          </p>
          <div className="flex gap-6 text-[11px] text-gray-600 uppercase tracking-widest">
            <a href="#privacidade" className="hover:text-[#C5A059] transition-colors">Privacidade</a>
            <a href="#termos" className="hover:text-[#C5A059] transition-colors">Termos</a>
          </div>
        </div>
      </div>

      {/* Marca d'água de fundo */}
      <div className="absolute -bottom-10 -right-10 font-serif text-[150px] text-white/[0.02] font-bold pointer-events-none select-none" aria-hidden="true">
        MAGRASS
      </div>
    </footer>
  );
};

export default Footer;