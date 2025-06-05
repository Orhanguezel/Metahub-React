import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/modules/users/slice/accountSlice";
import { fetchAdminModules } from "@/modules/adminmodules/slice/adminModuleSlice";
import { ProtectedRoute } from "@/routes/protected.routes";
import {
  HeaderAdmin,
  FooterAdmin,
  Sidebar
} from "@/modules/shared";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.account);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!profile && !loading) {
      dispatch(fetchCurrentUser());
     dispatch(fetchAdminModules("radanor"));
    }
  }, [dispatch, profile, loading]);

  return (
    <ProtectedRoute role="admin">
      <LayoutWrapper>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainColumn>
          <HeaderAdmin onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
          <MainContent>
            <Outlet />
          </MainContent>
          <FooterAdmin />
        </MainColumn>
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export default AdminLayout;


// 🎨 Styled Components
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
  margin-left: 240px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
`;
