import React from "react";
import styled from "styled-components";
import { useThemeContext } from "@/contexts/ThemeProviderWrapper";

export default function ThemeToggle() {
  const { toggle, isDark } = useThemeContext();

  return (
    <Button onClick={toggle} aria-label="Toggle dark/light mode" title="Toggle dark/light mode">
      {isDark ? "🌙" : "☀️"}
    </Button>
  );
}

const Button = styled.button`
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
`;
