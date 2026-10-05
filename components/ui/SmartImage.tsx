"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES, type ImageKey } from "@/lib/images";
import { useI18n } from "@/lib/i18n";

type Props = {
  name: ImageKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  preload?: boolean;
};

/**
 * Fills its (positioned) parent with a registry image. A gradient sits behind
 * the photo so the slot still looks deliberate if the image is missing.
 */
export function SmartImage({ name, sizes, className = "", imgClassName = "", preload = false }: Props) {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);
  const image = IMAGES[name];

  return (
    <div className={`absolute inset-0 ${className}`} style={{ background: image.fallback }}>
      {!failed && (
        <Image
          src={image.src}
          alt={t.images[name]}
          fill
          sizes={sizes}
          quality={80}
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          className={`object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
