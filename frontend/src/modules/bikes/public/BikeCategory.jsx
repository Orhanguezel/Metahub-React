import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchBikes } from "@/modules/bikes/slices/bikeSlice";
import BikeCard from "@/modules/bikes/public/BikeCard";
import { useTranslation } from "react-i18next";

const DEFAULT_IMAGE = "/placeholder.jpg";

const getLocalized = (obj, lang) =>
  typeof obj === "object"
    ? obj?.[lang] || obj?.en || Object.values(obj)[0] || ""
    : obj || "";

const BikeCategoryPage = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation("bikes");
  const lang = i18n.language;

  const dispatch = useAppDispatch();
  const bikes = useAppSelector((state) => state.bikes.bikes);
  const loading = useAppSelector((state) => state.bikes.loading);

  useEffect(() => {
    if (!bikes || bikes.length === 0) dispatch(fetchBikes());
  }, [dispatch, bikes]);

  // Kategoriye göre filtrele
  const bikesInCategory = useMemo(() => {
    if (!slug || !bikes) return [];
    return bikes.filter(
      (bike) =>
        bike.category &&
        (bike.category.slug === slug || bike.category._id === slug)
    );
  }, [slug, bikes]);

  // Kategori ismi — ilk bisikletten al, yoksa slug göster
  const categoryName = bikesInCategory[0]?.category
    ? getLocalized(bikesInCategory[0].category.name, lang)
    : slug;

  if (loading)
    return (
      <CenteredWrapper>
        <h1>{t("categoryPage.loading")}</h1>
      </CenteredWrapper>
    );

  return (
    <PageWrapper>
      <CategoryTitle>
        {t("categoryPage.pageTitle", { category: categoryName })}
      </CategoryTitle>
      <CardsGrid>
        {bikesInCategory.length > 0 ? (
          bikesInCategory.map((bike) => (
            <BikeCard
              key={bike._id}
              id={bike._id}
              image={bike.mainImage || (bike.images?.[0]?.url ?? DEFAULT_IMAGE)}
              title={getLocalized(bike.name, lang)}
              description={
                getLocalized(bike.description, lang).substring(0, 100) + "..."
              }
              altText={getLocalized(bike.name, lang)}
            />
          ))
        ) : (
          <NoBikesMessage>{t("categoryPage.noBikes")}</NoBikesMessage>
        )}
      </CardsGrid>
    </PageWrapper>
  );
};

export default BikeCategoryPage;

// ----- styled-components -----
const PageWrapper = styled.div`
  min-height: 70vh;
  width: 100%;
  padding-top: 120px;
  padding-bottom: 40px;
  background: ${({ theme }) => theme.colors?.background || "#0a0a0a"};
  color: ${({ theme }) => theme.colors?.text || "#fff"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.6rem;
  font-weight: bold;
  letter-spacing: 0.01em;
`;

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  width: 100%;
`;

const CenteredWrapper = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoBikesMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2.5rem;
  color: #bbb;
`;
