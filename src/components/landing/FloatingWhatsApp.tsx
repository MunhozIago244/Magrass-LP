"use client";

import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppLink } from "@/config/siteConfig";
import { Button } from "@/components/ui/button";
import { isBusinessOpen } from "@/utils/businessHours";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  options?: { label: string; message: string }[];
};

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const isOnline = isBusinessOpen();

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-abrir após 5 segundos (apenas uma vez)
  useEffect(() => {
    const hasOpened = localStorage.getItem("magrass-chat-opened");
    if (!hasOpened && !hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
        localStorage.setItem("magrass-chat-opened", "true");
        initializeChat();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened, initializeChat]);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Simular digitação e enviar mensagem do bot
  const sendBotMessage = (
    text: string,
    options?: { label: string; message: string }[],
    delay = 1500
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "bot",
        timestamp: new Date(),
        options,
      };
      setMessages((prev) => [...prev, newMessage]);
    }, delay);
  };

  // Inicializar chat
  const initializeChat = useCallback(() => {
    const greeting = isOnline
      ? "Olá! 👋 Sou a assistente virtual da Magrass Hortolândia. Como posso ajudar você hoje?"
      : "Olá! 👋 No momento estamos fora do horário de atendimento (Seg-Sex 9h-19h, Sáb 8h-12h). Mas posso ajudar com informações básicas!";

    sendBotMessage(
      greeting,
      [
        { label: "📅 Agendar Avaliação", message: "Quero agendar uma avaliação gratuita" },
        { label: "💰 Ver Preços", message: "Quero saber sobre preços e condições" },
        { label: "✨ Procedimentos", message: "Quero conhecer os procedimentos" },
        { label: "❓ Outras Dúvidas", message: "Tenho outras dúvidas" },
      ],
      800
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, initializeChat]);

  // Processar escolha do usuário
  const handleUserChoice = (label: string, message: string) => {
    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: label,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Responder com base na escolha
    if (message.includes("agendar")) {
      sendBotMessage(
        "Ótimo! 🎉 Para agendar sua avaliação gratuita, vou te conectar com nosso WhatsApp onde nossa equipe irá confirmar o melhor horário para você.",
        [{ label: "📱 Ir para WhatsApp", message: "agendar-whatsapp" }],
        1200
      );
    } else if (message.includes("preços")) {
      sendBotMessage(
        "Nossos valores variam de acordo com o protocolo escolhido e número de sessões. 💎 Temos condições especiais e parcelamento facilitado! Quer falar com um consultor?",
        [
          { label: "📱 Falar com Consultor", message: "precos-whatsapp" },
          { label: "🔙 Voltar ao Menu", message: "voltar-menu" },
        ],
        1500
      );
    } else if (message.includes("procedimentos")) {
      sendBotMessage(
        "Oferecemos diversos tratamentos: Lipo sem Corte, Criolipólise, Harmonização Corporal, Emagrecimento e muito mais! ✨ Cada protocolo é personalizado para suas necessidades. Quer saber mais?",
        [
          { label: "📱 Falar com Especialista", message: "procedimentos-whatsapp" },
          { label: "🔙 Voltar ao Menu", message: "voltar-menu" },
        ],
        1800
      );
    } else if (message.includes("outras")) {
      sendBotMessage(
        "Ficarei feliz em ajudar! 😊 Para dúvidas específicas, nossa equipe no WhatsApp pode te atender melhor. Vamos lá?",
        [
          { label: "📱 Ir para WhatsApp", message: "geral-whatsapp" },
          { label: "🔙 Voltar ao Menu", message: "voltar-menu" },
        ],
        1000
      );
    } else if (message.includes("voltar-menu")) {
      sendBotMessage(
        "Sem problema! Como posso ajudar você?",
        [
          { label: "📅 Agendar Avaliação", message: "Quero agendar uma avaliação gratuita" },
          { label: "💰 Ver Preços", message: "Quero saber sobre preços e condições" },
          { label: "✨ Procedimentos", message: "Quero conhecer os procedimentos" },
          { label: "❓ Outras Dúvidas", message: "Tenho outras dúvidas" },
        ],
        800
      );
    } else if (message.includes("whatsapp")) {
      const waMessage = message.includes("agendar")
        ? "Olá! Gostaria de agendar uma avaliação gratuita na Magrass Hortolândia."
        : message.includes("precos")
          ? "Olá! Gostaria de saber sobre preços e condições de pagamento."
          : message.includes("procedimentos")
            ? "Olá! Gostaria de conhecer mais sobre os procedimentos disponíveis."
            : "Olá! Tenho algumas dúvidas sobre os tratamentos Magrass.";

      window.open(getWhatsAppLink(waMessage), "_blank");
      sendBotMessage(
        "Perfeito! Te redirecionei para o WhatsApp. 🚀 Nossa equipe vai te atender em instantes!",
        [],
        500
      );
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      initializeChat();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50" ref={chatRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 bg-white rounded-3xl shadow-2xl border border-[#D4AF37]/20 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] sm:max-h-[600px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#131842] to-[#1f2554] p-4 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-30" />
              <div className="relative flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-[#131842]" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">Assistente Magrass</p>
                  <p className="text-xs text-emerald-300 flex items-center gap-1.5">
                    {isOnline ? (
                      <>
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        Online • Resposta rápida
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        Fora do horário
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${msg.sender === "user" ? "order-1" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#131842] font-medium"
                          : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>

                    {/* Opções de resposta rápida */}
                    {msg.options && msg.sender === "bot" && (
                      <div className="flex flex-col gap-2 mt-3">
                        {msg.options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleUserChoice(option.label, option.message)}
                            className="text-left px-4 py-2.5 bg-white hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#F4D03F]/10 border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 rounded-xl text-sm font-medium text-[#131842] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <p className="text-[10px] text-gray-400 mt-1 px-1">
                      {msg.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-[10px] text-center text-gray-500">
                💬 Respostas automáticas • Para atendimento humano, use o WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
          aria-expanded={isOpen}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] rounded-full shadow-2xl transition-all duration-300 focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 group"
        >
          {/* Badge de notificação */}
          {!isOpen && !hasAutoOpened && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg"
            >
              1
            </motion.span>
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};
