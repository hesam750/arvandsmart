'use client';

import { useState, useEffect } from 'react';

export default function BackgroundFan() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // در زمان SSR، یک placeholder ساده برگردون
    return (
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="relative w-[min(80vw,800px)] h-[min(80vw,800px)] rounded-full opacity-20 bg-slate-900" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center" suppressHydrationWarning>
      <div className="relative w-[min(80vw,800px)] h-[min(80vw,800px)] rounded-full flex items-center justify-center opacity-20">
        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="bladeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="35%" stopColor="#94a3b8" />
              <stop offset="65%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <radialGradient id="hubMetal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>

            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="70%" stopColor="#0a1120" />
              <stop offset="100%" stopColor="#060d18" />
            </radialGradient>

            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="bladeGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="fanClip">
              <circle cx="60" cy="60" r="52" />
            </clipPath>
          </defs>

          {/* Base circle */}
          <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />

          {/* Outer shroud ring */}
          <circle
            cx="60" cy="60" r="56"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="3.5"
          />

          {/* Subtle outer accent */}
          <circle
            cx="60" cy="60" r="56"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="0.4"
            opacity="0.15"
            filter="url(#softGlow)"
          />

          {/* Mid ring */}
            <circle
            cx="60" cy="60" r="51"
            fill="none"
            stroke="#1e293b"
            strokeWidth="0.8"
            opacity="0.8"
          />

          {/* Inner accent ring */}
          <circle
            cx="60" cy="60" r="48"
            fill="none"
            stroke="#334155"
            strokeWidth="0.5"
            opacity="0.5"
          />

          {/* Tick marks around the shroud - گرد کردن اعداد برای جلوگیری از hydration mismatch */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const isMajor = i % 3 === 0;
            const r1 = 53;
            const r2 = isMajor ? 50.5 : 51.8;
            const x1 = parseFloat((60 + r1 * Math.cos(angle)).toFixed(10));
            const y1 = parseFloat((60 + r1 * Math.sin(angle)).toFixed(10));
            const x2 = parseFloat((60 + r2 * Math.cos(angle)).toFixed(10));
            const y2 = parseFloat((60 + r2 * Math.sin(angle)).toFixed(10));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#94a3b8"
                strokeWidth={isMajor ? "0.6" : "0.35"}
                opacity={isMajor ? "0.5" : "0.25"}
              />
            );
          })}

          {/* Spinning blades */}
          <g
            className="origin-center animate-[spin_8s_linear_infinite]"
            style={{ transformOrigin: "60px 60px" }}
            clipPath="url(#fanClip)"
            filter="url(#bladeGlow)"
          >
            <g transform="translate(60,60) scale(0.80)">
              <g id="blade6" fill="url(#bladeMetal)">
                <path d="M 2 -18 C 8 -30, 22 -40, 34 -42 C 45 -44, 50 -42, 52 -38 C 54 -33, 49 -27, 42 -24 C 33 -20, 22 -15, 14 -9 C 6 -3, 0 4, -2 10 C -4 15, -6 18, -10 18 C -14 18, -16 14, -16 10 C -16 2, -10 -8, 2 -18 Z" />
              </g>
              <use href="#blade6" transform="rotate(0)" />
              <use href="#blade6" transform="rotate(60)" />
              <use href="#blade6" transform="rotate(120)" />
              <use href="#blade6" transform="rotate(180)" />
              <use href="#blade6" transform="rotate(240)" />
              <use href="#blade6" transform="rotate(300)" />
            </g>
          </g>

          {/* Hub outer ring */}
          <circle
            cx="60" cy="60" r="13.5"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Hub */}
          <circle
            cx="60" cy="60" r="11.5"
            fill="url(#hubMetal)"
            stroke="#475569"
            strokeWidth="0.6"
          />

          {/* Hub detail rings */}
          <circle cx="60" cy="60" r="8" fill="none" stroke="#64748b" strokeWidth="0.4" opacity="0.6" />
          <circle cx="60" cy="60" r="4.5" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="2" fill="#0f172a" />
        </svg>

        {/* Radial grid overlay */}
        <div className="absolute inset-0 rounded-full pointer-events-none opacity-30 bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(148,163,184,.04)_0_1px,transparent_1px_10px)]" />

        {/* Vignette */}
        <div className="absolute inset-0 rounded-full pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,.6)_100%)]" />
      </div>
    </div>
  );
}