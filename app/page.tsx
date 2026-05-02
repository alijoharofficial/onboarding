"use client";

import { useState } from "react";
import ProgressBar from "@/components/onboarding/ProgressBar";
import Step1WhoFor from "@/components/onboarding/Step1WhoFor";
import Step2StudentDetails, { type StudentData } from "@/components/onboarding/Step2StudentDetails";
import Step3Course, { type CourseData } from "@/components/onboarding/Step3Course";
import Step4Schedule, { type ScheduleData } from "@/components/onboarding/Step4Schedule";
import SuccessScreen from "@/components/onboarding/SuccessScreen";

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [whoFor, setWhoFor] = useState<"myself" | "children" | null>(null);

  const [student, setStudent] = useState<StudentData>({
    name: "", email: "", phone: "",
    countryCode: "+1", dob: "", gender: "",
  });

  const [course, setCourse] = useState<CourseData>({
    courseId: "quranic", daysPerWeek: 2, minutesPerClass: 30,
  });

  const [schedule, setSchedule] = useState<ScheduleData>({
    days: [], timezone: "", startDate: "", startTime: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => setDone(true);
  const restart = () => {
    setStep(0); setDone(false);
    setWhoFor(null);
    setStudent({ name: "", email: "", phone: "", countryCode: "+1", dob: "", gender: "" });
    setCourse({ courseId: "quranic", daysPerWeek: 2, minutesPerClass: 30 });
    setSchedule({ days: [], timezone: "", startDate: "", startTime: "" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(135deg,#dde6f5 0%,#eef2f8 50%,#e8eef8 100%)" }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle,#E6A817,transparent)" }}
      />
      <div
        className="fixed bottom-[-100px] left-[-80px] w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle,#1E2D4E,transparent)" }}
      />

      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl px-8 py-8"
        style={{ boxShadow: "0 20px 60px rgba(30,45,78,0.12), 0 4px 16px rgba(30,45,78,0.06)" }}
      >
        {!done && <ProgressBar current={step + 1} total={TOTAL_STEPS} />}

        {done ? (
          <SuccessScreen onRestart={restart} />
        ) : step === 0 ? (
          <Step1WhoFor value={whoFor} onChange={setWhoFor} onNext={next} />
        ) : step === 1 ? (
          <Step2StudentDetails data={student} onChange={setStudent} onNext={next} onBack={back} />
        ) : step === 2 ? (
          <Step3Course data={course} onChange={setCourse} onNext={next} onBack={back} />
        ) : (
          <Step4Schedule
            data={schedule}
            daysNeeded={course.daysPerWeek}
            onChange={setSchedule}
            onBack={back}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
