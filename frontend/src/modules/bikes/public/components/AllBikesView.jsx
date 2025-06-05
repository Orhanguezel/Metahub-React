import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BikeCard } from "@/modules/bikes";
import { fetchProducts } from "@/modules/bikes/slices/bikeSlice";
import { useTranslation } from "react-i18next";
import { useGsap } from "@/contexts/GsapContext";

const AllBikesView = ({ isAppReady }) => {
  const gsap = useGsap(); // ✅ GSAP instance from hook
  const pageRef = useRef(null);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("bikes");
  const lang = i18n.language || "en";

  const bikes = useSelector((state) => state.bikes.bikes);
  const loading = useSelector((state) => state.bikes.loading);
  const error = useSelector((state) => state.bikes.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const wrapper = pageRef.current;
    if (!gsap || !wrapper) return;

    if (isAppReady) {
      gsap.to(wrapper, {
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        delay: 0.2,
      });
    } else {
      gsap.set(wrapper, { opacity: 0, visibility: "hidden" });
    }
  }, [isAppReady, gsap]);

  if (!gsap && isAppReady) {
    return <div>GSAP not available for AllBikesView.</div>;
  }

  return (
    <Wrapper ref={pageRef}>
      <Title>{t("title", "All Our Bike Models")}</Title>

      {loading && <p>{t("loading", "Loading...")}</p>}
      {error && <p>{t("error", { error })}</p>}

      <Grid>
        {bikes.map((bike) => (
          <BikeCard
            key={bike._id}
            id={bike._id}
            image={bike.images?.[0]?.url}
            title={bike.name?.[lang] || bike.name?.en}
            description={bike.description?.[lang] || bike.description?.en}
            altText={
              bike.images?.[0]?.altText?.[lang] ||
              bike.images?.[0]?.altText?.en
            }
          />
        ))}
      </Grid>
    </Wrapper>
  );
};

export default AllBikesView;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
`;

const Title = styled.h1`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.title};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

