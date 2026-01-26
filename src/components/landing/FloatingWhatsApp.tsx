"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  }, [isOnline]);

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
            <div className="bg-gradient-to-br from-[#131842] via-[#1f2554] to-[#131842] p-5 text-white relative overflow-hidden">
              {/* Animated background overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#F4D03F]/20"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />

              {/* Sparkle particles */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(6)].map((_, i) => (
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
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative flex items-center gap-4">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl shadow-[#D4AF37]/50 relative"
                >
                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <Sparkles className="w-7 h-7 text-[#131842] relative z-10" />
                </motion.div>

                <div className="flex-1">
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-base tracking-wide"
                  >
                    Assistente Magrass
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs text-emerald-300 flex items-center gap-2 mt-1"
                  >
                    {isOnline ? (
                      <>
                        <motion.span
                          className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <span className="font-semibold">Online • Resposta rápida</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-medium">Fora do horário</span>
                      </>
                    )}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 via-white to-slate-50">
              {messages.map((msg, msgIndex) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    delay: msgIndex * 0.1,
                  }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${msg.sender === "user" ? "order-1" : ""}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-2xl px-5 py-3 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-[#131842] font-medium shadow-lg shadow-[#D4AF37]/30"
                          : "bg-white/80 backdrop-blur-sm border border-[#131842]/10 text-gray-800 shadow-lg shadow-slate-200/50"
                      }`}
                    >
                      {/* Glow effect para mensagens do bot */}
                      {msg.sender === "bot" && (
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#D4AF37]/20 via-[#F4D03F]/20 to-[#D4AF37]/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                      )}

                      <p className="text-sm leading-relaxed relative z-10">{msg.text}</p>
                    </motion.div>

                    {/* Opções de resposta rápida */}
                    {msg.options && msg.sender === "bot" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-2.5 mt-4"
                      >
                        {msg.options.map((option, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.4 + idx * 0.1,
                              type: "spring",
                              stiffness: 200,
                            }}
                            whileHover={{
                              scale: 1.03,
                              x: 5,
                              boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.3)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleUserChoice(option.label, option.message)}
                            className="relative text-left px-5 py-3 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#D4AF37]/15 hover:to-[#F4D03F]/15 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/60 rounded-xl text-sm font-semibold text-[#131842] transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden group"
                          >
                            {/* Shimmer effect no hover */}
                            <motion.div
                              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                              whileHover={{ translateX: "200%" }}
                              transition={{ duration: 0.6 }}
                            />

                            {/* Conteúdo do botão */}
                            <span className="relative z-10 flex items-center gap-2">
                              <span className="text-xl">{option.label.split(" ")[0]}</span>
                              <span className="flex-1">
                                {option.label.split(" ").slice(1).join(" ")}
                              </span>
                              <motion.span
                                className="text-[#D4AF37] text-lg"
                                initial={{ x: 0 }}
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                →
                              </motion.span>
                            </span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-[10px] text-gray-400 mt-2 px-1 font-medium"
                    >
                      {msg.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </motion.p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex justify-start"
                >
                  <div className="relative bg-gradient-to-br from-white to-slate-50 border-2 border-[#D4AF37]/20 rounded-2xl px-6 py-4 shadow-xl shadow-[#D4AF37]/10">
                    {/* Glow animado */}
                    <motion.div
                      className="absolute -inset-[2px] bg-gradient-to-r from-[#D4AF37]/30 via-[#F4D03F]/30 to-[#D4AF37]/30 rounded-2xl blur-md -z-10"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="flex gap-2 items-center">
                      <motion.span
                        className="w-2.5 h-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0,
                        }}
                      />
                      <motion.span
                        className="w-2.5 h-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.span
                        className="w-2.5 h-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
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
