import React, { useEffect, useState } from "react";
import { ThemeProviderWrapper } from "@/contexts/ThemeProviderWrapper.jsx";
import HeaderAdmin from "@/modules/shared/admin/pages/HeaderAdmin";
import Sidebar from "@/modules/shared/admin/pages/Sidebar";
import FooterAdmin from "@/modules/shared/admin/pages/FooterAdmin";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styled from "styled-components";
import { fetchCompanyInfo } from "@/modules/company/slice/companySlice";
import {
  fetchAdminModules,
  fetchEnabledModules,
} from "@/modules/adminmodules/slice/adminModuleSlice";
import {
  fetchTenants,
  setSelectedTenant,
} from "@/modules/tenants/slice/tenantSlice";

const SIDEBAR_WIDTH = 240;

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const {
    tenants,
    selectedTenant,
    loading: tenantsLoading,
  } = useAppSelector((state) => state.tenants);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Tenant listesi ilk yüklemede çekilir
  useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  // İlk tenant otomatik seçimi (veya localStorage’dan okunması)
  useEffect(() => {
    if (!selectedTenant && tenants?.length > 0 && !tenantsLoading) {
      // LocalStorage kontrolü: refresh sonrası aynı tenant ile devam et
      const savedTenant = localStorage.getItem("selectedTenant");
      const validSavedTenant = tenants.find((t) => t._id === savedTenant);
      if (validSavedTenant) {
        dispatch(setSelectedTenant(validSavedTenant._id));
      } else {
        // Liste boş değilse ilk tenantı seç
        dispatch(setSelectedTenant(tenants[0]._id));
        localStorage.setItem("selectedTenant", tenants[0]._id);
      }
    }
  }, [selectedTenant, tenants, tenantsLoading, dispatch]);

  // Tenant değişince modül ve şirket fetch (veya selectedTenant ilk set edilince)
  useEffect(() => {
    if (selectedTenant) {
      dispatch(fetchEnabledModules({ tenant: selectedTenant }));
      dispatch(fetchAdminModules({ tenant: selectedTenant }));
      dispatch(fetchCompanyInfo());
      localStorage.setItem("selectedTenant", selectedTenant);
    }
  }, [dispatch, selectedTenant]);

  return (
    <ThemeProviderWrapper>
      <LayoutWrapper>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainColumn>
          <HeaderAdmin
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
          <MainContent>
            <Outlet />
          </MainContent>
          <FooterAdmin />
        </MainColumn>
      </LayoutWrapper>
    </ThemeProviderWrapper>
  );
};

export default AdminLayout;

// 🎨 Styled Components (aynen kullanılabilir)
const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

const MainColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: ${SIDEBAR_WIDTH}px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacings.lg};
  background: ${({ theme }) => theme.colors.background};
`;
