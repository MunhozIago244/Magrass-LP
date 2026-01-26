// 1. Interfaces de Definição
export interface Service {
  id: number;
  category: string;
  title: string;
  description: string;
  highlight: string;
  icon:
    | "scale"
    | "sparkles"
    | "heart"
    | "leaf"
    | "droplets"
    | "thermometer"
    | "wind"
    | "user"
    | "waves"
    | "snowflake"
    | "Zap";
  indications?: string;
  contraindications?: string;
  benefits?: string;
  videoUrl?: string;
}

// Interface para os Depoimentos
export interface Testimonial {
  name: string;
  handle: string;
  review: string;
  avatar: string;
  result?: string;
}

interface SiteConfig {
  company: {
    name: string;
    unit: string;
    phone: string;
    address: string;
    instagram: string;
  };
  seo: {
    siteUrl: string;
    siteName: string;
    ogImage: string;
    twitterHandle?: string;
    themeColor: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    business: {
      zipCode: string;
      city: string;
      state: string;
      country: string;
      rating: {
        value: string;
        count: string;
      };
      priceRange: string;
      paymentMethods: string[];
      currencies: string[];
    };
    keywords: string[];
  };
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    cta: string;
  };
  services: Service[];
  testimonials: Testimonial[]; // Adicionado ao contrato
  benefits: {
    title: string;
    titleHighlight: string;
    items: string[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
  footer: {
    brand: string;
    copyright: string;
  };
}

// 2. Implementação da Configuração
export const CONFIG: SiteConfig = {
  company: {
    name: "Magrass",
    unit: "Hortolândia",
    phone: "5519971720443",
    address: "Rua Zacharias Costa Camargo, 25 - Remanso Campineiro, Hortolândia - SP",
    instagram: "https://www.instagram.com/magrass.hortolandia/",
  },

  seo: {
    siteUrl: "https://magrass.com.br",
    siteName: "Magrass Hortolândia",
    ogImage: "/assets/images/og-magrass.jpg",
    twitterHandle: "@magrass",
    themeColor: "#131842",
    coordinates: {
      latitude: "-22.8586",
      longitude: "-47.2201",
    },
    business: {
      zipCode: "13184-600",
      city: "Hortolândia",
      state: "SP",
      country: "BR",
      rating: {
        value: "4.9",
        count: "247",
      },
      priceRange: "$$-$$$",
      paymentMethods: ["Dinheiro", "Cartão de Crédito", "Cartão de Débito", "Pix"],
      currencies: ["BRL"],
    },
    keywords: [
      "estética Hortolândia",
      "emagrecimento Hortolândia",
      "lipo sem corte",
      "criolipólise",
      "harmonização corporal",
      "Magrass",
      "clínica de estética",
      "tratamento corporal",
      "queima de gordura",
      "celulite",
      "flacidez",
      "rejuvenescimento",
    ],
  },

  hero: {
    badge: "A maior rede de emagrecimento da América Latina",
    headline: "Realize sua transformação na Magrass",
    headlineHighlight: "Hortolândia",
    subheadline:
      "Ciência, tecnologia e acompanhamento personalizado para você conquistar o corpo e a saúde que sempre desejou.",
    cta: "Agendar Avaliação Gratuita",
  },

  services: [
    {
      id: 1,
      category: "Metabolismo",
      title: "Nutrição",
      description:
        "Programa de reeducação metabólica sem dietas restritivas, focado em queima de gordura e saúde.",
      highlight: "Resultados comprovados",
      icon: "scale",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 2,
      category: "Corpo",
      title: "Hidrolipo Magrass",
      description:
        "Protocolo exclusivo para eliminar gordura localizada através de tecnologia de alta potência. Indolor e sem cortes.",
      highlight: "Redução de medidas",
      icon: "droplets",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 9, // Novos Procedimentos
      category: "Corpo",
      title: "Criolipólise",
      description:
        "Congelamento de células de gordura para eliminação natural pelo organismo. O padrão ouro para gordura localizada.",
      highlight: "Elimina até 30% da gordura",
      icon: "snowflake",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 10,
      category: "Tecnologia",
      title: "Terapia Combinada",
      description:
        "Sinergia de ultra-som e correntes de média frequência para tratamento simultâneo de gordura e celulite.",
      indications: "Gordura localizada, celulite, hidrolipoclasia.",
      contraindications:
        "Gestantes, câncer, doenças autoimunes, próteses metálicas, hipertensão/diabetes descompensadas.",
      benefits: "Lipólise induzida, permeação de ativos e melhora do contorno corporal.",
      highlight: "Potência Máxima",
      icon: "Zap",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 11,
      category: "Corpo",
      title: "Lipocavitação",
      description:
        "Conhecida como a 'lipo sem cortes', utiliza ondas de ultrassom para romper as células de gordura.",
      highlight: "Efeito Imediato",
      icon: "waves",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 12,
      category: "Corpo",
      title: "Endermologia",
      description:
        "Massagem profunda por vácuo-sucção que desfaz nódulos de gordura e ativa o sistema linfático.",
      highlight: "Combate à Celulite",
      icon: "wind",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 3,
      category: "Corpo",
      title: "Termolipo",
      description:
        "Uso de infravermelho longo para acelerar o metabolismo basal e promover a queima calórica.",
      highlight: "Detox e Queima Calórica",
      icon: "thermometer",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 4,
      category: "Corpo",
      title: "Anidro-X",
      description:
        "Infusão de CO2 medicinal que melhora a circulação e combate gordura localizada e celulite.",
      highlight: "Melhora da Textura",
      icon: "wind",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 5,
      category: "Rosto",
      title: "Rejuvenescimento Facial",
      description:
        "Radiofrequência que estimula o colágeno, reduzindo rugas, linhas de expressão e flacidez.",
      highlight: "Efeito Lifting Natural",
      icon: "sparkles",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 7,
      category: "Bem-estar",
      title: "Drenagem Linfática",
      description: "Técnica que elimina o excesso de líquidos, toxinas e reduz o inchaço corporal.",
      highlight: "Fim da Retenção",
      icon: "waves",
      // videoUrl: "https://www.instagram.com/reels/videos/1",
    },
  ],

  // 3. Dados Fictícios de Depoimentos para Prova Social
  testimonials: [
    {
      name: "Roberta Santos",
      handle: "@roberta.santos",
      review:
        "A Magrass mudou minha vida! Consegui eliminar 15kg em 4 meses com o programa de emagrecimento científico. O atendimento em Hortolândia é impecável.",
      avatar: "https://i.pravatar.cc/150?u=roberta",
      result: "-15kg Eliminados",
    },
    {
      name: "Juliana Mendes",
      handle: "@ju_mendes",
      review:
        "A Hidrolipo superou minhas expectativas. Perdi medidas que me incomodavam há anos logo nas primeiras sessões. Me sinto muito mais confiante.",
      avatar: "https://i.pravatar.cc/150?u=juliana",
      result: "Nova Autoestima",
    },
    {
      name: "Carla Oliveira",
      handle: "@carla_oli",
      review:
        "Equipe maravilhosa e ambiente muito acolhedor. O acompanhamento nutricional é o diferencial que me fez não desistir dessa vez.",
      avatar: "https://i.pravatar.cc/150?u=carla",
      result: "-8kg em 2 meses",
    },
    {
      name: "Beatriz Farias",
      handle: "@bia_farias",
      review:
        "Fiz a Criolipólise e o resultado na gordura localizada foi surpreendente. Vale cada centavo pela qualidade tecnológica da clínica.",
      avatar: "https://i.pravatar.cc/150?u=beatriz",
      result: "Padrão Ouro",
    },
    {
      name: "Mariana Costa",
      handle: "@maricosta",
      review:
        "O Termolipo é maravilhoso para relaxar e ainda queimar calorias. Sinto meu metabolismo muito mais acelerado desde que comecei.",
      avatar: "https://i.pravatar.cc/150?u=mariana",
      result: "Metabolismo Ativo",
    },
    {
      name: "Fernanda Lima",
      handle: "@fer_lima",
      review:
        "Drenagem linfática nota 10! Acabou com meu inchaço e a retenção de líquidos. Indico para todas as minhas amigas aqui de Hortolândia.",
      avatar: "https://i.pravatar.cc/150?u=fernanda",
      result: "Sem Inchaço",
    },
    {
      name: "Patrícia Souza",
      handle: "@paty_souza",
      review:
        "Minha pele do rosto é outra após o tratamento de rejuvenescimento. As linhas de expressão diminuíram muito, lifting natural incrível.",
      avatar: "https://i.pravatar.cc/150?u=patricia",
      result: "Rosto Renovado",
    },
    {
      name: "Aline Vieira",
      handle: "@aline_v",
      review:
        "O plano é personalizado de verdade. Eles olham para as nossas necessidades reais. Já se foram 10kg e muita disposição!",
      avatar: "https://i.pravatar.cc/150?u=aline",
      result: "-10kg de Saúde",
    },
  ],

  benefits: {
    title: "Excelência e Resultados na",
    titleHighlight: "Magrass Hortolândia",
    items: [
      "Equipe Multidisciplinar Especializada",
      "Avaliação Bioimpedância Computadorizada",
      "Tecnologias com Selo ANVISA",
      "Ambiente Premium e Atendimento VIP",
      "Protocolos Científicos",
      "Acompanhamento Nutricional",
    ],
  },

  cta: {
    title: "Sua nova vida começa com um clique.",
    description:
      "Centenas de pessoas em Hortolândia já transformaram suas vidas. Você é o próximo.",
    button: "Falar com Especialista agora",
  },

  footer: {
    brand: "Magrass Hortolândia",
    copyright: `© ${new Date().getFullYear()} Magrass Hortolândia. Todos os direitos reservados.`,
  },
};

export const getWhatsAppLink = (message?: string) => {
  const defaultMessage = "Olá! Gostaria de conhecer os protocolos da Magrass Hortolândia.";
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${CONFIG.company.phone}?text=${encodedMessage}`;
};
