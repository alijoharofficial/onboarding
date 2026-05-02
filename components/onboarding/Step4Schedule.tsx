"use client";

export interface ScheduleData {
  days: string[];
  timezone: string;
  startDate: string;
  startTime: string;
  notes: string;
}

interface Props {
  data: ScheduleData;
  daysNeeded: number;
  onChange: (d: ScheduleData) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIMEZONES = [
  "America/New_York (UTC-5)",
  "America/Chicago (UTC-6)",
  "America/Denver (UTC-7)",
  "America/Los_Angeles (UTC-8)",
  "Europe/London (UTC+0)",
  "Europe/Paris (UTC+1)",
  "Asia/Dubai (UTC+4)",
  "Asia/Karachi (UTC+5)",
  "Asia/Kolkata (UTC+5:30)",
  "Asia/Dhaka (UTC+6)",
  "Asia/Kuala_Lumpur (UTC+8)",
  "Australia/Sydney (UTC+11)",
];

const TIMES = [
  "06:00 AM","07:00 AM","08:00 AM","09:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM",
  "06:00 PM","07:00 PM","08:00 PM","09:00 PM","10:00 PM",
];

const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1.5";
const selectCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white appearance-none focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(230,168,23,0.15)] transition-all";

function Chevron() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
      </svg>
    </span>
  );
}

export default function Step4Schedule({ data, daysNeeded, onChange, onBack, onSubmit }: Props) {
  const toggleDay = (day: string) => {
    const already = data.days.includes(day);
    let next: string[];
    if (already) {
      next = data.days.filter(d => d !== day);
    } else if (data.days.length < daysNeeded) {
      next = [...data.days, day];
    } else {
      next = [...data.days.slice(1), day];
    }
    onChange({ ...data, days: next });
  };

  const isValid = data.days.length === daysNeeded && data.timezone && data.startDate && data.startTime;

  return (
    <div className="step-enter w-full">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Schedule Your Classes</h1>
      <p className="text-sm text-gray-400 mb-5">Choose your preferred days and timing — we&apos;ll match you with the right teacher</p>

      <div className="space-y-5">
        {/* Day selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelCls} style={{ marginBottom: 0 }}>Select Days</label>
            <span className="text-xs font-bold" style={{ color: "#E6A817" }}>
              {data.days.length} / {daysNeeded} selected
            </span>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {DAYS.map(d => (
              <button
                key={d}
                onClick={() => toggleDay(d)}
                className="w-11 h-11 rounded-full border-2 text-xs font-bold transition-all duration-150"
                style={
                  data.days.includes(d)
                    ? { background: "#1E2D4E", color: "white", borderColor: "#1E2D4E" }
                    : { background: "white", color: "#6b7280", borderColor: "#d1d5db" }
                }
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Timezone */}
        <div>
          <label className={labelCls}>Timezone</label>
          <div className="relative">
            <select value={data.timezone} onChange={e => onChange({ ...data, timezone: e.target.value })}
              className={`${selectCls} pr-10 ${!data.timezone ? "text-gray-400" : ""}`}>
              <option value="" disabled>Select your timezone...</option>
              {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
            </select>
            <Chevron />
          </div>
        </div>

        {/* Start date + time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Preferred Start Date</label>
            <input
              type="date"
              value={data.startDate}
              onChange={e => onChange({ ...data, startDate: e.target.value })}
              className={selectCls}
            />
          </div>
          <div>
            <label className={labelCls}>Preferred Start Time</label>
            <div className="relative">
              <select value={data.startTime} onChange={e => onChange({ ...data, startTime: e.target.value })}
                className={`${selectCls} pr-10 ${!data.startTime ? "text-gray-400" : ""}`}>
                <option value="" disabled>Select time...</option>
                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <Chevron />
            </div>
          </div>
        </div>

        {/* Special requests */}
        <div>
          <label className={labelCls}>
            Any Special Requests or Notes?{" "}
            <span className="normal-case tracking-normal font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Beginner level, prefers female teacher..."
            value={data.notes}
            onChange={e => onChange({ ...data, notes: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(230,168,23,0.15)] transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
          ← Back
        </button>
        <div className="flex items-center gap-3">
          {!isValid && <span className="text-xs text-gray-400 italic">Fill all fields to continue</span>}
          <button onClick={onSubmit} disabled={!isValid}
            className="px-7 py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: isValid ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#e5e7eb",
              color: isValid ? "white" : "#9ca3af",
              cursor: isValid ? "pointer" : "not-allowed",
            }}>
            Submit Enrolment ✓
          </button>
        </div>
      </div>
    </div>
  );
}
