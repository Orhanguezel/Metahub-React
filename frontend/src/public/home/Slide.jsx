// src/components/home/Slide.jsx
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

const SlideWrapper = styled(Link)`
  display: block; 
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer; 
  text-decoration: none; 
 
  visibility: hidden;
`;

const SlideBackgroundImageWrapper = styled.div`
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  will-change: clip-path, transform;
  img {
    width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%;
    will-change: transform;
  }
  &::after {
    content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    display: block; background-color: rgba(0, 0, 0, 0.25); z-index: 1;
  }
`;

const SlideMainImageWrapper = styled.div`
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 40%; height: 68%; z-index: 3; overflow: hidden;
  will-change: clip-path, transform;
  img {
    width: 100%; height: 100%; object-fit: contain;
    will-change: transform;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS || '900px'}) { width: 75%; height: 40%; }
`;

const SlideCopy = styled.div`
  position: absolute; top: 50%; left: 30%; transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.text || '#fff'}; z-index: 4;
  width: 500px; max-width: 90%;
  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS || '900px'}) { top: 70%; left: 50%; text-align: center; }
`;

const SlideTitleWrapper = styled.div`
  position: relative; height: auto; margin-bottom: 0.75em; overflow: hidden;
`;

const SlideTitle = styled.h1`
  transform: translateY(100%); 
  opacity: 0;
  will-change: transform, opacity;
  font-size: 48px; font-weight: 400; line-height: 1.1;
  color: ${({ theme }) => theme.colors.text || '#fff'}; text-align: left; margin: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.laptopS || '900px'}) { font-size: 36px; text-align: center; }
`;

const SlideDescriptionWrapper = styled.div`
  position: relative; height: auto; overflow: hidden;
`;

const SlideDescription = styled.p`
  transform: translateY(100%); 
  opacity: 0;
  will-change: transform, opacity;
  font-size: ${({ theme }) => theme.fontSizes.large || '18px'}; font-weight: 300;
  line-height: 1.3; color: ${({ theme }) => theme.colors.text || '#fff'};
  text-align: left; margin: 0;
`;

const Slide = forwardRef(({ slideData }, ref) => {
  const containerRef = useRef(null);
  const bgImageWrapperRef = useRef(null);
  const mainImageWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    bgImageWrapper: bgImageWrapperRef.current,
    mainImageWrapper: mainImageWrapperRef.current,
    title: titleRef.current,
    description: descriptionRef.current,
  }));

  if (!slideData) return null; 

  const displayTitle = slideData.title || 'Featured Bike';
  const displayDescription = slideData.description || 'Check out our latest collection!';
  const mainImageSrc = slideData.image; 
  const altText = slideData.altText || displayTitle; 

  let categoryLink = '/all-bikes';
  if (slideData.category) {
    if (slideData.category === 'all-bikes') {
      categoryLink = '/all-bikes';
    } else {
      const categorySlug = slideData.category.toLowerCase().replace(/\s+/g, '-');
      categoryLink = `/bikes/${categorySlug}`;
    }
  }

  return (
    <SlideWrapper to={categoryLink} ref={containerRef}>
      <SlideBackgroundImageWrapper ref={bgImageWrapperRef}>
        <img src={mainImageSrc} alt={altText} />
      </SlideBackgroundImageWrapper>
      <SlideMainImageWrapper ref={mainImageWrapperRef}>
        <img src={mainImageSrc} alt={altText} />
      </SlideMainImageWrapper>
      <SlideCopy>
        <SlideTitleWrapper>
          <SlideTitle ref={titleRef}>{displayTitle}</SlideTitle>
        </SlideTitleWrapper>
        <SlideDescriptionWrapper>
          <SlideDescription ref={descriptionRef}>{displayDescription}</SlideDescription>
        </SlideDescriptionWrapper>
      </SlideCopy>
    </SlideWrapper>
  );
});

export default Slide;