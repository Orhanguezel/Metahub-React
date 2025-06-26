import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DEFAULT_IMAGE = "/placeholder.jpg"; // Eğer görsel yoksa

const CategoryCard = ({ category }) => {
  const { t, i18n } = useTranslation("bikes");
  const lang = i18n.language;

  // Çok dilli kategori adı: önce mevcut dil, yoksa ilk bulunan dil
  const name =
    (category?.name && category.name[lang]) ||
    (category?.name && Object.values(category.name).find(Boolean)) ||
    t("category.noName");

  // İlk görsel (veya default)
  const image = category?.images?.[0]?.url || DEFAULT_IMAGE;

  // Route: slug varsa slug, yoksa _id
  const link = `/bikescategory/${category.slug}`;

  return (
    <CardWrapper to={link}>
      <CardImage src={image} alt={name} loading="lazy" />
      <CardOverlay>
        <CardTitle>{name}</CardTitle>
      </CardOverlay>
    </CardWrapper>
  );
};

export default CategoryCard;

// --- Styled Components ---
const CardWrapper = styled(Link)`
  display: block;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.colors?.text || "#fff"};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.11);
  transition: transform 0.3s, box-shadow 0.3s;
  aspect-ratio: 16/10;
  min-height: 180px;
  background: #151515;
  &:hover {
    transform: translateY(-5px) scale(1.025);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.21);
  }
  &:hover img {
    transform: scale(1.07);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s;
  background: #222;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1.3rem;
  box-sizing: border-box;
  pointer-events: none;
`;

const CardTitle = styled.h2`
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.white || "#fff"};
  text-align: center;
  margin: 0;
  margin-bottom: 0.2em;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.62);
  letter-spacing: 0.03em;
`;
