import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchEnabledModules,
  fetchModuleDetail,
  clearSelectedModule,
  deleteAdminModule,
  fetchTenantModules,
} from "@/modules/adminmodules/slice/adminModuleSlice";
import {
  ModuleCard,
  ModuleDetailModal,
  CreateModuleModal,
  ConfirmDeleteModal,
} from "@/modules/adminmodules";
import MessageBox from "@/shared/Message";
import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import { toast } from "react-toastify";

export default function AdminModulePage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("adminModules");
  const lang = getCurrentLocale();

  // Tenant bilgisi
  const selectedTenant = useAppSelector(
    (state) => state.tenants.selectedTenant
  );

  // Aktif modüller (tenant'a göre)
  const {
    moduleSettings = [],
    selectedModule,
    loading,
    error,
    successMessage,
  } = useAppSelector((state) => state.adminModule);

  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const getTextByLocale = (obj) => {
    if (!obj) return undefined;
    return obj?.[lang] || obj?.en || (typeof obj === "string" ? obj : "");
  };

  // Tenant değiştikçe modülleri getir
  useEffect(() => {
    if (selectedTenant) {
      dispatch(fetchTenantModules(selectedTenant));
    }
  }, [dispatch, selectedTenant]);

  // Silme işlemi
  // const handleDelete = (name) => setDeleteTarget(name);

  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        await dispatch(deleteAdminModule(deleteTarget)).unwrap();
        dispatch(fetchEnabledModules({ tenant: selectedTenant }));
      } catch (err) {
        toast.error(
          getTextByLocale(err?.data?.message) ||
            t("deleteError", "Delete failed")
        );
      } finally {
        setDeleteTarget(null);
      }
    }
  };

  // Search logic (label + name)
  const filteredModules = Array.isArray(moduleSettings)
    ? moduleSettings
        .filter((m) => {
          const labelText = (m.label?.[lang] || "").toLowerCase();
          const nameText = (m.name || "").toLowerCase();
          const searchText = search.toLowerCase();
          return (
            labelText.includes(searchText) || nameText.includes(searchText)
          );
        })
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  return (
    <Container>
      <Header>
        <Title>{t("title", "Module Management")}</Title>
        <ButtonGroup>
          <AddButton onClick={() => setCreateModalOpen(true)}>
            ➕ {t("createNew", "Add New Module")}
          </AddButton>
        </ButtonGroup>
      </Header>

      <SearchInput
        type="text"
        placeholder={t("search", "Search modules...")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {getTextByLocale(error) && (
        <MessageBox $error>{getTextByLocale(error)}</MessageBox>
      )}
      {getTextByLocale(successMessage) && (
        <MessageBox $success>{getTextByLocale(successMessage)}</MessageBox>
      )}
      {loading && <MessageBox>{t("loading", "Loading...")}</MessageBox>}

      <Grid>
        {filteredModules.length > 0 ? (
          filteredModules.map((mod) => (
            <ModuleCard
              key={mod.name}
              module={mod}
              search={search}
              onClick={() => dispatch(fetchModuleDetail(mod.name))}
            />
          ))
        ) : (
          <EmptyResult>{t("noModulesFound", "No modules found.")}</EmptyResult>
        )}
      </Grid>

      {selectedModule && (
        <ModuleDetailModal
          module={selectedModule}
          onClose={() => dispatch(clearSelectedModule())}
        />
      )}

      {isCreateModalOpen && (
        <CreateModuleModal onClose={() => setCreateModalOpen(false)} />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          moduleName={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </Container>
  );
}

// --- Styled Components (Aynı kalabilir) ---
const Container = styled.div`
  padding: ${({ theme }) => theme.spacings.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacings.md};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.md};
  align-items: center;
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.text};
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.md};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.buttons.primary.backgroundHover};
  }
`;

const SearchInput = styled.input`
  margin-top: ${({ theme }) => theme.spacings.md};
  padding: ${({ theme }) => theme.spacings.sm};
  width: 100%;
  max-width: 400px;
  border: ${({ theme }) => theme.borders.thin}
    ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ theme }) => theme.inputs.background};
  color: ${({ theme }) => theme.inputs.text};
`;

const Grid = styled.div`
  margin-top: ${({ theme }) => theme.spacings.lg};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacings.lg};
`;

const EmptyResult = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacings.xl} 0;
`;
