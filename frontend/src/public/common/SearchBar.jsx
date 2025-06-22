// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  transition: width 0.4s ease-in-out, opacity 0.3s ease-in-out;
  width: ${props => (props.$isOpen ? '200px' : '0px')};
  opacity: ${props => (props.$isOpen ? '1' : '0')};
  overflow: hidden;
  
  height: 44px; 
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%; 
  padding: 0 2.8em 0 1.2em; 
  border: 1px solid ${({ theme }) => theme.colors.grey || '#ccc'};
  border-radius: 22px; /* Wysokość / 2, aby był zaokrąglony */
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.black || '#000'};
  background-color: ${({ theme }) => theme.colors.white || '#fff'};
  outline: none;
  box-sizing: border-box; 
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#0a0a0a'};
  }
`;

const SearchIconInInput = styled.button`
  position: absolute;
  right: 0; 
  top: 0;
  height: 100%; 
  width: 44px; 
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.darkGrey || '#555'};

  i {
    font-size: 1rem;
  }
`;

const SearchBar = ({ isOpen, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <SearchWrapper $isOpen={isOpen}>
      <form onSubmit={handleSearch} style={{ width: '100%', height: '100%' }}>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIconInInput type="submit" aria-label="Submit search">
          <i className="fas fa-search"></i>
        </SearchIconInInput>
      </form>
    </SearchWrapper>
  );
};

export default SearchBar;
