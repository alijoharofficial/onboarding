"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  value: string; // YYYY-MM-DD
  onChange: (v: string) => void;
  minDaysFromNow?: number;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_HEADERS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

export default function CalendarPicker({ value, onChange, minDaysFromNow = 4 }: Props) {
  const [open, setOpen] = useState(false);
  const today = new Date(); today.setHours(0,0,0,0);
  const minDate = new Date(today); minDate.setDate(today.getDate() + minDaysFromNow);

  const [view, setView] = useState(() => {
    const d = value ? new Date(value + "T00:00:00") : new Date(minDate);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const isDisabled = (d: Date) => d < minDate || d.getDay() === 0 || d.getDay() === 6;

  const getDays = (): (Date | null)[] => {
    const first = new Date(view.year, view.month, 1);
    const last  = new Date(view.year, view.month + 1, 0);
    let pad = first.getDay() - 1; if (pad < 0) pad = 6;
    const days: (Date | null)[] = Array(pad).fill(null);
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(view.year, view.month, d));
    return days;
  };

  const prevMonth = () => setView(v => v.month === 0 ? { year: v.year-1, month: 11 } : { ...v, month: v.month-1 });
  const nextMonth = () => setView(v => v.month === 11 ? { year: v.year+1, month: 0 } : { ...v, month: v.month+1 });

  const select = (d: Date) => {
    if (isDisabled(d)) return;
    onChange(d.toISOString().slice(0,10));
    setOpen(false);
  };

  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", year:"numeric" })
    : "";

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm flex items-center justify-between bg-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(230,168,23,0.18)] transition-all"
        style={{ color: value ? "#111827" : "#9ca3af" }}>
        <span>{displayValue || "Select start date"}</span>
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-72 left-0">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-light">‹</button>
            <span className="font-bold text-gray-800 text-sm">{MONTHS[view.month]} {view.year}</span>
            <button onClick={nextMonth}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-light">›</button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_HEADERS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold tracking-wider"
                style={{ color: d === "Sa" || d === "Su" ? "#fbbf24" : "#9ca3af" }}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {getDays().map((date, i) => {
              if (!date) return <div key={i} />;
              const disabled  = isDisabled(date);
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const selected  = value === date.toISOString().slice(0,10);
              const isToday   = date.toDateString() === today.toDateString();

              return (
                <button key={i} type="button" onClick={() => select(date)} disabled={disabled}
                  className="w-9 h-9 rounded-full text-xs flex items-center justify-center mx-auto transition-all cal-day-btn relative"
                  style={{
                    background: selected ? "#1E2D4E" : "transparent",
                    color: selected ? "white" : disabled || isWeekend ? "#d1d5db" : "#111827",
                    cursor: disabled ? "not-allowed" : "pointer",
                    fontWeight: isToday ? "700" : "400",
                  }}>
                  {date.getDate()}
                  {isToday && !selected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#E6A817" }} />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-gray-400 text-center mt-3 leading-tight">
            Weekends & next {minDaysFromNow} days unavailable
          </p>
        </div>
      )}
    </div>
  );
}
