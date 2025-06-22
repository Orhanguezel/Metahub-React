import React from "react";
import styled from "styled-components";
import { OrderCard } from "@/modules/order";
import { useTranslation } from "react-i18next";

const OrderList = ({ orders = [] }) => {
  const { t } = useTranslation("order");

  if (!orders.length) return <Empty>{t("empty", "No orders found.")}</Empty>;

  return (
    <ListWrapper>
      {orders.map((order) => (
        <OrderCard key={order._id || order.id} order={order} />
      ))}
    </ListWrapper>
  );
};
export default OrderList;

const Empty = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.grey || "#888"};
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
