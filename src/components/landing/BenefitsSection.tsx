import { motion } from "framer-motion";
import { CONFIG } from "@/config/siteConfig";
import { Check, ShieldCheck } from "lucide-react";

const BenefitsSection = () => {
  const { benefits } = CONFIG;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 lg:py-32 bg-[#F9F9F9] relative overflow-hidden">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#131842]/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-[#C5A059]/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Lado Esquerdo - Texto e Autoridade */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-[#C5A059]" aria-hidden="true"></span>
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-bold">
                Exclusividade
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-serif text-[#131842] mb-6 leading-tight">
              {benefits.title} <br />
              <span className="text-[#C5A059] italic">{benefits.titleHighlight}</span>
            </h2>

            <p className="text-gray-600 font-sans text-lg mb-10 max-w-lg leading-relaxed">
              Não somos apenas uma clínica, somos um centro de excelência.
              Unimos o rigor científico à tecnologia de elite para garantir
              que sua jornada seja segura, luxuosa e transformadora.
            </p>

            {/* Badge de Confiança */}
            <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-sm">
              <div className="bg-[#131842] p-3 rounded-full text-[#C5A059]">
                <ShieldCheck size={28} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[#131842] font-bold text-sm uppercase tracking-tighter">Protocolos Seguros</p>
                <p className="text-gray-500 text-xs">Selo de Qualidade Magrass Brasil</p>
              </div>
            </div>
          </motion.div>

          {/* Lado Direito - Cards de Benefícios */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-1 gap-4"
          >
            {benefits.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="group flex items-center gap-5 p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#C5A059]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#131842] flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 shadow-lg">
                  <Check className="w-6 h-6 text-[#C5A059]" aria-hidden="true" />
                </div>
                <span className="font-sans text-[#131842] font-semibold text-lg tracking-tight">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;