// src/modules/users/auth/stepper/ForgotPasswordStepper.js

import { useState } from "react";
import {
  ForgotPasswordForm,
  ForgotPasswordSuccessStep,
} from "@/modules/users";

import StepperNav from "@/shared/StepperNav";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordStepper({ onAuthSuccess, steps }) {
  const { t } = useTranslation("forgotPassword");
  const stepList = steps || [
    { key: "forgot", label: t("steps.forgot", "Forgot Password") },
    { key: "done", label: t("steps.done", "Completed") },
  ];

  const [step, setStep] = useState("forgot");

  const nextStep = (next) => {
    setStep(next.step);
  };

  return (
    <>
      <StepperNav currentStep={step} steps={stepList} />
      {step === "forgot" && <ForgotPasswordForm onNext={nextStep} />}
      {step === "done" && (
        <ForgotPasswordSuccessStep onAuthSuccess={onAuthSuccess} />
      )}
    </>
  );
}
