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
  fetchTenantModules,
} from "@/modules/adminmodules/slices/adminModuleSlice";
import {
  fetchTenants,
  setSelectedTenant,
} from "@/modules/tenants/slice/tenantSlice";

const SIDEBAR_WIDTH = 240;

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const {
    tenants = [],
    selectedTenant, // burada artık ID veya slug olabilir
    loading: tenantsLoading,
  } = useAppSelector((state) => state.tenants);

  // Seçili tenant objesi (ID'den bul)
  const selectedTenantObj =
    tenants.find(
      (t) => t._id === selectedTenant || t.slug === selectedTenant
    ) || tenants[0];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 1️⃣ Tüm tenantları çek (mount ile)
  useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  // 2️⃣ İlk tenant otomatik seçimi ve localStorage desteği
  useEffect(() => {
    if (!selectedTenant && tenants.length > 0 && !tenantsLoading) {
      const savedTenant = localStorage.getItem("selectedTenant");
      const validSavedTenant = tenants.find(
        (t) => t._id === savedTenant || t.slug === savedTenant
      );
      if (validSavedTenant) {
        dispatch(setSelectedTenant(validSavedTenant._id)); // ID ile çalışıyoruz
      } else {
        dispatch(setSelectedTenant(tenants[0]._id));
        localStorage.setItem("selectedTenant", tenants[0]._id);
      }
    }
  }, [selectedTenant, tenants, tenantsLoading, dispatch]);

  // 3️⃣ Tenant değişince modül ve şirket bilgilerini fetch et
  useEffect(() => {
    if (selectedTenantObj) {
      dispatch(fetchTenantModules(selectedTenantObj._id));
      dispatch(fetchAdminModules());
      dispatch(fetchCompanyInfo(selectedTenantObj._id));
      localStorage.setItem("selectedTenant", selectedTenantObj._id);
    }
  }, [dispatch, selectedTenantObj]);

  return (
    <ThemeProviderWrapper>
      <LayoutWrapper>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          tenant={selectedTenantObj} // Tenant bilgisini child’lara props olarak iletebilirsin
        />
        <MainColumn>
          <HeaderAdmin
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            tenant={selectedTenantObj}
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
