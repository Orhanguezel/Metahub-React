import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const tabs = [
  { key: "list", label: "admin.tabs.bike", fallback: "Bikes" },
  { key: "create", label: "admin.tabs.create", fallback: "Add New" },
  { key: "categories", label: "admin.tabs.categories", fallback: "Categories" },
];

export default function BikeTabs({ activeTab, onChange }) {
  const { t } = useTranslation("bike");

  return (
    <Header>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          $active={activeTab === tab.key}
          onClick={() => onChange(tab.key)}
        >
          {t(tab.label, tab.fallback)}
        </TabButton>
      ))}
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.sm};
  margin-bottom: ${({ theme }) => theme.spacings.lg};
`;

// $active prop JS'de doğrudan kullanılabilir, TypeScript tipini kaldırdık
const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.background};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.text)};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    color: #fff;
  }
`;
