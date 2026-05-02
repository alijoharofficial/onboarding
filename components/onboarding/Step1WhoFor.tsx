"use client";
import AdultAvatar from "@/components/avatars/AdultAvatar";
import ChildrenAvatar from "@/components/avatars/ChildrenAvatar";

type Choice = "myself" | "children" | null;

interface Props {
  value: Choice;
  onChange: (v: Choice) => void;
  onNext: () => void;
}

export default function Step1WhoFor({ value, onChange, onNext }: Props) {
  return (
    <div className="step-enter flex flex-col items-center">
      {/* Arabic basmala */}
      <p
        className="text-2xl mb-3 font-bold"
        style={{ color: "#E6A817", fontFamily: "serif", direction: "rtl" }}
      >
        ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ
      </p>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Start Your Journey</h1>
      <p className="text-gray-500 mb-8 text-center">
        Fill the form and claim your free trial classes.
      </p>

      <p className="font-semibold text-gray-800 mb-5 text-lg">Who are you choosing for?</p>

      <div className="flex gap-5 mb-10 w-full max-w-sm">
        {/* For Myself */}
        <button
          onClick={() => onChange("myself")}
          className={`avatar-card flex-1 flex flex-col items-center gap-3 rounded-2xl border-2 py-6 px-4 bg-white ${
            value === "myself" ? "selected" : "border-gray-200"
          }`}
        >
          <span className="text-sm font-semibold text-gray-700">For Myself</span>
          <AdultAvatar className="w-28 h-28" />
        </button>

        {/* For My Children */}
        <button
          onClick={() => onChange("children")}
          className={`avatar-card flex-1 flex flex-col items-center gap-3 rounded-2xl border-2 py-6 px-4 bg-white ${
            value === "children" ? "selected" : "border-gray-200"
          }`}
        >
          <span className="text-sm font-semibold text-gray-700">For My Children</span>
          <ChildrenAvatar className="w-28 h-28" />
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={!value}
        className="w-full max-w-sm h-13 rounded-xl font-bold text-base transition-all duration-200"
        style={{
          background: value ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#d1d5db",
          color: value ? "white" : "#9ca3af",
          cursor: value ? "pointer" : "not-allowed",
          height: "52px",
        }}
      >
        Next
      </button>
    </div>
  );
}
