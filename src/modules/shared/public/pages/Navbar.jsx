import React from "react";
import styled from "styled-components";

import { useTranslation } from "react-i18next";

import {
  AvatarMenu,
  SearchBar,
  LanguageSelector,
  Logo,
} from "@/modules/shared";

const Navbar = () => {
  const { t } = useTranslation("navbar");

  return (
    <NavStyled>
      <LogoContainer>
        <Logo width={120} height={120} themeMode="dark" />
      </LogoContainer>
      <NavLinks className="nav-links">
        <a href="/bikes">{t("bikes", "Bikes")}</a>
        <a href="/home">{t("home", "Home")}</a>
      </NavLinks>
      <NavActions className="nav-actions">
        <LanguageSelector />
        <SearchBar />
        <CartButton>
          <a href="/cart" aria-label={t("cart", "Shopping Cart")}>
            <i className="fas fa-shopping-cart"></i>
          </a>
        </CartButton>
        <AvatarMenu />
      </NavActions>
    </NavStyled>
  );
};

export default Navbar;

const NavStyled = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.md}
    ${({ theme }) => theme.spacings.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  transform: translateY(-120%);
  opacity: 0;
  visibility: hidden;
  will-change: transform, opacity;
  transition: all 0.4s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletS}) {
    .nav-links {
      display: none;
    }
    .nav-actions {
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.xl};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    padding: 0.5em 0.6em;
    transition: color 0.3s ease;
    white-space: nowrap;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.md};
`;

const CartButton = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }

    i {
      font-size: 1.1rem;
    }
  }
`;
