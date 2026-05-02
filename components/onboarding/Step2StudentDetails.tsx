"use client";
import { useState } from "react";
import CalendarPicker from "@/components/ui/CalendarPicker";

export interface StudentData {
  name: string; email: string; phone: string;
  countryCode: string; dob: string; gender: string; currentLevel: string;
}
export function emptyStudent(): StudentData {
  return { name: "", email: "", phone: "", countryCode: "+1", dob: "", gender: "", currentLevel: "" };
}

interface Props {
  students: StudentData[]; allowMultiple: boolean;
  onChange: (s: StudentData[]) => void; onNext: () => void; onBack: () => void;
}

const ALL_COUNTRIES = [
  { code: "+93",   iso: "af", name: "Afghanistan" },
  { code: "+355",  iso: "al", name: "Albania" },
  { code: "+213",  iso: "dz", name: "Algeria" },
  { code: "+376",  iso: "ad", name: "Andorra" },
  { code: "+244",  iso: "ao", name: "Angola" },
  { code: "+54",   iso: "ar", name: "Argentina" },
  { code: "+374",  iso: "am", name: "Armenia" },
  { code: "+61",   iso: "au", name: "Australia" },
  { code: "+43",   iso: "at", name: "Austria" },
  { code: "+994",  iso: "az", name: "Azerbaijan" },
  { code: "+1",    iso: "bs", name: "Bahamas" },
  { code: "+973",  iso: "bh", name: "Bahrain" },
  { code: "+880",  iso: "bd", name: "Bangladesh" },
  { code: "+375",  iso: "by", name: "Belarus" },
  { code: "+32",   iso: "be", name: "Belgium" },
  { code: "+501",  iso: "bz", name: "Belize" },
  { code: "+229",  iso: "bj", name: "Benin" },
  { code: "+975",  iso: "bt", name: "Bhutan" },
  { code: "+591",  iso: "bo", name: "Bolivia" },
  { code: "+387",  iso: "ba", name: "Bosnia" },
  { code: "+267",  iso: "bw", name: "Botswana" },
  { code: "+55",   iso: "br", name: "Brazil" },
  { code: "+673",  iso: "bn", name: "Brunei" },
  { code: "+359",  iso: "bg", name: "Bulgaria" },
  { code: "+226",  iso: "bf", name: "Burkina Faso" },
  { code: "+257",  iso: "bi", name: "Burundi" },
  { code: "+855",  iso: "kh", name: "Cambodia" },
  { code: "+237",  iso: "cm", name: "Cameroon" },
  { code: "+1",    iso: "ca", name: "Canada" },
  { code: "+238",  iso: "cv", name: "Cape Verde" },
  { code: "+236",  iso: "cf", name: "Central African Republic" },
  { code: "+235",  iso: "td", name: "Chad" },
  { code: "+56",   iso: "cl", name: "Chile" },
  { code: "+86",   iso: "cn", name: "China" },
  { code: "+57",   iso: "co", name: "Colombia" },
  { code: "+269",  iso: "km", name: "Comoros" },
  { code: "+242",  iso: "cg", name: "Congo" },
  { code: "+506",  iso: "cr", name: "Costa Rica" },
  { code: "+385",  iso: "hr", name: "Croatia" },
  { code: "+53",   iso: "cu", name: "Cuba" },
  { code: "+357",  iso: "cy", name: "Cyprus" },
  { code: "+420",  iso: "cz", name: "Czech Republic" },
  { code: "+45",   iso: "dk", name: "Denmark" },
  { code: "+253",  iso: "dj", name: "Djibouti" },
  { code: "+1",    iso: "do", name: "Dominican Republic" },
  { code: "+593",  iso: "ec", name: "Ecuador" },
  { code: "+20",   iso: "eg", name: "Egypt" },
  { code: "+503",  iso: "sv", name: "El Salvador" },
  { code: "+291",  iso: "er", name: "Eritrea" },
  { code: "+372",  iso: "ee", name: "Estonia" },
  { code: "+268",  iso: "sz", name: "Eswatini" },
  { code: "+251",  iso: "et", name: "Ethiopia" },
  { code: "+679",  iso: "fj", name: "Fiji" },
  { code: "+358",  iso: "fi", name: "Finland" },
  { code: "+33",   iso: "fr", name: "France" },
  { code: "+241",  iso: "ga", name: "Gabon" },
  { code: "+220",  iso: "gm", name: "Gambia" },
  { code: "+995",  iso: "ge", name: "Georgia" },
  { code: "+49",   iso: "de", name: "Germany" },
  { code: "+233",  iso: "gh", name: "Ghana" },
  { code: "+30",   iso: "gr", name: "Greece" },
  { code: "+502",  iso: "gt", name: "Guatemala" },
  { code: "+224",  iso: "gn", name: "Guinea" },
  { code: "+592",  iso: "gy", name: "Guyana" },
  { code: "+509",  iso: "ht", name: "Haiti" },
  { code: "+504",  iso: "hn", name: "Honduras" },
  { code: "+852",  iso: "hk", name: "Hong Kong" },
  { code: "+36",   iso: "hu", name: "Hungary" },
  { code: "+354",  iso: "is", name: "Iceland" },
  { code: "+91",   iso: "in", name: "India" },
  { code: "+62",   iso: "id", name: "Indonesia" },
  { code: "+98",   iso: "ir", name: "Iran" },
  { code: "+964",  iso: "iq", name: "Iraq" },
  { code: "+353",  iso: "ie", name: "Ireland" },
  { code: "+972",  iso: "il", name: "Israel" },
  { code: "+39",   iso: "it", name: "Italy" },
  { code: "+1",    iso: "jm", name: "Jamaica" },
  { code: "+81",   iso: "jp", name: "Japan" },
  { code: "+962",  iso: "jo", name: "Jordan" },
  { code: "+7",    iso: "kz", name: "Kazakhstan" },
  { code: "+254",  iso: "ke", name: "Kenya" },
  { code: "+965",  iso: "kw", name: "Kuwait" },
  { code: "+996",  iso: "kg", name: "Kyrgyzstan" },
  { code: "+856",  iso: "la", name: "Laos" },
  { code: "+371",  iso: "lv", name: "Latvia" },
  { code: "+961",  iso: "lb", name: "Lebanon" },
  { code: "+266",  iso: "ls", name: "Lesotho" },
  { code: "+231",  iso: "lr", name: "Liberia" },
  { code: "+218",  iso: "ly", name: "Libya" },
  { code: "+370",  iso: "lt", name: "Lithuania" },
  { code: "+352",  iso: "lu", name: "Luxembourg" },
  { code: "+853",  iso: "mo", name: "Macau" },
  { code: "+261",  iso: "mg", name: "Madagascar" },
  { code: "+265",  iso: "mw", name: "Malawi" },
  { code: "+60",   iso: "my", name: "Malaysia" },
  { code: "+960",  iso: "mv", name: "Maldives" },
  { code: "+223",  iso: "ml", name: "Mali" },
  { code: "+356",  iso: "mt", name: "Malta" },
  { code: "+222",  iso: "mr", name: "Mauritania" },
  { code: "+230",  iso: "mu", name: "Mauritius" },
  { code: "+52",   iso: "mx", name: "Mexico" },
  { code: "+373",  iso: "md", name: "Moldova" },
  { code: "+976",  iso: "mn", name: "Mongolia" },
  { code: "+382",  iso: "me", name: "Montenegro" },
  { code: "+212",  iso: "ma", name: "Morocco" },
  { code: "+258",  iso: "mz", name: "Mozambique" },
  { code: "+95",   iso: "mm", name: "Myanmar" },
  { code: "+264",  iso: "na", name: "Namibia" },
  { code: "+977",  iso: "np", name: "Nepal" },
  { code: "+31",   iso: "nl", name: "Netherlands" },
  { code: "+64",   iso: "nz", name: "New Zealand" },
  { code: "+505",  iso: "ni", name: "Nicaragua" },
  { code: "+227",  iso: "ne", name: "Niger" },
  { code: "+234",  iso: "ng", name: "Nigeria" },
  { code: "+47",   iso: "no", name: "Norway" },
  { code: "+968",  iso: "om", name: "Oman" },
  { code: "+92",   iso: "pk", name: "Pakistan" },
  { code: "+970",  iso: "ps", name: "Palestine" },
  { code: "+507",  iso: "pa", name: "Panama" },
  { code: "+595",  iso: "py", name: "Paraguay" },
  { code: "+51",   iso: "pe", name: "Peru" },
  { code: "+63",   iso: "ph", name: "Philippines" },
  { code: "+48",   iso: "pl", name: "Poland" },
  { code: "+351",  iso: "pt", name: "Portugal" },
  { code: "+974",  iso: "qa", name: "Qatar" },
  { code: "+40",   iso: "ro", name: "Romania" },
  { code: "+7",    iso: "ru", name: "Russia" },
  { code: "+250",  iso: "rw", name: "Rwanda" },
  { code: "+966",  iso: "sa", name: "Saudi Arabia" },
  { code: "+221",  iso: "sn", name: "Senegal" },
  { code: "+381",  iso: "rs", name: "Serbia" },
  { code: "+232",  iso: "sl", name: "Sierra Leone" },
  { code: "+65",   iso: "sg", name: "Singapore" },
  { code: "+421",  iso: "sk", name: "Slovakia" },
  { code: "+386",  iso: "si", name: "Slovenia" },
  { code: "+252",  iso: "so", name: "Somalia" },
  { code: "+27",   iso: "za", name: "South Africa" },
  { code: "+82",   iso: "kr", name: "South Korea" },
  { code: "+211",  iso: "ss", name: "South Sudan" },
  { code: "+34",   iso: "es", name: "Spain" },
  { code: "+94",   iso: "lk", name: "Sri Lanka" },
  { code: "+249",  iso: "sd", name: "Sudan" },
  { code: "+597",  iso: "sr", name: "Suriname" },
  { code: "+46",   iso: "se", name: "Sweden" },
  { code: "+41",   iso: "ch", name: "Switzerland" },
  { code: "+963",  iso: "sy", name: "Syria" },
  { code: "+886",  iso: "tw", name: "Taiwan" },
  { code: "+992",  iso: "tj", name: "Tajikistan" },
  { code: "+255",  iso: "tz", name: "Tanzania" },
  { code: "+66",   iso: "th", name: "Thailand" },
  { code: "+228",  iso: "tg", name: "Togo" },
  { code: "+216",  iso: "tn", name: "Tunisia" },
  { code: "+90",   iso: "tr", name: "Turkey" },
  { code: "+993",  iso: "tm", name: "Turkmenistan" },
  { code: "+256",  iso: "ug", name: "Uganda" },
  { code: "+380",  iso: "ua", name: "Ukraine" },
  { code: "+971",  iso: "ae", name: "United Arab Emirates" },
  { code: "+44",   iso: "gb", name: "United Kingdom" },
  { code: "+1",    iso: "us", name: "United States" },
  { code: "+598",  iso: "uy", name: "Uruguay" },
  { code: "+998",  iso: "uz", name: "Uzbekistan" },
  { code: "+58",   iso: "ve", name: "Venezuela" },
  { code: "+84",   iso: "vn", name: "Vietnam" },
  { code: "+967",  iso: "ye", name: "Yemen" },
  { code: "+260",  iso: "zm", name: "Zambia" },
  { code: "+263",  iso: "zw", name: "Zimbabwe" },
];

