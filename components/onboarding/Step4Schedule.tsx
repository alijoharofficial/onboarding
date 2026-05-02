"use client";

export interface ScheduleData {
  days: string[];
  timezone: string;
  startDate: string;
  startTime: string;
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
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM",
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM",
  "10:00 PM",
];

const selectCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white appearance-none focus:outline-none transition-all duration-150";

export default function Step4Schedule({ data, daysNeeded, onChange, onBack, onSubmit }: Props) {
  const toggleDay = (day: string) => {
    const already = data.days.includes(day);
    let next: string[];
    if (already) {
      next = data.days.filter((d) => d !== day);
    } else if (data.days.length < daysNeeded) {
      next = [...data.days, day];
    } else {
      // Replace oldest
      next = [...data.days.slice(1), day];
    }
    onChange({ ...data, days: next });
  };

  const isValid =
    data.days.length === daysNeeded &&
    data.timezone &&
    data.startDate &&
    data.startTime;

  return (
    <div className="step-enter w-full">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Schedule Details
      </h1>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 mb-6">

        {/* Day selector */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-3">
            Select Days ({data.days.length}/{daysNeeded} selected)
          </label>
          <div className="flex gap-2 flex-wrap">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => toggleDay(d)}
                className={`day-btn w-11 h-11 rounded-full border-2 text-sm font-semibold transition-all duration-150 ${
                  data.days.includes(d)
                    ? "selected bg-[#1E2D4E] text-white border-[#1E2D4E]"
                    : "border-gray-300 text-gray-600 hover:border-gray-400 bg-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Timezone */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">Timezone</label>
          <div className="relative">
            <select
              value={data.timezone}
              onChange={(e) => onChange({ ...data, timezone: e.target.value })}
              className={`${selectCls} pr-10 ${!data.timezone ? "text-gray-400" : ""}`}
            >
              <option value="" disabled>Select...</option>
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Preferred Start Date
          </label>
          <div className="relative">
            <select
              value={data.startDate}
              onChange={(e) => onChange({ ...data, startDate: e.target.value })}
              className={`${selectCls} pr-10 ${!data.startDate ? "text-gray-400" : ""}`}
            >
              <option value="" disabled>Select start date</option>
              {generateDates().map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>

        {/* Start Time */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Preferred Start Time
          </label>
          <div className="relative">
            <select
              value={data.startTime}
              onChange={(e) => onChange({ ...data, startTime: e.target.value })}
              className={`${selectCls} pr-10 ${!data.startTime ? "text-gray-400" : ""}`}
            >
              <option value="" disabled>Select time</option>
              {TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <Chevron />
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
            <span className="text-xs text-gray-400 italic">Fill all fields to continue</span>
          )}
          <button
            onClick={onSubmit}
            disabled={!isValid}
            className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200"
            style={{
              background: isValid ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#d1d5db",
              color: isValid ? "white" : "#9ca3af",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
      </svg>
    </span>
  );
}

function generateDates(): { value: string; label: string }[] {
  const out: { value: string; label: string }[] = [];
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  for (let i = 1; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({ value: d.toISOString().slice(0, 10), label: fmt.format(d) });
  }
  return out;
}
