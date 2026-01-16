"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const morphyButtonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-5 text-xs",
        lg: "h-12 px-10 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface MorphyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof morphyButtonVariants> {
  asChild?: boolean;
  dotClassName?: string;
  animate?: "normal" | "reverse";
}

const MorphyButton = React.forwardRef<HTMLButtonElement, MorphyButtonProps>(
  ({ className, size, asChild = false, children, dotClassName, animate = "normal", ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const Comp = asChild ? Slot : "button";
    const active = animate === "reverse" ? !isHovered : isHovered;

    const content = (
      <>
        {/* Camada de Fundo Estática */}
        <div className={cn(
          "absolute inset-0 transition-all duration-700 ease-in-out z-0",
          "bg-[#131842]" // Cor base fixa
        )} />
        
        {/* Efeito Morphing do Ponto */}
        <div className={cn(
          "absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-in-out z-0",
          dotClassName || "bg-[#C5A059]",
          active 
            ? "w-2.5 h-2.5 left-5 opacity-100" // Aumentei o left de 4 para 5 para dar mais respiro
            : "w-[300%] h-[300%] -left-[100%] opacity-0"
        )} />

        {/* Conteúdo com Recuo Maior */}
        <span className={cn(
          "relative z-10 transition-all duration-700 ease-in-out flex items-center justify-center gap-3",
          // CORREÇÃO: Aumentamos o translate-x para 4 (16px) ou 5 (20px) 
          // para compensar o surgimento do ponto à esquerda
          active ? "translate-x-7" : "translate-x-0"
        )}>
          {children}
        </span>
      </>
    );

    // ✅ Renderização com asChild ou Button
    const baseClasses = cn(
      morphyButtonVariants({ size }),
      "transition-all duration-700 ease-in-out border",
      // Adicionamos um pouco mais de padding horizontal no tamanho LG para acomodar o movimento
      size === "lg" && "px-12", 
      active ? "border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.2)]" : "border-transparent",
      className
    );

    return (
      <Comp
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={baseClasses}
        {...props}
      >
        {asChild 
          ? React.cloneElement(children as React.ReactElement, {}, content)
          : content
        }
      </Comp>
    );
  }
);

MorphyButton.displayName = "MorphyButton";
export { MorphyButton };