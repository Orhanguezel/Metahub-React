// src/modules/order/admin/components/DeleteOrderModal.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteOrder } from "@/modules/order/slice/ordersSlice";
import { useTranslation } from "react-i18next";

const DeleteOrderModal = ({ orderId, onClose }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("order");
  const { loading } = useAppSelector((state) => state.orders);
  const [submitted, setSubmitted] = useState(false);

  const handleDelete = async () => {
    setSubmitted(true);
    await dispatch(deleteOrder(orderId));
    onClose();
  };

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>{t("admin.deleteTitle", "Delete Order")}</Title>
        <Text>
          {t(
            "admin.deleteConfirm",
            "Are you sure you want to delete this order?"
          )}
        </Text>
        <ButtonRow>
          <CancelBtn onClick={onClose}>{t("cancel", "Cancel")}</CancelBtn>
          <DeleteBtn onClick={handleDelete} disabled={loading || submitted}>
            {t("delete", "Delete")}
          </DeleteBtn>
        </ButtonRow>
      </Modal>
    </Backdrop>
  );
};

export default DeleteOrderModal;

// --- Styled Components ---
const Backdrop = styled.div`
  position: fixed;
  z-index: 120;
  inset: 0;
  background: rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 14px;
  min-width: 340px;
  max-width: 96vw;
  padding: 2.3rem 2.1rem 2rem;
  box-shadow: 0 4px 32px #0002;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1.38rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  font-size: 1.09rem;
  color: #444;
  margin-bottom: 1.8rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2em;
  justify-content: flex-end;
`;

const CancelBtn = styled.button`
  background: ${({ theme }) => theme.colors.grey || "#e1e1e1"};
  color: #444;
  border: none;
  padding: 0.55em 1.5em;
  border-radius: 13px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const DeleteBtn = styled(CancelBtn)`
  background: ${({ theme }) => theme.colors.danger || "#e53935"};
  color: #fff;
  &:hover:enabled {
    background: #b71c1c;
  }
`;
