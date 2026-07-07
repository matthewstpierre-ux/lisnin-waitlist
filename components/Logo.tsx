import Image from "next/image";

interface LogoProps {
  width: number;
  height: number;
  priority?: boolean;
  style?: React.CSSProperties;
}

export function Logo({ width, height, priority, style }: LogoProps) {
  const imgStyle: React.CSSProperties = { objectFit: "contain", width: `${width}px`, height: `${height}px`, ...style };
  return (
    <>
      <Image
        src="/lisnin-logo__black.svg"
        alt="Lisnin"
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : undefined}
        className="logo-light-img"
        style={imgStyle}
      />
      <Image
        src="/lisnin-logo__white.svg"
        alt="Lisnin"
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : undefined}
        className="logo-dark-img"
        style={imgStyle}
      />
    </>
  );
}
