import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useGsap } from "@/contexts/GsapContext";

const BikeCard = ({ image, title, description, id, altText }) => {
  const cardRef = useRef(null);
  const gsap = useGsap();
  const { t } = useTranslation("bikes");

  useEffect(() => {
    if (gsap && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [gsap]);

  const detailLink = `/bikes/${id}`;

  return (
    <CardWrapper ref={cardRef}>
      <CardImage src={image} alt={altText || title} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description || t("coming_soon", "More details coming soon...")}
        </CardDescription>
        <DiscoverButton to={detailLink}>
          {t("discover_more", "Discover more")}
        </DiscoverButton>
      </CardContent>
    </CardWrapper>
  );
};

export default BikeCard;const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.cards.background};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.cards.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform ${({ theme }) => theme.transition.normal},
              box-shadow ${({ theme }) => theme.transition.normal};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.cards.shadow};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.colors.shadowHighlight};
    background-color: ${({ theme }) =>
      theme.cards.hoverBackground || theme.cards.background};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.inputBackground};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DiscoverButton = styled(Link)`
  display: inline-block;
  width: fit-content;
  padding: 0.6em 1.4em;
  background-color: ${({ theme }) => theme.buttons.primary.background};
  color: ${({ theme }) => theme.buttons.primary.text};
  border-radius: ${({ theme }) => theme.radii.pill};
  text-decoration: none;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: auto;
  transition: background-color ${({ theme }) => theme.transition.normal},
              color ${({ theme }) => theme.transition.normal};

  &:hover {
    background-color: ${({ theme }) => theme.buttons.primary.backgroundHover};
    color: ${({ theme }) => theme.buttons.primary.textHover};
  }
`;
