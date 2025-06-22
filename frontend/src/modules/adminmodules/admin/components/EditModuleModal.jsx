import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  updateAdminModule,
  fetchAdminModules,
} from "@/modules/adminmodules/slice/adminModuleSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";
import { SUPPORTED_LOCALES } from "@/i18n";
import { getCurrentLocale } from "@/utils/getCurrentLocale";

const getLangLabel = (lang) => lang.toUpperCase();

export default function EditModuleModal({ module, onClose }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("adminModules");
  const lang = getCurrentLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Her dil için label fallback
  const safeLabel = SUPPORTED_LOCALES.reduce(
    (acc, l) => ({ ...acc, [l]: module.label?.[l] ?? "" }),
    {}
  );

  // Form state
  const [form, setForm] = useState({
    label: safeLabel,
    icon: module.icon || "box",
    roles: Array.isArray(module.roles) ? module.roles.join(", ") : "",
    visibleInSidebar: !!module.visibleInSidebar,
    useAnalytics: !!module.useAnalytics,
    enabled: !!module.enabled,
    showInDashboard: !!module.showInDashboard,
    order: Number.isFinite(module.order) ? module.order : 0,
  });

  // Input değişimi
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

  // Çok dilli label
  const handleLabelChange = (l, value) => {
    setForm((prev) => ({
      ...prev,
      label: { ...prev.label, [l]: value },
    }));
  };

  // Hata/success için mesaj fallback
  const getMsg = (msg) => {
    if (!msg) return "";
    return typeof msg === "string" ? msg : msg?.[lang] || msg?.en || "";
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

      await dispatch(
        updateAdminModule({
          name: module.name,
          updates: {
            label: form.label,
            icon: form.icon,
            roles: rolesArray,
            visibleInSidebar: form.visibleInSidebar,
            useAnalytics: form.useAnalytics,
            enabled: form.enabled,
            showInDashboard: form.showInDashboard,
            order: form.order,
          },
        })
      ).unwrap();

      await dispatch(fetchAdminModules());
      toast.success(t("updateSuccess", "Module updated successfully."));
      onClose();
    } catch (err) {
      toast.error(getMsg(err?.message) || t("updateError", "Update failed."));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setForm({
      label: SUPPORTED_LOCALES.reduce(
        (acc, l) => ({ ...acc, [l]: module.label?.[l] ?? "" }),
        {}
      ),
      icon: module.icon || "box",
      roles: Array.isArray(module.roles) ? module.roles.join(", ") : "",
      visibleInSidebar: !!module.visibleInSidebar,
      useAnalytics: !!module.useAnalytics,
      enabled: !!module.enabled,
      showInDashboard: !!module.showInDashboard,
      order: Number.isFinite(module.order) ? module.order : 0,
    });
  }, [module]);

  return (
    <Overlay>
      <Modal>
        <Header>
          <Title>{t("editTitle", "Edit Module")}</Title>
          <CloseButton onClick={onClose} aria-label={t("close", "Close")}>
            <XCircle size={22} />
          </CloseButton>
        </Header>

        <form onSubmit={handleSubmit}>
          {SUPPORTED_LOCALES.map((l) => (
            <InputGroup key={l}>
              <label htmlFor={`label-${l}`}>{getLangLabel(l)}</label>
              <input
                id={`label-${l}`}
                value={form.label[l]}
                onChange={(e) => handleLabelChange(l, e.target.value)}
                placeholder={t(
                  `labelPlaceholder.${l}`,
                  "Module name in this language"
                )}
                autoComplete="off"
              />
            </InputGroup>
          ))}

          <InputGroup>
            <label>{t("icon", "Icon")}</label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder={t("iconPlaceholder", "Icon")}
              autoComplete="off"
            />
          </InputGroup>

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
            {[
              ["visibleInSidebar", t("visibleInSidebar", "Show in Sidebar")],
              ["useAnalytics", t("useAnalytics", "Enable Analytics")],
              ["enabled", t("enabled", "Enabled")],
              ["showInDashboard", t("showInDashboard", "Show on Dashboard")],
            ].map(([name, label]) => (
              <CheckboxLabel key={name}>
                <input
                  type="checkbox"
                  name={name}
                  checked={!!form[name]}
                  onChange={handleChange}
                />
                <span>{label}</span>
              </CheckboxLabel>
            ))}
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
