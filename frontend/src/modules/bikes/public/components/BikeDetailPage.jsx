// src/modules/bikes/public/pages/BikeDetailPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getProductById } from "@/modules/bikes/slices/bikeSlice";
import { useTranslation } from "react-i18next";
import { useGsap } from "@/contexts/GsapContext"; // ✅ GSAP hook


const BikeDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("bikes");
  const gsap = useGsap(); // ✅ contextten GSAP'i al
  const lang = i18n.language || "en";

  const bike = useSelector((state) => state.bikes.selectedProduct);
  const loading = useSelector((state) => state.bikes.loading);
  const error = useSelector((state) => state.bikes.error);

  const [selectedImage, setSelectedImage] = useState(null);
  const detailCardRef = useRef(null); // ✅ animasyon uygulanacak alan

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (bike?.images?.length > 0) setSelectedImage(bike.images[0]);
  }, [bike]);

  // ✅ GSAP animasyonu
  useEffect(() => {
    if (gsap && detailCardRef.current) {
      gsap.fromTo(
        detailCardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [gsap, bike]);

  const handleBack = () => navigate(-1);

  return (
    <DetailWrapper>
      <DetailCard ref={detailCardRef}>
        <ImageColumn>
          <MainImage
            src={selectedImage?.url || "/placeholder.jpg"}
            alt={selectedImage?.altText?.[lang] || bike?.name?.[lang]}
          />
          <ThumbnailList>
            {bike?.images?.map((img, idx) => (
              <Thumb
                key={img.url || idx}
                src={img.url}
                alt={img.altText?.[lang] || `Bike image ${idx + 1}`}
                $active={selectedImage?.url === img.url}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </ThumbnailList>
        </ImageColumn>

        <DetailInfo>
          <BackButton onClick={handleBack}>
            {t("go_back", "← Back")}
          </BackButton>
          {loading && <p>{t("loading", "Loading...")}</p>}
          {error && <ErrorMsg>{t("error", { error })}</ErrorMsg>}
          {bike && (
            <>
              <h2>{bike.name?.[lang] || bike.name?.en}</h2>
              <h4>{bike.brand}</h4>
              <Description>
                {bike.description?.[lang] || bike.description?.en}
              </Description>
              <ul>
                <li>
                  <strong>{t("price", "Price")}: </strong> €{bike.price}
                </li>
                <li>
                  <strong>{t("stock", "Stock")}: </strong> {bike.stock}
                </li>
                <li>
                  <strong>{t("tags", "Tags")}: </strong>{" "}
                  {bike.tags?.join(", ")}
                </li>
              </ul>
            </>
          )}
        </DetailInfo>
      </DetailCard>
    </DetailWrapper>
  );
};

export default BikeDetailPage;



// ------- Styled Components -------
const DetailWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const DetailCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.cards.background};
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.xl};
  max-width: 1100px;
  width: 100%;
  box-shadow: ${({ theme }) => theme.cards.shadow};

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 420px;
  max-height: 350px;
  border-radius: ${({ theme }) => theme.radii.lg};
  object-fit: contain;
  background: ${({ theme }) => theme.colors.inputBackground};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ThumbnailList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: center;
`;

const Thumb = styled.img`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.md};
  object-fit: cover;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.borderInput};
  cursor: pointer;
  transition: border 0.2s ease;
  background: ${({ theme }) => theme.colors.inputBackground};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

const DetailInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.title};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.textLight};
  }

  ul {
    padding-left: ${({ theme }) => theme.spacing.lg};
    margin-top: ${({ theme }) => theme.spacing.lg};
  }

  li {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => `${theme.spacing.sm} 0 ${theme.spacing.lg}`};
`;

const BackButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
