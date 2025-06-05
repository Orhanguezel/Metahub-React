import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/modules/users/slice/accountSlice";
import styled from "styled-components";
import { ProtectedRoute } from "@/routes/protected.routes";
import {
  FooterPublic,
  Navbar
} from "@/modules/shared";

const UserLayout = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, profile]);

  return (
    <ProtectedRoute>
      <Container>
        <Navbar animate={true} gsapInstance={window.gsap} />
        <MainContent>
          <Outlet />
        </MainContent>
        <FooterPublic />
      </Container>
    </ProtectedRoute>
  );
};

export default UserLayout;


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  ${({ theme }) => theme.media.small} {
  }
`;
