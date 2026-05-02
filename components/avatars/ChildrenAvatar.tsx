export default function ChildrenAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 310" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>

      {/* ══════════ BOY (left) ══════════ */}

      {/* Sarong / batik (checkered brown) */}
      <path d="M38 200 Q38 180 72 178 Q106 180 106 200 L102 305 H42 Z" fill="#8B4513"/>
      {/* Batik pattern lines */}
      {[210,222,234,246,258,270,282,294].map(y => (
        <line key={y} x1="42" y1={y} x2="102" y2={y} stroke="#6B3410" strokeWidth="1" opacity="0.5"/>
      ))}
      {[52,62,72,82,92].map(x => (
        <line key={x} x1={x} y1="200" x2={x} y2="305" stroke="#6B3410" strokeWidth="1" opacity="0.4"/>
      ))}
      {/* Sarong fold at top */}
      <path d="M38 200 Q55 196 72 198 Q89 196 106 200 Q89 208 72 207 Q55 208 38 200Z" fill="#A0522D"/>

      {/* Shirt body */}
      <path d="M34 140 Q30 118 38 102 Q48 82 72 80 Q96 82 106 102 Q114 118 110 140 L108 200 H36 Z"
            fill="#F5F0E8"/>
      {/* Shirt collar */}
      <path d="M60 80 L72 96 L84 80" fill="none" stroke="#E0DAD0" strokeWidth="2"/>
      {/* Shirt button placket */}
      <path d="M72 92 L72 195" stroke="#E0DAD0" strokeWidth="1.5" strokeDasharray="4 4"/>
      {/* Shirt pocket */}
      <rect x="82" y="110" width="16" height="14" rx="2" stroke="#E0DAD0" strokeWidth="1.2" fill="none"/>
      {/* Shirt seam lines */}
      <path d="M48 130 Q46 160 44 200" stroke="#E0DAD0" strokeWidth="1" opacity="0.5"/>
      <path d="M96 130 Q98 160 100 200" stroke="#E0DAD0" strokeWidth="1" opacity="0.5"/>

      {/* Left arm holding book */}
      <path d="M34 130 Q14 138 10 158" stroke="#F5F0E8" strokeWidth="22" strokeLinecap="round" fill="none"/>
      {/* Hand */}
      <ellipse cx="10" cy="162" rx="11" ry="10" fill="#FBBF80"/>
      {/* Teal book */}
      <rect x="-4" y="152" width="30" height="38" rx="3" fill="#1A7A82"/>
      <rect x="-4" y="152" width="5" height="38" rx="2" fill="#145F66"/>
      <path d="M4 160 H24 M4 167 H24 M4 174 H24" stroke="white" strokeWidth="1.2" opacity="0.5"/>
      <path d="M9 155 Q11 152 13 155" stroke="white" strokeWidth="1" opacity="0.4"/>

      {/* Right arm */}
      <path d="M110 130 Q128 138 130 155" stroke="#F5F0E8" strokeWidth="22" strokeLinecap="round" fill="none"/>
      <ellipse cx="130" cy="158" rx="11" ry="10" fill="#FBBF80"/>

      {/* Neck */}
      <rect x="64" y="62" width="17" height="22" rx="8" fill="#FBBF80"/>

      {/* Head */}
      <ellipse cx="72" cy="46" rx="32" ry="34" fill="#FBBF80"/>

      {/* Face */}
      {/* Eyes */}
      <ellipse cx="62" cy="48" rx="6" ry="7" fill="#2D1A0E"/>
      <ellipse cx="82" cy="48" rx="6" ry="7" fill="#2D1A0E"/>
      <ellipse cx="60" cy="46" rx="2.5" ry="3" fill="white"/>
      <ellipse cx="80" cy="46" rx="2.5" ry="3" fill="white"/>
      <ellipse cx="60" cy="47" rx="1" ry="1.2" fill="white" opacity="0.8"/>
      <ellipse cx="80" cy="47" rx="1" ry="1.2" fill="white" opacity="0.8"/>
      {/* Eyebrows */}
      <path d="M56 40 Q62 37 68 40" stroke="#2D1A0E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M76 40 Q82 37 88 40" stroke="#2D1A0E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Nose */}
      <ellipse cx="72" cy="56" rx="3" ry="2" fill="#F0A870" opacity="0.6"/>
      {/* Big smile */}
      <path d="M60 64 Q72 76 84 64" stroke="#2D1A0E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Teeth */}
      <path d="M62 66 Q72 74 82 66 Q72 78 62 66Z" fill="white"/>
      {/* Rosy cheeks */}
      <ellipse cx="55" cy="60" rx="7" ry="5" fill="#FF9999" opacity="0.35"/>
      <ellipse cx="89" cy="60" rx="7" ry="5" fill="#FF9999" opacity="0.35"/>
      {/* Ear */}
      <ellipse cx="40" cy="48" rx="5" ry="7" fill="#FBBF80"/>
      <ellipse cx="104" cy="48" rx="5" ry="7" fill="#FBBF80"/>

      {/* Songkok / black cap */}
      <path d="M40 38 Q40 14 72 12 Q104 14 104 38 Q102 24 72 22 Q42 24 40 38Z" fill="#1A1A1A"/>
      <ellipse cx="72" cy="38" rx="33" ry="8" fill="#1A1A1A"/>
      <ellipse cx="72" cy="32" rx="28" ry="18" fill="#242424"/>
      {/* Cap sheen */}
      <path d="M52 20 Q65 14 80 14" stroke="#444" strokeWidth="1.5" opacity="0.5" strokeLinecap="round"/>

      {/* Sandals */}
      <ellipse cx="52" cy="308" rx="18" ry="5" fill="#8B6914"/>
      <ellipse cx="88" cy="308" rx="18" ry="5" fill="#8B6914"/>
      <path d="M42 303 Q52 300 62 303" stroke="#6B4F10" strokeWidth="2"/>
      <path d="M78 303 Q88 300 98 303" stroke="#6B4F10" strokeWidth="2"/>


      {/* ══════════ GIRL (right) ══════════ */}

      {/* Brown dress */}
      <path d="M204 190 Q200 168 210 148 Q220 128 248 126 Q276 128 286 148 Q296 168 292 190 L290 305 H206 Z"
            fill="#7B4A0E"/>
      {/* Dress buttons */}
      {[150,165,180,195,210,225,240,255,270,285].map((y, i) => (
        <circle key={i} cx="248" cy={y} r="3.5" fill="#9B6A2E" opacity="0.8"/>
      ))}
      {/* Dress sleeve lines */}
      <path d="M220 175 Q218 210 216 305" stroke="#6B3A0A" strokeWidth="1" opacity="0.3"/>
      <path d="M276 175 Q278 210 280 305" stroke="#6B3A0A" strokeWidth="1" opacity="0.3"/>

      {/* Left arm holding book */}
      <path d="M204 178 Q184 185 180 205" stroke="#7B4A0E" strokeWidth="22" strokeLinecap="round" fill="none"/>
      <ellipse cx="180" cy="208" rx="11" ry="10" fill="#FBBF80"/>
      {/* Teal book (girl) */}
      <rect x="164" y="196" width="30" height="40" rx="3" fill="#1A7A82"/>
      <rect x="164" y="196" width="5" height="40" rx="2" fill="#145F66"/>
      <path d="M172 204 H192 M172 211 H192 M172 218 H192" stroke="white" strokeWidth="1.2" opacity="0.5"/>

      {/* Right arm */}
      <path d="M292 178 Q310 185 312 202" stroke="#7B4A0E" strokeWidth="22" strokeLinecap="round" fill="none"/>
      <ellipse cx="313" cy="206" rx="11" ry="10" fill="#FBBF80"/>

      {/* Hijab body (white, drapes over shoulders) */}
      {/* Shoulder drape left */}
      <path d="M198 108 Q186 128 188 178 Q196 168 206 178 Q208 148 214 128Z" fill="#F5EFE0"/>
      {/* Shoulder drape right */}
      <path d="M298 108 Q310 128 308 178 Q300 168 290 178 Q288 148 282 128Z" fill="#F5EFE0"/>
      {/* Front hijab panel */}
      <path d="M214 128 Q214 108 248 104 Q282 108 282 128 L278 178 H218 Z" fill="#F5EFE0"/>

      {/* Neck */}
      <rect x="240" y="86" width="17" height="22" rx="8" fill="#FBBF80"/>

      {/* Head / hijab dome */}
      {/* Hijab top dome */}
      <ellipse cx="248" cy="68" rx="42" ry="44" fill="#F5EFE0"/>

      {/* Face */}
      <ellipse cx="248" cy="72" rx="30" ry="32" fill="#FBBF80"/>

      {/* Eyes */}
      <ellipse cx="238" cy="72" rx="6" ry="7" fill="#2D1A0E"/>
      <ellipse cx="258" cy="72" rx="6" ry="7" fill="#2D1A0E"/>
      <ellipse cx="236" cy="70" rx="2.5" ry="3" fill="white"/>
      <ellipse cx="256" cy="70" rx="2.5" ry="3" fill="white"/>
      <ellipse cx="236" cy="71" rx="1" ry="1.2" fill="white" opacity="0.8"/>
      <ellipse cx="256" cy="71" rx="1" ry="1.2" fill="white" opacity="0.8"/>
      {/* Eyebrows */}
      <path d="M232 64 Q238 61 244 64" stroke="#2D1A0E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M252 64 Q258 61 264 64" stroke="#2D1A0E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Nose */}
      <ellipse cx="248" cy="80" rx="3" ry="2" fill="#F0A870" opacity="0.6"/>
      {/* Big smile */}
      <path d="M236 88 Q248 100 260 88" stroke="#2D1A0E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Teeth */}
      <path d="M238 90 Q248 98 258 90 Q248 102 238 90Z" fill="white"/>
      {/* Rosy cheeks */}
      <ellipse cx="230" cy="84" rx="7" ry="5" fill="#FF9999" opacity="0.35"/>
      <ellipse cx="266" cy="84" rx="7" ry="5" fill="#FF9999" opacity="0.35"/>

      {/* Hijab inner frame (frames face) */}
      <path d="M218 78 Q218 46 248 42 Q278 46 278 78 Q276 60 248 58 Q220 60 218 78Z" fill="#F5EFE0"/>
      {/* Hijab chin wrap */}
      <path d="M220 104 Q222 112 248 114 Q274 112 276 104 Q272 110 248 111 Q224 110 220 104Z" fill="#EDE8DC"/>

      {/* Sandals girl */}
      <ellipse cx="228" cy="308" rx="18" ry="5" fill="#8B6914"/>
      <ellipse cx="264" cy="308" rx="18" ry="5" fill="#8B6914"/>
      <path d="M218 303 Q228 300 238 303" stroke="#6B4F10" strokeWidth="2"/>
      <path d="M254 303 Q264 300 274 303" stroke="#6B4F10" strokeWidth="2"/>

    </svg>
  );
}
