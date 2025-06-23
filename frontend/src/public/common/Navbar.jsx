import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import SearchBar from "./SearchBar";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchBikeCategories } from "@/modules/bikes/slices/bikeCategorySlice";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import logoImg from "@/assets/images/logo.png";
import { getImageSrc } from "@/shared/getImageSrc";
import { AvatarMenu } from "@/modules/shared";

const Navbar = () => {
  const gsap = window.gsap;
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation("navbar");

  const [isBikesDropdownOpen, setIsBikesDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const { profile: user } = useAppSelector((state) => state.account);
  const { categories } = useAppSelector((state) => state.bikeCategory);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchBikeCategories());
    }
  }, [categories, dispatch]);

  // Profil resmi çözümü (değişmedi)
  const resolvedProfileImage = (() => {
    if (!user?.profileImage) return "/default-avatar.png";
    if (typeof user.profileImage === "object" && user.profileImage !== null) {
      if (user.profileImage.thumbnail?.startsWith("http"))
        return user.profileImage.thumbnail;
      if (user.profileImage.url?.startsWith("http"))
        return user.profileImage.url;
      if (user.profileImage.thumbnail?.startsWith("/"))
        return getImageSrc(user.profileImage.thumbnail, "profile");
      if (user.profileImage.url?.startsWith("/"))
        return getImageSrc(user.profileImage.url, "profile");
      return "/default-avatar.png";
    }
    if (typeof user.profileImage === "string") {
      if (user.profileImage.trim() === "") return "/default-avatar.png";
      if (user.profileImage.startsWith("http")) return user.profileImage;
      return getImageSrc(user.profileImage, "profile");
    }
    return "/default-avatar.png";
  })();

  const bikesDropdownTimer = useRef(null);

  const totalItemsInCart =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  useEffect(() => {
    if (!gsap || !navRef.current) return;
    gsap.fromTo(
      navRef.current,
      {
        y: "-120%",
        opacity: 0,
        visibility: "hidden",
      },
      {
        y: "0%",
        opacity: 1,
        visibility: "visible",
        duration: 1.5,
        ease: "hop",
        delay: 0.3,
      }
    );
  }, []);

  const handleBikesMouseEnter = () => {
    clearTimeout(bikesDropdownTimer.current);
    setIsBikesDropdownOpen(true);
  };
  const handleBikesMouseLeave = () => {
    bikesDropdownTimer.current = setTimeout(
      () => setIsBikesDropdownOpen(false),
      200
    );
  };
  const handleSearchSubmit = (query) => {
    navigate(`/bikescategory/${query.toLowerCase().replace(/\s+/g, "-")}`);
    setIsSearchOpen(false);
  };

  return (
    <NavStyled ref={navRef}>
      <LogoContainer>
        <Link to="/">
          <LogoImg src={logoImg} alt="RadAnOr Logo" />
        </Link>
      </LogoContainer>
      <NavLinksContainer className="nav-links-desktop">
        <NavLinkItem>
          <Link to="/about">{t("about")}</Link>
        </NavLinkItem>
        <NavLinkItem
          onMouseEnter={handleBikesMouseEnter}
          onMouseLeave={handleBikesMouseLeave}
        >
          <span>{t("bikes")}</span>
          <DropdownMenu
            $isOpen={isBikesDropdownOpen}
            onMouseEnter={handleBikesMouseEnter}
            onMouseLeave={handleBikesMouseLeave}
          >
            {categories &&
              categories.map((cat) => (
                <DropdownMenuItem
                  key={cat._id}
                  to={`/bikescategory/${cat.slug || cat._id}`}
                  onClick={() => setIsBikesDropdownOpen(false)}
                >
                  {cat.name?.[i18next.language] ||
                    cat.name?.en ||
                    cat.name?.tr ||
                    "No name"}
                </DropdownMenuItem>
              ))}
            {categories && categories.length > 0 && (
              <DropdownMenuItem
                to="/all-bikes"
                onClick={() => setIsBikesDropdownOpen(false)}
                style={{ borderTop: "1px solid #eee", fontWeight: "bold" }}
              >
                {t("view_all_categories")}
              </DropdownMenuItem>
            )}
          </DropdownMenu>
        </NavLinkItem>
        <NavLinkItem>
          <Link to="#">{t("stories")}</Link>
        </NavLinkItem>
      </NavLinksContainer>

      <NavActionsContainer className="nav-actions-container">
        <LanguageSelector />
        <SearchBar isOpen={isSearchOpen} onSearch={handleSearchSubmit} />
        <IconButton
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          aria-label="Toggle search"
        >
          <i className="fas fa-search"></i>
        </IconButton>
        <AvatarMenu
          isAuthenticated={!!user}
          profileImage={resolvedProfileImage}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
        <IconLink to="/cart" aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
          {totalItemsInCart > 0 && <CartBadge>{totalItemsInCart}</CartBadge>}
        </IconLink>
      </NavActionsContainer>
    </NavStyled>
  );
};

export default Navbar;

// ----------------- Styled Components -----------------
const NavStyled = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.25em 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  color: ${({ theme }) => theme.colors.text || "#fff"};
  opacity: 0;
  visibility: hidden;
  transform: translateY(-120%);
  will-change: transform, opacity;

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletS || "600px"}) {
    .nav-links-desktop {
      display: none;
    }
    .nav-actions-container {
      flex-grow: 1;
      justify-content: flex-end;
    }
  }
`;

const LogoContainer = styled.div`
  font-size: 25px;
  font-weight: 500;
  text-transform: uppercase;
  flex-shrink: 0;
  a {
    color: inherit;
    text-decoration: none;
  }
`;
const LogoImg = styled.img`
  height: 80px;
  width: auto;
  display: block;
`;

const NavLinksContainer = styled.div`
  display: flex;
  gap: 1.5em;
  align-items: center;
  flex: 1 1 auto;
  justify-content: center;
`;

const NavLinkItem = styled.div`
  position: relative;
  & > a,
  & > span {
    color: inherit;
    text-decoration: none;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 500;
    padding: 0.5em;
    transition: color 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    line-height: 1.2;
    &:hover {
      color: ${({ theme }) => theme.colors.accent || "#ccc"};
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%)
    translateY(${(props) => (props.$isOpen ? "0" : "-10px")});
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0;
  z-index: 1001;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
`;

const DropdownMenuItem = styled(Link)`
  display: block;
  padding: 0.8em 1.5em;
  color: ${({ theme }) => theme.colors.black || "#000"};
  text-decoration: none;
  font-size: 0.9rem;
  text-transform: capitalize;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.fonts.main};
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent || "#f0f0f0"};
  }
`;

const NavActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8em;
  flex-shrink: 0;
`;

const BaseIconButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  color: ${({ theme }) => theme.colors.black || "#000"};
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent || "#f0f0f0"};
    transform: translateY(-1px);
  }

  i {
    font-size: 1rem;
    color: inherit;
  }
`;

const IconLink = styled(BaseIconButton).attrs({ as: Link })``;
const IconButton = styled(BaseIconButton)``;

const CartBadge = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: ${({ theme }) => theme.colors.attention || "red"};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.white || "#fff"};
`;