const PINNED_ISOS = ["us", "gb", "ca", "au", "pk", "in", "ae", "sa"];
const POPULAR = ALL_COUNTRIES.filter(c => PINNED_ISOS.includes(c.iso));
const REST = ALL_COUNTRIES.filter(c => !PINNED_ISOS.includes(c.iso));

function FlagImg({ iso, size = 24 }: { iso: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      alt={iso}
      width={size}
      height={Math.round(size * 0.67)}
      className="rounded-sm object-cover flex-shrink-0"
      style={{ width: size, height: Math.round(size * 0.67) }}
    />
  );
}

const LEVELS = ["Beginner", "Elementary", "Intermediate", "Advanced", "Native / Fluent"];
const TODAY = new Date().toISOString().slice(0, 10);
const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none transition-all";
const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1";

function CountryDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useState(() => { if (typeof document !== "undefined") { const el = document.createElement("div"); return el; } })[0];

  const selected = ALL_COUNTRIES.find(c => c.iso === "us" && c.code === value)
    ?? ALL_COUNTRIES.find(c => c.code === value)
    ?? ALL_COUNTRIES.find(c => c.iso === "us")!;

  const query = search.toLowerCase();
  const filteredPopular = POPULAR.filter(c => c.name.toLowerCase().includes(query) || c.code.includes(query));
  const filteredRest = REST.filter(c => c.name.toLowerCase().includes(query) || c.code.includes(query));
  const showSections = !search && filteredPopular.length > 0;

  return (
    <div className="relative h-full">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 h-full border-r border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-l-lg transition-colors"
        style={{ minWidth: 68 }}>
        <FlagImg iso={selected.iso} size={20} />
        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">{selected.code}</span>
        <svg className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden" style={{ width: 260 }}>
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 focus-within:border-yellow-400 focus-within:bg-white transition-all">
              <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input autoFocus type="text" placeholder="Search country…" value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 text-xs bg-transparent focus:outline-none text-gray-700 placeholder-gray-400" />
            </div>
          </div>

          {/* List */}
          <div className="max-h-56 overflow-y-auto">
            {showSections && (
              <>
                <p className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">Popular</p>
                {filteredPopular.map(c => (
                  <CountryRow key={c.iso} c={c} selected={selected} onSelect={() => { onChange(c.code); setOpen(false); setSearch(""); }} />
                ))}
                <div className="mx-3 my-1 border-t border-gray-100" />
                <p className="px-3 pt-1 pb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">All countries</p>
              </>
            )}
            {(showSections ? filteredRest : [...filteredPopular, ...filteredRest]).map(c => (
              <CountryRow key={c.iso} c={c} selected={selected} onSelect={() => { onChange(c.code); setOpen(false); setSearch(""); }} />
            ))}
            {filteredPopular.length === 0 && filteredRest.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CountryRow({ c, selected, onSelect }: {
  c: { code: string; iso: string; name: string };
  selected: { iso: string };
  onSelect: () => void;
}) {
  const isSelected = c.iso === selected.iso;
  return (
    <button type="button" onClick={onSelect}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
      style={{ background: isSelected ? "#f0f4ff" : undefined }}>
      <FlagImg iso={c.iso} size={24} />
      <span className="flex-1 text-sm font-medium text-gray-800 truncate">{c.name}</span>
      <span className="text-xs font-semibold text-gray-400 flex-shrink-0">{c.code}</span>
    </button>
  );
}

function Chevron() {
  return (
    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
      </svg>
    </span>
  );
}

function isStudentValid(s: StudentData) {
  return s.name.trim() && s.email.includes("@") && s.phone.trim() && s.dob && s.gender && s.currentLevel;
}

function StudentCard({ student, index, allowMultiple, onChange, onRemove }: {
  student: StudentData; index: number; allowMultiple: boolean;
  onChange: (s: StudentData) => void; onRemove: () => void;
}) {
  const [open, setOpen] = useState(true);
  const set = (f: keyof StudentData, v: string) => onChange({ ...student, [f]: v });

  return (
    <div className="border border-gray-200 rounded-xl overflow-visible mb-3" style={{ background: "#fafaf8" }}>
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "#1E2D4E" }}>{index + 1}</div>
          <span className="font-semibold text-gray-800 text-sm">
            Student {index + 1}{student.name ? ` — ${student.name}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {allowMultiple && index > 0 && (
            <button onClick={e => { e.stopPropagation(); onRemove(); }}
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{ borderColor: "#E6A817", color: "#E6A817" }}>Remove</button>
          )}
          <svg className="w-4 h-4 text-gray-400 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Full Name</label>
              <input type="text" placeholder="e.g. Aisha Rahman" value={student.name}
                onChange={e => set("name", e.target.value)} className={inputCls} autoComplete="off" />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input type="email" placeholder="email@example.com" value={student.email}
                onChange={e => set("email", e.target.value)} className={inputCls} autoComplete="off" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Student&apos;s Number</label>
              <div className="flex items-stretch border border-gray-200 rounded-lg bg-white overflow-visible focus-within:border-yellow-400 focus-within:shadow-[0_0_0_3px_rgba(230,168,23,0.15)] transition-all" style={{ height: "42px" }}>
                <CountryDropdown value={student.countryCode} onChange={v => set("countryCode", v)} />
                <input type="tel" placeholder="Number" value={student.phone}
                  onChange={e => set("phone", e.target.value)}
                  className="min-w-0 flex-1 px-2 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none rounded-r-lg" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Date of Birth</label>
              <CalendarPicker
                value={student.dob}
                onChange={v => set("dob", v)}
                maxDate={TODAY}
                disableWeekends={false}
                placeholder="Date of birth"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Gender</label>
              <div className="relative">
                <select value={student.gender} onChange={e => set("gender", e.target.value)}
                  className={`${inputCls} appearance-none pr-8 ${!student.gender ? "text-gray-400" : ""}`}>
                  <option value="" disabled>Select gender...</option>
                  <option value="male">Male</option><option value="female">Female</option>
                  <option value="prefer_not">Prefer not to say</option>
                </select><Chevron />
              </div>
            </div>
            <div>
              <label className={labelCls}>Current Level</label>
              <div className="relative">
                <select value={student.currentLevel} onChange={e => set("currentLevel", e.target.value)}
                  className={`${inputCls} appearance-none pr-8 ${!student.currentLevel ? "text-gray-400" : ""}`}>
                  <option value="" disabled>Select level...</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select><Chevron />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Step2StudentDetails({ students, allowMultiple, onChange, onNext, onBack }: Props) {
  const allValid = students.every(isStudentValid);
  const update = (i: number, s: StudentData) => { const n = [...students]; n[i] = s; onChange(n); };

  return (
    <div className="step-enter w-full">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Student Details</h1>
      <p className="text-sm text-gray-400 mb-5">Provide information for each student joining the programme</p>
      <div className="pr-1">
        {students.map((s, i) => (
          <StudentCard key={i} student={s} index={i} allowMultiple={allowMultiple}
            onChange={st => update(i, st)}
            onRemove={() => onChange(students.filter((_, idx) => idx !== i))} />
        ))}
      </div>
      {allowMultiple && (
        <button onClick={() => onChange([...students, emptyStudent()])}
          className="w-full mt-2 py-2.5 rounded-xl border-2 border-dashed text-sm font-semibold"
          style={{ borderColor: "#E6A817", color: "#E6A817" }}>+ Add Student</button>
      )}
      <div className="flex items-center justify-between mt-4">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">
          ← Back</button>
        <div className="flex items-center gap-3">
          {!allValid && <span className="text-xs text-gray-400 italic">Fill all fields to continue</span>}
          <button onClick={onNext} disabled={!allValid}
            className="px-7 py-3 rounded-xl font-bold text-sm transition-all"
            style={{
              background: allValid ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#e5e7eb",
              color: allValid ? "white" : "#9ca3af", cursor: allValid ? "pointer" : "not-allowed",
            }}>Continue →</button>
        </div>
      </div>
    </div>
  );
}
