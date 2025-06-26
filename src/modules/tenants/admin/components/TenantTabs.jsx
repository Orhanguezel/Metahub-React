import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const tabs = [
  { key: "list", label: "admin.tabs.tenant", fallback: "Tenants" },
  { key: "create", label: "admin.tabs.create", fallback: "Add New" },
];

export default function TenantTabs({ activeTab, onChange }) {
  const { t } = useTranslation("tenants");

  return (
    <Nav>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          $active={activeTab === tab.key}
          aria-current={activeTab === tab.key ? "page" : undefined}
          tabIndex={activeTab === tab.key ? 0 : -1}
          onClick={() => onChange(tab.key)}
          type="button"
        >
          {t(tab.label, tab.fallback)}
        </TabButton>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacings.sm};
  margin-bottom: ${({ theme }) => theme.spacings.lg};
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.background};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.text)};
  cursor: pointer;
  transition: background 0.22s, color 0.22s;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.primaryHover};
    color: #fff;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    z-index: 2;
  }
`;
