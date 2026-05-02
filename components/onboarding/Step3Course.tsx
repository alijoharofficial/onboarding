"use client";
import { useState } from "react";

export interface CourseData {
  courseId: string;
  daysPerWeek: number;
  minutesPerClass: number;
}

interface Course {
  id: string;
  name: string;
  fullName: string;
  duration: string;
  basePrice: number;
  icon: React.ReactNode;
}

const courses: Course[] = [
  {
    id: "quranic",
    name: "Learn Quranic",
    fullName: "Learn Quranic Arabic",
    duration: "2 Years",
    basePrice: 50,
    icon: (
      <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
        <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.1)" />
        {/* Teacher figure */}
        <circle cx="22" cy="18" r="7" fill="#d1d5db" />
        <path d="M10 46 Q10 32 22 30 Q30 28 30 46" fill="#9ca3af" />
        {/* Student */}
        <circle cx="40" cy="22" r="5" fill="#d1d5db" />
        <path d="M32 46 Q32 34 40 32 Q48 34 48 46" fill="#9ca3af" />
        {/* Book */}
        <rect x="18" y="38" width="14" height="10" rx="1" fill="#fbbf24" />
        <rect x="18" y="38" width="2" height="10" rx="1" fill="#d97706" />
      </svg>
    ),
  },
  {
    id: "recitation",
    name: "Recitation of",
    fullName: "Recitation of the Holy Quran",
    duration: "1.5 Years",
    basePrice: 45,
    icon: (
      <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
        <circle cx="30" cy="30" r="30" fill="rgba(230,168,23,0.1)" />
        {/* Person reading */}
        <circle cx="30" cy="16" r="8" fill="#fcd34d" />
        <path d="M16 50 Q16 34 30 32 Q44 34 44 50" fill="#fbbf24" />
        {/* Quran book */}
        <rect x="18" y="42" width="24" height="16" rx="2" fill="#1E2D4E" />
        <rect x="18" y="42" width="3" height="16" rx="1" fill="#374151" />
        <path d="M23 47 H40 M23 51 H40 M23 55 H40" stroke="white" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "memorization",
    name: "Memorization &",
    fullName: "Memorization & Tajweed",
    duration: "3 Years",
    basePrice: 60,
    icon: (
      <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
        <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.1)" />
        {/* Two people */}
        <circle cx="20" cy="18" r="6" fill="#d1d5db" />
        <path d="M10 44 Q10 30 20 28 Q28 28 28 44" fill="#9ca3af" />
        <circle cx="40" cy="18" r="6" fill="#d1d5db" />
        <path d="M32 44 Q32 30 40 28 Q50 30 50 44" fill="#9ca3af" />
        {/* Star / memorization symbol */}
        <path d="M30 34 L31.5 38 H36 L32.5 40.5 L34 45 L30 42 L26 45 L27.5 40.5 L24 38 H28.5 Z" fill="#fbbf24" />
      </svg>
    ),
  },
];

interface Props {
  data: CourseData;
  onChange: (d: CourseData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Course({ data, onChange, onBack, onNext }: Props) {
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, courses.findIndex((c) => c.id === data.courseId))
  );

  const selected = courses[activeIdx];

  const setField = (field: keyof CourseData, val: string | number) =>
    onChange({ ...data, [field]: val });

  const classesPerMonth = data.daysPerWeek * 4;
  const price = Math.round(
    (selected.basePrice * (data.daysPerWeek / 2)) *
      (data.minutesPerClass / 30)
  );

  const selectCourse = (idx: number) => {
    setActiveIdx(idx);
    setField("courseId", courses[idx].id);
  };

  return (
    <div className="step-enter w-full">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Select Course</h1>

      {/* Course cards */}
      <div className="flex gap-3 mb-6 overflow-x-auto course-scroll pb-1">
        {courses.map((c, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={c.id}
              onClick={() => selectCourse(i)}
              className={`course-card flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-2xl py-5 px-4 w-36 transition-all duration-200 ${
                isActive
                  ? "bg-white border-2 border-gray-200 shadow-lg"
                  : "text-white border-2 border-transparent"
              }`}
              style={{
                background: isActive ? "white" : "linear-gradient(145deg,#1E2D4E,#2d4070)",
              }}
            >
              {c.icon}
              <span
                className={`text-xs font-semibold text-center leading-tight ${
                  isActive ? "text-gray-800" : "text-white"
                }`}
              >
                {c.name}
              </span>
              {isActive && (
                <svg className="w-4 h-4 text-gray-400 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Details panel */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4 mb-6">
        <Row label="Course Duration:" value={selected.duration} />

        <Row
          label="Days/Week:"
          value={
            <Counter
              val={data.daysPerWeek}
              min={1}
              max={7}
              onChange={(v) => setField("daysPerWeek", v)}
            />
          }
        />

        <Row
          label="Duration/Class:"
          value={
            <Counter
              val={data.minutesPerClass}
              min={30}
              max={90}
              step={30}
              format={(v) => `${v} Mins`}
              onChange={(v) => setField("minutesPerClass", v)}
            />
          }
        />

        <Row label="Classes/Month:" value={`${classesPerMonth} Classes`} />

        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <span className="font-bold text-gray-800 text-base">Price:</span>
          <span className="font-extrabold text-xl" style={{ color: "#E6A817" }}>
            ${price} / Month
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-gray-200 text-gray-600 font-semibold hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#1E2D4E,#2d4070)" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-semibold text-gray-800 text-sm">{value}</span>
    </div>
  );
}

function Counter({
  val, min, max, step = 1, format, onChange,
}: {
  val: number; min: number; max: number; step?: number;
  format?: (v: number) => string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, val - step))}
        className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
      >
        −
      </button>
      <span className="text-sm font-bold min-w-[64px] text-center">
        {format ? format(val) : val}
      </span>
      <button
        onClick={() => onChange(Math.min(max, val + step))}
        className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
      >
        +
      </button>
    </div>
  );
}
