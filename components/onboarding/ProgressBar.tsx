"use client";

interface Props { current: number; total: number; }

export default function ProgressBar({ current, total }: Props) {
  return (
    <div className="flex gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-2 flex-1 rounded-full transition-all duration-500"
          style={{
            background: i < current
              ? "linear-gradient(90deg,#E6A817,#f0b429)"
              : i === current
              ? "linear-gradient(90deg,#E6A817 60%,#d1d5db 100%)"
              : "#d1d5db",
          }}
        />
      ))}
    </div>
  );
}
