"use client";

import Image from "next/image";

interface ActivityMediaImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

function isPrivateMediaUrl(src: string) {
  return src.startsWith("/api/media?");
}

const ActivityMediaImage = ({ src, alt, className = "", sizes }: ActivityMediaImageProps) => {
  if (isPrivateMediaUrl(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
    />
  );
};

export default ActivityMediaImage;
