"use client";
import { useState, useRef, useEffect } from "react";
import CalendarPicker from "@/components/ui/CalendarPicker";
import TimePicker from "@/components/ui/TimePicker";

export interface ScheduleData {
  days: string[]; timezone: string; startDate: string; startTime: string; notes: string;
}

interface Props {
  data: ScheduleData; daysNeeded: number;
  onChange: (d: ScheduleData) => void; onSubmit: () => void; onBack: () => void;
}

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const ALL_TIMEZONES = [
  { value: "Pacific/Honolulu",       country: "United States", label: "Hawaii (UTC-10)" },
  { value: "America/Anchorage",      country: "United States", label: "Alaska (UTC-9)" },
  { value: "America/Los_Angeles",    country: "United States", label: "Los Angeles / Pacific (UTC-8)" },
  { value: "America/Denver",         country: "United States", label: "Denver / Mountain (UTC-7)" },
  { value: "America/Phoenix",        country: "United States", label: "Phoenix (UTC-7)" },
  { value: "America/Chicago",        country: "United States", label: "Chicago / Central (UTC-6)" },
  { value: "America/New_York",       country: "United States", label: "New York / Eastern (UTC-5)" },
  { value: "America/Toronto",        country: "Canada",        label: "Toronto (UTC-5)" },
  { value: "America/Vancouver",      country: "Canada",        label: "Vancouver (UTC-8)" },
  { value: "America/Mexico_City",    country: "Mexico",        label: "Mexico City (UTC-6)" },
  { value: "America/Bogota",         country: "Colombia",      label: "Bogota (UTC-5)" },
  { value: "America/Lima",           country: "Peru",          label: "Lima (UTC-5)" },
  { value: "America/Santiago",       country: "Chile",         label: "Santiago (UTC-4)" },
  { value: "America/Caracas",        country: "Venezuela",     label: "Caracas (UTC-4)" },
  { value: "America/Sao_Paulo",      country: "Brazil",        label: "São Paulo (UTC-3)" },
  { value: "America/Argentina/Buenos_Aires", country: "Argentina", label: "Buenos Aires (UTC-3)" },
  { value: "Atlantic/Reykjavik",     country: "Iceland",       label: "Reykjavik (UTC+0)" },
  { value: "Europe/London",          country: "United Kingdom",label: "London (UTC+0/+1)" },
  { value: "Europe/Dublin",          country: "Ireland",       label: "Dublin (UTC+0/+1)" },
  { value: "Europe/Lisbon",          country: "Portugal",      label: "Lisbon (UTC+0/+1)" },
  { value: "Europe/Paris",           country: "France",        label: "Paris (UTC+1/+2)" },
  { value: "Europe/Berlin",          country: "Germany",       label: "Berlin (UTC+1/+2)" },
  { value: "Europe/Madrid",          country: "Spain",         label: "Madrid (UTC+1/+2)" },
  { value: "Europe/Rome",            country: "Italy",         label: "Rome (UTC+1/+2)" },
  { value: "Europe/Amsterdam",       country: "Netherlands",   label: "Amsterdam (UTC+1/+2)" },
  { value: "Europe/Brussels",        country: "Belgium",       label: "Brussels (UTC+1/+2)" },
  { value: "Europe/Zurich",          country: "Switzerland",   label: "Zurich (UTC+1/+2)" },
  { value: "Europe/Stockholm",       country: "Sweden",        label: "Stockholm (UTC+1/+2)" },
  { value: "Europe/Oslo",            country: "Norway",        label: "Oslo (UTC+1/+2)" },
  { value: "Europe/Copenhagen",      country: "Denmark",       label: "Copenhagen (UTC+1/+2)" },
  { value: "Europe/Warsaw",          country: "Poland",        label: "Warsaw (UTC+1/+2)" },
  { value: "Europe/Vienna",          country: "Austria",       label: "Vienna (UTC+1/+2)" },
  { value: "Europe/Prague",          country: "Czech Republic",label: "Prague (UTC+1/+2)" },
  { value: "Europe/Budapest",        country: "Hungary",       label: "Budapest (UTC+1/+2)" },
  { value: "Europe/Athens",          country: "Greece",        label: "Athens (UTC+2/+3)" },
  { value: "Europe/Bucharest",       country: "Romania",       label: "Bucharest (UTC+2/+3)" },
  { value: "Europe/Helsinki",        country: "Finland",       label: "Helsinki (UTC+2/+3)" },
  { value: "Europe/Kiev",            country: "Ukraine",       label: "Kyiv (UTC+2/+3)" },
  { value: "Europe/Istanbul",        country: "Turkey",        label: "Istanbul (UTC+3)" },
  { value: "Europe/Moscow",          country: "Russia",        label: "Moscow (UTC+3)" },
  { value: "Asia/Riyadh",            country: "Saudi Arabia",  label: "Riyadh (UTC+3)" },
  { value: "Asia/Kuwait",            country: "Kuwait",        label: "Kuwait City (UTC+3)" },
  { value: "Asia/Baghdad",           country: "Iraq",          label: "Baghdad (UTC+3)" },
  { value: "Asia/Qatar",             country: "Qatar",         label: "Doha (UTC+3)" },
  { value: "Africa/Nairobi",         country: "Kenya",         label: "Nairobi (UTC+3)" },
  { value: "Africa/Addis_Ababa",     country: "Ethiopia",      label: "Addis Ababa (UTC+3)" },
  { value: "Asia/Tehran",            country: "Iran",          label: "Tehran (UTC+3:30)" },
  { value: "Asia/Dubai",             country: "UAE",           label: "Dubai (UTC+4)" },
  { value: "Asia/Muscat",            country: "Oman",          label: "Muscat (UTC+4)" },
  { value: "Asia/Baku",              country: "Azerbaijan",    label: "Baku (UTC+4)" },
  { value: "Asia/Yerevan",           country: "Armenia",       label: "Yerevan (UTC+4)" },
  { value: "Asia/Tbilisi",           country: "Georgia",       label: "Tbilisi (UTC+4)" },
  { value: "Asia/Kabul",             country: "Afghanistan",   label: "Kabul (UTC+4:30)" },
  { value: "Asia/Karachi",           country: "Pakistan",      label: "Karachi (UTC+5)" },
  { value: "Asia/Tashkent",          country: "Uzbekistan",    label: "Tashkent (UTC+5)" },
  { value: "Asia/Kolkata",           country: "India",         label: "Mumbai / Delhi (UTC+5:30)" },
  { value: "Asia/Colombo",           country: "Sri Lanka",     label: "Colombo (UTC+5:30)" },
  { value: "Asia/Kathmandu",         country: "Nepal",         label: "Kathmandu (UTC+5:45)" },
  { value: "Asia/Dhaka",             country: "Bangladesh",    label: "Dhaka (UTC+6)" },
  { value: "Asia/Almaty",            country: "Kazakhstan",    label: "Almaty (UTC+6)" },
  { value: "Asia/Rangoon",           country: "Myanmar",       label: "Yangon (UTC+6:30)" },
  { value: "Asia/Bangkok",           country: "Thailand",      label: "Bangkok (UTC+7)" },
  { value: "Asia/Jakarta",           country: "Indonesia",     label: "Jakarta (UTC+7)" },
  { value: "Asia/Ho_Chi_Minh",       country: "Vietnam",       label: "Ho Chi Minh (UTC+7)" },
  { value: "Asia/Phnom_Penh",        country: "Cambodia",      label: "Phnom Penh (UTC+7)" },
  { value: "Asia/Kuala_Lumpur",      country: "Malaysia",      label: "Kuala Lumpur (UTC+8)" },
  { value: "Asia/Singapore",         country: "Singapore",     label: "Singapore (UTC+8)" },
  { value: "Asia/Shanghai",          country: "China",         label: "Beijing / Shanghai (UTC+8)" },
  { value: "Asia/Manila",            country: "Philippines",   label: "Manila (UTC+8)" },
  { value: "Asia/Taipei",            country: "Taiwan",        label: "Taipei (UTC+8)" },
  { value: "Asia/Hong_Kong",         country: "Hong Kong",     label: "Hong Kong (UTC+8)" },
  { value: "Asia/Ulaanbaatar",       country: "Mongolia",      label: "Ulaanbaatar (UTC+8)" },
  { value: "Asia/Seoul",             country: "South Korea",   label: "Seoul (UTC+9)" },
  { value: "Asia/Tokyo",             country: "Japan",         label: "Tokyo (UTC+9)" },
  { value: "Australia/Perth",        country: "Australia",     label: "Perth (UTC+8)" },
  { value: "Australia/Darwin",       country: "Australia",     label: "Darwin (UTC+9:30)" },
  { value: "Australia/Adelaide",     country: "Australia",     label: "Adelaide (UTC+9:30)" },
  { value: "Australia/Brisbane",     country: "Australia",     label: "Brisbane (UTC+10)" },
  { value: "Australia/Sydney",       country: "Australia",     label: "Sydney / Melbourne (UTC+10/+11)" },
  { value: "Pacific/Auckland",       country: "New Zealand",   label: "Auckland (UTC+12/+13)" },
  { value: "Africa/Cairo",           country: "Egypt",         label: "Cairo (UTC+2)" },
  { value: "Africa/Lagos",           country: "Nigeria",       label: "Lagos (UTC+1)" },
  { value: "Africa/Johannesburg",    country: "South Africa",  label: "Johannesburg (UTC+2)" },
  { value: "Africa/Casablanca",      country: "Morocco",       label: "Casablanca (UTC+1)" },
  { value: "Africa/Accra",           country: "Ghana",         label: "Accra (UTC+0)" },
  { value: "Africa/Khartoum",        country: "Sudan",         label: "Khartoum (UTC+3)" },
  { value: "Africa/Dar_es_Salaam",   country: "Tanzania",      label: "Dar es Salaam (UTC+3)" },
  { value: "Africa/Kampala",         country: "Uganda",        label: "Kampala (UTC+3)" },
  { value: "Africa/Tunis",           country: "Tunisia",       label: "Tunis (UTC+1)" },
  { value: "Africa/Algiers",         country: "Algeria",       label: "Algiers (UTC+1)" },
  { value: "Africa/Tripoli",         country: "Libya",         label: "Tripoli (UTC+2)" },
  { value: "Asia/Beirut",            country: "Lebanon",       label: "Beirut (UTC+2/+3)" },
  { value: "Asia/Amman",             country: "Jordan",        label: "Amman (UTC+2/+3)" },
  { value: "Asia/Damascus",          country: "Syria",         label: "Damascus (UTC+2/+3)" },
  { value: "Asia/Jerusalem",         country: "Israel",        label: "Jerusalem (UTC+2/+3)" },
  { value: "Asia/Gaza",              country: "Palestine",     label: "Gaza (UTC+2/+3)" },
  { value: "Asia/Bahrain",           country: "Bahrain",       label: "Manama (UTC+3)" },
  { value: "Asia/Aden",              country: "Yemen",         label: "Aden / Sana'a (UTC+3)" },
  { value: "Asia/Dushanbe",          country: "Tajikistan",    label: "Dushanbe (UTC+5)" },
  { value: "Asia/Ashgabat",          country: "Turkmenistan",  label: "Ashgabat (UTC+5)" },
  { value: "Asia/Bishkek",           country: "Kyrgyzstan",    label: "Bishkek (UTC+6)" },
  { value: "Asia/Yangon",            country: "Myanmar",       label: "Yangon (UTC+6:30)" },
  { value: "Asia/Vientiane",         country: "Laos",          label: "Vientiane (UTC+7)" },
  { value: "Asia/Brunei",            country: "Brunei",        label: "Bandar Seri Begawan (UTC+8)" },
  { value: "Asia/Macau",             country: "Macau",         label: "Macau (UTC+8)" },
  { value: "Asia/Novosibirsk",       country: "Russia",        label: "Novosibirsk (UTC+7)" },
  { value: "Asia/Yekaterinburg",     country: "Russia",        label: "Yekaterinburg (UTC+5)" },
  { value: "Europe/Minsk",           country: "Belarus",       label: "Minsk (UTC+3)" },
  { value: "Europe/Riga",            country: "Latvia",        label: "Riga (UTC+2/+3)" },
  { value: "Europe/Tallinn",         country: "Estonia",       label: "Tallinn (UTC+2/+3)" },
  { value: "Europe/Vilnius",         country: "Lithuania",     label: "Vilnius (UTC+2/+3)" },
  { value: "Europe/Chisinau",        country: "Moldova",       label: "Chisinau (UTC+2/+3)" },
  { value: "Europe/Belgrade",        country: "Serbia",        label: "Belgrade (UTC+1/+2)" },
  { value: "Europe/Zagreb",          country: "Croatia",       label: "Zagreb (UTC+1/+2)" },
  { value: "Europe/Ljubljana",       country: "Slovenia",      label: "Ljubljana (UTC+1/+2)" },
  { value: "Europe/Sarajevo",        country: "Bosnia",        label: "Sarajevo (UTC+1/+2)" },
  { value: "Europe/Skopje",          country: "North Macedonia",label: "Skopje (UTC+1/+2)" },
  { value: "Europe/Podgorica",       country: "Montenegro",    label: "Podgorica (UTC+1/+2)" },
  { value: "Europe/Tirane",          country: "Albania",       label: "Tirana (UTC+1/+2)" },
  { value: "Europe/Sofia",           country: "Bulgaria",      label: "Sofia (UTC+2/+3)" },
  { value: "Europe/Nicosia",         country: "Cyprus",        label: "Nicosia (UTC+2/+3)" },
  { value: "America/Havana",         country: "Cuba",          label: "Havana (UTC-5)" },
  { value: "America/Jamaica",        country: "Jamaica",       label: "Kingston (UTC-5)" },
  { value: "America/Guyana",         country: "Guyana",        label: "Georgetown (UTC-4)" },
  { value: "America/Suriname",       country: "Suriname",      label: "Paramaribo (UTC-3)" },
  { value: "America/Montevideo",     country: "Uruguay",       label: "Montevideo (UTC-3)" },
  { value: "America/Asuncion",       country: "Paraguay",      label: "Asunción (UTC-4)" },
  { value: "America/La_Paz",         country: "Bolivia",       label: "La Paz (UTC-4)" },
  { value: "America/Guayaquil",      country: "Ecuador",       label: "Guayaquil (UTC-5)" },
  { value: "America/Panama",         country: "Panama",        label: "Panama City (UTC-5)" },
  { value: "America/Costa_Rica",     country: "Costa Rica",    label: "San José (UTC-6)" },
  { value: "America/El_Salvador",    country: "El Salvador",   label: "San Salvador (UTC-6)" },
  { value: "America/Tegucigalpa",    country: "Honduras",      label: "Tegucigalpa (UTC-6)" },
  { value: "America/Managua",        country: "Nicaragua",     label: "Managua (UTC-6)" },
  { value: "America/Guatemala",      country: "Guatemala",     label: "Guatemala City (UTC-6)" },
];

function TimezoneSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = ALL_TIMEZONES.filter(tz =>
    tz.country.toLowerCase().includes(search.toLowerCase()) ||
    tz.label.toLowerCase().includes(search.toLowerCase())
  );
  const selected = ALL_TIMEZONES.find(tz => tz.value === value);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm flex items-center justify-between bg-white focus:outline-none transition-all"
        style={{ color: selected ? "#111827" : "#9ca3af" }}>
        <span className="truncate">{selected ? `${selected.country} — ${selected.label}` : "Select your timezone..."}</span>
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl w-full">
          <div className="p-2.5 border-b border-gray-100 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input autoFocus type="text" placeholder="Search by country or city…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 text-sm focus:outline-none text-gray-800 placeholder-gray-400" />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.map(tz => (
              <button key={tz.value} type="button"
                onClick={() => { onChange(tz.value); setOpen(false); setSearch(""); }}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                style={{ background: value === tz.value ? "#f0f4fa" : undefined }}>
                <span className="text-sm font-semibold text-gray-800">{tz.country}</span>
                <span className="text-xs text-gray-500 ml-3">{tz.label}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No timezone found</p>}
          </div>
        </div>
      )}
    </div>
  );
}

const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1.5";

export default function Step4Schedule({ data, daysNeeded, onChange, onBack, onSubmit }: Props) {
  const toggleDay = (day: string) => {
    const has = data.days.includes(day);
    let next: string[];
    if (has) next = data.days.filter(d => d !== day);
    else if (data.days.length < daysNeeded) next = [...data.days, day];
    else next = [...data.days.slice(1), day];
    onChange({ ...data, days: next });
  };

  const isWeekend = (d: string) => d === "Sat" || d === "Sun";
  const isValid = data.days.length === daysNeeded && data.timezone && data.startDate && data.startTime;

  return (
    <div className="step-enter w-full">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Schedule Your Classes</h1>
      <p className="text-sm text-gray-400 mb-5">Choose your preferred days and timing — we&apos;ll match you with the right teacher</p>

      <div className="space-y-4">
        {/* Days */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelCls} style={{ marginBottom: 0 }}>Select Days</label>
            <span className="text-xs font-bold" style={{ color: "#E6A817" }}>
              {data.days.length} / {daysNeeded} selected
            </span>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            {DAYS.map(d => {
              const weekend = isWeekend(d);
              const sel = data.days.includes(d);
              return (
                <button key={d} onClick={() => !weekend && toggleDay(d)}
                  className="w-11 h-11 rounded-full border-2 text-xs font-bold transition-all"
                  style={
                    weekend ? { background: "#f9f9f9", color: "#d1d5db", borderColor: "#f0f0f0", cursor: "not-allowed" }
                    : sel ? { background: "#1E2D4E", color: "white", borderColor: "#1E2D4E" }
                    : { background: "white", color: "#6b7280", borderColor: "#d1d5db" }
                  }>
                  {d}
                </button>
              );
            })}
          </div>
          {daysNeeded > 5 && <p className="text-xs text-gray-400 mt-1">Weekends are not available</p>}
        </div>

        {/* Timezone */}
        <div>
          <label className={labelCls}>Timezone</label>
          <TimezoneSelect value={data.timezone} onChange={v => onChange({ ...data, timezone: v })} />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Preferred Start Date</label>
            <CalendarPicker value={data.startDate} onChange={v => onChange({ ...data, startDate: v })} minDaysFromNow={4} />
          </div>
          <div>
            <label className={labelCls}>Preferred Start Time</label>
            <TimePicker value={data.startTime} onChange={v => onChange({ ...data, startTime: v })} />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className={labelCls}>
            Any Special Requests or Notes?{" "}
            <span className="normal-case tracking-normal font-normal text-gray-400">(optional)</span>
          </label>
          <textarea rows={3} placeholder="e.g. Beginner level, prefers female teacher..."
            value={data.notes} onChange={e => onChange({ ...data, notes: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(230,168,23,0.15)] transition-all resize-none" />
        </div>
      </div>

      {!isValid && (
        <p className="text-xs text-gray-400 italic text-center mt-4">Fill all fields to continue</p>
      )}
      <div className="flex items-center justify-between mt-3">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">
          ← Back</button>
        <button onClick={onSubmit} disabled={!isValid}
          className="px-6 py-3 rounded-xl font-bold text-sm transition-all"
          style={{
            background: isValid ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#e5e7eb",
            color: isValid ? "white" : "#9ca3af", cursor: isValid ? "pointer" : "not-allowed",
          }}>
          Submit Enrolment ✓</button>
      </div>
    </div>
  );
}
