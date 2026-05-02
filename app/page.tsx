"use client";

import { useState } from "react";
import ProgressBar from "@/components/onboarding/ProgressBar";
import Step1WhoFor from "@/components/onboarding/Step1WhoFor";
import Step2StudentDetails, { type StudentData, emptyStudent } from "@/components/onboarding/Step2StudentDetails";
import Step3Course, { type CourseData } from "@/components/onboarding/Step3Course";
import Step4Schedule, { type ScheduleData } from "@/components/onboarding/Step4Schedule";
import SuccessScreen from "@/components/onboarding/SuccessScreen";

const TOTAL_STEPS = 4;

const COURSE_NAMES: Record<string, string> = {
  quranic: "Foundation",
  recitation: "Recitation",
  memorization: "Memorization",
};

const COURSE_PRICES: Record<string, number> = {
  quranic: 40, recitation: 45, memorization: 60,
};

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [whoFor, setWhoFor] = useState<"myself" | "children" | null>(null);
  const [childCount, setChildCount] = useState(0);
  const [students, setStudents] = useState<StudentData[]>([emptyStudent()]);

  const [course, setCourse] = useState<CourseData>({
    courseId: "quranic", daysPerWeek: 2, minutesPerClass: 30,
  });

  const [schedule, setSchedule] = useState<ScheduleData>({
    days: [], timezone: "", startDate: "", startTime: "", notes: "",
  });

  const goNext = () => {
    if (step === 0) {
      const count = whoFor === "myself" ? 1 : childCount;
      setStudents(Array.from({ length: count }, () => emptyStudent()));
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  };
  const goBack = () => setStep(s => Math.max(s - 1, 0));
  const handleSubmit = () => setDone(true);
  const restart = () => {
    setStep(0); setDone(false);
    setWhoFor(null); setChildCount(0);
    setStudents([emptyStudent()]);
    setCourse({ courseId: "quranic", daysPerWeek: 2, minutesPerClass: 30 });
    setSchedule({ days: [], timezone: "", startDate: "", startTime: "", notes: "" });
  };

  const basePrice = COURSE_PRICES[course.courseId] ?? 40;
  const pricePerStudent = Math.round(basePrice * (course.daysPerWeek / 2) * (course.minutesPerClass / 30));
  const monthlyPrice = pricePerStudent * students.length;
  const classesPerMonth = course.daysPerWeek * 4;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg,#dde6f5 0%,#eef2f8 50%,#e8eef8 100%)" }}
    >
      <div className="fixed top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle,#E6A817,transparent)" }} />
      <div className="fixed bottom-[-100px] left-[-80px] w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#1E2D4E,transparent)" }} />

      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl px-8 py-8"
        style={{ boxShadow: "0 20px 60px rgba(30,45,78,0.12), 0 4px 16px rgba(30,45,78,0.06)" }}
      >
        {/* Free trial banner */}
        {!done && (
          <div className="flex items-center justify-center gap-2 mb-5 py-2 px-4 rounded-xl"
            style={{ background: "linear-gradient(135deg,#fef9ec,#fdf3d0)", border: "1px solid #f5d97a" }}>
            <span className="text-base">🎁</span>
            <span className="text-sm font-bold tracking-wide" style={{ color: "#92650a" }}>
              7 Days Free Trial
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: "#E6A817", color: "white" }}>
              No credit card required
            </span>
          </div>
        )}

        {!done && <ProgressBar current={step + 1} total={TOTAL_STEPS} />}

        {done ? (
          <SuccessScreen
            courseName={COURSE_NAMES[course.courseId] ?? ""}
            daysPerWeek={course.daysPerWeek}
            minutesPerClass={course.minutesPerClass}
            classesPerMonth={classesPerMonth}
            monthlyPrice={monthlyPrice}
            onRestart={restart}
          />
        ) : step === 0 ? (
          <Step1WhoFor
            value={whoFor}
            childCount={childCount}
            onChoiceChange={v => { setWhoFor(v); if (v === "myself") setChildCount(0); }}
            onChildCountChange={setChildCount}
            onNext={goNext}
          />
        ) : step === 1 ? (
          <Step2StudentDetails
            students={students}
            allowMultiple={whoFor === "children"}
            onChange={setStudents}
            onNext={goNext}
            onBack={goBack}
          />
        ) : step === 2 ? (
          <Step3Course
            data={course}
            onChange={setCourse}
            studentCount={students.length}
            onNext={goNext}
            onBack={goBack}
          />
        ) : (
          <Step4Schedule
            data={schedule}
            daysNeeded={course.daysPerWeek}
            onChange={setSchedule}
            onBack={goBack}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
