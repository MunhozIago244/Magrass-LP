// 1. Interfaces de Definição (Contrato Expandido)
export interface Service {
  id: number;
  category: string;
  title: string;
  description: string;
  highlight: string;
  icon: "scale" | "sparkles" | "heart" | "leaf" | "droplets" | "thermometer" | "wind" | "user" | "waves" | "snowflake" | "Zap";
  indications?: string; // Novo campo para UX Informativa
  contraindications?: string; // Novo campo para Segurança
  benefits?: string; // Novo campo para Conversão
  videoUrl?: string;
}

interface SiteConfig {
  company: {
    name: string;
    unit: string;
    phone: string;
    address: string;
    instagram: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    cta: string;
  };
  services: Service[];
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

// 2. Implementação ÚNICA da Configuração
export const CONFIG: SiteConfig = {
  company: {
    name: "Magrass",
    unit: "Hortolândia",
    phone: "5519971720443",
    address: "Rua Zacharias Costa Camargo, 25 - Remanso Campineiro, Hortolândia - SP",
    instagram: "https://www.instagram.com/magrass.hortolandia/",
  },

  hero: {
    badge: "A maior rede de emagrecimento da América Latina",
    headline: "Realize sua transformação na",
    headlineHighlight: "Magrass Hortolândia",
    subheadline: "Ciência, tecnologia e acompanhamento personalizado para você conquistar o corpo e a saúde que sempre desejou.",
    cta: "Agendar Avaliação Gratuita",
  },

  services: [
    {
      id: 1,
      category: "Metabolismo",
      title: "Emagrecimento Científico",
      description: "Programa de reeducação metabólica sem dietas restritivas, focado em queima de gordura e saúde.",
      highlight: "Resultados comprovados",
      icon: "scale",
      videoUrl: "https://www.instagram.com/reels/videos/1",
    },
    {
      id: 2,
      category: "Corpo",
      title: "Hidrolipo Magrass",
      description: "Protocolo exclusivo para eliminar gordura localizada através de tecnologia de alta potência. Indolor e sem cortes.",
      highlight: "Redução de medidas",
      icon: "droplets",
    },
    {
      id: 9, // Novos Procedimentos
      category: "Corpo",
      title: "Criolipólise",
      description: "Congelamento de células de gordura para eliminação natural pelo organismo. O padrão ouro para gordura localizada.",
      highlight: "Elimina até 30% da gordura",
      icon: "snowflake",
    },
    {
      id: 10,
      category: "Tecnologia",
      title: "Terapia Combinada",
      description: "Sinergia de ultra-som e correntes de média frequência para tratamento simultâneo de gordura e celulite.",
      indications: "Gordura localizada, celulite, hidrolipoclasia.",
      contraindications: "Gestantes, câncer, doenças autoimunes, próteses metálicas, hipertensão/diabetes descompensadas.",
      benefits: "Lipólise induzida, permeação de ativos e melhora do contorno corporal.",
      highlight: "Potência Máxima",
      icon: "Zap",
    },
    {
      id: 11,
      category: "Corpo",
      title: "Lipocavitação",
      description: "Conhecida como a 'lipo sem cortes', utiliza ondas de ultrassom para romper as células de gordura.",
      highlight: "Efeito Imediato",
      icon: "waves",
    },
    {
      id: 12,
      category: "Corpo",
      title: "Endermologia",
      description: "Massagem profunda por vácuo-sucção que desfaz nódulos de gordura e ativa o sistema linfático.",
      highlight: "Combate à Celulite",
      icon: "wind",
    },
    {
      id: 3,
      category: "Corpo",
      title: "Termolipo",
      description: "Uso de infravermelho longo para acelerar o metabolismo basal e promover a queima calórica.",
      highlight: "Detox e Queima Calórica",
      icon: "thermometer",
    },
    {
      id: 4,
      category: "Corpo",
      title: "Anidro-X",
      description: "Infusão de CO2 medicinal que melhora a circulação e combate gordura localizada e celulite.",
      highlight: "Melhora da Textura",
      icon: "wind",
    },
    {
      id: 5,
      category: "Rosto",
      title: "Rejuvenescimento Facial",
      description: "Radiofrequência que estimula o colágeno, reduzindo rugas, linhas de expressão e flacidez.",
      highlight: "Efeito Lifting Natural",
      icon: "sparkles",
    },
    {
      id: 7,
      category: "Bem-estar",
      title: "Drenagem Linfática",
      description: "Técnica que elimina o excesso de líquidos, toxinas e reduz o inchaço corporal.",
      highlight: "Fim da Retenção",
      icon: "waves",
    }
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
    description: "Centenas de pessoas em Hortolândia já transformaram suas vidas. Você é o próximo.",
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