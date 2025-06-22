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

  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null); // En dış wrapper!

  // --- Tıklama ile dışarıyı kontrol et
  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // ESC ile dropdown kapama (isteğe bağlı)
  useEffect(() => {
    if (!showDropdown) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") setShowDropdown(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
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
    <AvatarWrapper ref={wrapperRef}>
      <AvatarImg
        src={profileImage}
        alt="profile"
        onClick={() => setShowDropdown((prev) => !prev)}
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={showDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ")
            setShowDropdown((prev) => !prev);
        }}
      />
      {showDropdown && (
        <AvatarDropdown tabIndex={-1}>
          {role === "admin" || role === "superadmin" ? (
            <DropdownItem as="a" href="/admin">
              {t("adminDashboard", "Admin Panel")}
            </DropdownItem>
          ) : null}
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
  background: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: border 0.18s, box-shadow 0.17s;
  box-shadow: 0 2px 14px ${({ theme }) => theme.colors.grey}22;

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 4px 22px ${({ theme }) => theme.colors.primary}33;
    outline: none;
  }
`;

const AvatarDropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
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
  font-family: ${({ theme }) => theme.fonts.main};
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.darkGrey}33;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AvatarAuthLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.xs};
  align-items: center;
`;

const AvatarLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.main};
  text-decoration: none;
  transition: color 0.17s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
