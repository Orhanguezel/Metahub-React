import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchBikes,
  fetchBikeByIdPublic,
} from "@/modules/bikes/slices/bikeSlice";
import { useTranslation } from "react-i18next";
import AddToCartButton from "@/shared/AddToCartButton";

const BikeDetailPage = () => {
  const { bikeId } = useParams();
  const dispatch = useAppDispatch();
  const { bikes, selected, loading, error } = useAppSelector(
    (state) => state.bikes
  );
  const { t, i18n } = useTranslation("bikes");
  const locale = i18n.language || "de";

  const bike = useMemo(() => {
    if (
      selected &&
      (String(selected._id) === String(bikeId) || selected.slug === bikeId)
    ) {
      return selected;
    }
    return bikes?.find(
      (b) => String(b._id || b.id) === String(bikeId) || b.slug === bikeId
    );
  }, [bikes, selected, bikeId]);

  // Fetch on mount
  useEffect(() => {
    if (!bikes || bikes.length === 0) dispatch(fetchBikes());
    if (!selected || String(selected._id) !== String(bikeId))
      dispatch(fetchBikeByIdPublic(bikeId));
  }, [bikeId]);

  const images = bike?.images || [];
  const galleryImages = images.map((img) => img.url).filter(Boolean);
  const [currentMainImage, setCurrentMainImage] = useState(
    galleryImages?.[0] || ""
  );

  useEffect(() => {
    setCurrentMainImage(galleryImages?.[0] || "");
  }, [bikeId, bike]);

  const getLocalized = (obj, fallback = "-") =>
    obj?.[locale] || obj?.en || Object.values(obj || {})[0] || fallback;

  const bikeName = getLocalized(bike?.name);
  const bikeDesc = getLocalized(bike?.description);
  const categoryName = getLocalized(bike?.category?.name);

  const handleThumbnailClick = (imgSrc) => setCurrentMainImage(imgSrc);

  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (bike?.availableSizes?.length > 0) {
      if (!selectedSize || !bike.availableSizes.includes(selectedSize)) {
        setSelectedSize(bike.availableSizes[0]);
      }
    } else {
      setSelectedSize(null);
    }
  }, [bike, bikeId]);

  // Loading / Error
  if (loading) return <NoItemsMessage>{t("loading")}</NoItemsMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  // Bike not found
  if (!bike) {
    return (
      <DetailPageWrapperStyled
        style={{ textAlign: "center", paddingTop: "150px" }}
      >
        <BikeNameStyledH1>{t("bikeNotFoundTitle")}</BikeNameStyledH1>
        <p>{t("bikeNotFoundDesc", { id: bikeId })}</p>
        <RouterLink
          to="/all-bikes"
          style={{ marginTop: "20px", display: "inline-block", color: "blue" }}
        >
          {t("backToCategories")}
        </RouterLink>
      </DetailPageWrapperStyled>
    );
  }

  // --- Render ---
  return (
    <DetailPageWrapperStyled>
      <MainContentDetail>
        <ProductLayoutStyled>
          <MainImageContainerStyled>
            {currentMainImage && <img src={currentMainImage} alt={bikeName} />}
          </MainImageContainerStyled>
          <GalleryContainerStyled>
            {galleryImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`${bikeName} - ${t("galleryImageAlt", {
                  index: index + 1,
                })}`}
                onClick={() => handleThumbnailClick(imgSrc)}
                className={
                  currentMainImage === imgSrc ? "active-thumbnail" : ""
                }
              />
            ))}
          </GalleryContainerStyled>
          <InfoContainerStyled>
            <BikeTypeStyledP>{categoryName}</BikeTypeStyledP>
            <BikeNameStyledH1>{bikeName}</BikeNameStyledH1>
            <BikePriceStyledP>
              {bike.price} {bike.currency || "€"}
            </BikePriceStyledP>
            <BikeDescriptionStyledP>{bikeDesc}</BikeDescriptionStyledP>
            {bike.features?.length > 0 && (
              <FeaturesSectionStyled>
                <h3>{t("keyFeatures")}</h3>
                <ul>
                  {bike.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </FeaturesSectionStyled>
            )}
            {bike.availableSizes?.length > 0 && (
              <SizeSelectorWrapper>
                <label htmlFor="size-selector-buttons">{t("selectSize")}</label>
                <div id="size-selector-buttons">
                  {bike.availableSizes.map((size) => (
                    <SizeButton
                      key={size}
                      $isActive={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </SizeButton>
                  ))}
                </div>
              </SizeSelectorWrapper>
            )}
            <AddToCartButton
              productId={bike._id}
              size={selectedSize}
              disabled={
                !!(
                  bike.availableSizes &&
                  bike.availableSizes.length > 0 &&
                  !selectedSize
                )
              }
            >
              {t("addToCart")}
            </AddToCartButton>
          </InfoContainerStyled>
          {bike.specifications?.length > 0 && (
            <SpecificationsSectionStyled>
              <h3>{t("fullSpecs")}</h3>
              {bike.specifications.map((group, groupIndex) => (
                <SpecGroupStyled key={groupIndex}>
                  <h4>{getLocalized(group.groupName)}</h4>
                  <SpecTableStyled>
                    <tbody>
                      {group.items.map((spec, specIndex) => (
                        <tr key={specIndex}>
                          <th>{getLocalized(spec.label)}</th>
                          <td>{getLocalized(spec.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </SpecTableStyled>
                </SpecGroupStyled>
              ))}
            </SpecificationsSectionStyled>
          )}
        </ProductLayoutStyled>
      </MainContentDetail>
    </DetailPageWrapperStyled>
  );
};

export default BikeDetailPage;

// --- Styled Components ---
const DetailPageWrapperStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.grey || "#f0f0f0"};
  color: ${({ theme }) => theme.colors.black || "#000"};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const MainContentDetail = styled.main`
  flex-grow: 1;
  padding-top: 100px;
  padding-bottom: 3rem;
`;

const ProductLayoutStyled = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  grid-template-areas: "mainimage info" "gallery   info" "specs     specs";
  gap: 2rem 3rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS || "900px"}) {
    grid-template-columns: 1fr;
    grid-template-areas: "mainimage" "gallery" "info" "specs";
    gap: 1.5rem;
  }
`;

const MainImageContainerStyled = styled.div`
  grid-area: mainimage;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  img {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 4/3;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;
  }
`;

const GalleryContainerStyled = styled.div`
  grid-area: gallery;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  overflow-x: auto;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  img {
    width: 100px;
    height: 75px;
    object-fit: cover;
    border-radius: 6px;
    cursor: pointer;
    border: 3px solid transparent;
    transition: border-color 0.2s ease, transform 0.2s ease,
      box-shadow 0.2s ease;
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
      transform: scale(1.03);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    &.active-thumbnail {
      border-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      transform: scale(1.05);
    }
  }
`;

const InfoContainerStyled = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
`;
const BikeTypeStyledP = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.darkGrey || "#555"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;
const BikeNameStyledH1 = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black || "#222"};
  margin-bottom: 0.75rem;
  line-height: 1.2;
  text-align: left;
`;
const BikePriceStyledP = styled.p`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  margin-bottom: 1.5rem;
`;
const BikeDescriptionStyledP = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #333;
  margin-bottom: 1.5rem;
`;
const FeaturesSectionStyled = styled.div`
  margin-bottom: 1.5rem;
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.black || "#222"};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey || "#ddd"};
    padding-bottom: 0.25rem;
    text-align: left;
  }
  ul {
    list-style: none;
    padding-left: 0;
    li {
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.darkGrey || "#555"};
      position: relative;
      padding-left: 20px;
      &::before {
        content: "✓";
        color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
        position: absolute;
        left: 0;
        font-weight: bold;
      }
    }
  }
`;
const SizeSelectorWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  label {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.darkGrey || "#555"};
  }
  div {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;
const SizeButton = styled.button`
  padding: 0.5em 1em;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive
        ? theme.colors.primary || "#0a0a0a"
        : theme.colors.grey || "#ccc"};
  background-color: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.primary || "#0a0a0a"
      : theme.colors.white || "#fff"};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.white || "#fff" : theme.colors.black || "#000"};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
    background-color: ${({ theme, $isActive }) =>
      $isActive
        ? theme.colors.primary || "#0a0a0a"
        : theme.colors.accent || "#f0f0f0"};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SpecificationsSectionStyled = styled.div`
  grid-area: specs;
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grey || "#ddd"};
  margin-top: 1rem;
  h3 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.black || "#222"};
    margin-bottom: 1.5rem;
    text-align: left;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary || "#0a0a0a"};
    display: inline-block;
  }
`;
const SpecGroupStyled = styled.div`
  margin-bottom: 2rem;
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
    margin-bottom: 1rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px dashed ${({ theme }) => theme.colors.grey || "#ccc"};
  }
`;
const SpecTableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  th,
  td {
    text-align: left;
    padding: 0.8em 0.5em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey || "#eee"};
    vertical-align: top;
  }
  tr:last-child th,
  tr:last-child td {
    border-bottom: none;
  }
  th {
    color: ${({ theme }) => theme.colors.darkGrey || "#555"};
    font-weight: 600;
    width: 35%;
  }
  td {
    color: ${({ theme }) => theme.colors.black || "#333"};
  }
`;
const NoItemsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3rem;
`;
const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
`;
