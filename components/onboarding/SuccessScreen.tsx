"use client";

interface Props { onRestart: () => void; }

export default function SuccessScreen({ onRestart }: Props) {
  return (
    <div className="step-enter flex flex-col items-center text-center py-8">
      {/* Animated checkmark */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg"
        style={{ background: "linear-gradient(135deg,#E6A817,#f0b429)" }}
      >
        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="text-2xl mb-2 font-bold" style={{ color: "#E6A817", fontFamily: "serif", direction: "rtl" }}>
        جَزَاكَ اللَّهُ خَيْرًا
      </p>

      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">You&apos;re All Set!</h2>
      <p className="text-gray-500 max-w-xs mb-2">
        Thank you for registering. Our team will reach out shortly to confirm your free trial classes.
      </p>
      <p className="text-sm text-gray-400 mb-8">Check your email for a confirmation message.</p>

      <button
        onClick={onRestart}
        className="px-8 py-3 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all"
        style={{ background: "linear-gradient(135deg,#1E2D4E,#2d4070)" }}
      >
        Register Another Student
      </button>
    </div>
  );
}
