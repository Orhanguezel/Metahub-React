// src/modules/users/auth/stepper/ResetPasswordStepper.js

import { useState } from "react";
import {
  ResetPasswordForm,
ResetPasswordSuccessStep,
} from "@/modules/users";

import StepperNav from "@/shared/StepperNav";
import { useTranslation } from "react-i18next";

export default function ResetPasswordStepper({ token, onAuthSuccess, steps }) {
  const { t } = useTranslation("resetPassword");
  const stepList = steps || [
    { key: "reset", label: t("steps.reset", "Reset Password") },
    { key: "done", label: t("steps.done", "Completed") },
  ];

  const [step, setStep] = useState("reset");

  const nextStep = (next) => {
    setStep(next.step);
  };

  return (
    <>
      <StepperNav currentStep={step} steps={stepList} />
      {step === "reset" && (
        <ResetPasswordForm token={token} onNext={nextStep} />
      )}
      {step === "done" && (
        <ResetPasswordSuccessStep onAuthSuccess={onAuthSuccess} />
      )}
    </>
  );
}
