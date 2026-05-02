"use client";
import { useState } from "react";

export interface CourseData {
  courseId: string;
  daysPerWeek: number;
  minutesPerClass: number;
}

const COURSES = [
  { id: "quranic",      name: "Foundation",   duration: "1 Year",   basePrice: 40, img: "https://quranacademy.live/assets/home/pricing1.png" },
  { id: "recitation",   name: "Recitation",   duration: "1.5 Years",basePrice: 45, img: "https://quranacademy.live/assets/home/pricing2.png" },
  { id: "memorization", name: "Memorization", duration: "3 Years",  basePrice: 60, img: "https://quranacademy.live/assets/home/pricing3.png" },
];

interface Props {
  data: CourseData;
  studentCount: number;
  onChange: (d: CourseData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Course({ data, studentCount, onChange, onBack, onNext }: Props) {
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, COURSES.findIndex(c => c.id === data.courseId))
  );
  const selected = COURSES[activeIdx];
  const classesPerMonth = data.daysPerWeek * 4;
  const pricePerStudent = Math.round(selected.basePrice * (data.daysPerWeek / 2) * (data.minutesPerClass / 30));
  const totalPrice = pricePerStudent * studentCount;

  const selectCourse = (i: number) => {
    setActiveIdx(i);
    onChange({ ...data, courseId: COURSES[i].id });
  };

  return (
    <div className="step-enter w-full">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Select a Course</h1>
      <p className="text-sm text-gray-400 mb-5">Choose the programme that best fits your learning goals</p>

      {/* Course cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {COURSES.map((c, i) => {
          const isActive = i === activeIdx;
          return (
            <button key={c.id} onClick={() => selectCourse(i)}
              className="relative rounded-2xl overflow-hidden border-2 transition-all duration-200"
              style={{
                height: "130px",
                borderColor: isActive ? "#1E2D4E" : "#e5e7eb",
                background: isActive ? "white" : "#1E2D4E",
                boxShadow: isActive ? "0 6px 20px rgba(30,45,78,0.28)" : undefined,
              }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-200"
                style={{
                  opacity: isActive ? 1 : 0.3,
                  filter: isActive ? "none" : "blur(1.5px) brightness(0.55)",
                }} />
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-2 pt-6"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(255,255,255,0.92) 60%, transparent)"
                    : "linear-gradient(to top, rgba(0,0,0,0.5) 60%, transparent)",
                }}>
                <span className="text-xs font-bold leading-tight text-center"
                  style={{ color: isActive ? "#1E2D4E" : "white" }}>{c.name}</span>
              </div>
              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#1E2D4E" }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Details panel */}
      <div className="rounded-2xl border border-gray-100 overflow-hidden mb-4" style={{ background: "#f9f8f5" }}>
        <div className="px-5 py-4 space-y-3.5">
          <Row label="Course Duration" value={selected.duration} />
          <Row label="Days / Week"
            value={<Counter val={data.daysPerWeek} min={1} max={7}
              onChange={v => onChange({ ...data, daysPerWeek: v })} />} />
          <Row label="Duration / Class"
            value={<Counter val={data.minutesPerClass} min={30} max={90} step={30}
              format={v => `${v} min`}
              onChange={v => onChange({ ...data, minutesPerClass: v })} />} />
          <Row label="Classes / Month" value={`${classesPerMonth} classes`} />
          {/* Per-student price */}
          <Row label="Course Price"
            value={<span style={{ color: "#E6A817" }} className="font-bold">${pricePerStudent} / student</span>} />
        </div>

        {/* Monthly price banner */}
        <div className="flex items-center justify-between px-5 py-4" style={{ background: "#1E2D4E" }}>
          <div>
            <p className="text-white font-bold text-sm">Monthly Price</p>
            <p className="text-gray-400 text-xs">
              {studentCount > 1
                ? `$${pricePerStudent} × ${studentCount} students`
                : "Billed monthly, cancel anytime"}
            </p>
          </div>
          <span className="font-extrabold text-2xl" style={{ color: "#E6A817" }}>${totalPrice}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">
          ← Back</button>
        <button onClick={onNext}
          className="px-7 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#1E2D4E,#2d4070)" }}>
          Continue →</button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800 text-sm">{value}</span>
    </div>
  );
}

function Counter({ val, min, max, step = 1, format, onChange }: {
  val: number; min: number; max: number; step?: number;
  format?: (v: number) => string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={() => onChange(Math.max(min, val - step))}
        className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm hover:bg-gray-100"
        style={{ borderColor: "#E6A817", color: "#E6A817" }}>−</button>
      <span className="text-sm font-bold w-14 text-center">
        {format ? format(val) : val}
      </span>
      <button onClick={() => onChange(Math.min(max, val + step))}
        className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm hover:bg-gray-100"
        style={{ borderColor: "#E6A817", color: "#E6A817" }}>+</button>
    </div>
  );
}
