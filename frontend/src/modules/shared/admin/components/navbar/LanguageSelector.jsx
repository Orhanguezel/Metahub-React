// src/components/common/LanguageSelector.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import i18n from "@/i18n";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLangCode, setCurrentLangCode] = useState("en");
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const languages = useMemo(
    () => [
      { code: "en", name: "English", flag: "🇬🇧" },
      { code: "de", name: "Deutsch", flag: "🇩🇪" },
      { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    ],
    []
  );

  const getLangDetails = useCallback(
    (code) => {
      return languages.find((lang) => lang.code === code) || languages[0];
    },
    [languages]
  );

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLang") || "en";
    setCurrentLangCode(storedLang);
    document.documentElement.lang = storedLang;
    i18n.changeLanguage(storedLang);
  }, [getLangDetails]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelectLanguage = (langCode) => {
    setCurrentLangCode(langCode);
    localStorage.setItem("preferredLang", langCode);
    document.documentElement.lang = langCode;
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event) => {
      if (!isOpen) return;
      const items = Array.from(
        dropdownRef.current?.querySelectorAll('li[role="option"]') || []
      );
      if (items.length === 0) return;
      const activeElement = document.activeElement;
      let currentIndex = items.indexOf(activeElement);

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          currentIndex = (currentIndex + 1) % items.length;
          items[currentIndex]?.focus();
          break;
        case "ArrowUp":
          event.preventDefault();
          currentIndex = (currentIndex - 1 + items.length) % items.length;
          items[currentIndex]?.focus();
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (activeElement && activeElement.hasAttribute("data-lang")) {
            handleSelectLanguage(activeElement.getAttribute("data-lang"));
          }
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        case "Tab":
          setIsOpen(false);
          break;
        default:
          break;
      }
    },
    [isOpen, handleSelectLanguage]
  );

  useEffect(() => {
    const currentDropdown = dropdownRef.current;
    if (isOpen && currentDropdown) {
      currentDropdown.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      currentDropdown?.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

 const currentLangDetails = getLangDetails(currentLangCode);

  return (
    <SelectorContainer>
      <LanguageSelectorStyled>
        <LanguageSelectorButton
          ref={buttonRef}
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {currentLangDetails && <CurrentLangFlag>{currentLangDetails.flag}</CurrentLangFlag>}
          {currentLangDetails && <CurrentLangText>{currentLangDetails.name}</CurrentLangText>}
          <DropdownArrow $isExpanded={isOpen} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px"><path d="M7 10l5 5 5-5H7z"/></DropdownArrow>
        </LanguageSelectorButton>
        <LanguageDropdownList ref={dropdownRef} role="listbox" aria-hidden={!isOpen} $isHidden={!isOpen}>
          {languages.map(lang => (
            <LanguageDropdownItem key={lang.code} role="option" data-lang={lang.code} tabIndex={isOpen ? 0 : -1} onClick={() => handleSelectLanguage(lang.code)}>
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-text">{lang.name}</span>
            </LanguageDropdownItem>
          ))}
        </LanguageDropdownList>
      </LanguageSelectorStyled>
    </SelectorContainer>
  );
};

export default LanguageSelector;


// Styled Components (pozostają bez zmian - tak jak w kodzie, który wysłałaś)
const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LanguageSelectorStyled = styled.div`
  position: relative;
  display: inline-block;
  font-family: "PP Neue Montreal", sans-serif;
`;
const LanguageSelectorButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 8px 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 75px;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  &:focus,
  &:hover {
    background-color: rgba(255, 255, 255, 0.904);
    border-color: #888;
    outline: none;
  }
`;
const CurrentLangFlag = styled.span`
  margin-right: 5px;
  font-size: 1em;
  line-height: 1;
`;
const CurrentLangText = styled.span`
  line-height: 1;
`;
const DropdownArrow = styled.svg`
  transition: transform 0.2s ease-in-out;
  fill: #131313;
  margin-left: 5px;
  transform: ${(props) =>
    props.$isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
`;
const LanguageDropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%)
    ${(props) => (props.$isHidden ? "translateY(-10px)" : "translateY(0)")};
  background-color: #fcf8f8;
  border: 1px solid #f3f2f2;
  border-radius: 6px;
  list-style: none;
  padding: 6px 0;
  margin: 0;
  z-index: 1050;
  min-width: 160px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  opacity: ${(props) => (props.$isHidden ? 0 : 1)};
  visibility: ${(props) => (props.$isHidden ? "hidden" : "visible")};
  transform-origin: top center;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    transform 0.2s ease-in-out;
`;
const LanguageDropdownItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #000;
  font-size: 14px;
  font-weight: 400;
  font-family: "PP Neue Montreal", sans-serif;
  &:hover,
  &:focus {
    background-color: #333;
    color: #fff;
    outline: none;
  }
  .lang-flag {
    margin-right: 8px;
    font-size: 1.1em;
  }
  .lang-text {
    flex-grow: 1;
  }
`;
// --- Koniec Styled Components ---

