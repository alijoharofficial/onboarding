"use client";

interface Props {
  courseName: string;
  daysPerWeek: number;
  minutesPerClass: number;
  classesPerMonth: number;
  monthlyPrice: number;
  studentCount: number;
  onRestart: () => void;
}

export default function SuccessScreen({ courseName, daysPerWeek, minutesPerClass, classesPerMonth, monthlyPrice, studentCount, onRestart }: Props) {
  return (
    <div className="step-enter flex flex-col items-center text-center py-4">
      {/* Checkmark circle */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg"
        style={{ background: "linear-gradient(135deg,#1E2D4E,#2d6050)" }}
      >
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Arabic */}
      <p className="text-xl font-bold mb-2" style={{ color: "#E6A817", fontFamily: "Georgia,serif", direction: "rtl" }}>
        جَزَاكَ اللَّهُ خَيْرًا
      </p>

      <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">Enrolment Received!</h2>
      <p className="text-sm text-gray-400 max-w-xs mb-1">
        Our team will reach out within 24 hours to confirm your free trial class. May Allah bless your learning journey. 🌙
      </p>

      {/* Decorative dots */}
      <div className="flex gap-3 my-4">
        {[...Array(3)].map((_, i) => (
          <span key={i} className="text-lg" style={{ color: "#E6A817" }}>✦</span>
        ))}
      </div>

      {/* Summary card */}
      <div className="w-full rounded-2xl border border-gray-100 overflow-hidden mb-6" style={{ background: "#f9f8f5" }}>
        <SummaryRow label="Course selected" value={courseName} />
        <SummaryRow label="Schedule" value={`${daysPerWeek} days/week · ${minutesPerClass} min`} />
        <SummaryRow label="Classes/month" value={`${classesPerMonth} classes`} />
        <SummaryRow label="Students enrolled" value={studentCount.toString()} />
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-sm text-gray-500">Monthly price</span>
          <span className="font-extrabold text-base" style={{ color: "#E6A817" }}>${monthlyPrice} / month</span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all"
        style={{ background: "linear-gradient(135deg,#1E2D4E,#2d4070)" }}
      >
        Access Your Account →
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-semibold text-sm text-gray-800">{value}</span>
    </div>
  );
}
