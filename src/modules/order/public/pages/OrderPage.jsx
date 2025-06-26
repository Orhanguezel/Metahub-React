import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getMyOrders,
  clearOrderMessages,
} from "@/modules/order/slice/ordersSlice";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { OrderList } from "@/modules/order";
import { Message } from "@/shared";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const { myOrders, loading, error } = useAppSelector((state) => state.orders);
  const { t } = useTranslation("order");

  useEffect(() => {
    dispatch(getMyOrders());
    return () => {
      dispatch(clearOrderMessages());
    };
  }, [dispatch]);

  // Liste boşsa
  const isEmpty =
    !myOrders || !Array.isArray(myOrders) || myOrders.length === 0;

  return (
    <OrderPageWrapper>
      <MainContent>
        <Title>{t("title", "My Orders")}</Title>
        {loading && <OrderMessage>{t("loading", "Loading...")}</OrderMessage>}
        {error && <OrderMessage $error>{error}</OrderMessage>}
        {isEmpty ? (
          <OrderMessage>{t("empty", "You have no orders yet.")}</OrderMessage>
        ) : (
          <OrderListWrapper>
            <OrderList orders={myOrders} />
          </OrderListWrapper>
        )}
      </MainContent>
    </OrderPageWrapper>
  );
};

export default OrderPage;

// --- Styled Components ---

const OrderPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 2rem 4rem;
  color: ${({ theme }) => theme.colors.black || "#0a0a0a"};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey || "#ddd"};
  padding-bottom: 1rem;
`;

const OrderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OrderMessage = styled.div`
  text-align: center;
  padding: 4rem 0 2rem;
  font-size: 1.15rem;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.danger || "red" : theme.colors.darkGrey || "#555"};
`;
