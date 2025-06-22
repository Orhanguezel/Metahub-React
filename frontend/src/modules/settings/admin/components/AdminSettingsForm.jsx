import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/hooks";
import {
  upsertSetting,
  upsertSettingImage,
  updateSettingImage,
} from "@/modules/settings/slice/settingSlice";
import { toast } from "react-toastify";
import { KeyInputSection, ValueInputSection } from "../..";
import { SUPPORTED_LOCALES } from "@/i18n";

// --- Eksik locale'leri recursive tamamlayan helper
function completeLocales(obj, fallback = "") {
  if (Array.isArray(obj)) return obj.map((o) => completeLocales(o, fallback));
  if (typeof obj === "object" && obj !== null) {
    const localeKeys = SUPPORTED_LOCALES;
    const keys = Object.keys(obj).filter((k) => obj[k]);
    const primary = keys.includes("en") ? "en" : keys[0] || null;
    // Eğer TranslatedLabel ise
    if (
      localeKeys.some((lng) => Object.prototype.hasOwnProperty.call(obj, lng))
    ) {
      return localeKeys.reduce((acc, lang) => {
        acc[lang] =
          obj[lang] !== undefined && obj[lang] !== null
            ? obj[lang]
            : primary
            ? obj[primary]
            : fallback;
        return acc;
      }, {});
    }
    // Nested object ise recursive
    const newObj = {};
    for (const [k, v] of Object.entries(obj)) {
      newObj[k] = completeLocales(v, fallback);
    }
    return newObj;
  }
  return obj;
}

// --- Logo URL helper (hem string hem objeyi destekler)
const extractLogoUrl = (logoObj) =>
  typeof logoObj === "string"
    ? logoObj
    : logoObj?.url
    ? logoObj.url
    : undefined;

