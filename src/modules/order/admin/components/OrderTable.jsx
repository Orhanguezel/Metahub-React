// src/modules/order/admin/components/OrderTable.tsx

import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { OrderStatusDropdown } from "@/modules/order";

const OrderTable = ({ orders = [], onShowDetail, onDelete }) => {
  const { t, i18n } = useTranslation("order");
  const lang = i18n.language || "en";

  if (!orders.length)
    return <Empty>{t("admin.noOrders", "No orders found.")}</Empty>;

  return (
    <Table>
      <thead>
        <tr>
          <th>{t("orderNumber", "Order #")}</th>
          <th>{t("createdAt", "Date")}</th>
          <th>{t("customer", "Customer")}</th>
          <th>{t("total", "Total")}</th>
          <th>{t("status", "Status")}</th>
          <th>{t("actions", "Actions")}</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id || order.id}>
            <td>#{(order._id || order.id)?.slice(-6)}</td>
            <td>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "-"}
            </td>
            <td>
              {order.shippingAddress?.name
                ? order.shippingAddress.name[lang] || order.shippingAddress.name
                : "-"}
            </td>
            <td>{order.totalPrice?.toFixed(2) || 0} EUR</td>
            <td>
              <OrderStatusDropdown order={order} />
            </td>
            <td>
              <ActionBtn onClick={() => onShowDetail(order)}>
                {t("detail", "Detail")}
              </ActionBtn>
              <DeleteBtn onClick={() => onDelete(order._id || order.id)}>
                {t("delete", "Delete")}
              </DeleteBtn>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;

// --- Styled Components ---
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.white || "#fff"};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 24px #0001;
  th,
  td {
    padding: 1rem 0.6rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey || "#eee"};
  }
  th {
    background: ${({ theme }) => theme.colors.lightGrey || "#f5f5f5"};
    font-weight: 600;
    font-size: 1.08em;
    color: ${({ theme }) => theme.colors.black || "#333"};
  }
  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const ActionBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary || "#183153"};
  color: #fff;
  border: none;
  padding: 0.55em 1.3em;
  margin-right: 0.5em;
  border-radius: 16px;
  font-size: 0.96em;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary || "#253962"};
  }
`;

const DeleteBtn = styled(ActionBtn)`
  background: ${({ theme }) => theme.colors.danger || "#d32f2f"};
  &:hover {
    background: #b71c1c;
  }
`;

const Empty = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.grey || "#888"};
  padding: 2rem 0;
  font-size: 1.12em;
`;
