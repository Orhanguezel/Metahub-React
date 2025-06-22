import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DEFAULT_IMG = "https://via.placeholder.com/300x220.png?text=No+Image";

const BikeCard = ({ image, title, description, id, altText }) => {
  const { t, i18n } = useTranslation("bikes");
  const locale = i18n.language || "de";

  // Çok dilli title/desc için fallback
  const getLocalized = (field, fallback) =>
    typeof field === "object"
      ? field[locale] || field.en || Object.values(field)[0] || fallback
      : field || fallback;

  const detailLink = `/bike/${id}`;
  const displayTitle = getLocalized(title, t("bikeCard.defaultTitle"));
  const displayDesc = getLocalized(description, t("bikeCard.defaultDesc"));
  const displayAlt = altText
    ? getLocalized(altText, displayTitle)
    : displayTitle;

  return (
    <CardWrapper to={detailLink}>
      <CardImage
        src={image || DEFAULT_IMG}
        alt={displayAlt}
        className="card-image-hover"
      />
      <CardContent>
        <CardTitle>{displayTitle}</CardTitle>
        <CardDescription>{displayDesc}</CardDescription>
        <DiscoverButtonStyled>{t("bikeCard.discover")}</DiscoverButtonStyled>
      </CardContent>
    </CardWrapper>
  );
};

export default BikeCard;

// --- Styled Components ---
const CardWrapper = styled(Link)`
  display: block;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.grey || "#ddd"};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  color: ${({ theme }) => theme.colors.black || "#000"};
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  &:hover img.card-image-hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  object-position: center center;
  display: block;
  background: #222;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CardContent = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.black || "#222"};
`;

const CardDescription = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.darkGrey || "#555"};
  margin-bottom: 1rem;
  flex-grow: 1;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DiscoverButtonStyled = styled.div`
  display: inline-block;
  padding: 0.6em 1.2em;
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  margin-top: auto;
  align-self: center;
`;
