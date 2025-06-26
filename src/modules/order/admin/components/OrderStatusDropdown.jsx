// src/modules/order/admin/components/OrderStatusDropdown.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "@/store/hooks";
import { updateOrderStatus } from "@/modules/order/slice/ordersSlice";
import { useTranslation } from "react-i18next";

const STATUSES = ["pending", "processing", "delivered", "cancelled"];

const OrderStatusDropdown = ({ order }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("order");
  const [status, setStatus] = useState(order.status);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (newStatus !== order.status) {
      dispatch(
        updateOrderStatus({ orderId: order._id || order.id, status: newStatus })
      );
    }
  };

  return (
    <Select value={status} onChange={handleChange}>
      {STATUSES.map((stat) => (
        <option value={stat} key={stat}>
          {t(stat, stat)}
        </option>
      ))}
    </Select>
  );
};

export default OrderStatusDropdown;

// --- Styled Components ---
const Select = styled.select`
  padding: 0.37em 1.1em;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey || "#bcbcbc"};
  background: ${({ theme }) => theme.colors.white || "#fff"};
  color: ${({ theme }) => theme.colors.black || "#252525"};
  font-weight: 500;
  font-size: 1.04em;
  outline: none;
  cursor: pointer;
`;
