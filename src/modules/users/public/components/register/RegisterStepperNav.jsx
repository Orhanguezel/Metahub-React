import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function RegisterStepperNav({
  currentStep,
  steps,
  className,
  style,
}) {
  const { t } = useTranslation("register");
  const stepList = steps || [
    { key: "register", label: t("steps.register", "Register") },
    { key: "verifyEmail", label: t("steps.verifyEmail", "Email Verification") },
    { key: "otp", label: t("steps.otp", "Code Verification") },
    { key: "done", label: t("steps.done", "Completed") },
  ];

  return (
    <NavBar className={className} style={style}>
      <Bar>
        {stepList.map((step, i) => {
          const isActive = currentStep === step.key;
          return (
            <StepItem key={step.key}>
              <StepBox
                as={motion.div}
                $active={isActive}
                aria-current={isActive ? "step" : undefined}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Circle
                  as={motion.span}
                  $active={isActive}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {i + 1}
                </Circle>
                <Label $active={isActive}>{step.label}</Label>
                {isActive && (
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
              </StepBox>
              {i < stepList.length - 1 && <Connector />}
            </StepItem>
          );
        })}
      </Bar>
    </NavBar>
  );
}

// --- STYLES ---

const NavBar = styled.div`
  width: 100%;
  background: ${({ theme }) => theme?.colors?.secondary || "#232323"};
  padding: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  margin-bottom: 12px;
`;

const Bar = styled.ol`
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
  position: relative;
`;

const StepBox = styled.div`
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

const Circle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8em;
  height: 1.8em;
  font-size: 1em;
  font-weight: 700;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#4caf50" : "#484848")};
  color: #fff;
  border: 2px solid ${({ $active }) => ($active ? "#4caf50" : "#484848")};
  box-shadow: ${({ $active }) => ($active ? "0 1px 8px #4caf5055" : "none")};
  margin-right: 6px;
  transition: background 0.18s, border 0.18s;
`;

const Label = styled.span`
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: inherit;
  white-space: nowrap;
`;

const Connector = styled.span`
  width: 2.2rem;
  height: 2.5px;
  background: #444;
  margin: 0 8px;
  border-radius: 3px;
  opacity: 0.36;
`;

const ActiveBar = styled.div`
  position: absolute;
  left: 9px;
  bottom: -7px;
  width: 88%;
  height: 4px;
  background: linear-gradient(90deg, #fff, #4caf50 70%);
  border-radius: 3px;
  z-index: 1;
  box-shadow: 0 1.5px 10px #4caf5040;
`;
