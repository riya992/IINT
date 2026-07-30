import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import iintOfficialLogoImg from "../assets/images/iint_official_logo_new.png";

interface IINTLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  animated?: boolean;
  useImageLogo?: boolean;
}

export default function IINTLogo({
  className = "",
  showTagline = true,
  size = "md",
  onClick,
  animated = false,
  useImageLogo = true,
}: IINTLogoProps) {
  const [processedLogoUrl, setProcessedLogoUrl] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = iintOfficialLogoImg;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Loop through all pixels (r, g, b, a)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If the pixel is close to white, make it transparent
        if (r > 250 && g > 250 && b > 250) {
          data[i + 3] = 0; // set alpha to 0
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedLogoUrl(canvas.toDataURL());
    };
  }, []);

  // Scaling factors based on size prop for image logo
  const logoImageHeights = {
    sm: "h-12 sm:h-18",
    md: "h-14 sm:h-22",
    lg: "h-20 sm:h-36",
  };

  // Scaling factors based on size prop for vector fallback
  const iconSizes = {
    sm: "w-8 h-8 sm:w-9 sm:h-9",
    md: "w-10 h-10 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-20 sm:h-20",
  };

  const titleSizes = {
    sm: "text-lg sm:text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-5xl",
  };

  const sub1Sizes = {
    sm: "text-[8px] sm:text-[9.5px]",
    md: "text-[10px] sm:text-[12px]",
    lg: "text-[12px] sm:text-[15px]",
  };

  const sub2Sizes = {
    sm: "text-[7px] sm:text-[8px]",
    md: "text-[8.5px] sm:text-[10px]",
    lg: "text-[10px] sm:text-[13px]",
  };

  if (useImageLogo) {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center select-none cursor-pointer ${className}`}
      >
        <img
          src={iintOfficialLogoImg}
          alt="Official IINT Logo — Indian Institute of Networking Technology"
          className={`${logoImageHeights[size]} object-contain`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-2.5 sm:gap-3.5 select-none cursor-pointer ${className}`}
    >
      {/* Official IINT Fan Emblem SVG Graphic */}
      <div className="relative shrink-0">
        <svg
          className={`${iconSizes[size]} shrink-0 overflow-visible`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top quadrilateral - light sky blue */}
          <path
            d="M70,15 L90,15 C92,15 93,17 92,18 L88,32 C87,34 85,35 83,35 L65,35 C63,35 62,33 63,31 L68,17 C68,15 70,15 70,15 Z"
            fill="#93C5FD"
          />
          {/* 2nd quadrilateral - cyan sky blue */}
          <path
            d="M58,25 L78,25 C80,25 81,27 80,28 L75,42 C74,44 72,45 70,45 L52,45 C50,45 49,43 50,41 L55,27 C56,25 58,25 58,25 Z"
            fill="#38BDF8"
          />
          {/* 3rd quadrilateral - cyan blue */}
          <path
            d="M48,35 L66,35 C68,35 69,37 68,38 L62,53 C61,55 59,56 57,56 L40,56 C38,56 37,54 38,52 L44,37 C45,35 47,35 48,35 Z"
            fill="#00A0E9"
          />
          {/* 4th quadrilateral - royal blue */}
          <path
            d="M40,48 L56,48 C58,48 59,50 58,51 L51,68 C50,70 48,71 46,71 L30,71 C28,71 27,69 28,67 L35,50 C36,48 38,48 40,48 Z"
            fill="#1D4ED8"
          />
          {/* 5th quadrilateral - deep navy arc */}
          <path
            d="M32,62 L48,62 C50,62 51,64 50,65 C45,80 30,92 12,98 C10,99 8,97 9,95 C14,83 22,70 32,62 Z"
            fill="#1E3A8A"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left leading-none justify-center">
        <div
          className={`${titleSizes[size]} font-black tracking-tight flex items-center leading-none relative overflow-hidden`}
        >
          <span className="font-serif text-white tracking-normal">
            II
          </span>
          <span className="font-sans text-[#00A0E9] font-black tracking-tight inline-block relative px-0.5">
            N
          </span>
          <span className="font-serif text-white tracking-normal">
            T
          </span>
        </div>

        <div
          className={`${sub1Sizes[size]} font-sans font-medium text-zinc-200 mt-0.5 leading-tight whitespace-nowrap flex items-center gap-1`}
        >
          <span>Indian Institute of </span>
          <span className="text-[#00A0E9] font-bold">Networking </span>
          <span>Technology</span>
        </div>

        {showTagline && (
          <div
            className={`${sub2Sizes[size]} font-sans font-semibold tracking-wider text-zinc-300/90 mt-0.5 uppercase whitespace-nowrap ${
              size === "sm" ? "hidden sm:block" : "block"
            }`}
          >
            A Unit of Adarsh Welfare & Education Organisation
          </div>
        )}
      </div>
    </div>
  );
}


