import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = ({ animate }) => {
  const gsap = window.gsap;
  const footerRef = useRef(null);
  const { t } = useTranslation("footer");

  useEffect(() => {
    if (!gsap) {
      if (footerRef.current && animate) {
        footerRef.current.style.opacity = "1";
        footerRef.current.style.visibility = "visible";
        footerRef.current.style.transform = "translateY(0px)";
      }
      return;
    }
    const element = footerRef.current;
    if (element) {
      if (animate) {
        gsap.to(element, {
          opacity: 1,
          visibility: "visible",
          y: "0%",
          duration: 0.8,
          ease: "power2.out",
          delay: 1.5,
        });
      } else if (sessionStorage.getItem("loaderAnimationComplete") === "true") {
        gsap.set(element, { opacity: 1, visibility: "visible", y: "0%" });
      } else {
        gsap.set(element, { opacity: 0, visibility: "hidden", y: "30px" });
      }
    }
  }, [animate, gsap]);

  if (typeof window !== "undefined" && !window.gsap && animate) {
    return null;
  }

  return (
    <FooterWrapper ref={footerRef}>
      <FooterLinks>
        <Link to="/contact">{t("contact")}</Link>
        <Link to="/faq">{t("faq")}</Link>
        <Link to="/shipping-returns">{t("shipping_returns")}</Link>
        <Link to="/privacy">{t("privacy_policy")}</Link>
        <Link to="/terms">{t("terms_of_service")}</Link>
      </FooterLinks>

      <SocialMediaIcons>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <i className="fab fa-youtube"></i>
        </a>
      </SocialMediaIcons>

      <CopyrightNotice>
        &copy; {new Date().getFullYear()} RadAnOr Bikes.{" "}
        {t("all_rights_reserved")}
        <br />
        {t("crafted_with")}
      </CopyrightNotice>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 2.5em 1.5em;
  background-color: ${({ theme }) => theme.colors.secondary || "#1c1c1c"};
  border-top: 1px solid ${({ theme }) => theme.colors.darkGrey || "#333"};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight || "#ccc"};
  font-size: 0.9rem;
  margin-top: auto; /* Kluczowe dla sticky footer, jeśli PageWrapper ma display:flex; flex-direction:column; min-height:100vh; */

  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  will-change: transform, opacity;

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletS || "600px"}) {
    padding: 2em 1em;
    gap: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem 1.5rem;
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.colors.textLight || "#ccc"};
    text-decoration: none;
    font-weight: 400;
    transition: color 0.3s ease;
    font-size: 0.85rem;

    &:hover {
      color: ${({ theme }) => theme.colors.white || "#fff"};
    }
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.colors.textLight || "#ccc"};
    font-size: 1.2rem;
    transition: color 0.3s ease, transform 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.white || "#fff"};
      transform: scale(1.15);
    }
  }
`;

const CopyrightNotice = styled.p`
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.8;
`;
