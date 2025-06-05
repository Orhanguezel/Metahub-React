import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export default function BikeTabs({ activeTab, onChange }) {
  const { t } = useTranslation("product");

  return (
    <Header>
      <TabButton
        $active={activeTab === "list"}
        onClick={() => onChange("list")}
      >
        {t("admin.tabs.product", "Products")}
      </TabButton>
      <TabButton
        $active={activeTab === "create"}
        onClick={() => onChange("create")}
      >
        {t("admin.tabs.create", "Create")}
      </TabButton>
      <TabButton
        $active={activeTab === "categories"}
        onClick={() => onChange("categories")}
      >
        {t("admin.tabs.categories", "Categories")}
      </TabButton>
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TabButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.buttonBackground};
  color: ${({ theme, $active }) => $active ? theme.colors.white : theme.colors.text};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.white};
  }
`;
