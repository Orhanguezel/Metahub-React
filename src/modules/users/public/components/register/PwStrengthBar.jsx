// src/modules/users/public/components/register/PwStrengthBar.js

import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function PwStrengthBar({ score, className }) {
  const { t } = useTranslation("register");
  // Add these keys to register.json for all languages.
  const labels = [
    t("pwStrength.veryWeak", "Very Weak"),
    t("pwStrength.weak", "Weak"),
    t("pwStrength.medium", "Medium"),
    t("pwStrength.strong", "Strong"),
    t("pwStrength.veryStrong", "Very Strong"),
  ];

  return (
    <BarContainer className={className} aria-live="polite">
      <Bar>
        {[0, 1, 2, 3, 4].map((i) => (
          <StrengthBlock
            key={i}
            $active={i <= score}
            $score={score}
            aria-label={labels[score]}
            role="presentation"
          />
        ))}
      </Bar>
      <Label $score={score}>{labels[score]}</Label>
    </BarContainer>
  );
}

// --- Styled Components ---
const BarContainer = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 0.2rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 10px;
  padding: 0.25rem 0.18rem;
  box-shadow: 0 3px 16px 0 ${({ theme }) => theme.colors.primaryTransparent};
  border: 2px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  flex-direction: column;
`;

const Bar = styled.div`
  display: flex;
  gap: 9px;
  height: 15px;
  width: 100%;
  align-items: center;
`;

const StrengthBlock = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 8px;
  border: 1.5px solid
    ${({ $active, $score, theme }) =>
      $active
        ? $score === 0
          ? theme.colors.danger
          : $score === 1
          ? theme.colors.warning
          : $score === 2
          ? theme.colors.info
          : $score === 3
          ? theme.colors.success
          : theme.colors.success
        : theme.colors.borderLight};
  background: ${({ $active, $score, theme }) => {
    if (!$active) return theme.colors.skeletonBackground || theme.colors.border;
    if ($score === 0) return `linear-gradient(90deg, ${theme.colors.danger}, #f78787)`;
    if ($score === 1) return `linear-gradient(90deg, ${theme.colors.warning}, #ffe695)`;
    if ($score === 2) return `linear-gradient(90deg, ${theme.colors.info}, #5ef6ff)`;
    if ($score === 3) return `linear-gradient(90deg, ${theme.colors.success}, #6bf3a0)`;
    return `linear-gradient(90deg, ${theme.colors.success}, #1efaa0)`;
  }};
  box-shadow: ${({ $active, $score }) =>
    $active && $score >= 2
      ? "0 2px 9px 0 rgba(30,230,160,0.13)"
      : "0 1px 3px 0 rgba(80,80,80,0.11)"};
  opacity: ${({ $active }) => ($active ? 1 : 0.33)};
  transition: background 0.25s, opacity 0.18s, border 0.19s;
`;

const Label = styled.div`
  font-size: 1.06em;
  font-weight: 700;
  margin-top: 8px;
  min-height: 1.32em;
  letter-spacing: 0.06em;
  text-align: left;
  color: ${({ $score, theme }) =>
    $score === 0
      ? theme.colors.danger
      : $score === 1
      ? theme.colors.warning
      : $score === 2
      ? theme.colors.info
      : $score === 3
      ? theme.colors.success
      : theme.colors.success};
  text-shadow: 0 1px 8px #0003, 0 0.5px 2px #fff4;
  filter: brightness(1.1) drop-shadow(0 1.5px 8px #0005);
`;
