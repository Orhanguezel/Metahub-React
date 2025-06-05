import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublish,
  clearBikeError,
  fetchCategories,
  clearCategoryMessages,
} from "@/modules/bikes/slices/bikeSlice";
import Modal from "@/shared/Modal";
import {
  BikeFormModal,
  CategoryForm,
  CategoryListPage,
  BikeList,
  BikeTabs,
} from "@/modules/bikes";
import { useTranslation } from "react-i18next";

export default function BikeAdminPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { bikes, loading, error, categories } = useAppSelector(
    (state) => state.bikes
  );
  const { i18n, t } = useTranslation("admin");

  const lang = ["tr", "en", "de"].includes(i18n.language)
    ? i18n.language
    : "en";

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchCategories());

    return () => {
      dispatch(clearBikeError());
      dispatch(clearCategoryMessages());
    };
  }, [dispatch, lang]);

  const handleCreateOrUpdate = async (formData, id) => {
    if (id) {
      await dispatch(updateProduct({ id, formData }));
    } else {
      await dispatch(createProduct(formData));
    }
    setActiveTab("list");
  };

  const handleDelete = async (id) => {
    const confirmMessage = t(
      "confirm.delete_product",
      "Are you sure you want to delete this product?"
    );
    if (confirm(confirmMessage)) {
      await dispatch(deleteProduct(id));
    }
  };

  const handleTogglePublish = async (id, current) => {
    await dispatch(togglePublish({ id, isPublished: !current }));
  };

  const handleEditProduct = (item) => {
    setEditingItem(item);
    setActiveTab("create");
  };

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryModalOpen(true);
  };

  return (
    <Wrapper>
      <BikeTabs activeTab={activeTab} onChange={setActiveTab} />

      <TabContent>
        {activeTab === "list" && (
          <BikeList
            product={bikes}
            lang={lang}
            loading={loading}
            error={error}
            onEdit={handleEditProduct}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
          />
        )}

        {activeTab === "create" && (
          <BikeFormModal
            isOpen={true}
            onClose={() => {
              setEditingItem(null);
              setActiveTab("list");
            }}
            editingItem={editingItem}
            onSubmit={handleCreateOrUpdate}
            categories={categories}
          />
        )}

        {activeTab === "categories" && (
          <>
            <CategoryListPage
              onAdd={handleOpenAddCategory}
              onEdit={handleEditCategory}
            />
            <Modal
              isOpen={categoryModalOpen}
              onClose={() => setCategoryModalOpen(false)}
            >
              <CategoryForm
                onClose={() => setCategoryModalOpen(false)}
                editingItem={editingCategory}
              />
            </Modal>
          </>
        )}
      </TabContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const TabContent = styled.div`
  background: ${({ theme }) => theme.colors.sectionBackground};
  border: ${({ theme }) => theme.borders.thin};
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
