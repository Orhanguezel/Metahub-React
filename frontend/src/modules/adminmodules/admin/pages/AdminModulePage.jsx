import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAdminModule,
  fetchAdminModules,
  fetchTenantModules,
} from "@/modules/adminmodules/slices/adminModuleSlice";
import {
  rebuildAllModules,
  resetTenantModules,
  fetchModulesHealth,
  syncAllModules,
  cleanupModules,
  clearMaintenanceState,
} from "@/modules/adminmodules/slices/extraModulesSlice";
import {
  ModuleCard,
  CreateModuleModal,
  ConfirmDeleteModal,
  GlobalModuleDetailModal,
  TenantModuleDetailModal,
} from "@/modules/adminmodules";
import MessageBox from "@/shared/Message";
import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "@/utils/getCurrentLocale";
import { toast } from "react-toastify";

const TABS = [
  { key: "modules", label: "Modules" },
  { key: "maintenance", label: "Maintenance" },
];

export default function AdminModulePage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("adminModules");
  const lang = getCurrentLocale();

  // UI State
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [activeListType, setActiveListType] = useState("global"); // "global" | "tenant"
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Detay modal ayrımı için state ---
  // { module, type: "global" | "tenant" } veya null
  const [selectedDetail, setSelectedDetail] = useState(null);

  // Redux slices
  const selectedTenant = useAppSelector(
    (state) => state.tenants.selectedTenant
  );
  const {
    modules = [],
    tenantModules = [],
    loading,
    error,
    successMessage,
  } = useAppSelector((state) => state.adminModule);

  const {
    maintenanceLogs,
    healthStatus,
    maintenanceLoading,
    maintenanceError,
    lastAction,
  } = useAppSelector((state) => state.extraModules);

  // Çoklu dil helper
  const getTextByLocale = (obj) =>
    obj && typeof obj === "object"
      ? obj[lang] || obj.en || ""
      : typeof obj === "string"
      ? obj
      : "";

  // Tenant değişiminde fetch + state temizliği
  useEffect(() => {
    if (!selectedTenant) return;
    dispatch(clearMaintenanceState());
    dispatch(fetchAdminModules());
    dispatch(fetchTenantModules(selectedTenant));
    setSearch("");
    setActiveListType("global");
    setSelectedDetail(null);
  }, [dispatch, selectedTenant]);

  // Sadece CREATE/SİL sonrası fetch!
  useEffect(() => {
    if (
      successMessage &&
      activeTab === "modules" &&
      (successMessage.includes("created") || successMessage.includes("deleted"))
    ) {
      setSearch("");
      dispatch(fetchAdminModules());
      if (selectedTenant) dispatch(fetchTenantModules(selectedTenant));
    }
    // NOT: Toggle (update) sonrası fetch YOK!
  }, [successMessage, activeTab, dispatch, selectedTenant]);

  // Silme işlemi
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteAdminModule(deleteTarget)).unwrap();
      toast.success(t("deleteSuccess", "Module deleted"));
      // refetchLists();  // Gerek yok! Zaten yukarıdaki useEffect ile çözülecek.
    } catch (err) {
      toast.error(
        getTextByLocale(err?.data?.message) || t("deleteError", "Delete failed")
      );
    } finally {
      setDeleteTarget(null);
      setIsDeleting(false);
    }
  };

  // --- Filtrelenmiş modül listesi ---
  let filteredModules = [];
  if (activeListType === "global") {
    filteredModules = (modules || [])
      .filter((m) => {
        const labelText = (
          m.label?.[lang] ||
          m.label?.en ||
          m.name ||
          ""
        ).toLowerCase();
        const nameText = (m.name || "").toLowerCase();
        const searchText = search.toLowerCase();
        return labelText.includes(searchText) || nameText.includes(searchText);
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } else {
    filteredModules = (tenantModules || [])
      .filter((m) => {
        const moduleText = (m.module || "").toLowerCase();
        return moduleText.includes(search.toLowerCase());
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  return (
    <Container>
      <Header>
        <Title>{t("title", "Module Management")}</Title>
        <TabBar>
          {TABS.map((tab) => (
            <Tab
              key={tab.key}
              $active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {t(tab.label, tab.label)}
            </Tab>
          ))}
        </TabBar>
      </Header>

      {/* Tenant Info */}
      <TenantInfo>
        <b>{t("tenant", "Tenant")}:</b>{" "}
        {selectedTenant || (
          <span style={{ color: "gray" }}>
            {t("notSelected", "Not selected")}
          </span>
        )}
      </TenantInfo>

      {/* Modules TAB */}
      {activeTab === "modules" && (
        <>
          {/* Global/Tenant Toggle */}
          <ToggleBar>
            <ToggleBtn
              $active={activeListType === "global"}
              onClick={() => setActiveListType("global")}
            >
              {t("globalModules", "Global Modules")}
            </ToggleBtn>
            <ToggleBtn
              $active={activeListType === "tenant"}
              onClick={() => setActiveListType("tenant")}
            >
              {t("tenantModules", "Tenant Modules")}
            </ToggleBtn>
          </ToggleBar>

          <ButtonGroup>
            {activeListType === "global" && (
              <AddButton onClick={() => setCreateModalOpen(true)}>
                ➕ {t("createNew", "Add New Module")}
              </AddButton>
            )}
            <SearchInput
              type="text"
              placeholder={t("search", "Search modules...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </ButtonGroup>

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
                  key={mod.name || mod.module}
                  module={mod}
                  type={activeListType}
                  search={search}
                  onShowDetail={(module, type) =>
                    setSelectedDetail({ module, type })
                  }
                  onDelete={
                    activeListType === "global"
                      ? (name) => setDeleteTarget(name)
                      : undefined
                  }
                  // Toggle işlemi artık optimistic, fetch yok!
                  // onAfterAction={refetchLists} // GEREKSİZ!
                />
              ))
            ) : (
              <EmptyResult>
                {t("noModulesFound", "No modules found.")}
              </EmptyResult>
            )}
          </Grid>

          {/* --- Ayrıştırılmış detail modalları --- */}
          {selectedDetail &&
            (selectedDetail.type === "global" ? (
              <GlobalModuleDetailModal
                module={selectedDetail.module}
                onClose={() => setSelectedDetail(null)}
                // onAfterAction={refetchLists}
              />
            ) : (
              <TenantModuleDetailModal
                module={selectedDetail.module}
                onClose={() => setSelectedDetail(null)}
                // onAfterAction={refetchLists}
              />
            ))}

          {isCreateModalOpen && activeListType === "global" && (
            <CreateModuleModal
              onClose={() => setCreateModalOpen(false)}
              isGlobal
              // onAfterAction={refetchLists}
            />
          )}

          {deleteTarget && (
            <ConfirmDeleteModal
              moduleName={deleteTarget}
              onCancel={() => setDeleteTarget(null)}
              onConfirm={confirmDelete}
              loading={isDeleting}
            />
          )}
        </>
      )}

      {/* Maintenance TAB */}
      {activeTab === "maintenance" && (
        <MaintenancePanel>
          <h3>{t("maintenance", "Maintenance & Batch Actions")}</h3>
          <ButtonRow>
            <MaintButton
              disabled={maintenanceLoading}
              onClick={() => dispatch(rebuildAllModules())}
            >
              {t("rebuildAll", "Rebuild Module Meta")}
            </MaintButton>
            <MaintButton
              disabled={maintenanceLoading}
              onClick={() => dispatch(resetTenantModules(selectedTenant))}
            >
              {t("resetTenantModules", "Reset Tenant Modules")}
            </MaintButton>
            <MaintButton
              disabled={maintenanceLoading}
              onClick={() => dispatch(fetchModulesHealth())}
            >
              {t("healthCheck", "Health Check")}
            </MaintButton>
            <MaintButton
              disabled={maintenanceLoading}
              onClick={() => dispatch(syncAllModules())}
            >
              {t("syncAll", "Sync All")}
            </MaintButton>
            <MaintButton
              disabled={maintenanceLoading}
              onClick={() => dispatch(cleanupModules())}
            >
              {t("cleanup", "Cleanup Unused")}
            </MaintButton>
          </ButtonRow>
          {maintenanceError && (
            <MessageBox $error>{maintenanceError}</MessageBox>
          )}
          {maintenanceLoading && (
            <MessageBox>{t("loading", "Loading...")}</MessageBox>
          )}
          {lastAction && (
            <small>
              {t("lastAction", "Last action")}: {lastAction}
            </small>
          )}
          {maintenanceLogs && maintenanceLogs.length > 0 && (
            <LogBox>
              <b>{t("logs", "Logs / Results")}:</b>
              <pre>{JSON.stringify(maintenanceLogs, null, 2)}</pre>
            </LogBox>
          )}
          {healthStatus && (
            <LogBox>
              <b>{t("healthStatus", "Health Status")}:</b>
              <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
            </LogBox>
          )}
        </MaintenancePanel>
      )}
    </Container>
  );
}

// --- Styled Components (değişmedi) ---
const Container = styled.div`
  padding: ${({ theme }) => theme.spacings.lg};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.sm};
`;
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
const TabBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.md};
  margin-top: ${({ theme }) => theme.spacings.sm};
`;
const Tab = styled.button`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.text)};
  padding: 7px 18px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  font-weight: 500;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? "0 2px 8px #ddd" : "none")};
  transition: background 0.2s;
