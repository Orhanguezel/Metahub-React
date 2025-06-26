import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/hooks";
import { updateAdminModule } from "@/modules/adminmodules/slices/adminModuleSlice";
import { SUPPORTED_LOCALES } from "@/i18n";

// --- Sadece meta alanları ---
const META_FIELDS = ["label", "icon", "roles", "enabled", "order"];

const getLangLabel = (lang) => lang.toUpperCase();

export default function EditGlobalModuleModal({
  module,
  onClose,
  onAfterAction,
}) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("adminModules");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Çoklu dil label fallback
  const safeLabel = SUPPORTED_LOCALES.reduce(
    (acc, l) => ({ ...acc, [l]: module.label?.[l] ?? "" }),
    {}
  );

  const [form, setForm] = useState({
    label: safeLabel,
    icon: module.icon || "box",
    roles: Array.isArray(module.roles) ? module.roles.join(", ") : "",
    enabled: !!module.enabled,
    order: Number.isFinite(module.order) ? module.order : 0,
  });

  useEffect(() => {
    setForm({
      label: SUPPORTED_LOCALES.reduce(
        (acc, l) => ({ ...acc, [l]: module.label?.[l] ?? "" }),
        {}
      ),
      icon: module.icon || "box",
      roles: Array.isArray(module.roles) ? module.roles.join(", ") : "",
      enabled: !!module.enabled,
      order: Number.isFinite(module.order) ? module.order : 0,
    });
  }, [module]);

  // --- Input handlers ---
  const handleLabelChange = (l, value) => {
    setForm((prev) => ({
      ...prev,
      label: { ...prev.label, [l]: value },
    }));
  };

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

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const rolesArray = form.roles
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);

      const metaUpdate = {};
      META_FIELDS.forEach((key) => {
        if (key in form) metaUpdate[key] = form[key];
      });
      metaUpdate.roles = rolesArray;

      await dispatch(
        updateAdminModule({
          name: module.name,
          updates: metaUpdate,
        })
      ).unwrap();

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
          <Title>{t("editTitle", "Edit Module")}</Title>
          <CloseButton onClick={onClose} aria-label={t("close", "Close")}>
            <XCircle size={22} />
          </CloseButton>
        </Header>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Çoklu dil label alanı */}
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
                required={l === "en" || l === "de"} // zorunlu dil, ihtiyaca göre
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
