"use client";
import { useState, useRef, useEffect } from "react";

interface Props { value: string; onChange: (v: string) => void; }

const SLOTS = (() => {
  const out: { label: string; period: string }[] = [];
  for (let h = 6; h <= 22; h++) {
    for (const m of [0, 30]) {
      const ampm = h < 12 ? "Morning" : h < 17 ? "Afternoon" : "Evening";
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const label = `${h12}:${m === 0 ? "00" : "30"} ${h < 12 ? "AM" : "PM"}`;
      out.push({ label, period: ampm });
    }
  }
  return out;
})();

const PERIODS = ["Morning", "Afternoon", "Evening"];

export default function TimePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [activePeriod, setActivePeriod] = useState("Morning");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = SLOTS.filter(s => s.period === activePeriod);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm flex items-center justify-between bg-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(230,168,23,0.18)] transition-all"
        style={{ color: value ? "#111827" : "#9ca3af" }}>
        <span>{value || "Select time"}</span>
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 right-0" style={{ width: "min(256px, calc(100vw - 24px))" }}>
          {/* Period tabs */}
          <div className="flex gap-1 mb-3 p-1 rounded-xl" style={{ background: "#f3f4f6" }}>
            {PERIODS.map(p => (
              <button key={p} type="button" onClick={() => setActivePeriod(p)}
                className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: activePeriod === p ? "#1E2D4E" : "transparent",
                  color: activePeriod === p ? "white" : "#6b7280",
                }}>{p}</button>
            ))}
          </div>

          {/* Time grid */}
          <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto">
            {filtered.map(slot => (
              <button key={slot.label} type="button"
                onClick={() => { onChange(slot.label); setOpen(false); }}
                className="py-2 px-3 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: value === slot.label ? "#1E2D4E" : "#f9f8f5",
                  color: value === slot.label ? "white" : "#374151",
                  border: value === slot.label ? "2px solid #1E2D4E" : "2px solid transparent",
                }}>
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
