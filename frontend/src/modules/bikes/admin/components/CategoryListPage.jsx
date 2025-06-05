import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createCategory,
  updateCategory,
  clearCategoryMessages,
} from "../../slices/bikeSlice";
import { useTranslation } from "react-i18next";

export default function CategoryForm({ onClose, editingItem }) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("admin");
  const { loading, error, successMessage } = useAppSelector(
    (state) => state.bikes
  );

  const [name, setName] = useState({ tr: "", en: "", de: "" });
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || { tr: "", en: "", de: "" });
      setDescription(editingItem.description || "");
    } else {
      setName({ tr: "", en: "", de: "" });
      setDescription("");
    }
  }, [editingItem]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearCategoryMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const handleChange = (lang, value) => {
    setName((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem && editingItem._id) {
        await dispatch(
          updateCategory({ id: editingItem._id, data: { name, description } })
        ).unwrap();
      } else {
        await dispatch(createCategory({ name, description })).unwrap();
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
          ? t("editCategory", "Edit Category")
          : t("newCategory", "New Category")}
      </h3>

      {["tr", "en", "de"].map((lng) => (
        <div key={lng}>
          <label htmlFor={`name-${lng}`}>{lng.toUpperCase()}:</label>
          <input
            id={`name-${lng}`}
            type="text"
            value={name[lng]}
            onChange={(e) => handleChange(lng, e.target.value)}
            placeholder={`Category name (${lng.toUpperCase()})`}
            required
          />
        </div>
      ))}

      <label htmlFor="desc">
        {t("optional_description", "Optional description")}
      </label>
      <textarea
        id="desc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t("category_info", "What is this category about?")}
      />

      {error && <ErrorMessage>❌ {error}</ErrorMessage>}
      {successMessage && <SuccessMessage>✅ {successMessage}</SuccessMessage>}

      <Button type="submit" disabled={loading}>
        {loading
          ? t("saving", "Saving...")
          : editingItem
          ? t("update", "Update")
          : t("save", "Save")}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  input,
  textarea {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  label {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: ${({ theme }) => theme.spacing.sm};
    margin-bottom: 0.25rem;
  }
`;

const Button = styled.button`
  align-self: flex-end;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;
