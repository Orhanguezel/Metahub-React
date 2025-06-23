import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ImageUploadWithPreview from "@/shared/ImageUploadWithPreview";

import { SUPPORTED_LOCALES } from "@/i18n";

const LANGUAGES = SUPPORTED_LOCALES;

export default function BikeFormModal({
  isOpen,
  onClose,
  editingItem,
  onSubmit,
  categories,
}) {
  const { t, i18n } = useTranslation("bike");
  const currentLang = SUPPORTED_LOCALES.includes(i18n.language)
    ? i18n.language
    : "en";

  // Çok dilli state
  const emptyLabel = SUPPORTED_LOCALES.reduce(
    (acc, lang) => ({ ...acc, [lang]: "" }),
    {}
  );
  const [name, setName] = useState(emptyLabel);
  const [description, setDescription] = useState(emptyLabel);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  // Görsel state
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Düzenleme modunda varsayılan değerler
  useEffect(() => {
    if (editingItem) {
      setName({ ...emptyLabel, ...editingItem.name });
      setDescription({ ...emptyLabel, ...editingItem.description });
      setBrand(editingItem.brand || "");
      setTags(
        Array.isArray(editingItem.tags) ? editingItem.tags.join(", ") : ""
      );
      setPrice(editingItem.price ? editingItem.price.toString() : "");
      setStock(editingItem.stock ? editingItem.stock.toString() : "");
      setCategory(
        typeof editingItem.category === "string"
          ? editingItem.category
          : (editingItem.category && editingItem.category._id) || ""
      );
      setExistingImages((editingItem.images || []).map((img) => img.url));
      setSelectedFiles([]);
      setRemovedImages([]);
    } else {
      setName(emptyLabel);
      setDescription(emptyLabel);
      setBrand("");
      setTags("");
      setPrice("");
      setStock("");
      setCategory("");
      setExistingImages([]);
      setSelectedFiles([]);
      setRemovedImages([]);
    }
  }, [editingItem, isOpen]);

  // Çoklu görsel bileşeninden değişiklikleri al
  const handleImagesChange = useCallback((files, removed, current) => {
    setSelectedFiles(files);
    setRemovedImages(removed);
    setExistingImages(current);
  }, []);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Eğer sadece bir dilde veri girilmişse diğer dillere kopyala
    const filledName = { ...name };
    const firstNameValue = Object.values(name).find((v) => v && v.trim());
    if (firstNameValue) {
      SUPPORTED_LOCALES.forEach((lng) => {
        if (!filledName[lng]) filledName[lng] = firstNameValue;
      });
    }

    const filledDesc = { ...description };
    const firstDescValue = Object.values(description).find(
      (v) => v && v.trim()
    );
    if (firstDescValue) {
      SUPPORTED_LOCALES.forEach((lng) => {
        if (!filledDesc[lng]) filledDesc[lng] = firstDescValue;
      });
    }

    const formData = new FormData();
    formData.append("name", JSON.stringify(filledName));
    formData.append("description", JSON.stringify(filledDesc));
    formData.append("brand", brand.trim());
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append(
      "tags",
      JSON.stringify(
        tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      )
    );
    formData.append("category", category);
    formData.append("isPublished", "true");

    for (const file of selectedFiles) {
      formData.append("images", file);
    }
    if (removedImages.length > 0) {
      formData.append("removedImages", JSON.stringify(removedImages));
    }

    await onSubmit(formData, editingItem && editingItem._id);
  };

  if (!isOpen) return null;

  return (
    <FormWrapper>
      <h2>
        {editingItem
          ? t("admin.bike.edit", "Edit Bike")
          : t("admin.bike.create", "Add New Bike")}
      </h2>
      <form onSubmit={handleSubmit}>
        {LANGUAGES.map((lng) => (
          <div key={lng}>
            <label htmlFor={`name-${lng}`}>
              {t("admin.bike.name", "Bike Name")} ({lng.toUpperCase()})
            </label>
            <input
              id={`name-${lng}`}
              type="text"
              value={name[lng]}
              onChange={(e) => setName({ ...name, [lng]: e.target.value })}
              required={lng === currentLang}
            />

            <label htmlFor={`desc-${lng}`}>
              {t("admin.bike.description", "Description")} ({lng.toUpperCase()})
            </label>
            <textarea
              id={`desc-${lng}`}
              value={description[lng]}
              onChange={(e) =>
                setDescription({ ...description, [lng]: e.target.value })
              }
              required={lng === currentLang}
            />
          </div>
        ))}

        <label htmlFor="brand">{t("admin.bike.brand", "Brand")}</label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <label htmlFor="price">{t("admin.bike.price", "Price")}</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="stock">{t("admin.bike.stock", "Stock")}</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <label htmlFor="tags">{t("admin.bike.tags", "Tags")}</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="bike, offroad, carbon"
        />

        <label>{t("admin.bike.image", "Images")}</label>
        <ImageUploadWithPreview
          max={5}
          defaultImages={existingImages}
          onChange={handleImagesChange}
          folder="bike"
        />

        <label htmlFor="category">{t("admin.bike.category", "Category")}</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            {t("admin.bike.select_category", "Select category")}
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {(cat.name && cat.name[currentLang]) || ""} ({cat.slug})
            </option>
          ))}
        </select>

        <ButtonGroup>
          <button type="submit">
            {editingItem
              ? t("admin.update", "Update")
              : t("admin.create", "Create")}
          </button>
          <button type="button" onClick={onClose}>
            {t("admin.cancel", "Cancel")}
          </button>
        </ButtonGroup>
      </form>
    </FormWrapper>
  );
}

// --- Styled Components ---
const FormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};

  h2 {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    font-weight: 600;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-child {
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }

    &:last-child {
      background: ${({ theme }) => theme.colors.danger};
      color: #fff;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;
