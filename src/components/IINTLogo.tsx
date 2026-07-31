import iintLogo from "../assets/images/iint_logo.png";

interface IINTLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function IINTLogo({
  className = "",
  size = "md",
  onClick,
}: IINTLogoProps) {
  const heights = {
    sm: "h-12 w-auto sm:h-14",
    md: "h-14 w-auto sm:h-16 md:h-[4.25rem]",
    lg: "h-16 w-auto sm:h-20 md:h-24",
  };

  const glowSizes = {
    sm: "-inset-x-3 -inset-y-2 sm:-inset-x-4 sm:-inset-y-2.5",
    md: "-inset-x-4 -inset-y-2.5 sm:-inset-x-5 sm:-inset-y-3 md:-inset-x-6 md:-inset-y-3.5",
    lg: "-inset-x-5 -inset-y-3 sm:-inset-x-7 sm:-inset-y-4 md:-inset-x-8 md:-inset-y-5",
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 cursor-pointer select-none ${className}`}
    >
      <div
        className={`absolute ${glowSizes[size]} pointer-events-none rounded-full`}
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.38) 35%, rgba(255,255,255,0.12) 58%, transparent 75%)",
          filter: "blur(10px)",
        }}
      />
      <div
        className={`absolute ${glowSizes[size]} pointer-events-none opacity-80`}
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(255,255,255,0.5) 0%, transparent 62%)",
          filter: "blur(6px)",
        }}
      />

      <img
        src={iintLogo}
        alt="IINT"
        className={`relative z-10 ${heights[size]} max-w-[min(92vw,280px)] sm:max-w-none object-contain object-center drop-shadow-[0_0_14px_rgba(255,255,255,0.55)]`}
        referrerPolicy="no-referrer"
        draggable={false}
      />
    </div>
  );
}