`;

const TenantInfo = styled.div`
  margin: 18px 0 10px 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ToggleBar = styled.div`
  display: flex;
  gap: 0.8em;
  margin-bottom: ${({ theme }) => theme.spacings.md};
`;

const ToggleBtn = styled.button`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.backgroundSecondary};
  color: ${({ $active, theme }) => ($active ? "#fff" : theme.colors.text)};
  padding: 6px 22px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 500;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? "0 2px 8px #ddd" : "none")};
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.md};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacings.md};
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
  padding: ${({ theme }) => theme.spacings.sm};
  width: 240px;
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

const MaintenancePanel = styled.div`
  margin-top: ${({ theme }) => theme.spacings.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacings.lg};
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacings.sm};
  margin-bottom: ${({ theme }) => theme.spacings.md};
`;

const MaintButton = styled.button`
  background: ${({ theme }) => theme.buttons.secondary.background};
  color: ${({ theme }) => theme.buttons.secondary.text};
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.md};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: background ${({ theme }) => theme.transition.fast};
  &:hover {
    background: ${({ theme }) => theme.buttons.secondary.backgroundHover};
  }
`;

const LogBox = styled.div`
  background: #fafbfc;
  border-radius: 7px;
  padding: 16px;
  margin-top: 18px;
  font-size: 15px;
  color: #333;
  overflow-x: auto;
  border: 1px solid #eee;
`;
