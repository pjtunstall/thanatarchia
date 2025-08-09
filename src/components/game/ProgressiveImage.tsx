import React, { useState, useEffect } from "react";
import { AvatarImage } from "@/components/ui/avatar";
import { loadAvatar } from "@/lib/images";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fillContainer?: boolean;
  useAvatar?: boolean;
}

export function ProgressiveImage({
  src,
  alt,
  className = "",
  style,
  fillContainer = false,
  useAvatar = false,
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>("");

  useEffect(() => {
    setCurrentSrc(""); // Reset on src change.

    if (useAvatar) {
      // For avatar images, implement progressive loading.
      loadAvatar(src as any)
        .then((resolvedSrc) => {
          if (resolvedSrc) {
            // Now apply progressive loading to the resolved avatar path.
            const basePath = resolvedSrc.replace(/\.(jpg|jpeg|png|webp)$/i, "");
            const extension =
              resolvedSrc.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || ".jpg";

            const lowQualitySrc = `${basePath}_1${extension}`;
            const mediumQualitySrc = `${basePath}_10${extension}`;
            const highQualitySrc = resolvedSrc;

            // Load low quality first.
            const lowImg = new Image();
            lowImg.onload = () => {
              setCurrentSrc(lowQualitySrc);

              // Load medium quality.
              const mediumImg = new Image();
              mediumImg.onload = () => {
                setCurrentSrc(mediumQualitySrc);

                // Load high quality.
                const highImg = new Image();
                highImg.onload = () => {
                  setCurrentSrc(highQualitySrc);
                };
                highImg.src = highQualitySrc;
              };
              mediumImg.src = mediumQualitySrc;
            };

            lowImg.onerror = () => {
              // If progressive versions don't exist, use original.
              setCurrentSrc(resolvedSrc);
            };

            lowImg.src = lowQualitySrc;
          }
        })
        .catch((error) => {
          console.error("Failed to load avatar:", src, error);
        });
      return;
    }

    // For regular file paths, use progressive loading.
    const basePath = src.replace(/\.(jpg|jpeg|png|webp)$/i, "");
    const extension = src.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || ".jpg";

    const lowQualitySrc = `${basePath}_1${extension}`;
    const mediumQualitySrc = `${basePath}_10${extension}`;
    const highQualitySrc = src;

    // Start with low quality.
    const lowImg = new Image();
    lowImg.onload = () => {
      setCurrentSrc(lowQualitySrc);

      // Load medium quality
      const mediumImg = new Image();
      mediumImg.onload = () => {
        setCurrentSrc(mediumQualitySrc);

        // Load high quality.
        const highImg = new Image();
        highImg.onload = () => {
          setCurrentSrc(highQualitySrc);
        };
        highImg.src = highQualitySrc;
      };
      mediumImg.src = mediumQualitySrc;
    };

    // If low quality fails, use original.
    lowImg.onerror = () => {
      setCurrentSrc(src);
    };

    lowImg.src = lowQualitySrc;
  }, [src, useAvatar]);

  if (useAvatar) {
    // For use within Radix Avatar system.
    if (!currentSrc) return null;
    return <AvatarImage src={currentSrc} alt={alt} className={className} />;
  }

  if (fillContainer) {
    return (
      <div className="w-full h-full">
        {currentSrc && (
          <img
            src={currentSrc}
            alt={alt}
            className="w-full h-full object-cover"
            style={style}
          />
        )}
      </div>
    );
  }

  return <img src={currentSrc} alt={alt} className={className} style={style} />;
}