export default function AdminSettingsForm({
  editingSetting,
  availableThemes,
  onSave,
  onAvailableThemesUpdate,
  supportedLocales = SUPPORTED_LOCALES,
}) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("settings");

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isNestedObject, setIsNestedObject] = useState(false);
  const [isMultiLang, setIsMultiLang] = useState(false);
  const [isImage, setIsImage] = useState(false);

  // Logo upload state
  const [file, setFile] = useState(null);
  const [lightFile, setLightFile] = useState(null);
  const [darkFile, setDarkFile] = useState(null);

  // --- State initialization & value normalization ---
  useEffect(() => {
    if (editingSetting) {
      setKey(editingSetting.key || "");
      // Eksik locale'ler editte otomatik tamamlanıyor (özellikle nested)
      setValue(completeLocales(editingSetting.value ?? ""));
      // Field türlerini value'dan algıla (multiLang, nested, image)
      const val = editingSetting.value;
      const isObj = val && typeof val === "object" && !Array.isArray(val);

      // Dinamik dil kontrolü
      const isReallyMultiLang =
        isObj && supportedLocales.every((lng) => lng in val);

      // Nested: Tüm fieldlar birer multiLang objesi ise
      const isReallyNested =
        isObj &&
        Object.values(val).length > 0 &&
        Object.values(val).every(
          (sub) =>
            typeof sub === "object" &&
            sub !== null &&
            supportedLocales.every((lng) => lng in sub)
        );

      setIsMultiLang(
        isReallyMultiLang &&
          !["available_themes", "site_template"].includes(editingSetting.key)
      );
      setIsNestedObject(isReallyNested);
      setIsImage(
        editingSetting.key === "navbar_logos" ||
          editingSetting.key === "footer_logos"
      );
    } else {
      setKey("");
      setValue("");
      setIsMultiLang(false);
      setIsNestedObject(false);
      setIsImage(false);
    }
    setFile(null);
    setLightFile(null);
    setDarkFile(null);
  }, [editingSetting, supportedLocales]);

  // Key değiştiğinde type'ları sıfırla (ama eski value'yu koru!)
  useEffect(() => {
    setIsImage(key === "navbar_logos" || key === "footer_logos");
    setFile(null);
    setLightFile(null);
    setDarkFile(null);
    // Eğer yeni key özel bir şeyse, value'yu da sıfırla
    if (!editingSetting || key !== editingSetting.key) setValue("");
  }, [key, editingSetting]);

  // Logo/Resim tipi key
  const isLogoUpload = key === "navbar_logos" || key === "footer_logos";
  const lightLogoUrl = extractLogoUrl(value?.light);
  const darkLogoUrl = extractLogoUrl(value?.dark);

  // MultiLang normalizasyon fonksiyonu
  const getEmptyMultiLangValue = () => {
    return supportedLocales.reduce((obj, lng) => ({ ...obj, [lng]: "" }), {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // --- LOGO UPLOAD ---
      if (isLogoUpload) {
        if (!lightFile && !darkFile) {
          toast.error(
            t("pleaseSelectFile", "Please select at least one logo file.")
          );
          return;
        }
        await dispatch(
          upsertSettingImage({
            key,
            lightFile: lightFile || undefined,
            darkFile: darkFile || undefined,
          })
        ).unwrap();
        toast.success(t("settingSaved", "Logos updated successfully."));
        onSave();
        return;
      }

      // --- TEKİL RESİM UPLOAD ---
      if (isImage && !isLogoUpload) {
        if (!file) {
          toast.error(t("pleaseSelectFile", "Please select an image file."));
          return;
        }
        const action = editingSetting
          ? updateSettingImage({ key, darkFile: file })
          : upsertSettingImage({ key, darkFile: file });
        await dispatch(action).unwrap();
        toast.success(
          editingSetting
            ? t("imageUpdated", "Image updated successfully.")
            : t("imageUploaded", "Image uploaded successfully.")
        );
        onSave();
        return;
      }

      // --- KEY ve VALUE KONTROL ---
      if (!key.trim()) {
        toast.error(t("keyRequired", "Key is required."));
        return;
      }

      let normalizedValue = value;

      // NESTED obje ise recursive olarak completeLocales ile tamamla
      if (isNestedObject && typeof value === "object") {
        normalizedValue = completeLocales(value);
      }

      // MULTILANG ise tek tek alanları tamamla (temalar hariç!)
      if (
        isMultiLang &&
        typeof value === "object" &&
        !["site_template", "available_themes"].includes(key)
      ) {
        normalizedValue = completeLocales(value);
      }

      // MULTILANG ve value string ise (örn ilk eklemede, tüm dillere ata)
      if (
        isMultiLang &&
        typeof value === "string" &&
        !["site_template", "available_themes"].includes(key)
      ) {
        normalizedValue = getEmptyMultiLangValue();
        for (const lng of supportedLocales) {
          normalizedValue[lng] = value;
        }
      }

      // --- THEME LISTESİ NORMALİZASYONU ---
      if (key === "available_themes") {
        if (typeof value === "string") {
          normalizedValue = value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean);
        }
        if (!Array.isArray(normalizedValue)) {
          normalizedValue = [];
        }
      }

      // --- THEME SEÇİMİ KONTROLÜ ---
      if (
        key === "site_template" &&
        typeof value === "string" &&
        availableThemes &&
        !availableThemes.includes(value)
      ) {
        toast.error(t("invalidTheme", "Invalid theme selected."));
        return;
      }

      // --- SETTING SAVE ---
      await dispatch(upsertSetting({ key, value: normalizedValue })).unwrap();
      toast.success(t("settingSaved", "Setting saved successfully."));
      onSave();
    } catch (error) {
      toast.error(
        error?.message || t("saveError", "An error occurred while saving.")
      );
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <KeyInputSection
        keyValue={key}
        setKey={setKey}
        isMultiLang={isMultiLang}
        setIsMultiLang={setIsMultiLang}
        isImage={isImage}
        setIsImage={setIsImage}
        isNestedObject={isNestedObject}
        setIsNestedObject={setIsNestedObject}
        isEditing={!!editingSetting}
        supportedLocales={supportedLocales}
      />

      {isLogoUpload ? (
        <LogoInputGroup>
          <div>
            <Label>{t("lightLogo", "Light Logo")} *</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setLightFile(e.target.files ? e.target.files[0] : null)
              }
            />
            {lightLogoUrl && (
              <LogoPreviewImg src={lightLogoUrl} alt="Light Logo" />
            )}
          </div>
          <div>
            <Label>{t("darkLogo", "Dark Logo")}</Label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setDarkFile(e.target.files ? e.target.files[0] : null)
              }
            />
            {darkLogoUrl && (
              <LogoPreviewImg src={darkLogoUrl} alt="Dark Logo" />
            )}
          </div>
        </LogoInputGroup>
      ) : (
        <ValueInputSection
          keyValue={key}
          value={value}
          setValue={setValue}
          availableThemes={availableThemes}
          onAvailableThemesUpdate={onAvailableThemesUpdate}
          dispatch={dispatch}
          isMultiLang={isMultiLang}
          isNestedObject={isNestedObject}
          isImage={isImage}
          file={file}
          setFile={setFile}
          supportedLocales={supportedLocales}
        />
      )}

      <SaveButton type="submit">{t("save", "Save")}</SaveButton>
    </FormWrapper>
  );
}

// --- Styled Components ---
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.md};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
`;

const SaveButton = styled.button`
  margin-top: ${({ theme }) => theme.spacings.md};
  padding: ${({ theme }) => theme.spacings.md};
  background: ${({ theme }) => theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.text};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.normal};
  &:hover {
    background: ${({ theme }) => theme.buttons.primary.backgroundHover};
  }
`;

const LogoInputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacings.md};
  > div {
    flex: 1 1 200px;
  }
  input {
    width: 100%;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacings.xs};
`;

const LogoPreviewImg = styled.img`
  margin-top: ${({ theme }) => theme.spacings.xs};
  max-width: 120px;
  max-height: 80px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  object-fit: contain;
`;
