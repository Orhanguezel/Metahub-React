import { useState } from "react";
import { useTranslation } from "react-i18next";
import StepperNav from "@/shared/StepperNav";

import {
  RegisterSuccessStep,
  RegisterFormStep,
  EmailVerifyStep,
  OtpVerifyStep
} from "@/modules/users";

export default function RegisterStepper({ onAuthSuccess, steps }) {
  const { t } = useTranslation("register");
  const stepList = steps || [
    { key: "register", label: t("steps.register", "Register") },
    { key: "verifyEmail", label: t("steps.verifyEmail", "Email Verification") },
    { key: "otp", label: t("steps.otp", "Code Verification") },
    { key: "done", label: t("steps.done", "Completed") },
  ];

  const [step, setStep] = useState("register");
  const [formData, setFormData] = useState({});

  const nextStep = (next) => {
    setStep(next.step);
    setFormData(next.payload || {});
  };

  return (
    <>

      <StepperNav currentStep={step} steps={stepList} />
        {step === "register" && <RegisterFormStep onNext={nextStep} />}
        {step === "verifyEmail" && (
          <EmailVerifyStep email={formData.email} onNext={nextStep} />
        )}
        {step === "otp" && (
          <OtpVerifyStep email={formData.email} onNext={nextStep} />
        )}
        {step === "done" && (
          <RegisterSuccessStep onAuthSuccess={onAuthSuccess} />
        )}
        </>
  );
}
