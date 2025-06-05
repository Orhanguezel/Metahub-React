// src/components/home/Slide.jsx
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import styled from 'styled-components';


const Slide = forwardRef(({ slideData, isActive }, ref) => {
  const bgImageWrapperRef = useRef(null);
  const mainImageWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useImperativeHandle(ref, () => ({
    bgImageWrapper: bgImageWrapperRef.current,
    mainImageWrapper: mainImageWrapperRef.current,
    title: titleRef.current,
    description: descriptionRef.current,
  }));

  if (!slideData) return null;

  const titleText = slideData.title || 'Default Title';
  const descriptionText = slideData.description || 'Default description.';
  const altText = slideData.altText || `Image for ${titleText || 'slide ' + slideData.id}`;

  return (
    <SlideWrapper data-active={isActive} id={`slide-${slideData.id}`}>
      <SlideBackgroundImageWrapper ref={bgImageWrapperRef}>
        <img src={slideData.image} alt={altText} />
      </SlideBackgroundImageWrapper>
      <SlideMainImageWrapper ref={mainImageWrapperRef}>
        <img src={slideData.image} alt={altText} />
      </SlideMainImageWrapper>
      <SlideCopy>
        <SlideTitleWrapper>
          <SlideTitle ref={titleRef}>{titleText}</SlideTitle>
        </SlideTitleWrapper>
        <SlideDescriptionWrapper>
          <SlideDescription ref={descriptionRef}>{descriptionText}</SlideDescription>
        </SlideDescriptionWrapper>
      </SlideCopy>
    </SlideWrapper>
  );
});

export default Slide;


// Styled Components (jak w odpowiedzi nr 58)
const SlideWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const SlideBackgroundImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  will-change: clip-path, transform;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1.2);
    will-change: transform;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 1;
  }
`;

const SlideMainImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 68%;
  z-index: 3;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  will-change: clip-path, transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: translateY(-50%);
    will-change: transform;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS}) {
    width: 75%;
    height: 40%;
  }
`;

const SlideCopy = styled.div`
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  z-index: 4;
  color: ${({ theme }) => theme.colors.text};
  width: 500px;
  max-width: 90%;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS}) {
    top: 70%;
    left: 50%;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tabletS}) {
    top: 65%;
  }
`;

const SlideTitleWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
`;

const SlideTitle = styled.h1`
  transform: translateY(100%);
  opacity: 0;
  will-change: transform, opacity;
  font-size: ${({ theme }) => theme.fontSizes.heading};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS}) {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    text-align: center;
  }
`;

const SlideDescriptionWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const SlideDescription = styled.p`
  transform: translateY(100%);
  opacity: 0;
  will-change: transform, opacity;
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS}) {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    text-align: center;
  }
`;
