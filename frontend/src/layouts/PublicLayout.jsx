import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/modules/users/slice/accountSlice";
import { Navbar, FooterPublic } from "@/modules/shared";
import styled from "styled-components";
import { useGsap } from "@/contexts/GsapContext";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.account);
  const gsapInstance = useGsap();

  useEffect(() => {
    if (!profile) dispatch(fetchCurrentUser());
  }, [profile, dispatch]);

  return (
    <Container>
      <StickyNavbar>
        <Navbar animate={true} gsapInstance={gsapInstance} />
      </StickyNavbar>

      <MainContent>
        <Outlet />
      </MainContent>

      <FooterPublic />
    </Container>
  );
};

export default PublicLayout;



const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const StickyNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  background: ${({ theme }) => theme.colors.background}; // sabit navbar rengi
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  padding-top: 150px; // navbar yüksekliğine göre ayarla

  ${({ theme }) => theme.media.small} {
    padding: ${({ theme }) => theme.spacing.md};
    padding-top: 80px; // mobil navbar yüksekliği
  }
`;


