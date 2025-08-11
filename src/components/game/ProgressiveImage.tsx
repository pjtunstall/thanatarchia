import React, { useState, useEffect, useRef } from "react";
import { AvatarImage } from "@/components/ui/avatar";
import { loadAvatar } from "@/lib/images";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fillContainer?: boolean;
  useAvatar?: boolean;
  placeholder?: React.ReactNode;
}

function loadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
}

export function ProgressiveImage({
  src,
  alt,
  className = "",
  style,
  fillContainer = false,
  useAvatar = false,
  placeholder = null,
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    setCurrentSrc(""); // Reset on src change.

    async function progressiveLoad(resolvedSrc: string) {
      const basePath = resolvedSrc.replace(/\.(jpg|jpeg|png|webp)$/i, "");
      const extension =
        resolvedSrc.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || ".jpg";

      const lowQualitySrc = `${basePath}_1${extension}`;
      const mediumQualitySrc = `${basePath}_10${extension}`;
      const highQualitySrc = resolvedSrc;

      try {
        await loadImage(lowQualitySrc);
        if (cancelled.current) return;
        setCurrentSrc(lowQualitySrc);
      } catch {
        if (cancelled.current) return;
        setCurrentSrc(highQualitySrc);
        return;
      }

      try {
        await loadImage(mediumQualitySrc);
        if (cancelled.current) return;
        setCurrentSrc(mediumQualitySrc);
      } catch {}

      try {
        await loadImage(highQualitySrc);
        if (cancelled.current) return;
        setCurrentSrc(highQualitySrc);
      } catch {}
    }

    (async () => {
      if (useAvatar) {
        try {
          const resolved = await loadAvatar(src as any);
          if (!cancelled.current && resolved) {
            await progressiveLoad(resolved);
          } else if (!cancelled.current) {
            setCurrentSrc(src);
          }
        } catch {
          if (!cancelled.current) setCurrentSrc(src);
        }
      } else {
        await progressiveLoad(src);
      }
    })();

    return () => {
      cancelled.current = true;
    };
  }, [src, useAvatar]);

  if (!currentSrc) {
    if (placeholder) return <>{placeholder}</>;
    return null;
  }

  if (useAvatar) {
    return <AvatarImage src={currentSrc} alt={alt} className={className} />;
  }

  if (fillContainer) {
    return (
      <div className="w-full h-full">
        <img
          src={currentSrc}
          alt={alt}
          className="w-full h-full object-cover"
          style={style}
        />
      </div>
    );
  }

  return <img src={currentSrc} alt={alt} className={className} style={style} />;
}
