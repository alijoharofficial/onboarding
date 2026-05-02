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
  duration: string;
  basePrice: number;
  img: string;
}

const COURSES: Course[] = [
  {
    id: "quranic",
    name: "Learn Quranic Arabic",
    duration: "1 Year",
    basePrice: 40,
    img: "https://quranacademy.live/assets/home/pricing1.png",
  },
  {
    id: "recitation",
    name: "Recitation & Tajweed",
    duration: "1.5 Years",
    basePrice: 45,
    img: "https://quranacademy.live/assets/home/pricing2.png",
  },
  {
    id: "memorization",
    name: "Hifz & Memorisation",
    duration: "3 Years",
    basePrice: 60,
    img: "https://quranacademy.live/assets/home/pricing3.png",
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
    Math.max(0, COURSES.findIndex(c => c.id === data.courseId))
  );

  const selected = COURSES[activeIdx];
  const classesPerMonth = data.daysPerWeek * 4;
  const price = Math.round(selected.basePrice * (data.daysPerWeek / 2) * (data.minutesPerClass / 30));

  const selectCourse = (i: number) => {
    setActiveIdx(i);
    onChange({ ...data, courseId: COURSES[i].id });
  };

  return (
    <div className="step-enter w-full">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Select a Course</h1>
      <p className="text-sm text-gray-400 mb-5">Choose the programme that best fits your learning goals</p>

      {/* Course cards */}
      <div className="flex gap-3 mb-4 overflow-x-auto course-scroll pb-1">
        {COURSES.map((c, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={c.id}
              onClick={() => selectCourse(i)}
              className="flex-shrink-0 flex flex-col items-center justify-end gap-2 rounded-2xl py-4 px-3 w-36 h-36 relative overflow-hidden transition-all duration-200 border-2"
              style={{
                background: isActive ? "#1E2D4E" : "white",
                borderColor: isActive ? "#1E2D4E" : "#e5e7eb",
                boxShadow: isActive ? "0 8px 24px rgba(30,45,78,0.25)" : undefined,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: isActive ? 0.25 : 0.9 }}
              />
              <span
                className="relative z-10 text-xs font-bold text-center leading-tight"
                style={{ color: isActive ? "white" : "#1E2D4E" }}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Details panel */}
      <div className="rounded-2xl border border-gray-100 overflow-hidden mb-4" style={{ background: "#f9f8f5" }}>
        <div className="px-5 py-4 space-y-3.5">
          <Row label="Course Duration" value={selected.duration} />
          <Row
            label="Days / Week"
            value={
              <Counter val={data.daysPerWeek} min={1} max={7}
                onChange={v => onChange({ ...data, daysPerWeek: v })} />
            }
          />
          <Row
            label="Duration / Class"
            value={
              <Counter val={data.minutesPerClass} min={30} max={90} step={30}
                format={v => `${v} min`}
                onChange={v => onChange({ ...data, minutesPerClass: v })} />
            }
          />
          <Row label="Classes / Month" value={`${classesPerMonth} classes`} />
        </div>

        {/* Price banner */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: "#1E2D4E" }}
        >
          <div>
            <p className="text-white font-bold text-sm">Monthly Price</p>
            <p className="text-gray-400 text-xs">Billed monthly, cancel anytime</p>
          </div>
          <span className="font-extrabold text-2xl" style={{ color: "#E6A817" }}>${price}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
          ← Back
        </button>
        <button onClick={onNext}
          className="px-7 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(135deg,#1E2D4E,#2d4070)" }}>
          Continue →
        </button>
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
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, val - step))}
        className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors hover:bg-gray-100"
        style={{ borderColor: "#E6A817", color: "#E6A817" }}
      >−</button>
      <span className="text-sm font-bold min-w-[52px] text-center">
        {format ? format(val) : val}
      </span>
      <button
        onClick={() => onChange(Math.min(max, val + step))}
        className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-colors hover:bg-gray-100"
        style={{ borderColor: "#E6A817", color: "#E6A817" }}
      >+</button>
    </div>
  );
}
