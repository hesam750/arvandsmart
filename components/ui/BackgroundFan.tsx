export default function BackgroundFan() {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
      <div className="relative w-[min(80vw,800px)] h-[min(80vw,800px)] rounded-full bg-[radial-gradient(circle_at_50%_50%,#0c1220_0%,#08101a_60%,#050a14_100%)] border border-blue-500/10 shadow-[inset_0_0_20px_rgba(0,0,0,.8),0_8px_32px_rgba(0,0,0,.5),0_0_60px_rgba(59,130,246,.05)] flex items-center justify-center opacity-15">
        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[calc(100%-16px)] h-[calc(100%-16px)] drop-shadow-[0_0_8px_rgba(59,130,246,0.2)]"
        >
          <defs>
            <linearGradient id="bladeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cfd5db" />
              <stop offset="40%" stopColor="#9aa2aa" />
              <stop offset="60%" stopColor="#858c94" />
              <stop offset="100%" stopColor="#d6dbe0" />
            </linearGradient>
            <radialGradient id="hubMetal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e7eaee" />
              <stop offset="65%" stopColor="#c2c7ce" />
              <stop offset="100%" stopColor="#9ba2aa" />
            </radialGradient>
            <linearGradient id="shroudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#757c84" />
              <stop offset="100%" stopColor="#444a50" />
            </linearGradient>
            <clipPath id="fanClip">
              <circle cx="60" cy="60" r="52" />
            </clipPath>
            {/* Neon glow filter */}
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer neon circles */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="url(#shroudGrad)"
            stroke="#2f3337"
            strokeWidth="4"
          />
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="#00f5ff"
            strokeWidth="1.5"
            opacity="0.7"
            filter="url(#neonGlow)"
          />
          
          {/* Inner neon circles */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#1f2327"
            strokeWidth="1"
            opacity="0.6"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#ff00ff"
            strokeWidth="1.2"
            opacity="0.6"
            filter="url(#neonGlow)"
          />
          
          {/* Additional decorative neon circles */}
          <circle
            cx="60"
            cy="60"
            r="53"
            fill="none"
            stroke="#ffaa00"
            strokeWidth="0.8"
            opacity="0.5"
            filter="url(#neonGlow)"
          />
          <circle
            cx="60"
            cy="60"
            r="47"
            fill="none"
            stroke="#00ff88"
            strokeWidth="0.8"
            opacity="0.5"
            filter="url(#neonGlow)"
          />
          
          <g className="origin-center animate-[spin_8s_linear_infinite]" clipPath="url(#fanClip)">
            <g transform="translate(60,60)">
              <g transform="scale(0.80)">
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
          </g>
          
          <circle
            cx="60"
            cy="60"
            r="12"
            fill="url(#hubMetal)"
            stroke="#3b4147"
            strokeWidth="0.9"
          />
          <circle cx="60" cy="60" r="4" fill="#343a40" />
        </svg>
        <div className="absolute inset-0 rounded-full opacity-25 pointer-events-none bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(255,255,255,.08)_0_1px,transparent_1px_8px)]" />
      </div>
    </div>
  );
}
