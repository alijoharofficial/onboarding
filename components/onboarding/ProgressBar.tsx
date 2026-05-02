"use client";

const LABELS = ["ENROL", "DETAILS", "COURSE", "SCHEDULE"];

interface Props { current: number; total: number; }

export default function ProgressBar({ current }: Props) {
  return (
    <div className="mb-8">
      {/* Step labels */}
      <div className="flex mb-2">
        {LABELS.map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <span
              className="text-[10px] font-bold tracking-widest transition-colors duration-300"
              style={{
                color: i === current - 1 ? "#E6A817" : i < current - 1 ? "#1E2D4E" : "#9ca3af",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Bars */}
      <div className="flex gap-1.5">
        {LABELS.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-500"
            style={{ background: i < current ? "#E6A817" : "#e5e7eb" }}
          />
        ))}
      </div>
    </div>
  );
}
