export default function AdultAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Body / Thobe */}
      <ellipse cx="80" cy="175" rx="42" ry="20" fill="#e2e8f0" opacity="0.5" />
      <path d="M38 130 Q38 108 80 106 Q122 108 122 130 L118 195 H42 Z" fill="#d1d5db" />
      <path d="M38 130 Q38 108 80 106 Q122 108 122 130 L118 195 H42 Z" fill="#94a3b8" opacity="0.3" />
      {/* Collar */}
      <path d="M68 106 L80 120 L92 106" stroke="#9ca3af" strokeWidth="2" fill="none" />
      {/* Right arm raised */}
      <path d="M122 115 Q148 100 152 80 Q154 72 148 70" stroke="#d1d5db" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Left arm */}
      <path d="M38 115 Q20 125 18 140" stroke="#d1d5db" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Right hand / finger pointing */}
      <circle cx="148" cy="68" r="6" fill="#f3d5b5" />
      <path d="M148 62 L148 50" stroke="#f3d5b5" strokeWidth="5" strokeLinecap="round" />
      {/* Left hand */}
      <circle cx="17" cy="142" r="7" fill="#f3d5b5" />
      {/* Neck */}
      <rect x="72" y="80" width="16" height="28" rx="8" fill="#f3d5b5" />
      {/* Head */}
      <ellipse cx="80" cy="58" rx="30" ry="33" fill="#f3d5b5" />
      {/* Face */}
      <ellipse cx="71" cy="60" rx="3.5" ry="4" fill="#1e293b" />
      <ellipse cx="89" cy="60" rx="3.5" ry="4" fill="#1e293b" />
      <ellipse cx="71" cy="59" rx="1.2" ry="1.5" fill="white" />
      <ellipse cx="89" cy="59" rx="1.2" ry="1.5" fill="white" />
      <path d="M73 72 Q80 77 87 72" stroke="#374151" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Beard */}
      <path d="M55 68 Q52 82 62 88 Q70 92 80 91 Q90 92 98 88 Q108 82 105 68" fill="#9ca3af" opacity="0.6" />
      {/* Taqiyah / cap */}
      <ellipse cx="80" cy="30" rx="31" ry="8" fill="#6b7280" />
      <path d="M49 30 Q50 10 80 8 Q110 10 111 30" fill="#6b7280" />
      <ellipse cx="80" cy="30" rx="31" ry="6" fill="#4b5563" />
      {/* Cap detail */}
      <path d="M52 22 Q80 18 108 22" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}
