import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  withBg?: boolean;
}

export default function Logo({ size = 32, className = '', withBg = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none flex-none ${className}`}
      id="reelio-brand-logo"
    >
      {withBg && (
        <rect
          width="100"
          height="100"
          rx="25"
          fill="#121214"
          id="logo-bg-squircle"
        />
      )}
      
      {/* Stylized Purple R Stem */}
      <rect
        x="27"
        y="20"
        width="9.5"
        height="60"
        rx="4.75"
        fill="#9D8CFF"
        id="logo-stem-purple"
      />

      {/* Stylized Purple R Loop & Leg */}
      <path
        d="M 36.5 28.5 C 54 28.5, 61.5 35, 61.5 44 C 61.5 52, 54 57.5, 43.5 55.5 L 64 76.5"
        stroke="#9D8CFF"
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        id="logo-loop-leg-purple"
      />

      {/* Vibrant Teal Engagement Dot */}
      <circle
        cx="73"
        cy="29"
        r="6.2"
        fill="#00D9A3"
        id="logo-teal-engagement-dot"
      />
    </svg>
  );
}
