// src/components/LoaderOverlay.jsx
import React, { useEffect, useRef, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
// import gsap from 'gsap';

// --- Styled-Components  ---
const spinAnimation = keyframes` to { transform: rotate(360deg); } `;
const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  visibility: visible;
`;
const OverlayEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;
const OverlayBlock = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
`;
const IntroLogoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 0.25rem;
  z-index: 3;
`;
const WordContainer = styled.div`
  position: relative;
  overflow: hidden;
  h1 {
    font-family: ${({ theme }) =>
      theme.fonts.main || '"PP Neue Montreal", sans-serif'};
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.text || "#fff"};
    margin: 0;
    line-height: 1;
    transform: translateY(120%);
    opacity: 0;
    will-change: transform, opacity;
    span {
      font-family: ${({ theme }) =>
        theme.fonts.special || '"PP Editorial Old", sans-serif'};
      font-style: italic;
    }
  }
`;
const DividerLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center top;
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.text || "#fff"};
  z-index: 3;
  transform: scaleY(0);
  opacity: 0;
  will-change: transform, opacity;
`;
const SpinnerBox = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
`;
const SpinnerElement = styled.div`
  width: 50px;
  height: 50px;
  border: 1.4px solid ${({ theme }) => theme.colors.text || "#fff"};
  border-top-color: rgba(255, 255, 255, 0.125);
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
  opacity: 1; /* Początkowo widoczny */
  will-change: opacity;
`;
const CounterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  width: auto;
  height: auto;
`;
const CountItem = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const DigitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  h1 {
    font-family: ${({ theme }) =>
      theme.fonts.special || '"PP Editorial Old", sans-serif'};
    font-size: 15rem;
    font-weight: 400;
    line-height: 1;
    color: ${({ theme }) => theme.colors.text || "#fff"};
    margin: 0;
    transform: translateY(120%);
    opacity: 0;
    will-change: transform, opacity;
  }
