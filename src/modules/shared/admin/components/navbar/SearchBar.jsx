// src/components/common/SearchBar.jsx
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const { t } = useTranslation('navbar');

  return (
    <SearchContainer>
      <SearchInputStyled
        type="text"
        placeholder={t('search_placeholder', 'Search...')}
      />
      <SearchIcon className="fas fa-search"></SearchIcon>
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchInputStyled = styled.input`
  padding: 10px 10px 10px 40px;
  border: 1px solid ${({ theme }) => theme.colors.grey || '#ccc'};
  border-radius: 40px;
  font-size: ${({ theme }) => theme.fontSizes.medium || '16px'};
  outline: none;
  transition: border-color 0.3s ease;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white || '#fff'};
  color: ${({ theme }) => theme.colors.black || '#000'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.darkGrey || '#555'};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.black || '#000'};
  }
`;

const SearchIcon = styled.i`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.black || '#000'};
  pointer-events: none;
  font-size: 0.9em;
`;
