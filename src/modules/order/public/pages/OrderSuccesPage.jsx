import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderSuccessPage = () => {
  const { t } = useTranslation("order");

  return (
    <PageWrapper>
      <MainContent>
        <SuccessIcon>
          <i className="fas fa-check-circle"></i>
        </SuccessIcon>
        <Title>{t("title")}</Title>
        <Message>{t("purchaseSuccess")}</Message>
        <Message>{t("emailInfo")}</Message>
        <Message>{t("shippingInfo")}</Message>
        <StyledLink to="/order">{t("myOrders", "My Orders")}</StyledLink>
        <StyledLink to="/">{t("backToHomepage")}</StyledLink>
      </MainContent>
    </PageWrapper>
  );
};

export default OrderSuccessPage;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey || "#f0f0f0"};
`;

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 2rem 4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.black || "#000"};
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  max-width: 500px;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.8em 2em;
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
  }
`;
