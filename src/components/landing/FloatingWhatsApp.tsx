"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppLink } from "@/config/siteConfig"; // Removido CONFIG que não era usado
import { Button } from "@/components/ui/button"; // ADICIONADO: Importação do componente Button

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Mensagem padrão para o WhatsApp
  const defaultMessage = "Olá! Gostaria de saber mais sobre os protocolos Magrass.";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white p-4 rounded-2xl shadow-xl border border-[#C5A059]/20 w-72"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <MessageCircle size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#131842] text-sm">Magrass Hortolândia</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                  Online agora
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Olá! Como podemos ajudar você a conquistar o corpo dos seus sonhos hoje?
            </p>
            <a
              href={getWhatsAppLink(defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2.5 rounded-lg font-medium transition-colors shadow-md"
            >
              Iniciar Conversa
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar WhatsApp" : "Abrir WhatsApp"}
        aria-expanded={isOpen}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:scale-110 transition-transform focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        {isOpen ? <X size={28} className="text-white" /> : <MessageCircle size={28} className="text-white" />}
      </Button>
    </div>
  );
};