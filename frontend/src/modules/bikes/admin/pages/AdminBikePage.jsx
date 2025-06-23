import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBikesAdmin,
  createBike,
  updateBike,
  deleteBike,
  togglePublishBike,
  clearBikeMessages,
} from "@/modules/bikes/slices/bikeSlice";
import {
  fetchBikeCategories,
  clearCategoryMessages,
} from "@/modules/bikes/slices/bikeCategorySlice";
import Modal from "@/shared/Modal";
import {
  BikeFormModal,
  CategoryForm,
  CategoryListPage,
  BikeList,
  BikeTabs,
} from "@/modules/bikes";
import { useTranslation } from "react-i18next";

// Sadece i18n diliyle çalışıyoruz, ek locale fonksiyonu gerekmez
export default function AdminBikePage() {
  // Tab ve Modal State
  const [activeTab, setActiveTab] = useState("list");
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  // Redux
  const dispatch = useAppDispatch();
  const { bikes, loading, error } = useAppSelector((state) => state.bikes);
  const { categories } = useAppSelector((state) => state.bikeCategory);
  const { t, i18n } = useTranslation("bikes");
  const lang = i18n.language || "en";

  // Data Fetch
  useEffect(() => {
    if (!bikes || bikes.length === 0) {
      dispatch(fetchBikesAdmin());
    }
    if (!categories || categories.length === 0) {
      dispatch(fetchBikeCategories());
    }
    return () => {
      dispatch(clearBikeMessages());
      dispatch(clearCategoryMessages());
    };
  }, [dispatch, lang, bikes, categories]);

  // Create/Update
  const handleCreateOrUpdate = async (data, id) => {
    if (id) {
      await dispatch(updateBike({ id, data }));
    } else {
      await dispatch(createBike(data));
    }
    setEditingItem(null);
    setActiveTab("list");
  };

  // Delete
  const handleDelete = async (id) => {
    if (
      window.confirm(
        t(
          "admin.confirm.delete_bike",
          "Are you sure you want to delete this product?"
        )
      )
    ) {
      await dispatch(deleteBike(id));
    }
  };

  // Toggle Publish
  const handleTogglePublish = async (id, isPublished) => {
    await dispatch(togglePublishBike({ id, isPublished: !isPublished }));
  };

  // Edit Bike
  const handleEditBike = (item) => {
    setEditingItem(item);
    setActiveTab("create");
  };

  // Category Add/Edit
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
            bikes={bikes}
            lang={lang}
            loading={loading}
            error={error}
            onEdit={handleEditBike}
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
              categories={categories}
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

// Styled Components
const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: ${({ theme }) => theme.layout.sectionSpacing || "2rem"}
    ${({ theme }) => theme.spacings.md || "1.5rem"};
`;

const TabContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground || "#fff"};
  border: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  padding: ${({ theme }) => theme.spacings.lg || "2rem"};
  border-radius: ${({ theme }) => theme.radii.md || "12px"};
`;
