import React, { useState } from "react";
import styled from "styled-components";
import { XCircle, Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import EditTenantModuleModal from "./EditTenantModuleModal";
import { getCurrentLocale } from "@/utils/getCurrentLocale";

export default function TenantModuleDetailModal({
  module,
  onClose,
  onAfterAction,
}) {
  const { t } = useTranslation("adminModules");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const lang = getCurrentLocale();

  // Tenant etiketi
  const tenantLabel = module.tenant || "-";
  const moduleLabel = module.module || "-";

  // Edit sonrası otomatik güncelle
  const handleEditSuccess = () => {
    setEditModalOpen(false);
    if (onAfterAction) onAfterAction();
  };

  return (
    <>
      <Overlay>
        <Modal>
          <Header>
            <Title>
              {moduleLabel}
              <TenantName>
                {" | "}
                <span style={{ color: "#0086E0" }}>{tenantLabel}</span>
              </TenantName>
            </Title>
            <ButtonGroup>
              <EditButton
                type="button"
                onClick={() => setEditModalOpen(true)}
                aria-label={t("edit", "Edit")}
              >
                <Pencil size={18} />
              </EditButton>
              <CloseButton
                type="button"
                onClick={onClose}
                aria-label={t("close", "Close")}
              >
                <XCircle size={18} />
              </CloseButton>
            </ButtonGroup>
          </Header>

          <Content>
            <DetailItem>
              <strong>{t("createdAt", "Created At")}:</strong>{" "}
              {module?.createdAt
                ? new Date(module.createdAt).toLocaleString(lang)
                : "-"}
            </DetailItem>
            <DetailItem>
              <strong>{t("updatedAt", "Updated At")}:</strong>{" "}
              {module?.updatedAt
                ? new Date(module.updatedAt).toLocaleString(lang)
                : "-"}
            </DetailItem>
            <DetailItem>
              <strong>{t("type", "Module Type")}:</strong>{" "}
              {t("tenant", "Tenant")}
            </DetailItem>
            <DetailItem>
              <strong>{t("enabled", "Enabled")}:</strong>{" "}
              <BoolDot $active={!!module.enabled} />
              <span>{module.enabled ? t("yes", "Yes") : t("no", "No")}</span>
            </DetailItem>
            {"visibleInSidebar" in module && (
              <DetailItem>
                <strong>{t("visibleInSidebar", "Show in Sidebar")}:</strong>{" "}
                <BoolDot $active={!!module.visibleInSidebar} />
                <span>
                  {module.visibleInSidebar ? t("yes", "Yes") : t("no", "No")}
                </span>
              </DetailItem>
            )}
            {"useAnalytics" in module && (
              <DetailItem>
                <strong>{t("useAnalytics", "Analytics")}:</strong>{" "}
                <BoolDot $active={!!module.useAnalytics} />
                <span>
                  {module.useAnalytics ? t("yes", "Yes") : t("no", "No")}
                </span>
              </DetailItem>
            )}
            {"showInDashboard" in module && (
              <DetailItem>
                <strong>{t("showInDashboard", "Dashboard")}:</strong>{" "}
                <BoolDot $active={!!module.showInDashboard} />
                <span>
                  {module.showInDashboard ? t("yes", "Yes") : t("no", "No")}
                </span>
              </DetailItem>
            )}
            <DetailItem>
              <strong>{t("roles", "Roles")}:</strong>{" "}
              {Array.isArray(module.roles) ? module.roles.join(", ") : "-"}
            </DetailItem>
            {"order" in module && (
              <DetailItem>
                <strong>{t("order", "Order")}:</strong> {module.order ?? "-"}
              </DetailItem>
            )}
          </Content>
        </Modal>
      </Overlay>

      {/* Düzenleme Modalı */}
      {isEditModalOpen && (
        <EditTenantModuleModal
          module={module}
          onClose={() => setEditModalOpen(false)}
          onAfterAction={handleEditSuccess}
        />
      )}
    </>
  );
}

// --- Styled Components ---
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacings.lg};
  max-width: 480px;
  width: 96%;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacings.md};
  }
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0;
`;

const TenantName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.info};
  margin-left: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.xs};
`;

const EditButton = styled.button`
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.whiteColor};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transition.fast};
  &:hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }
`;

const CloseButton = styled.button`
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.whiteColor};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  transition: opacity ${({ theme }) => theme.transition.fast};
  &:hover {
    opacity: ${({ theme }) => theme.opacity.hover};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.sm};
`;

const DetailItem = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const BoolDot = styled.span`
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 6px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.success : theme.colors.danger};
  border: 1.5px solid #ddd;
  vertical-align: middle;
`;
