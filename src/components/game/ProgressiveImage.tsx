import React, { useState, useEffect, useRef } from "react";

type ProgressiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fillContainer?: boolean;
  placeholder?: React.ReactNode;
};

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
  placeholder = null,
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    setCurrentSrc("");

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

    progressiveLoad(src);

    return () => {
      cancelled.current = true;
    };
  }, [src]);

  if (!currentSrc) {
    if (placeholder) return <>{placeholder}</>;
    return null;
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
