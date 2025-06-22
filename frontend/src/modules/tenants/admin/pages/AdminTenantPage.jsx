import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  clearTenantMessages,
  setSelectedTenant,
  clearSelectedTenant,
} from "@/modules/tenants/slice/tenantSlice";
import { TenantFormModal, TenantList, TenantTabs } from "@/modules/tenants";
import { useTranslation } from "react-i18next";

export default function AdminTenantPage() {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("tenants");
  const lang = i18n.language || "en";

  // Redux State
  const { tenants, loading, error, selectedTenant } = useAppSelector(
    (state) => state.tenants
  );

  // Tabs: "list" veya "form"
  const [activeTab, setActiveTab] = useState("list");

  // İlk yüklemede tenantları çek
  useEffect(() => {
    dispatch(fetchTenants());
    return () => {
      dispatch(clearTenantMessages());
    };
  }, [dispatch]);

  // --- Ekle / Güncelle (Modal Submit)
  const handleFormSubmit = async (formData, id) => {
    if (id) {
      await dispatch(updateTenant({ id, formData }));
    } else {
      await dispatch(createTenant(formData));
    }
    dispatch(fetchTenants());
    dispatch(clearSelectedTenant());
    setActiveTab("list");
  };

  // --- Tenant Sil
  const handleDelete = async (id) => {
    if (
      window.confirm(
        t(
          "admin.confirm.delete_tenant",
          "Are you sure you want to delete this tenant?"
        )
      )
    ) {
      await dispatch(deleteTenant(id));
      dispatch(fetchTenants());
    }
  };

  // --- Tenant Düzenle (edit)
  const handleEdit = (tenant) => {
    dispatch(setSelectedTenant(tenant));
    setActiveTab("form");
  };

  // --- Tenant Ekle (new)
  const handleCreate = () => {
    dispatch(clearSelectedTenant());
    setActiveTab("form");
  };

  // --- Modal Kapatınca
  const handleModalClose = () => {
    dispatch(clearSelectedTenant());
    setActiveTab("list");
  };

  return (
    <Wrapper>
      <Header>
        <Title>{t("admin.title", "Tenant Management")}</Title>
        <AddButton onClick={handleCreate}>
          {t("admin.create", "Add Tenant")}
        </AddButton>
      </Header>

      <TenantTabs activeTab={activeTab} onChange={setActiveTab} />

      <TabContent>
        {activeTab === "list" && (
          <TenantList
            tenants={tenants}
            lang={lang}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {activeTab === "form" && (
          <TenantFormModal
            isOpen={true}
            editingItem={selectedTenant}
            onClose={handleModalClose}
            onSubmit={handleFormSubmit}
          />
        )}
      </TabContent>
    </Wrapper>
  );
}

// ----------------- Styled Components -----------------
const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: ${({ theme }) => theme.layout.sectionSpacing || "2rem"}
    ${({ theme }) => theme.spacings.md || "1.5rem"};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacings.lg || "2rem"};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg || "1.5rem"};
  color: ${({ theme }) => theme.colors.text || "#222"};
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.text};
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.md};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.buttons.primary.backgroundHover};
  }
`;

const TabContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground || "#fff"};
  border: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  padding: ${({ theme }) => theme.spacings.lg || "2rem"};
  border-radius: ${({ theme }) => theme.radii.md || "12px"};
`;
