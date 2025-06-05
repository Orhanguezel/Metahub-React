import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../../store/hooks";
import {
  fetchRadonarCategories,
  clearCategoryMessages,
} from "../../slices/bikeSlice";
import { useTranslation } from "react-i18next";
import ImageUploadWithPreview from "../../../../shared/ImageUploadWithPreview";

const LANGUAGES = ["tr", "en", "de"];

export default function BikeFormModal({
  isOpen,
  onClose,
  editingItem,
  onSubmit,
  categories,
}) {
  const { t, i18n } = useTranslation("product");
  const currentLang = ["tr", "en", "de"].includes(i18n.language)
    ? i18n.language
    : "en";

  const dispatch = useAppDispatch();

  const [name, setName] = useState({ tr: "", en: "", de: "" });
  const [description, setDescription] = useState({ tr: "", en: "", de: "" });
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    dispatch(fetchRadonarCategories());
    return () => {
      dispatch(clearCategoryMessages());
    };
  }, [dispatch]);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || { tr: "", en: "", de: "" });
      setDescription(editingItem.description || { tr: "", en: "", de: "" });
      setBrand(editingItem.brand || "");
      setTags(editingItem.tags?.join(", ") || "");
      setPrice(editingItem.price?.toString() || "");
      setStock(editingItem.stock?.toString() || "");
      setCategory(
        typeof editingItem.category === "string"
          ? editingItem.category
          : editingItem.category?._id || ""
      );
      setExistingImages(editingItem.images?.map((img) => img.url) || []);
      setSelectedFiles([]);
      setRemovedImages([]);
    } else {
      setName({ tr: "", en: "", de: "" });
      setDescription({ tr: "", en: "", de: "" });
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

  const handleImagesChange = useCallback((files, removed, current) => {
    setSelectedFiles(files);
    setRemovedImages(removed);
    setExistingImages(current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", JSON.stringify(name));
    formData.append("description", JSON.stringify(description));
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

    await onSubmit(formData, editingItem?._id);
  };

  if (!isOpen) return null;

  return (
    <FormWrapper>
      <h2>
        {editingItem
          ? t("admin.product.edit", "Edit Product")
          : t("admin.product.create", "Add New Product")}
      </h2>
      <form onSubmit={handleSubmit}>
        {LANGUAGES.map((lng) => (
          <div key={lng}>
            <label htmlFor={`name-${lng}`}>
              {t("admin.product.name", "Product Name")} ({lng.toUpperCase()})
            </label>
            <input
              id={`name-${lng}`}
              type="text"
              value={name[lng]}
              onChange={(e) => setName({ ...name, [lng]: e.target.value })}
              required
            />

            <label htmlFor={`desc-${lng}`}>
              {t("admin.product.description", "Description")} (
              {lng.toUpperCase()})
            </label>
            <textarea
              id={`desc-${lng}`}
              value={description[lng]}
              onChange={(e) =>
                setDescription({ ...description, [lng]: e.target.value })
              }
              required
            />
          </div>
        ))}

        <label htmlFor="brand">{t("admin.product.brand", "Brand")}</label>
        <input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <label htmlFor="price">{t("admin.product.price", "Price")}</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="stock">{t("admin.product.stock", "Stock")}</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <label htmlFor="tags">{t("admin.product.tags", "Tags")}</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="bike, offroad, carbon"
        />

        <label>{t("admin.product.image", "Images")}</label>
        <ImageUploadWithPreview
          max={5}
          defaultImages={existingImages}
          onChange={handleImagesChange}
          folder="product"
        />

        <label htmlFor="category">
          {t("admin.product.category", "Category")}
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            {t("admin.product.select_category", "Select category")}
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name[currentLang]} ({cat.slug})
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
const FormWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.cardBackground};
  border: ${({ theme }) => theme.borders.thin};
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.form};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  label {
    display: block;
    margin-top: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textAlt};
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
    border: ${({ theme }) => theme.borders.thin};
    border-color: ${({ theme }) => theme.colors.borderInput};
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.md};
    transition: border-color ${({ theme }) => theme.transition.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.inputBorderFocus};
      box-shadow: ${({ theme }) => theme.colors.shadowHighlight};
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  select {
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, ${({ theme }) =>
      theme.colors.textMuted} 50%), linear-gradient(135deg, ${({ theme }) =>
      theme.colors.textMuted} 50%, transparent 50%);
    background-position: calc(100% - 16px) calc(1em + 2px),
      calc(100% - 12px) calc(1em + 2px);
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
  }
`;

const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  button {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border: none;
    border-radius: ${({ theme }) => theme.radii.sm};
    cursor: pointer;
    transition: opacity ${({ theme }) => theme.transition.fast};

    &:first-child {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.buttonText};
      box-shadow: ${({ theme }) => theme.shadows.button};
    }

    &:last-child {
      background: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      opacity: ${({ theme }) => theme.opacity.hover};
    }
  }
`;
