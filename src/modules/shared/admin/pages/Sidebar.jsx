import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSidebarModules } from "@/hooks/useSidebarModules";
import { logoutUser, resetAuthState } from "@/modules/users/slice/authSlice";
import { resetProfile } from "@/modules/users/slice/accountSlice";
import { MdHome, MdLogout, MdClose, MdRefresh } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function Sidebar({ isOpen, onClose }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation("sidebar");
  const lang = i18n.language;

  // Aktif ve sidebar’da görünür modüller
  const { sidebarModules, isLoading } = useSidebarModules();

  // Navbar logo başlık/slogan (isteğe bağlı)
  const settings = useAppSelector((state) => state.setting?.settings) || [];
  const navbarLogoSetting = settings.find((s) => s.key === "navbar_logo_text");
  const title = navbarLogoSetting?.value?.title?.[lang];
  const slogan = navbarLogoSetting?.value?.slogan?.[lang];

  // Aktif route kontrolü
  const isActive = (linkPath) =>
    linkPath === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(linkPath);

  // Logout işlemi
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(resetAuthState());
      dispatch(resetProfile());
      navigate("/login", { replace: true });
      if (onClose) onClose();
    } catch (err) {
      toast.error(t("logoutError", "Logout failed. Please try again.", err));
    }
  };

  // Sidebar responsive kapanma
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && onClose) onClose();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <>
      <SidebarWrapper className={isOpen ? "open" : ""}>
        <LogoSection>
          <LogoIcon>
            <MdHome size={20} />
          </LogoIcon>
          <LogoTextWrapper>
            <LogoTitle>{title || "Admin"}</LogoTitle>
            {slogan && <LogoSlogan>{slogan}</LogoSlogan>}
          </LogoTextWrapper>
          <CloseButton onClick={onClose}>
            <MdClose size={20} />
          </CloseButton>
        </LogoSection>

        <Nav>
          {/* Dashboard her zaman ilk sırada */}
          <MenuLink to="/admin" $active={isActive("/admin")} onClick={onClose}>
            <IconWrapper $active={isActive("/admin")}>
              <MdHome size={18} />
            </IconWrapper>
            <span>{t("dashboard", "Dashboard")}</span>
          </MenuLink>
          {/* Modüller (dinamik) */}
          {isLoading ? (
            <LoadingText>
              <MdRefresh className="spin" />
              {t("loading", "Loading menu...")}
            </LoadingText>
          ) : sidebarModules.length === 0 ? (
            <LoadingText>{t("noModules", "No modules available.")}</LoadingText>
          ) : (
            sidebarModules.map(({ key, path, label, Icon }) => (
              <MenuLink
                key={key}
                to={path}
                $active={isActive(path)}
                onClick={onClose}
              >
                <IconWrapper $active={isActive(path)}>
                  <Icon size={18} />
                </IconWrapper>
                <span>{label}</span>
              </MenuLink>
            ))
          )}
        </Nav>

        <LogoutSection>
          <LogoutButton type="button" onClick={handleLogout}>
            <IconWrapper>
              <MdLogout size={18} />
            </IconWrapper>
            {t("logout", "Logout")}
          </LogoutButton>
        </LogoutSection>
      </SidebarWrapper>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
}

const SidebarWrapper = styled.aside`
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-right: ${({ theme }) => theme.borders.thin}
    ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transition.normal};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  @media (max-width: 1024px) {
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: ${({ theme }) => theme.colors.overlayBackground};
    z-index: ${({ theme }) => theme.zIndex.overlay};
  }
`;

const CloseButton = styled.button`
  display: none;
  margin-left: auto;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacings.md};
  border-bottom: ${({ theme }) => theme.borders.thin}
    ${({ theme }) => theme.colors.border};
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  margin-right: ${({ theme }) => theme.spacings.sm};
`;

const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

const LogoSlogan = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacings.sm} 0;
  overflow-y: auto;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.md};
  margin: ${({ theme }) => theme.spacings.xs} 0;
  text-decoration: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textMuted};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.semiBold : theme.fontWeights.regular};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.backgroundAlt : "transparent"};
  border-left: 3px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};
  transition: ${({ theme }) => theme.transition.fast};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.hoverBackground};
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textMuted};
`;

const LogoutSection = styled.div`
  padding: ${({ theme }) => theme.spacings.md};
  border-top: ${({ theme }) => theme.borders.thin}
    ${({ theme }) => theme.colors.border};
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.md};
  width: 100%;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: background ${({ theme }) => theme.transition.fast},
    color ${({ theme }) => theme.transition.fast};
  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.dangerHover || theme.colors.danger};
  }
`;

const LoadingText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacings.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.sm};
  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
