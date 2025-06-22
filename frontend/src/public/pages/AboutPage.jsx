// src/pages/AboutPage.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Lenis from "lenis";

// import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import aboutImg1 from "@/assets/images/img1.jpg";
import aboutImg2 from "@/assets/images/img2.jpg";
import aboutImg3 from "@/assets/images/img3.jpg";
import aboutImg4 from "@/assets/images/img4.jpg";

const AboutPage = () => {
  const gsap = window.gsap;
  const aboutWrapperRef = useRef(null);

  const cardsData = [
    {
      title: "Born From Passion.",
      description:
        "Our story doesn't begin in a boardroom; it begins on a dusty trail, with the sun on our backs and the simple, profound joy of the ride.",
      image: aboutImg1,
    },
    {
      title: "Engineered for the Escape.",
      description:
        "We were a group of bike lovers, united by a shared obsession for cycling.",
      image: aboutImg2,
    },
    {
      title: "So, we decided to build it ourselves.",
      description:
        "Our weekends were spent exploring new roads, conquering hills, and pushing our limits.",
      image: aboutImg3,
    },
    {
      title: "Welcome to our family. Let's ride together.",
      description:
        "We believe a bicycle is more than transportation. It’s a source of freedom, a tool for discovery, and a catalyst for community.",
      image: aboutImg4,
    },
  ];

  useEffect(() => {
    if (!gsap) {
      console.error("[AboutPage.jsx] window.gsap not available!");
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".about-card");

      const titles = gsap.utils.toArray(".card-title-h1");
      titles.forEach((title) => {
        new SplitText(title, {
          type: "chars",
          charsClass: "char-span",
        });
      });

      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          end: () => `+=${card.offsetHeight}`,
          invalidateOnRefresh: true,
        });

        const cardDescription = card.querySelector(".card-description");
        const cardTitleChars = card.querySelectorAll(".char-span");
        ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => {
            gsap.to(cardTitleChars, {
              y: "0%",
              stagger: 0.02,
              ease: "power3.out",
            });
            gsap.to(cardDescription, {
              x: 0,
              opacity: 1,
              duration: 0.75,
              delay: 0.2,
              ease: "power4.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(cardTitleChars, { y: "120%", ease: "power3.in" });
            gsap.to(cardDescription, {
              x: "40px",
              opacity: 0,
              duration: 0.5,
              ease: "power4.in",
            });
          },
        });
      });

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const cardImgWrapper = card.querySelector(".card-img-wrapper");
          ScrollTrigger.create({
            trigger: cards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(cardImgWrapper, {
                scale: 1 - progress * 0.25,
                opacity: 1 - progress,
              });
            },
          });
        }
      });
    }, aboutWrapperRef);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      context.revert();
    };
  }, [gsap]);

  return (
    <AboutPageWrapper ref={aboutWrapperRef}>
      <main>
        <IntroSection>
          <h1>For Riders, By Riders.</h1>
        </IntroSection>
        <CardsSection>
          {cardsData.map((card, index) => (
            <Card key={index} className="about-card">
              <CardWrapper>
                <CardImageWrapper className="card-img-wrapper">
                  <img src={card.image} alt={card.title} />
                </CardImageWrapper>
                <CardContent>
                  <CardTitle>
                    <h1 className="card-title-h1">{card.title}</h1>
                  </CardTitle>
                  <CardDescription className="card-description">
                    <p>{card.description}</p>
                  </CardDescription>
                </CardContent>
              </CardWrapper>
            </Card>
          ))}
        </CardsSection>
        <IntroSection className="outro">
          <h1>Engineered for the Escape</h1>
        </IntroSection>
      </main>
    </AboutPageWrapper>
  );
};

export default AboutPage;

// --- Styled Components  ---
const AboutPageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary || "#0f0f0f"};
  color: ${({ theme }) => theme.colors.text || "#fff"};
  font-family: ${({ theme }) =>
    theme.fonts.main || '"PP Neue Montreal", sans-serif'};
`;

const IntroSection = styled.section`
  height: 100svh;
  padding: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 500;
    line-height: 1.1;
    max-width: 80%;
  }
`;

const CardsSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 25svh;
`;

const Card = styled.div`
  position: relative;
  width: 100vw;
  height: 100svh;
  padding: 1.5em;
  box-sizing: border-box;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
`;

const CardImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  overflow: hidden;

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform;
    transform: scale(2);
  }
`;

const CardContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transform: translateY(-5vh);
  text-align: center;
`;

const CardTitle = styled.div`
  width: 100%;
  text-align: center;
  overflow: hidden;
  h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 550;

    .char-span {
      display: inline-block;
      transform: translateY(120%);
    }
  }
`;

const CardDescription = styled.div`
  width: 40%;
  margin-top: 2rem;
  position: relative;
  opacity: 0;
  transform: translateX(40px);
  p {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    font-weight: 400;
    line-height: 1.4;
  }
  @media (max-width: 900px) {
    width: 90%;
  }
`;
// ---  Styled Components ---
