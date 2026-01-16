import { motion } from "framer-motion";
import { CONFIG, getWhatsAppLink } from "@/config/siteConfig";
import { 
  Scale, Sparkles, Heart, Leaf, ArrowRight, 
  Droplets, Thermometer, Wind, User, Waves, PlayCircle 
} from "lucide-react";
import { MorphyButton } from "@/components/ui/morphy-button";

const iconMap: Record<string, React.ElementType> = {
  scale: Scale, sparkles: Sparkles, heart: Heart, leaf: Leaf,
  droplets: Droplets, thermometer: Thermometer, wind: Wind,
  user: User, waves: Waves,
};

const ServicesSection = () => {
  const { services } = CONFIG;

  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#C5A059_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.05]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[1px] bg-[#C5A059]"></span>
              <span className="text-[#C5A059] font-bold tracking-[0.3em] text-xs uppercase">Expertise Magrass</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif text-[#131842] leading-tight text-left">
              Protocolos de <span className="italic">Elite</span> para sua <br />
              <span className="text-[#C5A059]">Transformação Real</span>
            </h2>
          </motion.div>
          <p className="text-gray-500 font-sans max-w-sm text-sm lg:text-base leading-relaxed italic">
            Tecnologia e acompanhamento especializado para resultados que elevam sua autoestima.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            const waMessage = `Olá! Vi o procedimento de *${service.title}* no site e gostaria de saber mais.`;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(197,160,89,0.12)] transition-all duration-500 hover:-translate-y-2 overflow-hidden text-left"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#131842] flex items-center justify-center text-[#C5A059] shadow-lg group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-500">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest px-3 py-1 rounded-full bg-[#C5A059]/10">
                      {service.category || "Estética"}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-[#131842] mb-3 group-hover:text-[#C5A059] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-col gap-3 pt-6 border-t border-gray-50">
                    {service.videoUrl && (
                      <a
                        href={service.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-gray-200 text-gray-400 text-[10px] font-bold hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300"
                      >
                        <PlayCircle size={14} />
                        VER COMO FUNCIONA
                      </a>
                    )}

                    {/* CORREÇÃO DO SLOT: O MorphyButton abraça APENAS o <a> */}
                    <MorphyButton
                      asChild
                      size="lg"
                      className="w-full bg-[#131842] text-white"
                      dotClassName="bg-[#C5A059]"
                    ><a
                        href={getWhatsAppLink(waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span className="relative z-10 uppercase tracking-wider">Agendar Avaliação</span>
                        <ArrowRight className="relative z-10 w-4 h-4" />
                      </a></MorphyButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;