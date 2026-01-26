import { motion } from "framer-motion";
import { Check, ShieldCheck, Award } from "lucide-react";
import { useReducedMotion } from "@/components/ui/useReducedMotion";

/**
 * BenefitsSection Component
 *
 * Apresenta os principais diferenciais e benefícios da Magrass Hortolândia.
 * Utiliza animações suaves, design premium com glassmorphism e elementos visuais sofisticados.
 *
 * Características:
 * - 6 benefícios principais com animações individuais
 * - Background com partículas flutuantes animadas
 * - Cards com shimmer effects e glow animado
 * - Selo de qualidade com badge certificado
 * - Design responsivo e acessível
 * - Suporte para redução de movimento (a11y)
 *
 * Paleta de Cores:
 * - Azul Premium: #131842, #1f2554
 * - Dourado: #D4AF37, #F4D03F, #C5A059
 * - Fundos: Gradientes suaves com opacidade
 */

interface BenefitsData {
  items: string[];
}

const benefits: BenefitsData = {
  items: [
    "Resultados Visíveis em Semanas",
    "Protocolos Personalizados",
    "Tecnologia de Ponta Europeia",
    "Especialistas Certificados",
    "Ambiente Premium & Discreto",
    "Garantia de Satisfação Total",
  ],
};

/**
 * Variantes de animação para os cards de benefícios
 * Utiliza stagger para entrada sequencial dos elementos
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96], // cubic-bezier suave
    },
  },
};

export const BenefitsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="beneficios"
      className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-br from-[#fafafa] via-white to-[#f8f8f8] overflow-hidden"
    >
      {/* Background Decorativo Aprimorado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Círculos Decorativos com Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-80 sm:w-[32rem] h-80 sm:h-[32rem] bg-gradient-to-br from-[#131842] to-[#1f2554] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-1/2 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute bottom-0 left-1/3 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-gradient-to-br from-[#3CECD4] to-[#6EF3E1] rounded-full blur-[140px]"
        />

        {/* Pattern de Pontos Dourados */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Partículas Flutuantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Container Principal */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid de Duas Colunas */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          {/* Coluna Esquerda - Texto e Selo */}
          <div className="space-y-8 lg:sticky lg:top-32">
            {/* Título Principal com Animação */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-5"
            >
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#131842] tracking-tight leading-[1.1]">
                Por que escolher a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] bg-clip-text">
                    Magrass
                  </span>
                  {/* Underline Animado */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] rounded-full origin-left"
                    aria-hidden="true"
                  />
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
                Não somos apenas mais uma clínica de estética. Somos{" "}
                <strong className="text-[#131842] font-bold">
                  especialistas em transformação corporal
                </strong>
                , com tecnologia de ponta e uma abordagem personalizada que garante{" "}
                <strong className="text-[#D4AF37] font-bold">resultados reais e duradouros</strong>.
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
              {/* Glow Effect Animado */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] rounded-2xl opacity-0 group-hover:opacity-30 blur-xl"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
                aria-hidden="true"
              />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 p-6 sm:p-7 bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-2 border-gray-100 group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_24px_60px_rgba(212,175,55,0.2)] transition-all duration-500">
                {/* Ícone com Animação Avançada */}
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative bg-gradient-to-br from-[#131842] via-[#1f2554] to-[#131842] p-5 rounded-xl text-[#D4AF37] flex-shrink-0 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#D4AF37]/40 transition-shadow duration-500"
                >
                  {/* Glow ring interno */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <ShieldCheck
                    size={32}
                    strokeWidth={2.5}
                    className="relative z-10"
                    aria-hidden="true"
                  />
                </motion.div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <p className="text-[#131842] font-bold text-sm sm:text-base uppercase tracking-tight">
                      Protocolos de Elite
                    </p>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Award className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                    </motion.div>
                  </div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.15em]">
                    Selo de Qualidade Magrass Brasil
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita - Lista de Benefícios */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4 sm:space-y-5"
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
                        scale: 1.03,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                      }
                }
                className="group relative"
              >
                {/* Glow Effect no Hover com Gradiente Animado */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#F4D03F]/30 to-[#D4AF37]/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-5 sm:gap-6 p-5 sm:p-7 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border-2 border-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.06)] group-hover:shadow-[0_24px_60px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37]/50 group-hover:bg-white transition-all duration-500">
                  {/* Ícone Check Animado com Glow */}
                  <motion.div
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#131842] via-[#1f2554] to-[#131842] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-[#D4AF37]/40 transition-shadow duration-500"
                  >
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    <Check
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37] relative z-10"
                      strokeWidth={3.5}
                      aria-hidden="true"
                    />
                  </motion.div>

                  <div className="flex-1 space-y-2">
                    {/* Título do Benefício */}
                    <span className="block font-serif text-[#131842] text-xl sm:text-2xl lg:text-3xl tracking-tight leading-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                      {item}
                    </span>

                    {/* Label Exclusividade */}
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 * index }}
                        className="h-[2px] w-5 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-transparent origin-left"
                        aria-hidden="true"
                      />
                      <span className="text-slate-400 text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] group-hover:text-[#D4AF37] transition-colors">
                        Exclusividade Magrass
                      </span>
                    </div>
                  </div>

                  {/* Indicador Visual Animado */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 w-2.5 h-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full shadow-lg shadow-[#D4AF37]/50"
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
              className="relative mt-4 overflow-hidden rounded-2xl group"
            >
              {/* Background animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#131842] via-[#1f2554] to-[#131842]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  translateX: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />

              <div className="relative p-6 text-center">
                <div className="flex items-center justify-center gap-3 text-[#D4AF37] mb-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Award className="w-6 h-6" aria-hidden="true" />
                  </motion.div>
                  <span className="text-sm sm:text-base font-bold uppercase tracking-[0.15em]">
                    Certificação Nacional 2024
                  </span>
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Award className="w-6 h-6" aria-hidden="true" />
                  </motion.div>
                </div>
                <p className="text-white/70 text-xs sm:text-sm font-medium">
                  Reconhecida como referência em emagrecimento saudável
                </p>

                {/* Sparkles decorativos */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                      className="w-1 h-1 bg-[#D4AF37] rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
