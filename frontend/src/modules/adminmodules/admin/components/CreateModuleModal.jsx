import React, { useState } from "react";
import styled from "styled-components";
import { XCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createAdminModule,
  fetchAdminModules,
} from "@/modules/adminmodules/slice/adminModuleSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { SUPPORTED_LOCALES } from "@/i18n";
import { getCurrentLocale } from "@/utils/getCurrentLocale";

const getLangLabel = (lang) => lang.toUpperCase();

export default function CreateModuleModal({ onClose }) {
  const { t } = useTranslation("adminModules");
  const dispatch = useAppDispatch();
  const { selectedProject } = useAppSelector((state) => state.adminModule);
  const lang = getCurrentLocale();

  // Çoklu dil label alanı: her dil için ayrı input!
  const [label, setLabel] = useState(
    SUPPORTED_LOCALES.reduce((acc, l) => ({ ...acc, [l]: "" }), {})
  );
  const [form, setForm] = useState({
    name: "",
    icon: "box",
    roles: "admin",
    language: lang,
    visibleInSidebar: true,
    useAnalytics: false,
    enabled: true,
    showInDashboard: true,
    order: 0,
  });

  const [error, setError] = useState(null);

  const handleLabelChange = (locale, value) => {
    setLabel((prev) => ({ ...prev, [locale]: value }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getMsg = (msg) => {
    if (!msg) return "";
    return typeof msg === "string" ? msg : msg?.[lang] || msg?.en || "";
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError(t("errors.nameRequired", "Module name is required."));
      return;
    }
    // En az bir label dolu mu kontrol et
    const atLeastOneLabel = Object.values(label).some(
      (val) => val && val.trim()
    );
    if (!atLeastOneLabel) {
      setError(t("errors.labelRequired", "At least one label is required."));
      return;
    }

    try {
      await dispatch(
        createAdminModule({
          ...form,
          label,
          roles: form.roles.split(",").map((r) => r.trim()),
          tenants: selectedProject ? [selectedProject] : undefined,
        })
      ).unwrap();

      if (selectedProject) {
        await dispatch(fetchAdminModules(selectedProject));
      }
      toast.success(
        t(
          "success.created",
          "Module created successfully. Check your .env file to activate it."
        )
      );
      onClose();
    } catch (err) {
      setError(
        getMsg(err?.message) ||
          t("errors.createFailed", "Module creation failed.")
      );
    }
  };

  return (
    <Overlay>
      <Modal>
        <Header>
          <ModalTitle>{t("create", "Add New Module")}</ModalTitle>
          <CloseButton onClick={onClose} aria-label={t("close", "Close")}>
            <XCircle size={20} />
          </CloseButton>
        </Header>

        {error && <ErrorText>{error}</ErrorText>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>{t("name", "Module Name")} *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              autoFocus
              required
            />
          </InputGroup>

          {/* Çoklu dil label alanları */}
          <LabelRow>
            {SUPPORTED_LOCALES.map((l) => (
              <LabelCol key={l}>
                <label htmlFor={`label-${l}`}>{getLangLabel(l)}</label>
                <input
                  id={`label-${l}`}
                  value={label[l]}
                  onChange={(e) => handleLabelChange(l, e.target.value)}
                  placeholder={t("labelPlaceholder", "Label in this language")}
                  autoComplete="off"
                />
              </LabelCol>
            ))}
          </LabelRow>

          <InputGroup>
            <label>{t("icon", "Icon")}</label>
            <input name="icon" value={form.icon} onChange={handleChange} />
          </InputGroup>

          <InputGroup>
            <label>{t("roles", "Roles (comma separated)")}</label>
            <input name="roles" value={form.roles} onChange={handleChange} />
          </InputGroup>

          <InputGroup>
            <label>{t("language", "Language")}</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
            >
              {SUPPORTED_LOCALES.map((l) => (
                <option key={l} value={l}>
                  {getLangLabel(l)}
                </option>
              ))}
            </select>
          </InputGroup>

          <InputGroup>
            <label>{t("order", "Order")}</label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              min={0}
            />
          </InputGroup>

          <CheckboxGroup>
            {[
              {
                name: "visibleInSidebar",
                label: t("visibleInSidebar", "Show in Sidebar"),
              },
              {
                name: "useAnalytics",
                label: t("useAnalytics", "Enable Analytics"),
              },
              { name: "enabled", label: t("enabled", "Enabled") },
              {
                name: "showInDashboard",
                label: t("showInDashboard", "Show on Dashboard"),
              },
            ].map(({ name, label }) => (
              <label key={name}>
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name]}
                  onChange={handleChange}
                />
                {label}
              </label>
            ))}
          </CheckboxGroup>

          <SubmitButton type="submit">
            {t("createSubmit", "Create")}
          </SubmitButton>
        </Form>
      </Modal>
    </Overlay>
  );
}

// --- Styled Components ---
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacings.lg};
  max-width: 500px;
  width: 95%;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacings.xs};
  display: flex;
  align-items: center;
  transition: color ${({ theme }) => theme.transition.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.md};
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.xs};
  input,
  select {
    padding: ${({ theme }) => theme.spacings.sm};
    border-radius: ${({ theme }) => theme.radii.sm};
    border: ${({ theme }) => theme.borders.thin}
      ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.inputs.background};
    color: ${({ theme }) => theme.inputs.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;
// Çoklu dil label grid'i:
const LabelRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.sm};
  margin-bottom: ${({ theme }) => theme.spacings.sm};
  flex-wrap: wrap;
`;
const LabelCol = styled.div`
  flex: 1 1 120px;
  min-width: 110px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  label {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  input {
    width: 100%;
  }
`;
const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.xs};
  label {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacings.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text};
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.whiteColor};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
`;
