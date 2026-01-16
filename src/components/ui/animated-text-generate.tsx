"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextGenerateProps {
  text: string;
  className?: string;
  textClassName?: string;
  blurEffect?: boolean;
  speed?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  linkWords?: string[];
  linkHrefs?: string[];
  linkClassNames?: string[];
}

export const AnimatedTextGenerate = ({
  text,
  className,
  textClassName,
  blurEffect = true,
  speed = 0.5,
  highlightWords = [],
  highlightClassName,
  linkWords = [],
  linkHrefs = [],
  linkClassNames = [],
}: AnimatedTextGenerateProps) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const splitWords = text.split(" ");

  useEffect(() => {
    setVisibleCount(0);
    const intervalId = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= splitWords.length) {
          clearInterval(intervalId);
          return prev;
        }
        return prev + 1;
      });
    }, Math.max(speed * 200, 100));
    return () => clearInterval(intervalId);
  }, [text, speed, splitWords.length]);

  const generateWords = () => {
    return (
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <AnimatePresence mode="popLayout">
          {splitWords.map((word, idx) => {
            const isVisible = idx < visibleCount;
            const remaining = splitWords.length - visibleCount;
            
            // Lógica de cápsulas mantida do seu código base
            let capsuleCount = 4;
            if (remaining <= 2) capsuleCount = remaining;
            else if (remaining <= 4) capsuleCount = Math.min(3, remaining);
            else if (visibleCount === 0) capsuleCount = 2;
            else if (visibleCount < 3) capsuleCount = 3;

            const isUpcoming = idx >= visibleCount && idx < visibleCount + capsuleCount;
            
            // Verificação de Highlight (Lógica Sênior para ignorar pontuação)
            const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            const isHighlight = highlightWords.some((hw) =>
              cleanWord.toLowerCase() === hw.toLowerCase()
            );

            const linkIndex = linkWords.findIndex((lw) =>
              cleanWord.toLowerCase() === lw.toLowerCase()
            );
            const isLink = linkIndex !== -1;

            if (isVisible) {
              const wordElement = (
                <motion.span
                  key={`${word}-${idx}`}
                  initial={{
                    opacity: 0,
                    filter: blurEffect ? "blur(10px)" : "none",
                    y: 5
                  }}
                  animate={{
                    opacity: 1,
                    filter: blurEffect ? "blur(0px)" : "none",
                    y: 0
                  }}
                  transition={{
                    duration: speed * 0.5,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "text-white", // Ajustado para o tema escuro da Magrass
                    isHighlight && (highlightClassName || "text-[#C5A059]")
                  )}
                >
                  {word}
                </motion.span>
              );

              if (isLink && linkHrefs[linkIndex]) {
                return (
                  <a
                    key={`link-${idx}`}
                    href={linkHrefs[linkIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("hover:opacity-80 transition-opacity", linkClassNames[linkIndex])}
                  >
                    {wordElement}
                  </a>
                );
              }
              return wordElement;
            }

            if (isUpcoming) {
              return (
                <motion.div
                  key={`placeholder-${idx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }} // Opacidade reduzida para sutileza
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#C5A059] rounded-full" // Cápsulas agora são douradas
                  style={{
                    width: `${Math.max(word.length * 0.6, 2)}em`,
                    height: "0.8em",
                    display: "inline-block",
                  }}
                />
              );
            }

            return null;
          })}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div
          className={cn(
            "text-white text-2xl leading-snug tracking-wide",
            textClassName
          )}
        >
          {generateWords()}
        </div>
      </div>
    </div>
  );
};