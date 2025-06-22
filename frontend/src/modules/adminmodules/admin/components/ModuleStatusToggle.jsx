import React from "react";
import styled from "styled-components";
import { Check, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ModuleStatusToggle({ isActive, onToggle }) {
  const { t } = useTranslation("adminModules");

  const label = isActive
    ? t("toggleActive", "Active")
    : t("toggleInactive", "Inactive");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <ToggleButton
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={handleKeyDown}
      $active={isActive}
      aria-pressed={isActive}
      aria-label={label}
      title={label}
      tabIndex={0}
      type="button"
    >
      {isActive ? (
        <>
          <Check size={16} /> <span className="label">{label}</span>
        </>
      ) : (
        <>
          <X size={16} /> <span className="label">{label}</span>
        </>
      )}
    </ToggleButton>
  );
}

const ToggleButton = styled.button`
  background: ${({ theme, $active }) =>
    $active ? theme.colors.success : theme.colors.danger};
  color: #fff;
  border: none;
  padding: 4px 10px 4px 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  min-width: 64px;
  transition: background 0.16s, opacity 0.16s;
  .label {
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    letter-spacing: 0.01em;
    user-select: none;
  }
  &:hover,
  &:focus {
    opacity: 0.85;
    outline: none;
  }
`;
