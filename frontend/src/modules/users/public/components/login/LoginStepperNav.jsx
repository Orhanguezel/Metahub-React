import { useTranslation } from "react-i18next";
import {
  StepperNavBar,
  StepperBar,
  StepItem,
  Step,
  StepIndex,
  StepLabel,
  StepConnector,
} from "@/modules/users/public/styles/AuthFormStyles";

const DEFAULT_STEPS = [
  { key: "login", label: "login" },
  { key: "otp", label: "otp" },
  { key: "done", label: "done" },
];

export default function LoginStepperNav({ currentStep, steps }) {
  const { t } = useTranslation("login");
  const stepList = steps || DEFAULT_STEPS;

  return (
    <StepperNavBar>
      <StepperBar>
        {stepList.map((step, i) => (
          <StepItem key={step.key}>
            <Step
              $active={currentStep === step.key}
              aria-current={currentStep === step.key ? "step" : undefined}
            >
              <StepIndex $active={currentStep === step.key}>{i + 1}</StepIndex>
              <StepLabel $active={currentStep === step.key}>
                {t(`steps.${step.label}`, step.label)}
              </StepLabel>
            </Step>
            {i < stepList.length - 1 && <StepConnector />}
          </StepItem>
        ))}
      </StepperBar>
    </StepperNavBar>
  );
}
