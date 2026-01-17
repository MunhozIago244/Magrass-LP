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
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Ana Costa",
    age: 41,
    treatment: "Harmonização Corporal",
    result: "Autoestima renovada",
    text: "O atendimento personalizado fez toda diferença. Me sinto outra pessoa!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Juliana Santos",
    age: 29,
    treatment: "Criolipólise",
    result: "8cm de cintura",
    text: "Resultado surpreendente! Tratamento indolor e equipe super atenciosa.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=9"
  }
];

const KineticTestimonials = () => {
  const constraintsRef = useRef(null);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-[#F9F9F9] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#C5A059]" aria-hidden="true"></span>
            <span className="text-[#C5A059] font-bold tracking-[0.3em] text-xs uppercase">
              Depoimentos Reais
            </span>
            <span className="h-px w-8 bg-[#C5A059]" aria-hidden="true"></span>
          </div>
          
          <h2 className="
            text-3xl sm:text-4xl lg:text-5xl 
            font-serif text-[#131842] 
            mb-4 
            leading-tight
            px-4
          ">
            Histórias de <span className="text-[#C5A059] italic">Transformação</span>
          </h2>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
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
                  bg-white 
                  rounded-3xl 
                  p-6 
                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  border border-gray-100
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
                  bg-white 
                  rounded-3xl 
                  p-8 
                  shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                  border border-gray-100
                  min-w-[350px] lg:min-w-[400px]
                  hover:shadow-[0_12px_40px_rgba(197,160,89,0.15)]
                  transition-shadow
                "
                whileHover={{ y: -5 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>

          {/* Hint de arrasto (apenas desktop) */}
          <p className="hidden sm:block text-center text-xs text-gray-400 mt-4 italic">
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
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[#131842] text-base sm:text-lg truncate">
          {testimonial.name}, {testimonial.age}
        </h4>
        <p className="text-[#C5A059] text-sm font-medium">
          {testimonial.treatment}
        </p>
        <div className="flex gap-1 mt-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
          ))}
        </div>
      </div>
    </div>

    {/* Quote */}
    <div className="relative">
      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#C5A059]/20" aria-hidden="true" />
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-6 mb-4">
        "{testimonial.text}"
      </p>
    </div>

    {/* Result Badge */}
    <div className="
      inline-flex items-center gap-2 
      px-4 py-2 
      bg-[#C5A059]/10 
      rounded-full 
      border border-[#C5A059]/20
    ">
      <span className="text-[#C5A059] font-bold text-xs sm:text-sm">
        Resultado: {testimonial.result}
      </span>
    </div>
  </>
);

export default KineticTestimonials;