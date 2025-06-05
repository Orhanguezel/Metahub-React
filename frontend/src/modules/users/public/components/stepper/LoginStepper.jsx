// src/modules/users/auth/stepper/LoginStepper.js

import { useState } from "react";

import {
  LoginForm,
  OtpStep,
  LoginSuccessStep,
} from "@/modules/users";
import StepperNav from "@/shared/StepperNav";
import { useTranslation } from "react-i18next";

export default function LoginStepper({ onAuthSuccess, steps }) {
  const { t } = useTranslation("login");
  const stepList = steps || [
    { key: "login", label: t("steps.login", "Login") },
    { key: "otp", label: t("steps.otp", "Code Verification") },
    { key: "done", label: t("steps.done", "Completed") },
  ];

  const [step, setStep] = useState("login");
  const [payload, setPayload] = useState({});

  const nextStep = (next) => {
    setStep(next.step);
    setPayload(next.payload || {});
  };

  return (
    <>
      <StepperNav currentStep={step} steps={stepList} />
      {step === "login" && <LoginForm onNext={nextStep} />}
      {step === "otp" && <OtpStep email={payload.email} onNext={nextStep} />}
      {step === "done" && <LoginSuccessStep onAuthSuccess={onAuthSuccess} />}
    </>
  );
}
