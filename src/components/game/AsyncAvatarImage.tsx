import { useState, useEffect } from "react";
import { AvatarImage } from "@/components/ui/avatar";
import { loadAvatar } from "@/lib/images";

export function AsyncAvatarImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    loadAvatar(src).then(setUrl);
  }, [src]);

  if (!url) return null;
  return <AvatarImage src={url} alt={alt} {...props} />;
}
