import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateTenantModuleSetting,
  fetchTenantModules,
} from "@/modules/adminmodules/slices/adminModuleSlice";

// Sadece tenant setting alanları!
const SETTING_FIELDS = [
  "enabled",
  "visibleInSidebar",
  "useAnalytics",
  "showInDashboard",
  "roles",
  "order",
];

export default function EditTenantModuleModal({
  module,
  onClose,
  onAfterAction,
}) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("adminModules");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedTenant = useAppSelector(
    (state) => state.tenants.selectedTenant
  );

  // Form State
  const [form, setForm] = useState({
    enabled: !!module.enabled,
    visibleInSidebar: !!module.visibleInSidebar,
    useAnalytics: !!module.useAnalytics,
    showInDashboard: !!module.showInDashboard,
    roles: Array.isArray(module.roles) ? module.roles.join(", ") : "",
    order: Number.isFinite(module.order) ? module.order : 0,
  });

  useEffect(() => {
    setForm({
      enabled: !!module.enabled,
      visibleInSidebar: !!module.visibleInSidebar,
      useAnalytics: !!module.useAnalytics,
      showInDashboard: !!module.showInDashboard,
      roles: Array.isArray(module.roles) ? module.roles.join(", ") : "",
      order: Number.isFinite(module.order) ? module.order : 0,
    });
  }, [module]);

  // Input handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value) || 0
          : value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const rolesArray = form.roles
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);

      const settingUpdate = {};
      SETTING_FIELDS.forEach((key) => {
        if (key in form) settingUpdate[key] = form[key];
      });
      settingUpdate.roles = rolesArray;
      settingUpdate.module = module.module || module.name;

      await dispatch(updateTenantModuleSetting(settingUpdate)).unwrap();

      if (selectedTenant) {
        await dispatch(fetchTenantModules(selectedTenant));
      }
      if (onAfterAction) onAfterAction();
      onClose();
    } catch (err) {
      alert(
        t("updateError", "Update failed.") +
          (err?.message ? `: ${err.message}` : "")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>{t("editTitle", "Edit Tenant Setting")}</Title>
          <CloseButton onClick={onClose} aria-label={t("close", "Close")}>
            <XCircle size={22} />
          </CloseButton>
        </Header>
        <form onSubmit={handleSubmit} autoComplete="off">
          <InputGroup>
            <label>{t("roles", "Roles (comma separated)")}</label>
            <input
              name="roles"
              value={form.roles}
              onChange={handleChange}
              placeholder="admin, editor"
              autoComplete="off"
            />
          </InputGroup>
          <InputGroup>
            <label>{t("order", "Order")}</label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              min={0}
              autoComplete="off"
            />
          </InputGroup>
          <CheckboxGroup>
            {"enabled" in form && (
              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="enabled"
                  checked={!!form.enabled}
                  onChange={handleChange}
                />
                <span>{t("enabled", "Enabled")}</span>
              </CheckboxLabel>
            )}
            {"visibleInSidebar" in form && (
              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="visibleInSidebar"
                  checked={!!form.visibleInSidebar}
                  onChange={handleChange}
                />
                <span>{t("visibleInSidebar", "Show in Sidebar")}</span>
              </CheckboxLabel>
            )}
            {"useAnalytics" in form && (
              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="useAnalytics"
                  checked={!!form.useAnalytics}
                  onChange={handleChange}
                />
                <span>{t("useAnalytics", "Enable Analytics")}</span>
              </CheckboxLabel>
            )}
            {"showInDashboard" in form && (
              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="showInDashboard"
                  checked={!!form.showInDashboard}
                  onChange={handleChange}
                />
                <span>{t("showInDashboard", "Show on Dashboard")}</span>
              </CheckboxLabel>
            )}
          </CheckboxGroup>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("saving", "Saving...") : t("save", "Save")}
          </SubmitButton>
        </form>
      </Modal>
    </Overlay>
  );
}

// --- Styled Components ---
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacings.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  width: 95%;
  max-width: 500px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacings.md};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};
  transition: color ${({ theme }) => theme.transition.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.xs};
  label {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text};
  }
  input,
  select {
    padding: ${({ theme }) => theme.spacings.sm};
    border-radius: ${({ theme }) => theme.radii.sm};
    border: ${({ theme }) => theme.borders.thin}
      ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.fontSizes.md};
    background: ${({ theme }) => theme.inputs.background};
    color: ${({ theme }) => theme.inputs.text};
  }
`;

const CheckboxGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacings.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacings.sm};
  margin-top: ${({ theme }) => theme.spacings.md};
  background: ${({ theme }) => theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.text};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};
  &:hover {
    background: ${({ theme }) => theme.buttons.primary.backgroundHover};
  }
`;
