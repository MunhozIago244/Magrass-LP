import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { CONFIG } from "@/config/siteConfig";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log técnico para monitoramento de rotas quebradas em produção
    console.error(
      `[404 Monitor]: Rota inexistente acessada: ${location.pathname}`
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9] px-6">
      <div className="max-w-md w-full text-center">
        {/* Elemento Visual Premium */}
        <div className="relative mb-8">
          <h1 className="font-serif text-[120px] leading-none text-[#131842]/5 font-bold">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-px w-12 bg-[#C5A059]"></span>
            <span className="mx-4 text-[#131842] font-serif text-2xl uppercase tracking-widest">
              Ops!
            </span>
            <span className="h-px w-12 bg-[#C5A059]"></span>
          </div>
        </div>

        <h2 className="text-2xl font-serif text-[#131842] mb-4">
          Caminho não encontrado
        </h2>
        
        <p className="text-gray-500 mb-10 leading-relaxed">
          Parece que esta página não faz parte da sua jornada de transformação. 
          Vamos levar você de volta ao início?
        </p>

        {/* Ações de Recuperação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#131842] text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-black shadow-lg hover:shadow-xl active:scale-95"
          >
            <Home size={18} />
            VOLTAR AO INÍCIO
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border-2 border-[#131842] text-[#131842] px-8 py-4 rounded-full font-bold transition-all hover:bg-[#131842] hover:text-white"
          >
            <ArrowLeft size={18} />
            VOLTAR
          </button>
        </div>

        {/* Footer Minimalista */}
        <p className="mt-16 text-xs text-gray-400 uppercase tracking-widest">
          {CONFIG.footer.brand}
        </p>
      </div>
    </div>
  );
};

export default NotFound;