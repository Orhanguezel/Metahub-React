import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, resetAuthState } from "@/modules/users/slice/authSlice";
import { resetProfile } from "@/modules/users/slice/accountSlice";
import { useTranslation } from "react-i18next";
import { getProfileImageUrl } from "@/shared/getProfileImageUrl";

const AvatarMenu = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("navbar");
  const profile = useSelector((state) => state.account.profile);
  const isAuthenticated = !!profile;
  const profileImage = getProfileImageUrl(profile?.profileImage);
  const role = profile?.role;
  const isAdmin = role === "admin" || role === "superadmin";

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      return;
    }
    dispatch(resetAuthState());
    dispatch(resetProfile());
    window.location.replace("/login");
    setShowDropdown(false);
  };

  if (!isAuthenticated) {
    return (
      <AvatarAuthLinks>
        <AvatarLink href="/login">{t("login", "Login")}</AvatarLink>
        <AvatarLink href="/register">{t("register", "Register")}</AvatarLink>
      </AvatarAuthLinks>
    );
  }

  return (
    <AvatarWrapper>
      <AvatarImg
        src={profileImage}
        alt="profile"
        onClick={() => setShowDropdown((prev) => !prev)}
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={showDropdown}
      />
      {showDropdown && (
        <AvatarDropdown ref={dropdownRef} tabIndex={-1}>
          {isAdmin && (
            <DropdownItem as="a" href="/admin">
              {t("adminDashboard", "Admin Panel")}
            </DropdownItem>
          )}
          <DropdownItem as="a" href="/account">
            {t("account", "Account")}
          </DropdownItem>
          <DropdownItem as="button" onClick={handleLogout}>
            {t("logout", "Logout")}
          </DropdownItem>
        </AvatarDropdown>
      )}
    </AvatarWrapper>
  );
};

export default AvatarMenu;

// Styled Components (düzenlendi)
const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacings.md};
`;

const AvatarImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.cardBackground};
  cursor: pointer;
  transition: border 0.18s, box-shadow 0.17s;
  box-shadow: 0 1px 12px ${({ theme }) => theme.colors.primary}22;
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 2px 18px ${({ theme }) => theme.colors.primary}33;
    outline: none;
  }
`;

const AvatarDropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacings.sm} 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  min-width: 170px;
`;

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AvatarAuthLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.sm};
  align-items: center;
`;

const AvatarLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-decoration: none;
  transition: color 0.17s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
