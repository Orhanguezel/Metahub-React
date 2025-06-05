// src/modules/users/auth/stepper/ChangePasswordStepper.js

import { useState } from "react";
import {
  ChangePasswordForm,
  ChangePasswordSuccessStep,
} from "@/modules/users";
import StepperNav from "@/shared/StepperNav";
import { useTranslation } from "react-i18next";

export default function ChangePasswordStepper({ onAuthSuccess, steps }) {
  const { t } = useTranslation("changePassword");
  const stepList = steps || [
    { key: "change", label: t("steps.change", "Change Password") },
    { key: "done", label: t("steps.done", "Completed") },
  ];

  const [step, setStep] = useState("change");

  const nextStep = (next) => {
    setStep(next.step);
  };

  return (
    <>
      <StepperNav currentStep={step} steps={stepList} />
      {step === "change" && <ChangePasswordForm onNext={nextStep} />}
      {step === "done" && (
        <ChangePasswordSuccessStep onAuthSuccess={onAuthSuccess} />
      )}
    </>
  );
}
