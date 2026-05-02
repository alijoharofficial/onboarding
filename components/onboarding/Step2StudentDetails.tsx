"use client";
import { useState } from "react";

export interface StudentData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  dob: string;
  gender: string;
}

interface Props {
  data: StudentData;
  onChange: (d: StudentData) => void;
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

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white transition-all duration-150 focus:outline-none";

export default function Step2StudentDetails({ data, onChange, onNext, onBack }: Props) {
  const [showCC, setShowCC] = useState(false);

  const set = (field: keyof StudentData, val: string) =>
    onChange({ ...data, [field]: val });

  const isValid =
    data.name.trim() &&
    data.email.includes("@") &&
    data.phone.trim() &&
    data.dob &&
    data.gender;

  const selectedCC = COUNTRY_CODES.find((c) => c.code === data.countryCode) ?? COUNTRY_CODES[0];

  return (
    <div className="step-enter w-full">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Fill Student Details
      </h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 mb-6">
        {/* Name & Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Phone & DOB */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
              Student&apos;s Number
            </label>
            <div className="flex border border-gray-200 rounded-xl overflow-visible bg-white relative focus-within:border-yellow-400 focus-within:shadow-[0_0_0_3px_rgba(230,168,23,0.18)]">
              {/* Country code picker */}
              <button
                type="button"
                onClick={() => setShowCC(!showCC)}
                className="flex items-center gap-1 px-3 border-r border-gray-200 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors rounded-l-xl whitespace-nowrap"
              >
                <span>{selectedCC.flag}</span>
                <span className="text-xs">{selectedCC.code}</span>
                <svg className="w-3 h-3 text-gray-400 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {showCC && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-40 max-h-48 overflow-y-auto">
                  {COUNTRY_CODES.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => { set("countryCode", c.code); setShowCC(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-sm text-left"
                    >
                      <span>{c.flag}</span>
                      <span className="font-medium">{c.code}</span>
                      <span className="text-gray-400">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
              <input
                type="tel"
                placeholder="Phone number"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="flex-1 px-3 py-3 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none rounded-r-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Date of Birth</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <input
                type="date"
                value={data.dob}
                onChange={(e) => set("dob", e.target.value)}
                className={`${inputCls} pl-10`}
              />
            </div>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-xs font-semibold text-gray-500 mb-1 block">Gender</label>
          <div className="relative">
            <select
              value={data.gender}
              onChange={(e) => set("gender", e.target.value)}
              className={`${inputCls} appearance-none pr-10 ${!data.gender ? "text-gray-400" : ""}`}
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          {!isValid && (
            <span className="text-xs text-gray-400 italic">Fill all the data to continue</span>
          )}
          <button
            onClick={onNext}
            disabled={!isValid}
            className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: isValid ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#d1d5db",
              color: isValid ? "white" : "#9ca3af",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
