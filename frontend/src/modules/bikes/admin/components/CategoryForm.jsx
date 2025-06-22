import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createBikeCategory,
  updateBikeCategory,
  clearCategoryMessages,
} from "@/modules/bikes/slices/bikeCategorySlice";
import { useTranslation } from "react-i18next";
import ImageUploadWithPreview from "@/shared/ImageUploadWithPreview";

// Burada kendi dil listenizi import edin veya doğrudan yazın
const SUPPORTED_LOCALES = ["tr", "en", "de"];

function initLabel(val = "") {
  return SUPPORTED_LOCALES.reduce((acc, lng) => ({ ...acc, [lng]: val }), {});
}

function fillAllLocales(obj = {}, fallback = "") {
  const first = Object.values(obj).find((v) => v && v.trim && v.trim());
  return SUPPORTED_LOCALES.reduce(
    (acc, lng) => ({
      ...acc,
      [lng]:
        obj && obj[lng] && obj[lng].trim && obj[lng].trim()
          ? obj[lng]
          : first || fallback,
    }),
    {}
  );
}

export default function BikeCategoryForm({ onClose, editingItem }) {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("bike");
  const { loading, error, successMessage } = useAppSelector(
    (state) => state.bikeCategory
  );

  const initialExistingImages = useMemo(
    () =>
      editingItem && editingItem.images
        ? editingItem.images.map((img) => img.url)
        : [],
    [editingItem]
  );

  const [name, setName] = useState(initLabel());
  const [description, setDescription] = useState(initLabel());
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
    setName(editingItem && editingItem.name ? editingItem.name : initLabel());
    setDescription(
      editingItem && editingItem.description
        ? editingItem.description
        : initLabel()
    );
    setSelectedFiles([]);
    setRemovedImages([]);
  }, [editingItem]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearCategoryMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const handleImagesChange = useCallback((files, removed) => {
    setSelectedFiles(files);
    setRemovedImages(removed);
  }, []);

  const handleChange = (field, lang, value) => {
    if (field === "name") setName((prev) => ({ ...prev, [lang]: value }));
    else setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledName = fillAllLocales(name, "New Category");
    const filledDesc = fillAllLocales(description, "");

    const formData = new FormData();
    formData.append("name", JSON.stringify(filledName));
    formData.append("description", JSON.stringify(filledDesc));
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    if (removedImages.length > 0) {
      formData.append("removedImages", JSON.stringify(removedImages));
    }

    try {
      if (editingItem && editingItem._id) {
        await dispatch(
          updateBikeCategory({ id: editingItem._id, data: formData })
        ).unwrap();
      } else {
        await dispatch(createBikeCategory(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error("❌ Category operation failed:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>
        {editingItem
          ? t("admin.editCategory", "Edit Category")
          : t("admin.newCategory", "New Category")}
      </h3>

      {SUPPORTED_LOCALES.map((lng) => (
        <div key={lng}>
          <label htmlFor={`name-${lng}`}>
            {t("admin.categories.name", "Category Name")} ({lng.toUpperCase()})
          </label>
          <input
            id={`name-${lng}`}
            type="text"
            value={name[lng] || ""}
            onChange={(e) => handleChange("name", lng, e.target.value)}
            placeholder={t(
              "admin.categories.add",
              `Category name (${lng.toUpperCase()})`
            )}
            required={lng === i18n.language || lng === "en"}
          />
          <label htmlFor={`desc-${lng}`}>
            {t("admin.optional_description", "Optional description")} (
            {lng.toUpperCase()})
          </label>
          <textarea
            id={`desc-${lng}`}
            value={description[lng] || ""}
            onChange={(e) => handleChange("description", lng, e.target.value)}
            placeholder={t(
              "admin.category_info",
              "What is this category about?"
            )}
          />
        </div>
      ))}

      <label>{t("admin.categories.image", "Images")}</label>
      <ImageUploadWithPreview
        max={5}
        defaultImages={initialExistingImages}
        onChange={handleImagesChange}
        folder="bikeCategory"
      />

      {error && <ErrorMessage>❌ {error}</ErrorMessage>}
      {successMessage && <SuccessMessage>✅ {successMessage}</SuccessMessage>}

      <Button type="submit" disabled={loading}>
        {loading
          ? t("admin.saving", "Saving...")
          : editingItem
          ? t("admin.update2", "Update")
          : t("admin.save", "Save")}
      </Button>
    </Form>
  );
}

// Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  input,
  textarea {
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const Button = styled.button`
  align-self: flex-end;
  padding: 0.5rem 1.25rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.9rem;
`;
