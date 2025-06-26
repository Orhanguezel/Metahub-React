import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "@/store/hooks";
import BikeCard from "@/modules/bikes/public/BikeCard";
import { useTranslation } from "react-i18next";

const DEFAULT_IMAGE = "/placeholder.jpg";

// --- Kategorileri benzersiz olarak ayıkla ---
const getUniqueCategories = (bikes = []) => {
  const map = new Map();
  for (const bike of bikes) {
    const cat = bike.category;
    if (cat && cat._id && !map.has(cat._id)) {
      map.set(cat._id, cat);
    }
  }
  return Array.from(map.values());
};

const AllBikesPage = () => {
  const { t, i18n } = useTranslation("bikes");
  const lang = i18n.language;
  const bikes = useAppSelector((state) => state.bikes.bikes);
  const loading = useAppSelector((state) => state.bikes.loading);
  const error = useAppSelector((state) => state.bikes.error);

  const categories = useMemo(() => getUniqueCategories(bikes), [bikes]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredBikes = useMemo(() => {
    if (selectedCategory === "all") return bikes;
    return bikes.filter(
      (bike) =>
        bike.category && bike.category._id.toString() === selectedCategory
    );
  }, [bikes, selectedCategory]);

  if (loading) return <LoadingMessage>{t("allBikes.loading")}</LoadingMessage>;
  if (error)
    return <ErrorMessage>{t("allBikes.error", { error })}</ErrorMessage>;

  return (
    <AllBikesPageWrapper>
      <MainContent>
        <PageHeader>
          <CategoryTitle>{t("allBikes.title")}</CategoryTitle>
        </PageHeader>
        <CategoryMenu>
          <CategoryButton
            active={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          >
            {t("allBikes.all")}
          </CategoryButton>
          {categories.map((cat) => (
            <CategoryButton
              key={cat._id}
              active={selectedCategory === cat._id}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {/* Her kategori adı ilgili dilde gelir, fallback ile */}
              {cat.name?.[lang] || cat.name?.en || Object.values(cat.name)[0]}
            </CategoryButton>
          ))}
        </CategoryMenu>
        <BikesGrid>
          {filteredBikes && filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <BikeCard
                key={bike._id}
                id={bike._id}
                image={
                  bike.mainImage || (bike.images?.[0]?.url ?? DEFAULT_IMAGE)
                }
                title={
                  bike.name?.[lang] ||
                  bike.name?.en ||
                  Object.values(bike.name)[0]
                }
                description={
                  (
                    bike.description?.[lang] ||
                    bike.description?.en ||
                    Object.values(bike.description)[0] ||
                    ""
                  ).substring(0, 100) + "..."
                }
                altText={
                  bike.name?.[lang] ||
                  bike.name?.en ||
                  Object.values(bike.name)[0]
                }
              />
            ))
          ) : (
            <NoItemsMessage>{t("allBikes.noBikes")}</NoItemsMessage>
          )}
        </BikesGrid>
      </MainContent>
    </AllBikesPageWrapper>
  );
};

export default AllBikesPage;

// --- Styled Components aşağıda ---
const AllBikesPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding-top: 100px;
  padding-bottom: 3rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const CategoryTitle = styled.h1`
  font-size: 2.8rem;
  color: #fff;
  text-transform: capitalize;
  margin-top: 0;
`;

const CategoryMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

const CategoryButton = styled.button`
  background: ${({ active }) => (active ? "#0ff" : "#232323")};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.6em 1.7em;
  font-size: 1.08rem;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.17s;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.09);
  &:hover {
    background: #33f;
  }
`;

const BikesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const NoItemsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.3rem;
  color: #888;
  margin-top: 4rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 1.3rem;
  margin-top: 4rem;
`;
