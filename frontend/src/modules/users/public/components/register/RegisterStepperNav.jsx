// src/modules/users/public/components/auth/register/RegisterStepperNav.js

import {
  StepperNavBar,
  StepperBar,
  StepItem,
  Step,
  StepIndex,
  StepLabel,
  StepConnector,
} from "@/modules/users/public/styles/AuthFormStyles";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Pure JS, login ile birebir aynı stil, farklı adımlar.
export default function RegisterStepperNav({ currentStep, steps }) {
  const { t } = useTranslation("register");
  const stepList = steps || [
    { key: "register", label: t("steps.register", "Register") },
    { key: "verifyEmail", label: t("steps.verifyEmail", "Email Verification") },
    { key: "otp", label: t("steps.otp", "Code Verification") },
    { key: "done", label: t("steps.done", "Completed") },
  ];

  return (
    <StepperNavBar>
      <StepperBar>
        {stepList.map((step, i) => (
          <StepItem key={step.key}>
            <Step
              as={motion.div}
              $active={currentStep === step.key}
              aria-current={currentStep === step.key ? "step" : undefined}
            >
              <StepIndex
                $active={currentStep === step.key}
                as={motion.span}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {i + 1}
              </StepIndex>
              <StepLabel $active={currentStep === step.key}>
                {step.label}
              </StepLabel>
              {currentStep === step.key && (
                <ActiveBar
                  layoutId="step-underline"
                  as={motion.div}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                  }}
                />
              )}
            </Step>
            {i < stepList.length - 1 && <StepConnector />}
          </StepItem>
        ))}
      </StepperBar>
    </StepperNavBar>
  );
}
