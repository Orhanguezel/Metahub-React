import { useTranslation } from "react-i18next";
import styled from "styled-components";

// Varsayılan adımlar (isteğe bağlı özelleştirilebilir)
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
            <Step $active={currentStep === step.key}>
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

// --- Temel Stepper stilleri (teman ile uyumlu) ---
const StepperNavBar = styled.div`
  width: 100%;
  background: ${({ theme }) => theme?.colors?.secondary || "#232323"};
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  margin-bottom: 12px;
`;

const StepperBar = styled.ol`
  display: flex;
  align-items: center;
  gap: 22px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.grey};
  background: ${({ $active, theme }) =>
    $active ? (theme.colors.accent || "#E0E0E0") + "25" : "transparent"};
  border-radius: 7px;
  padding: 0 12px;
  transition: color 0.16s, background 0.18s;
`;

const StepIndex = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.grey};
  color: #fff;
  font-size: 1em;
  font-weight: 700;
`;

const StepLabel = styled.span`
  font-size: 1em;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: inherit;
  white-space: nowrap;
`;

const StepConnector = styled.span`
  width: 1.2rem;
  height: 2px;
  background: ${({ theme }) => theme?.colors?.grey || "#A0A0A0"};
  border-radius: 2px;
  opacity: 0.5;
  margin: 0 2px;
`;

