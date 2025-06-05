import React, { useState } from "react";
import styled from "styled-components";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  updateAdminModule,
  fetchAdminModules,
} from "../../slice/adminModuleSlice";
import { toast } from "react-toastify";

const EditModuleModal = ({ module, onClose }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("adminModules");
  const { selectedProject } = useAppSelector((state) => state.adminModule);

  const [form, setForm] = useState({
    label: { ...module.label },
    icon: module.icon || "box",
    roles: Array.isArray(module.roles) ? module.roles.join(", ") : "",
    visibleInSidebar: module.visibleInSidebar ?? true,
    useAnalytics: module.useAnalytics ?? false,
    enabled: module.enabled ?? true,
    showInDashboard: module.showInDashboard ?? true,
    order: module.order ?? 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLabelChange = (lang, value) => {
    setForm((prev) => ({
      ...prev,
      label: { ...prev.label, [lang]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateAdminModule({
          name: module.name,
          updates: {
            label: form.label,
            icon: form.icon,
            roles: form.roles.split(",").map((r) => r.trim()),
            visibleInSidebar: form.visibleInSidebar,
            useAnalytics: form.useAnalytics,
            enabled: form.enabled,
            showInDashboard: form.showInDashboard,
            order: form.order,
          },
        })
      ).unwrap();

      if (selectedProject) {
        await dispatch(fetchAdminModules(selectedProject));
      }

      toast.success(t("updateSuccess", "Module updated successfully!"));
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      toast.error(t("updateError", "An error occurred during update."));
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

        <form onSubmit={handleSubmit}>
          {["tr", "en", "de"].map((lang) => (
            <InputGroup key={lang}>
              <label>{t(`label.${lang}`, `Label (${lang.toUpperCase()})`)}</label>
              <input
                value={form.label[lang]}
                onChange={(e) => handleLabelChange(lang, e.target.value)}
                placeholder={t(
                  `labelPlaceholder.${lang}`,
                  `Enter label (${lang.toUpperCase()})`
                )}
              />
            </InputGroup>
          ))}

          <InputGroup>
            <label>{t("icon", "Icon")}</label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder={t("iconPlaceholder", "Enter icon name")}
            />
          </InputGroup>

          <InputGroup>
            <label>{t("roles", "Roles (comma separated)")}</label>
            <input
              name="roles"
              value={form.roles}
              onChange={handleChange}
              placeholder="admin, editor"
            />
          </InputGroup>

          <InputGroup>
            <label>{t("order", "Order")}</label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
            />
          </InputGroup>

          <CheckboxGroup>
            {[
              { name: "visibleInSidebar", label: t("visibleInSidebar", "Show in Sidebar") },
              { name: "useAnalytics", label: t("useAnalytics", "Enable Analytics") },
              { name: "enabled", label: t("enabled", "Enabled") },
              { name: "showInDashboard", label: t("showInDashboard", "Show on Dashboard") },
            ].map((item) => (
              <label key={item.name}>
                <input
                  type="checkbox"
                  name={item.name}
                  checked={form[item.name]}
                  onChange={handleChange}
                />
                {item.label}
              </label>
            ))}
          </CheckboxGroup>

          <SubmitButton type="submit">{t("save", "Save")}</SubmitButton>
        </form>
      </Modal>
    </Overlay>
  );
};

export default EditModuleModal;

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
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  width: 95%;
  max-width: 500px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
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
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  input,
  select {
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radii.sm};
    border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.fontSizes.md};
    background: ${({ theme }) => theme.inputs.background};
    color: ${({ theme }) => theme.inputs.text};
  }
`;

const CheckboxGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
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
