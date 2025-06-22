import styled from "styled-components";
import { motion } from "framer-motion";

// Fallback'li token getirme
const get = (obj, key, fallback) => (obj && obj[key]) || fallback;

const StepCircle = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2.3em;
  height: 2.3em;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active
      ? `radial-gradient(circle at 65% 25%, #fff 15%, ${get(
          theme.colors,
          "primary",
          "#000"
        )} 80%)`
      : `linear-gradient(125deg, ${get(
          theme.colors,
          "grey",
          "#bbb"
        )} 60%, ${get(theme.colors, "secondary", "#222")} 100%)`};
  color: ${({ $active, theme }) =>
    $active ? "#212121" : get(theme.colors, "textLight", "#fff")};
  border: 2.6px solid ${({ $active }) => ($active ? "#fff" : "#888")};
  font-size: 1.21em;
  font-weight: 800;
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `0 2px 16px ${get(
          theme.colors,
          "primary",
          "#000"
        )}33, 0 0 0 2.5px #fff7`
      : "0 1px 6px 0 #1115"};
  transition: background 0.22s cubic-bezier(0.38, 1.12, 0.45, 1), border 0.16s,
    color 0.18s, box-shadow 0.18s;
  z-index: 2;
  @media (max-width: 600px) {
    width: 1.65em;
    height: 1.65em;
    font-size: 1em;
  }
  @media (max-width: 400px) {
    width: 1.15em;
    height: 1.15em;
    font-size: 0.92em;
  }
`;

const StepLabel = styled.span`
  font-size: 1.16em;
  font-weight: ${({ $active }) => ($active ? 900 : 500)};
  color: ${({ $active, theme }) =>
    $active ? "#fff" : get(theme.colors, "accent", "#ddd")};
  background: ${({ $active, theme }) =>
    $active ? get(theme.colors, "primary", "#000") : "transparent"};
  padding: 0.11em 0.7em;
  border-radius: 12px;
  letter-spacing: 0.02em;
  user-select: none;
  transition: color 0.2s, background 0.18s, font-weight 0.13s;
  text-shadow: ${({ $active }) =>
    $active ? "0 1px 12px #000, 0 0 4px #fff9" : "0 1px 4px rgba(0,0,0,0.12)"};

  @media (max-width: 600px) {
    font-size: 0.98em;
    padding: 0.09em 0.38em;
  }
  @media (max-width: 400px) {
    font-size: 0.92em;
    padding: 0.06em 0.21em;
  }
`;

const Step = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.92)};
  transition: opacity 0.16s;

  &:hover {
    opacity: 1;
  }
  @media (max-width: 600px) {
    gap: 8px;
  }
  @media (max-width: 400px) {
    gap: 5px;
  }
`;

const StepperBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2.4rem;
  margin: 2.6rem 0 2rem 0;
  padding: 0.9rem 1.3rem;
  background: ${({ theme }) => get(theme.colors, "secondary", "#222")};
  border-radius: 16px;
  min-width: 320px;
  max-width: 99vw;
  overflow-x: auto;

  @media (max-width: 900px) {
    gap: 1.5rem;
    padding: 0.7rem 0.6rem;
  }
  @media (max-width: 700px) {
    gap: 1.05rem;
    min-width: 0;
    padding: 0.5rem 0.1rem;
  }
  @media (max-width: 500px) {
    gap: 0.7rem;
    margin: 1.2rem 0 1rem 0;
    padding: 0.33rem 0.01rem;
    border-radius: 10px;
  }
`;

const ActiveBar = styled.div`
  position: absolute;
  left: 2%;
  bottom: -9px;
  width: 96%;
  height: 4.5px;
  background: linear-gradient(
    90deg,
    #fff,
    ${({ theme }) => get(theme.colors, "primary", "#000")}
  );
  border-radius: 3px;
  z-index: 3;
  box-shadow: 0 2px 12px 0 #0003;

  @media (max-width: 700px) {
    height: 3px;
    left: 4%;
    width: 92%;
    bottom: -7px;
  }
  @media (max-width: 400px) {
    height: 2px;
    left: 6%;
    width: 88%;
    bottom: -5px;
  }
`;

export default function StepperNav({ currentStep, steps }) {
  return (
    <StepperBar>
      {steps.map((s, i) => (
        <Step
          as={motion.div}
          key={s.key}
          $active={currentStep === s.key}
          tabIndex={0}
        >
          <StepCircle
            as={motion.span}
            $active={currentStep === s.key}
            layout
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            {i + 1}
          </StepCircle>
          <StepLabel $active={currentStep === s.key}>{s.label}</StepLabel>
          {currentStep === s.key && (
            <ActiveBar
              layoutId="step-underline"
              as={motion.div}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
          )}
        </Step>
      ))}
    </StepperBar>
  );
}