`;
// ---  Styled Components ---

const LoaderOverlay = ({ onLoaded }) => {
  const gsap = window.gsap;

  const loaderWrapperRef = useRef(null);
  const overlayBlockLeftRef = useRef(null);
  const overlayBlockRightRef = useRef(null);
  const word1H1Ref = useRef(null);
  const word2H1Ref = useRef(null);
  const dividerLineRef = useRef(null);
  const spinnerElementRef = useRef(null);

  const countItemRefs = useRef([]);
  const [allRefsReady, setAllRefsReady] = useState(false);

  const counterData = useMemo(
    () => [
      { d1: "3", d2: "" },
      { d1: "2", d2: "" },
      { d1: "1", d2: "" },
      { d1: "an", d2: "d" },
      { d1: "G", d2: "O!" },
    ],
    []
  );

  console.log("[LoaderOverlay] allRefsReady:", allRefsReady, "gsap:", !!gsap);
  console.log("[LoaderOverlay] loaderWrapperRef:", loaderWrapperRef.current);
  console.log(
    "[LoaderOverlay] overlayBlockLeftRef:",
    overlayBlockLeftRef.current
  );
  console.log(
    "[LoaderOverlay] overlayBlockRightRef:",
    overlayBlockRightRef.current
  );
  console.log("[LoaderOverlay] word1H1Ref:", word1H1Ref.current);
  console.log("[LoaderOverlay] word2H1Ref:", word2H1Ref.current);
  console.log("[LoaderOverlay] dividerLineRef:", dividerLineRef.current);
  console.log("[LoaderOverlay] spinnerElementRef:", spinnerElementRef.current);
  console.log("[LoaderOverlay] countItemRefs:", countItemRefs.current);

  useEffect(() => {
    if (
      counterData.length > 0 &&
      countItemRefs.current.length !== counterData.length
    ) {
      console.log(
        "[LoaderOverlay] Initializing countItemRefs array, length:",
        counterData.length
      );
      countItemRefs.current = Array(counterData.length)
        .fill(null)
        .map(() => React.createRef());
      setAllRefsReady(false);
    }
  }, [counterData.length]);

  const assignCountItemRef = (el, index) => {
    if (
      el &&
      countItemRefs.current[index] &&
      !countItemRefs.current[index].current
    ) {
      countItemRefs.current[index].current = el;
      if (countItemRefs.current.every((ref) => ref && ref.current)) {
        console.log(
          "[LoaderOverlay] All CountItem refs assigned! Setting allRefsReady to true."
        );
        setAllRefsReady(true);
      }
    }
  };

  useEffect(() => {
    if (!gsap) {
      console.error(
        "[LoaderOverlay.jsx] window.gsap is not available! Aborting animation."
      );

      return;
    }
    // console.log("[LoaderOverlay] Main GSAP useEffect triggered. allRefsReady:", allRefsReady, "gsap available:", !!gsap);

    if (!allRefsReady && counterData.length > 0) {
      // console.log("[LoaderOverlay] GSAP useEffect: Waiting for allRefsReady to be true.");
      return;
    }

    const loaderElement = loaderWrapperRef.current;
    const blockLeft = overlayBlockLeftRef.current;
    const blockRight = overlayBlockRightRef.current;
    const word1 = word1H1Ref.current;
    const word2 = word2H1Ref.current;
    const divider = dividerLineRef.current;
    const spinner = spinnerElementRef.current;

    const essentialStaticRefs = [
      loaderElement,
      blockLeft,
      blockRight,
      word1,
      word2,
      divider,
      spinner,
    ];
    if (essentialStaticRefs.some((ref) => !ref)) {
      console.warn(
        "[LoaderOverlay] GSAP useEffect: Not all essential static refs are ready yet. Aborting GSAP setup."
      );
      return;
    }

    const allCounterH1sPopulated = countItemRefs.current.every(
      (ref) =>
        ref && ref.current && ref.current.querySelectorAll("h1").length >= 1
    );
    if (!allCounterH1sPopulated && countItemRefs.current.length > 0) {
      console.warn(
        "[LoaderOverlay] GSAP useEffect: Not all H1 elements within counter refs are populated. Aborting GSAP setup."
      );
      return;
    }
    console.log(
      "[LoaderOverlay] GSAP useEffect: All refs appear ready. Proceeding with GSAP timeline setup."
    );

    gsap.set([word1, word2], { y: "120%", opacity: 0 });
    gsap.set(divider, { scaleY: 0, opacity: 0 });
    gsap.set(spinner, { opacity: 1 });
    countItemRefs.current.forEach((ref) => {
      if (ref && ref.current) {
        gsap.set(ref.current.querySelectorAll("h1"), { y: "120%", opacity: 0 });
      }
    });
    gsap.set([blockLeft, blockRight], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: "hop" },
      // LoaderOverlay.jsx içinde
      onComplete: () => {
        console.log("🔥 [LoaderOverlay] onLoaded() tetikleniyor!");
        gsap.to(loaderElement, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            if (loaderElement) gsap.set(loaderElement, { display: "none" });
            sessionStorage.setItem("loaderAnimationComplete", "true");
            onLoaded(); // << BURASI
          },
        });
      },
    });
    // console.log("[LoaderOverlay] GSAP Timeline CREATED.");

    const STAGGER_TIME = 0.075;
    const COUNT_ANIM_DURATION = 1.0;
    const COUNT_PAUSE_BEFORE_EXIT = 1.0;
    const LAST_COUNT_EXIT_DELAY = 0.5;
    const LAST_COUNT_EXIT_DURATION = 0.5;
    const initialElementsEntryTime = 0;

    tl.to(
      spinner,
      { opacity: 0, duration: 0.3 },
      initialElementsEntryTime + 0.5
    );

    let currentTime = initialElementsEntryTime;
    const TOTAL_COUNT_ANIMATIONS = counterData.length;
    countItemRefs.current.forEach((ref, index) => {
      if (ref && ref.current) {
        const digits = ref.current.querySelectorAll("h1");
        if (digits.length > 0) {
          tl.to(
            digits,
            {
              y: "0%",
              opacity: 1,
              duration: COUNT_ANIM_DURATION,
              stagger: STAGGER_TIME,
            },
            currentTime
          );
          if (index < TOTAL_COUNT_ANIMATIONS - 1) {
            tl.to(
              digits,
              {
                y: "-120%",
                opacity: 0,
                duration: COUNT_ANIM_DURATION,
                stagger: STAGGER_TIME,
              },
              currentTime + COUNT_PAUSE_BEFORE_EXIT
            );
          } else {
            tl.to(
              digits,
              {
                y: "-120%",
                opacity: 0,
                duration: LAST_COUNT_EXIT_DURATION,
                stagger: 0.05,
              },
              currentTime + COUNT_PAUSE_BEFORE_EXIT + LAST_COUNT_EXIT_DELAY
            );
          }
        }
        currentTime += COUNT_PAUSE_BEFORE_EXIT;
      }
    });

    const goLettersExitTime =
      (TOTAL_COUNT_ANIMATIONS - 1) * COUNT_PAUSE_BEFORE_EXIT +
      COUNT_PAUSE_BEFORE_EXIT +
      LAST_COUNT_EXIT_DELAY +
      LAST_COUNT_EXIT_DURATION;
    const wordsEntryDelayAfterCounters = 0.2;
    const wordsEntryStartTime =
      goLettersExitTime + wordsEntryDelayAfterCounters;

    tl.to(
      [word1, word2],
      { y: "0%", opacity: 1, duration: 1, stagger: 0.1 },
      wordsEntryStartTime
    );
    tl.to(
      divider,
      { scaleY: "100%", opacity: 1, duration: 1 },
      wordsEntryStartTime
    );

    const wordsVisibleDuration = 1.0;
    const wordsExitStartTime = wordsEntryStartTime + wordsVisibleDuration;

    tl.to(word1, { y: "120%", opacity: 0, duration: 1 }, wordsExitStartTime);
    tl.to(word2, { y: "-120%", opacity: 0, duration: 1 }, "<");
    tl.to(divider, { opacity: 0, duration: 0.4 }, wordsExitStartTime);

    const blocksExitDelayAfterWords = 0.3;
    const blocksExitStartTime = wordsExitStartTime + blocksExitDelayAfterWords;

    tl.to(
      [blockLeft, blockRight],
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut",
      },
      blocksExitStartTime
    );

    return () => {
      // console.log("[LoaderOverlay] GSAP Timeline cleanup (kill).");
      tl.kill();
    };
  }, [onLoaded, counterData, allRefsReady, gsap]);

  if (!gsap && typeof window !== "undefined" && window.gsap) {
    // Bu bloğun içi boş olmasın, ya sil ya da bir açıklama yaz.
  } else if (!gsap) {
    console.error(
      "[LoaderOverlay.jsx] Critical: window.gsap is not available!"
    );
    return <div>GSAP not available for Loader.</div>;
  }

  console.log("[LoaderOverlay] RENDER oluyorum!", {
    allRefsReady,
    countItemRefs: countItemRefs.current,
  });

  return (
    <LoaderWrapper ref={loaderWrapperRef}>
      <OverlayEffect>
        <OverlayBlock ref={overlayBlockLeftRef} />{" "}
        <OverlayBlock ref={overlayBlockRightRef} />
      </OverlayEffect>
      <IntroLogoContainer>
        <WordContainer>
          <h1 ref={word1H1Ref}>
            <span>RadAnOr</span>
          </h1>
        </WordContainer>
        <WordContainer>
          <h1 ref={word2H1Ref}>Welcome!</h1>
        </WordContainer>
      </IntroLogoContainer>
      <DividerLine ref={dividerLineRef} />
      <SpinnerBox>
        <SpinnerElement ref={spinnerElementRef} />
      </SpinnerBox>
      <CounterContainer>
        {counterData.map((item, index) => (
          <CountItem key={index} ref={(el) => assignCountItemRef(el, index)}>
            <DigitContainer>
              <h1>{item.d1}</h1>
            </DigitContainer>
            {item.d2 && (
              <DigitContainer>
                <h1>{item.d2}</h1>
              </DigitContainer>
            )}
          </CountItem>
        ))}
      </CounterContainer>
    </LoaderWrapper>
  );
};
export default LoaderOverlay;
