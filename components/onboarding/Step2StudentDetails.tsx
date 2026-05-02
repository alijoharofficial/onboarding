"use client";
import { useState } from "react";

export interface StudentData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  dob: string;
  gender: string;
  currentLevel: string;
}

export function emptyStudent(): StudentData {
  return { name: "", email: "", phone: "", countryCode: "+1", dob: "", gender: "", currentLevel: "" };
}

interface Props {
  students: StudentData[];
  allowMultiple: boolean;
  onChange: (students: StudentData[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const COUNTRY_CODES = [
  { code: "+1",  flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "GB" },
  { code: "+92", flag: "🇵🇰", name: "PK" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+971",flag: "🇦🇪", name: "AE" },
  { code: "+966",flag: "🇸🇦", name: "SA" },
  { code: "+20", flag: "🇪🇬", name: "EG" },
  { code: "+60", flag: "🇲🇾", name: "MY" },
  { code: "+62", flag: "🇮🇩", name: "ID" },
  { code: "+880",flag: "🇧🇩", name: "BD" },
];

const LEVELS = ["Beginner", "Elementary", "Intermediate", "Advanced", "Native / Fluent"];

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(230,168,23,0.15)] transition-all";
const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1";

function StudentCard({
  student, index, total, allowMultiple,
  onChange, onRemove,
}: {
  student: StudentData; index: number; total: number; allowMultiple: boolean;
  onChange: (s: StudentData) => void; onRemove: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [showCC, setShowCC] = useState(false);
  const set = (f: keyof StudentData, v: string) => onChange({ ...student, [f]: v });
  const selectedCC = COUNTRY_CODES.find(c => c.code === student.countryCode) ?? COUNTRY_CODES[0];

  return (
    <div className="border border-gray-200 rounded-xl overflow-visible mb-3" style={{ background: "#fafaf8" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "#1E2D4E" }}
          >
            {index + 1}
          </div>
          <span className="font-semibold text-gray-800 text-sm">
            Student {index + 1}{student.name ? ` — ${student.name}` : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {allowMultiple && index > 0 && (
            <button
              onClick={e => { e.stopPropagation(); onRemove(); }}
              className="text-xs font-semibold px-3 py-1 rounded-full border transition-colors"
              style={{ borderColor: "#E6A817", color: "#E6A817" }}
            >
              Remove
            </button>
          )}
          <svg
            className="w-4 h-4 text-gray-400 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          {/* Name & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Full Name</label>
              <input type="text" placeholder="e.g. Aisha Rahman" value={student.name}
                onChange={e => set("name", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input type="email" placeholder="email@example.com" value={student.email}
                onChange={e => set("email", e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Phone & DOB */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Student&apos;s Number</label>
              <div className="flex border border-gray-200 rounded-lg bg-white relative focus-within:border-yellow-400 focus-within:shadow-[0_0_0_3px_rgba(230,168,23,0.15)] transition-all">
                <button
                  type="button"
                  onClick={() => setShowCC(s => !s)}
                  className="flex items-center gap-1 px-2.5 border-r border-gray-200 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-l-lg whitespace-nowrap"
                >
                  <span>{selectedCC.flag}</span>
                  <span>{selectedCC.code}</span>
                  <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
                {showCC && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-36 max-h-44 overflow-y-auto">
                    {COUNTRY_CODES.map(c => (
                      <button key={c.code} type="button"
                        onClick={() => { set("countryCode", c.code); setShowCC(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-xs text-left"
                      >
                        <span>{c.flag}</span><span className="font-bold">{c.code}</span><span className="text-gray-400">{c.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                <input type="tel" placeholder="Phone number" value={student.phone}
                  onChange={e => set("phone", e.target.value)}
                  className="flex-1 px-2.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none rounded-r-lg" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Date of Birth</label>
              <input type="date" value={student.dob} onChange={e => set("dob", e.target.value)} className={inputCls} />
            </div>
          </div>

          {/* Gender & Level */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Gender</label>
              <div className="relative">
                <select value={student.gender} onChange={e => set("gender", e.target.value)}
                  className={`${inputCls} appearance-none pr-8 ${!student.gender ? "text-gray-400" : ""}`}>
                  <option value="" disabled>Select gender...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer_not">Prefer not to say</option>
                </select>
                <Chevron />
              </div>
            </div>
            <div>
              <label className={labelCls}>Current Level</label>
              <div className="relative">
                <select value={student.currentLevel} onChange={e => set("currentLevel", e.target.value)}
                  className={`${inputCls} appearance-none pr-8 ${!student.currentLevel ? "text-gray-400" : ""}`}>
                  <option value="" disabled>Select level...</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <Chevron />
              </div>
            </div>
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

export default function Step2StudentDetails({ students, allowMultiple, onChange, onNext, onBack }: Props) {
  const allValid = students.every(isStudentValid);

  const update = (i: number, s: StudentData) => {
    const next = [...students];
    next[i] = s;
    onChange(next);
  };

  const addStudent = () => onChange([...students, emptyStudent()]);

  const removeStudent = (i: number) => onChange(students.filter((_, idx) => idx !== i));

  return (
    <div className="step-enter w-full">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Student Details</h1>
      <p className="text-sm text-gray-400 mb-5">Provide information for each student joining the programme</p>

      <div className="max-h-[52vh] overflow-y-auto pr-1 space-y-0">
        {students.map((s, i) => (
          <StudentCard
            key={i} student={s} index={i} total={students.length}
            allowMultiple={allowMultiple}
            onChange={st => update(i, st)}
            onRemove={() => removeStudent(i)}
          />
        ))}
      </div>

      {/* Add student */}
      {allowMultiple && (
        <button
          onClick={addStudent}
          className="w-full mt-2 py-2.5 rounded-xl border-2 border-dashed text-sm font-semibold transition-colors"
          style={{ borderColor: "#E6A817", color: "#E6A817" }}
        >
          + Add Student
        </button>
      )}

      <div className="flex items-center justify-between mt-4">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
          ← Back
        </button>
        <div className="flex items-center gap-3">
          {!allValid && <span className="text-xs text-gray-400 italic">Fill all fields to continue</span>}
          <button onClick={onNext} disabled={!allValid}
            className="px-7 py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: allValid ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#e5e7eb",
              color: allValid ? "white" : "#9ca3af",
              cursor: allValid ? "pointer" : "not-allowed",
            }}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
