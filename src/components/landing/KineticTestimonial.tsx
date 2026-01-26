// KineticTestimonials.tsx
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    age: 34,
    treatment: "Lipo sem Corte",
    result: "12kg em 3 meses",
    text: "Nunca imaginei que conseguiria esses resultados sem cirurgia. A equipe é maravilhosa!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Ana Costa",
    age: 41,
    treatment: "Harmonização Corporal",
    result: "Autoestima renovada",
    text: "O atendimento personalizado fez toda diferença. Me sinto outra pessoa!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Juliana Santos",
    age: 29,
    treatment: "Criolipólise",
    result: "8cm de cintura",
    text: "Resultado surpreendente! Tratamento indolor e equipe super atenciosa.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=9",
  },
];

const KineticTestimonials = () => {
  const constraintsRef = useRef(null);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-[#0A1628] via-[#1a2844] to-[#0d1932] overflow-hidden relative">
      {/* Overlay decorativo com mix de cores */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px] mix-blend-overlay" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3CECD4] rounded-full blur-[140px] mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#F4D03F] rounded-full blur-[160px] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#D4AF37]" aria-hidden="true"></span>
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase">
              Depoimentos Reais
            </span>
            <span className="h-px w-8 bg-[#D4AF37]" aria-hidden="true"></span>
          </div>

          <h2
            className="
            text-3xl sm:text-4xl lg:text-5xl 
            font-serif text-white 
            mb-4 
            leading-tight
            px-4
          "
          >
            Histórias de <span className="text-[#D4AF37] italic">Transformação</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Veja o que nossos clientes têm a dizer sobre sua jornada conosco
          </p>
        </motion.div>

        {/* Cards Container - Mobile: Stack | Desktop: Horizontal Scroll */}
        <div className="relative" ref={constraintsRef}>
          {/* Mobile: Stack */}
          <div className="flex flex-col gap-6 sm:hidden">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="
                  bg-gradient-to-br from-[#131842] to-[#1a2050] 
                  rounded-3xl 
                  p-6 
                  shadow-[0_8px_30px_rgba(212,175,55,0.15)]
                  border border-[#D4AF37]/20
                "
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Horizontal Drag */}
          <motion.div
            className="hidden sm:flex gap-6 cursor-grab active:cursor-grabbing pb-4"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="
                  bg-gradient-to-br from-[#131842] to-[#1a2050] 
                  rounded-3xl 
                  p-8 
                  shadow-[0_8px_30px_rgba(212,175,55,0.2)]
                  border border-[#D4AF37]/20
                  min-w-[350px] lg:min-w-[400px]
                  hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)]
                  hover:border-[#D4AF37]/40
                  transition-all duration-300
                "
                whileHover={{ y: -5 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>

          {/* Hint de arrasto (apenas desktop) */}
          <p className="hidden sm:block text-center text-xs text-slate-400 mt-4 italic">
            ← Arraste para ver mais depoimentos →
          </p>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <>
    {/* Header */}
    <div className="flex items-start gap-4 mb-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0 border-2 border-[#D4AF37]/30"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-white text-base sm:text-lg truncate">
          {testimonial.name}, {testimonial.age}
        </h4>
        <p className="text-[#D4AF37] text-sm font-medium">{testimonial.treatment}</p>
        <div className="flex gap-1 mt-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
          ))}
        </div>
      </div>
    </div>

    {/* Quote */}
    <div className="relative">
      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#D4AF37]/30" aria-hidden="true" />
      <p className="text-slate-200 text-sm sm:text-base leading-relaxed pl-6 mb-4">
        "{testimonial.text}"
      </p>
    </div>

    {/* Result Badge */}
    <div
      className="
      inline-flex items-center gap-2 
      px-4 py-2 
      bg-[#D4AF37]/20 
      rounded-full 
      border border-[#D4AF37]/40
    "
    >
      <span className="text-[#F4D03F] font-bold text-xs sm:text-sm">
        Resultado: {testimonial.result}
      </span>
    </div>
  </>
);

export default KineticTestimonials;
