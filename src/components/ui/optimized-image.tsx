import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted/20", className)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
      {/* Placeholder de carregamento (Skeleton) */}
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-200" />}
    </div>
  );
}
