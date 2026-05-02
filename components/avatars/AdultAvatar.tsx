export default function AdultAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>

      {/* ── LEFT ARM (raised, pointing up) ── */}
      {/* Upper arm */}
      <path d="M80 160 Q55 130 52 100 Q50 85 58 78" stroke="#E8941A" strokeWidth="34" strokeLinecap="round" fill="none"/>
      {/* Cuff / sleeve end */}
      <ellipse cx="57" cy="76" rx="18" ry="10" fill="#E8941A"/>
      {/* Wrist skin */}
      <path d="M48 80 Q44 68 46 55" stroke="#FBBFA0" strokeWidth="18" strokeLinecap="round" fill="none"/>
      {/* Hand */}
      <ellipse cx="47" cy="50" rx="13" ry="14" fill="#FBBFA0"/>
      {/* Index finger pointing up */}
      <rect x="43" y="18" width="9" height="36" rx="4.5" fill="#FBBFA0"/>
      {/* Other fingers curled */}
      <rect x="34" y="42" width="8" height="18" rx="4" fill="#FBBFA0"/>
      <rect x="52" y="44" width="7" height="15" rx="3.5" fill="#FBBFA0"/>
      <rect x="59" y="47" width="6" height="13" rx="3" fill="#FBBFA0"/>
      {/* Thumb */}
      <path d="M33 54 Q28 60 32 66" stroke="#FBBFA0" strokeWidth="7" strokeLinecap="round" fill="none"/>

      {/* ── RIGHT ARM (at chest, fist) ── */}
      <path d="M180 160 Q205 155 210 175" stroke="#E8941A" strokeWidth="34" strokeLinecap="round" fill="none"/>
      {/* Cuff */}
      <ellipse cx="211" cy="177" rx="17" ry="10" fill="#E8941A"/>
      {/* Fist */}
      <ellipse cx="210" cy="192" rx="16" ry="13" fill="#FBBFA0"/>
      <path d="M198 188 Q198 200 210 202 Q222 200 222 188" fill="#F0A882" opacity="0.5"/>
      {/* Thumb */}
      <path d="M196 188 Q190 185 192 178" stroke="#FBBFA0" strokeWidth="8" strokeLinecap="round" fill="none"/>
      {/* Inner cuff pink */}
      <ellipse cx="211" cy="177" rx="12" ry="7" fill="#FBBFA0" opacity="0.6"/>

      {/* ── BODY / KURTA ── */}
      <path d="M78 155 Q72 130 80 110 Q90 85 130 82 Q170 85 180 110 Q188 130 182 155 L178 295 H82 Z"
            fill="#F0A500"/>
      {/* Kurta outline / shadow */}
      <path d="M78 155 Q72 130 80 110 Q90 85 130 82 Q170 85 180 110 Q188 130 182 155 L178 295 H82 Z"
            stroke="#D4890A" strokeWidth="1.5" fill="none" opacity="0.4"/>

      {/* Mandarin collar */}
      <path d="M112 82 Q112 68 130 66 Q148 68 148 82" fill="#D4890A" opacity="0.5"/>
      <path d="M118 82 L130 95 L142 82" fill="none" stroke="#D4890A" strokeWidth="2"/>

      {/* Inner pink shirt at neckline */}
      <path d="M122 82 L130 94 L138 82" fill="#FBBFA0" opacity="0.5"/>

      {/* Kurta buttons */}
      <circle cx="130" cy="115" r="4" fill="#D4890A" opacity="0.8"/>
      <circle cx="130" cy="132" r="4" fill="#D4890A" opacity="0.8"/>

      {/* Breast pocket */}
      <rect x="148" y="118" width="22" height="18" rx="3" stroke="#D4890A" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M148 125 H170" stroke="#D4890A" strokeWidth="1" opacity="0.5"/>

      {/* Kurta side seam lines */}
      <path d="M100 150 Q97 200 96 295" stroke="#D4890A" strokeWidth="1" opacity="0.3"/>
      <path d="M160 150 Q163 200 164 295" stroke="#D4890A" strokeWidth="1" opacity="0.3"/>

      {/* ── NECK ── */}
      <rect x="118" y="65" width="24" height="22" rx="12" fill="#FBBFA0"/>

      {/* ── HEAD ── */}
      <ellipse cx="130" cy="44" rx="42" ry="44" fill="#FBBFA0"/>

      {/* ── BEARD ── */}
      <path d="M90 52 Q88 68 92 78 Q100 96 116 102 Q130 106 144 102 Q160 96 168 78 Q172 68 170 52"
            fill="#3D2B1A" opacity="0.85"/>
      {/* Beard top edge (skin showing above beard) */}
      <ellipse cx="130" cy="50" rx="40" ry="32" fill="#FBBFA0"/>
      {/* Beard bottom */}
      <path d="M96 68 Q94 84 100 92 Q112 104 130 106 Q148 104 160 92 Q166 84 164 68"
            fill="#3D2B1A" opacity="0.85"/>
      {/* Moustache gap */}
      <path d="M112 68 Q130 74 148 68" fill="#FBBFA0" opacity="0.3"/>

      {/* ── EARS ── */}
      <ellipse cx="88" cy="46" rx="7" ry="9" fill="#FBBFA0"/>
      <ellipse cx="172" cy="46" rx="7" ry="9" fill="#FBBFA0"/>
      <ellipse cx="88" cy="46" rx="4" ry="6" fill="#F0A882" opacity="0.4"/>
      <ellipse cx="172" cy="46" rx="4" ry="6" fill="#F0A882" opacity="0.4"/>

      {/* ── TAQIYAH (cap) ── */}
      {/* White dome */}
      <path d="M89 34 Q88 4 130 2 Q172 4 171 34 Q168 18 130 16 Q92 18 89 34Z" fill="#F5EFE6"/>
      <ellipse cx="130" cy="34" rx="42" ry="9" fill="#F5EFE6"/>
      {/* Gold band */}
      <path d="M88 34 Q88 42 130 44 Q172 42 172 34 Q168 40 130 40 Q92 40 88 34Z" fill="#E8B84B"/>
      <ellipse cx="130" cy="34" rx="42" ry="6" fill="#E8B84B"/>
      {/* Cap highlight */}
      <path d="M100 18 Q115 10 130 9" stroke="white" strokeWidth="2" opacity="0.4" strokeLinecap="round"/>
    </svg>
  );
}
