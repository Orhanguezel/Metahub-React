// src/pages/StoriesPage.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StoriesPage = () => {
  return (
    <PageWrapper>
      <MainContent>
        <Title>Our Stories</Title>
        <PlaceholderText>
          This section is under construction. Come back soon to read inspiring
          stories from the RadAnOr community!
        </PlaceholderText>
        <BackLink to="/">Back to Home</BackLink>
      </MainContent>
    </PageWrapper>
  );
};

export default StoriesPage;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 2rem 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text || "#fff"};
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const PlaceholderText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 450px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textLight || "#ccc"};
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent || "#fff"};
  text-decoration: underline;
  font-weight: 500;
`;
