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
  { code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+994", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "+1-242", flag: "🇧🇸", name: "Bahamas" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+501", flag: "🇧🇿", name: "Belize" },
  { code: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+387", flag: "🇧🇦", name: "Bosnia" },
  { code: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+238", flag: "🇨🇻", name: "Cape Verde" },
  { code: "+236", flag: "🇨🇫", name: "Central African Republic" },
  { code: "+235", flag: "🇹🇩", name: "Chad" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+269", flag: "🇰🇲", name: "Comoros" },
  { code: "+242", flag: "🇨🇬", name: "Congo" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+253", flag: "🇩🇯", name: "Djibouti" },
  { code: "+1-809", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "+291", flag: "🇪🇷", name: "Eritrea" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+268", flag: "🇸🇿", name: "Eswatini" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+241", flag: "🇬🇦", name: "Gabon" },
  { code: "+220", flag: "🇬🇲", name: "Gambia" },
  { code: "+995", flag: "🇬🇪", name: "Georgia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+224", flag: "🇬🇳", name: "Guinea" },
  { code: "+592", flag: "🇬🇾", name: "Guyana" },
  { code: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+1-876", flag: "🇯🇲", name: "Jamaica" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "+7", flag: "🇰🇿", name: "Kazakhstan" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+996", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+266", flag: "🇱🇸", name: "Lesotho" },
  { code: "+231", flag: "🇱🇷", name: "Liberia" },
  { code: "+218", flag: "🇱🇾", name: "Libya" },
  { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "+853", flag: "🇲🇴", name: "Macau" },
  { code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "+265", flag: "🇲🇼", name: "Malawi" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "+222", flag: "🇲🇷", name: "Mauritania" },
  { code: "+230", flag: "🇲🇺", name: "Mauritius" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+373", flag: "🇲🇩", name: "Moldova" },
  { code: "+976", flag: "🇲🇳", name: "Mongolia" },
  { code: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+258", flag: "🇲🇿", name: "Mozambique" },
  { code: "+95", flag: "🇲🇲", name: "Myanmar" },
  { code: "+264", flag: "🇳🇦", name: "Namibia" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "+227", flag: "🇳🇪", name: "Niger" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+970", flag: "🇵🇸", name: "Palestine" },
  { code: "+507", flag: "🇵🇦", name: "Panama" },
  { code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+250", flag: "🇷🇼", name: "Rwanda" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+381", flag: "🇷🇸", name: "Serbia" },
  { code: "+232", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "+252", flag: "🇸🇴", name: "Somalia" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+211", flag: "🇸🇸", name: "South Sudan" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+249", flag: "🇸🇩", name: "Sudan" },
  { code: "+597", flag: "🇸🇷", name: "Suriname" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+963", flag: "🇸🇾", name: "Syria" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+992", flag: "🇹🇯", name: "Tajikistan" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+993", flag: "🇹🇲", name: "Turkmenistan" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "+998", flag: "🇺🇿", name: "Uzbekistan" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+967", flag: "🇾🇪", name: "Yemen" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
];

const LEVELS = ["Beginner", "Elementary", "Intermediate", "Advanced", "Native / Fluent"];
const TODAY = new Date().toISOString().slice(0, 10);
const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none transition-all";
const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1";

function CountryDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = ALL_COUNTRIES.find(c => c.code === value && c.name === "United States")
    ?? ALL_COUNTRIES.find(c => c.code === value)
    ?? ALL_COUNTRIES[ALL_COUNTRIES.length - 8]; // US
  const filtered = ALL_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );
  return (
    <div className="relative h-full">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2.5 h-full border-r border-gray-200 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-l-lg whitespace-nowrap">
        <span>{selected?.flag}</span><span>{selected?.code}</span>
        <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-56">
          <div className="p-2 border-b border-gray-100">
            <input autoFocus type="text" placeholder="Search country…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400" />
          </div>
          <div className="max-h-44 overflow-y-auto">
            {filtered.map(c => (
              <button key={c.name} type="button"
                onClick={() => { onChange(c.code); setOpen(false); setSearch(""); }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-xs text-left">
                <span>{c.flag}</span><span className="font-bold">{c.code}</span>
                <span className="text-gray-500 truncate">{c.name}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-xs text-gray-400 text-center py-3">No results</p>}
          </div>
        </div>
      )}
    </div>
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
