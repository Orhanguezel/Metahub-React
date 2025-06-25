// src/modules/order/admin/pages/AdminOrderPage.tsx

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getAllOrders,
  clearOrderMessages,
} from "@/modules/order/slice/ordersSlice";
import { useTranslation } from "react-i18next";
import {
  OrderTable,
  OrderDetailModal,
  DeleteOrderModal,
} from "@/modules/order";
import styled from "styled-components";
import { Message } from "@/shared";

const AdminOrderPage = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error, successMessage } = useAppSelector(
    (state) => state.orders
  );
  const { t } = useTranslation("order");

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
    return () => {
      dispatch(clearOrderMessages());
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <PageTitle>{t("admin.title", "All Orders")}</PageTitle>

      {loading && <Message>{t("loading", "Loading...")}</Message>}
      {error && <Message $error>{error}</Message>}
      {successMessage && <Message $success>{successMessage}</Message>}

      <TableWrapper>
        <OrderTable
          orders={orders}
          onShowDetail={setSelectedOrder}
          onDelete={setDeleteOrderId}
        />
      </TableWrapper>

      {/* Detay Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      {/* Silme Modal */}
      {deleteOrderId && (
        <DeleteOrderModal
          orderId={deleteOrderId}
          onClose={() => setDeleteOrderId(null)}
        />
      )}
    </Wrapper>
  );
};

export default AdminOrderPage;

// --- Styled Components ---
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 120px 2rem 4rem;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey || "#ddd"};
  padding-bottom: 1rem;
  margin-bottom: 2.5rem;
`;

const TableWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 2rem;
`;
