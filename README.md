<<<<<<< HEAD
<div align="center">

![Magrass Banner](https://via.placeholder.com/1200x300/131842/C5A059?text=MAGRASS+|+Estética+Premium)

# ✨ Magrass Landing Page

### Transformando Vidas através da Estética de Elite

[![Live Demo](https://img.shields.io/badge/Demo-magrass--lp.vercel.app-C5A059?style=for-the-badge&logo=vercel)](https://magrass-lp.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-96.1%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-C5A059?style=for-the-badge)](LICENSE)

[🎯 Demo](https://magrass-lp.vercel.app) • [📖 Documentação](#-documentação) • [🐛 Report Bug](https://github.com/MunhozIago244/Magrass-LP/issues) • [💡 Request Feature](https://github.com/MunhozIago244/Magrass-LP/issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Preview](#-preview)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias)
- [Como Começar](#-como-começar)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Configuração](#️-configuração)
- [Deploy](#-deploy)
- [Otimizações](#-otimizações)
- [Contribuindo](#-contribuindo)
- [Roadmap](#-roadmap)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

Landing page de alta conversão desenvolvida para a **Magrass Hortolândia**, clínica premium de estética corporal e emagrecimento saudável. O projeto combina design luxuoso, animações fluidas e performance excepcional para proporcionar uma experiência memorável aos visitantes.

### 🌟 Principais Diferenciais

- **🎨 Design Premium** - Interface moderna com paleta de cores sofisticada (Navy #131842 + Gold #C5A059)
- **⚡ Performance Otimizada** - Lighthouse Score > 95 em todos os critérios
- **📱 Mobile-First** - Totalmente responsivo e otimizado para conversão mobile
- **♿ Acessível** - Seguindo padrões WCAG 2.1 AA
- **🎭 Animações Elegantes** - Micro-interações suaves com Framer Motion
- **🔍 SEO Avançado** - Meta tags estruturadas e Schema.org implementado
- **💬 Integração WhatsApp** - Conexão direta com time de atendimento

---

## 🖼️ Preview

### Desktop
![Desktop Preview](https://via.placeholder.com/1200x600/131842/C5A059?text=Desktop+Preview)

### Mobile
<div align="center">
  <img src="https://via.placeholder.com/300x600/131842/C5A059?text=Mobile" alt="Mobile Preview" width="250"/>
</div>

---

## ✨ Funcionalidades

### 🎯 Seções Principais

- [x] **Hero Section** - Headline impactante com CTA estratégico
- [x] **Serviços** - Grid de procedimentos com animações em cascata
- [x] **Benefícios** - Cards informativos sobre diferenciais
- [x] **CTA Final** - Call-to-action com indicador de status online
- [x] **Footer** - Informações completas de contato e localização

### 🔥 Recursos Avançados

- [x] Botão WhatsApp flutuante com chat preview
- [x] Detecção de horário comercial em tempo real
- [x] Animações de texto com efeito typewriter
- [x] Lazy loading inteligente de componentes
- [x] Tema claro/escuro (suporte futuro)
- [x] Integração com Google Maps
- [x] Sistema de rastreamento de eventos

---

## 🛠️ Tecnologias

### Core

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white) | 18.3.1 | Biblioteca UI |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-3178C6?logo=typescript&logoColor=white) | 5.6+ | Superset JavaScript |
| ![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?logo=vite&logoColor=white) | 5.4+ | Build tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?logo=tailwindcss&logoColor=white) | 3.4+ | Framework CSS |

### Libraries & Frameworks

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "framer-motion": "^11.11.17",
    "lucide-react": "^0.462.0",
    "@radix-ui/react-slot": "^1.1.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  }
}
```

### Dev Tools

- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Vitest** - Framework de testes
- **Bun** - Runtime alternativo (opcional)

---

## 🚀 Como Começar

### 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** ou **bun**
- **Git** - [Download](https://git-scm.com/)

### 📦 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/MunhozIago244/Magrass-LP.git
cd Magrass-LP
```

2. **Instale as dependências**

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install

# Ou usando bun
bun install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz:

```env
# Configurações do WhatsApp
VITE_WHATSAPP_NUMBER=5519998633898
VITE_WHATSAPP_DEFAULT_MESSAGE=Olá! Gostaria de saber mais sobre os tratamentos.

# Google Analytics (opcional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Modo de desenvolvimento
VITE_DEV_MODE=true
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

5. **Acesse no navegador**

Abra [http://localhost:5173](http://localhost:5173)

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build localmente

# Qualidade de Código
npm run lint         # Executa linter
npm run format       # Formata código com Prettier

# Testes
npm run test         # Executa testes unitários
npm run test:ui      # Interface de testes Vitest
npm run coverage     # Relatório de cobertura

# Análise
npm run analyze      # Analisa tamanho do bundle
```

---

## 📁 Estrutura do Projeto

```
Magrass-LP/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── og-image.jpg
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/
│   │       ├── morphy-button.tsx
│   │       ├── animated-text-generate.tsx
│   │       └── floating-whatsapp.tsx
│   │
│   ├── config/
│   │   └── siteConfig.ts        # Configurações centralizadas
│   │
│   ├── hooks/
│   │   ├── useScrollDirection.ts
│   │   └── useBusinessHours.ts
│   │
│   ├── lib/
│   │   └── utils.ts             # Funções utilitárias
│   │
│   ├── pages/
│   │   └── Index.tsx            # Página principal
│   │
│   ├── styles/
│   │   └── index.css            # Estilos globais
│   │
│   ├── utils/
│   │   └── businessHours.ts     # Lógica de horário
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example                 # Exemplo de variáveis
├── .gitignore
├── components.json              # Config Shadcn UI
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Configuração

### Personalização de Cores

Edite `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#131842',    // Navy
        secondary: '#C5A059',  // Gold
        accent: '#F9F9F9',     // Light Gray
      }
    }
  }
}
```

### Configuração do Site

Edite `src/config/siteConfig.ts`:

```typescript
export const CONFIG = {
  company: {
    name: "Magrass Hortolândia",
    address: "Rua Exemplo, 123 - Hortolândia, SP",
    phone: "(19) 99999-9999",
    whatsapp: "5519999999999",
    instagram: "https://instagram.com/magrasshortolandia"
  },
  // ... mais configurações
};
```

---

## 🚀 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MunhozIago244/Magrass-LP)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

### Manual

```bash
# Gerar build
npm run build

# Pasta de saída: dist/
# Hospedar em qualquer servidor estático
```

---

## ⚡ Otimizações

### Performance

- ✅ Code splitting automático
- ✅ Lazy loading de componentes
- ✅ Imagens otimizadas (WebP)
- ✅ Minificação de assets
- ✅ Tree-shaking habilitado
- ✅ Preload de recursos críticos

### SEO

- ✅ Meta tags estruturadas
- ✅ Schema.org implementado
- ✅ Sitemap.xml gerado
- ✅ Robots.txt configurado
- ✅ Open Graph tags
- ✅ Twitter Cards

### Acessibilidade

- ✅ Semântica HTML5
- ✅ ARIA labels
- ✅ Contraste de cores WCAG AA
- ✅ Navegação por teclado
- ✅ Leitores de tela

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Veja como:

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrões de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Adiciona nova funcionalidade
fix: Corrige bug
docs: Atualiza documentação
style: Formatação de código
refactor: Refatoração
test: Adiciona testes
chore: Tarefas de manutenção
```

---

## 🗺️ Roadmap

### ✅ Fase 1 - MVP (Completo)
- [x] Landing page responsiva
- [x] Integração WhatsApp
- [x] Animações Framer Motion
- [x] SEO básico

### 🚧 Fase 2 - Em Desenvolvimento
- [ ] Sistema de agendamento online
- [ ] Blog/Área de conteúdo
- [ ] Galeria de antes/depois
- [ ] Depoimentos de clientes
- [ ] Integração com Instagram API

### 📅 Fase 3 - Futuro
- [ ] Dashboard administrativo
- [ ] CRM integrado
- [ ] Sistema de fidelidade
- [ ] App mobile React Native
- [ ] Multi-idioma (i18n)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

**Iago Munhoz** - Desenvolvedor Frontend

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/iagomunhoz)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MunhozIago244)
[![Portfolio](https://img.shields.io/badge/Portfolio-C5A059?style=for-the-badge&logo=google-chrome&logoColor=white)](https://iagomunhoz.dev)

**Email:** munhoziago244@gmail.com

**Link do Projeto:** [https://github.com/MunhozIago244/Magrass-LP](https://github.com/MunhozIago244/Magrass-LP)

---

## 🙏 Agradecimentos

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Feito com ❤️ e ☕ por [Iago Munhoz](https://github.com/MunhozIago244)

</div>