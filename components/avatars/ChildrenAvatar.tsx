export default function ChildrenAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shadows */}
      <ellipse cx="68" cy="192" rx="32" ry="8" fill="#cbd5e1" opacity="0.5" />
      <ellipse cx="138" cy="192" rx="32" ry="8" fill="#cbd5e1" opacity="0.5" />

      {/* ── BOY (left) ── */}
      {/* Body */}
      <path d="M38 130 Q38 112 68 110 Q98 112 98 130 L94 192 H42 Z" fill="#93c5fd" />
      <path d="M68 110 L68 125" stroke="white" strokeWidth="2" />
      {/* Collar */}
      <path d="M58 110 L68 122 L78 110" stroke="#60a5fa" strokeWidth="1.5" fill="none" />
      {/* Arms */}
      <path d="M98 120 Q112 128 110 145" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M38 120 Q24 128 26 145" stroke="#93c5fd" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="109" cy="147" r="7" fill="#f9c784" />
      <circle cx="27" cy="147" r="7" fill="#f9c784" />
      {/* Book in left hand */}
      <rect x="12" y="138" width="18" height="22" rx="2" fill="#4ade80" />
      <rect x="12" y="138" width="3" height="22" rx="1" fill="#16a34a" />
      <path d="M17 143 H28 M17 148 H28 M17 153 H28" stroke="white" strokeWidth="1" />
      {/* Neck */}
      <rect x="62" y="80" width="13" height="32" rx="6" fill="#f9c784" />
      {/* Head */}
      <ellipse cx="68" cy="62" rx="26" ry="28" fill="#f9c784" />
      {/* Hair */}
      <path d="M42 56 Q42 34 68 32 Q94 34 94 56 Q92 46 68 44 Q44 46 42 56Z" fill="#374151" />
      {/* Eyes */}
      <ellipse cx="60" cy="64" rx="3" ry="3.5" fill="#1e293b" />
      <ellipse cx="76" cy="64" rx="3" ry="3.5" fill="#1e293b" />
      <ellipse cx="60" cy="63" rx="1" ry="1.2" fill="white" />
      <ellipse cx="76" cy="63" rx="1" ry="1.2" fill="white" />
      {/* Smile */}
      <path d="M62 74 Q68 79 74 74" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Ear */}
      <ellipse cx="42" cy="64" rx="4" ry="5" fill="#f9c784" />
      <ellipse cx="94" cy="64" rx="4" ry="5" fill="#f9c784" />
      {/* Pants */}
      <path d="M42 185 L44 155 H62 L68 175 L74 155 H92 L94 185 Z" fill="#475569" />

      {/* ── GIRL (right) ── */}
      {/* Hijab outer */}
      <ellipse cx="138" cy="58" rx="34" ry="36" fill="#94a3b8" />
      {/* Body / Dress */}
      <path d="M108 138 Q108 112 138 110 Q168 112 168 138 L165 192 H111 Z" fill="#f0abfc" />
      <path d="M138 110 L138 124" stroke="#e879f9" strokeWidth="2" />
      {/* Arms */}
      <path d="M168 122 Q180 130 178 148" stroke="#f0abfc" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M108 122 Q96 130 98 148" stroke="#f0abfc" strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx="179" cy="150" r="7" fill="#f9c784" />
      <circle cx="97" cy="150" r="7" fill="#f9c784" />
      {/* Book in right hand */}
      <rect x="170" y="140" width="18" height="22" rx="2" fill="#fbbf24" />
      <rect x="170" y="140" width="3" height="22" rx="1" fill="#d97706" />
      <path d="M175 145 H186 M175 150 H186 M175 155 H186" stroke="white" strokeWidth="1" />
      {/* Neck */}
      <rect x="132" y="82" width="13" height="30" rx="6" fill="#f9c784" />
      {/* Face (inside hijab) */}
      <ellipse cx="138" cy="66" rx="22" ry="24" fill="#f9c784" />
      {/* Hijab inner frame */}
      <ellipse cx="138" cy="60" rx="26" ry="28" fill="#6b7280" opacity="0.0" />
      {/* Hijab sides */}
      <path d="M112 68 Q104 90 106 130 Q114 118 108 138" fill="#94a3b8" />
      <path d="M164 68 Q172 90 170 130 Q162 118 168 138" fill="#94a3b8" />
      {/* Hijab bottom */}
      <path d="M108 138 Q120 145 138 145 Q156 145 168 138 L165 192 H111 Z" fill="#f0abfc" />
      <path d="M106 112 Q120 118 138 118 Q156 118 170 112" fill="#94a3b8" />
      {/* Eyes */}
      <ellipse cx="130" cy="68" rx="3" ry="3.5" fill="#1e293b" />
      <ellipse cx="146" cy="68" rx="3" ry="3.5" fill="#1e293b" />
      <ellipse cx="130" cy="67" rx="1" ry="1.2" fill="white" />
      <ellipse cx="146" cy="67" rx="1" ry="1.2" fill="white" />
      {/* Smile */}
      <path d="M132 78 Q138 83 144 78" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Cheek blush */}
      <ellipse cx="124" cy="74" rx="5" ry="3" fill="#fda4af" opacity="0.5" />
      <ellipse cx="152" cy="74" rx="5" ry="3" fill="#fda4af" opacity="0.5" />
      {/* Hijab top */}
      <path d="M104 56 Q104 28 138 26 Q172 28 172 56 Q170 40 138 38 Q106 40 104 56Z" fill="#475569" />
    </svg>
  );
}
