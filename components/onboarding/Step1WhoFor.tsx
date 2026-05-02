"use client";
import AdultAvatar from "@/components/avatars/AdultAvatar";
import ChildrenAvatar from "@/components/avatars/ChildrenAvatar";

type Choice = "myself" | "children" | null;

interface Props {
  value: Choice;
  childCount: number;
  onChoiceChange: (v: Choice) => void;
  onChildCountChange: (n: number) => void;
  onNext: () => void;
}

const COUNT_OPTIONS = [1, 2, 3, 4, "5+"] as const;

export default function Step1WhoFor({
  value, childCount, onChoiceChange, onChildCountChange, onNext,
}: Props) {
  const canProceed = value === "myself" || (value === "children" && childCount > 0);

  return (
    <div className="step-enter flex flex-col items-center">
      {/* Arabic */}
      <p
        className="text-2xl mb-3 font-bold"
        style={{ color: "#E6A817", fontFamily: "Georgia, serif", direction: "rtl" }}
      >
        ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ
      </p>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Start Your Journey</h1>
      <p className="text-gray-500 mb-7 text-center text-sm">
        Fill the form and claim your free trial classes.
      </p>

      <p className="font-semibold text-gray-800 mb-4">Who are you choosing for?</p>

      {/* Choice cards */}
      <div className="flex gap-4 mb-5 w-full">
        {/* For Myself */}
        <button
          onClick={() => onChoiceChange("myself")}
          className="avatar-card flex-1 flex flex-col items-center gap-2 rounded-2xl border-2 pt-4 pb-5 px-3 transition-all duration-200"
          style={{
            background: value === "myself" ? "#1E2D4E" : "white",
            borderColor: value === "myself" ? "#1E2D4E" : "#e5e7eb",
            boxShadow: value === "myself" ? "0 8px 24px rgba(30,45,78,0.25)" : undefined,
          }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: value === "myself" ? "white" : "#374151" }}
          >
            For Myself
          </span>
          <div className="w-32 h-32 flex items-end justify-center overflow-hidden">
            <AdultAvatar className="w-full h-full" />
          </div>
        </button>

        {/* For My Children */}
        <button
          onClick={() => onChoiceChange("children")}
          className="avatar-card flex-1 flex flex-col items-center gap-2 rounded-2xl border-2 pt-4 pb-5 px-3 transition-all duration-200"
          style={{
            background: value === "children" ? "#1E2D4E" : "white",
            borderColor: value === "children" ? "#1E2D4E" : "#e5e7eb",
            boxShadow: value === "children" ? "0 8px 24px rgba(30,45,78,0.25)" : undefined,
          }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: value === "children" ? "white" : "#374151" }}
          >
            For My Children
          </span>
          <div className="w-36 h-32 flex items-end justify-center overflow-hidden">
            <ChildrenAvatar className="w-full h-full" />
          </div>
        </button>
      </div>

      {/* Children count — shown only when "children" is selected */}
      {value === "children" && (
        <div className="w-full mb-6 step-enter">
          <p className="font-semibold text-gray-800 text-center mb-3">
            How many children will you add?
          </p>
          <div className="flex justify-center gap-3">
            {COUNT_OPTIONS.map((opt) => {
              const numVal = opt === "5+" ? 5 : (opt as number);
              const isSelected = childCount === numVal;
              return (
                <button
                  key={opt}
                  onClick={() => onChildCountChange(numVal)}
                  className="w-11 h-11 rounded-full border-2 font-semibold text-sm transition-all duration-150"
                  style={{
                    background: isSelected ? "#1E2D4E" : "white",
                    borderColor: isSelected ? "#1E2D4E" : "#d1d5db",
                    color: isSelected ? "white" : "#4b5563",
                    boxShadow: isSelected ? "0 4px 12px rgba(30,45,78,0.3)" : undefined,
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Next button */}
      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full rounded-xl font-bold text-base transition-all duration-200"
        style={{
          background: canProceed ? "linear-gradient(135deg,#1E2D4E,#2d4070)" : "#d1d5db",
          color: canProceed ? "white" : "#9ca3af",
          cursor: canProceed ? "pointer" : "not-allowed",
          height: "52px",
        }}
      >
        Next
      </button>
    </div>
  );
}
