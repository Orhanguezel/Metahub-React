// src/modules/order/admin/components/OrderDetailModal.tsx

import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { OrderItemList } from "@/modules/order";

const OrderDetailModal = ({ order, onClose }) => {
  const { t, i18n } = useTranslation("order");
  const lang = i18n.language || "en";
  if (!order) return null;

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            {t("detail.title", "Order Detail")} #
            {(order._id || order.id)?.slice(-6)}
          </Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>
        <Section>
          <Label>{t("orderId", "Order ID")}:</Label> {order._id || order.id}
        </Section>
        <Section>
          <Label>{t("createdAt", "Created At")}:</Label>{" "}
          {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
        </Section>
        <Section>
          <Label>{t("userId", "User ID")}:</Label> {order.user || "-"}
        </Section>
        <Section>
          <Label>{t("status", "Status")}:</Label>{" "}
          <Status $status={order.status}>
            {t(order.status, order.status)}
          </Status>
        </Section>
        <Section>
          <Label>{t("shippingAddress", "Shipping Address")}:</Label>
          <AddressBlock>
            {order.shippingAddress?.name && (
              <div>
                <strong>{t("name", "Name")}:</strong>{" "}
                {order.shippingAddress.name[lang] || order.shippingAddress.name}
              </div>
            )}
            {order.shippingAddress?.phone && (
              <div>
                <strong>{t("phone", "Phone")}:</strong>{" "}
                {order.shippingAddress.phone}
              </div>
            )}
            <div>
              <strong>{t("address", "Address")}:</strong>{" "}
              {[
                order.shippingAddress?.street,
                order.shippingAddress?.city,
                order.shippingAddress?.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </div>
            {order.shippingAddress?.postalCode && (
              <div>
                <strong>{t("postalCode", "Postal Code")}:</strong>{" "}
                {order.shippingAddress.postalCode}
              </div>
            )}
          </AddressBlock>
        </Section>
        <Section>
          <Label>{t("paymentMethod", "Payment Method")}:</Label>{" "}
          {order.paymentMethod}
        </Section>
        <Section>
          <Label>{t("total", "Total")}:</Label>{" "}
          <strong>{order.totalPrice?.toFixed(2) || 0} EUR</strong>
        </Section>
        <Section>
          <Label>{t("productDetails", "Product Details")}:</Label>
          <OrderItemList items={order.items} lang={lang} />
        </Section>
      </Modal>
    </Backdrop>
  );
};

export default OrderDetailModal;

// --- Styled Components ---
const Backdrop = styled.div`
  position: fixed;
  z-index: 100;
  inset: 0;
  background: rgba(30, 35, 48, 0.16);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 16px;
  max-width: 580px;
  width: 98vw;
  margin: 5vh auto;
  padding: 2.2rem 2rem 2rem 2rem;
  box-shadow: 0 4px 32px #0002;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1.3rem;
`;

const Title = styled.h2`
  font-size: 1.65rem;
  font-weight: 600;
`;

const CloseBtn = styled.button`
  font-size: 2.1rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0 6px;
  transition: color 0.18s;
  &:hover {
    color: #e00;
  }
`;

const Section = styled.div`
  margin-bottom: 1.1rem;
  font-size: 1.06rem;
`;

const Label = styled.span`
  font-weight: 500;
  color: #2e2e2e;
  margin-right: 0.6em;
`;

const Status = styled.span`
  background: ${({ $status, theme }) =>
    $status === "delivered"
      ? theme.colors.success || "#13ae60"
      : $status === "cancelled"
      ? theme.colors.danger || "#f44336"
      : theme.colors.secondary || "#374151"};
  color: #fff;
  padding: 0.22em 1.2em;
  border-radius: 16px;
  font-size: 1em;
  font-weight: 500;
  text-transform: capitalize;
  margin-left: 0.6rem;
  min-width: 85px;
  text-align: center;
  align-self: flex-start;
`;

const AddressBlock = styled.div`
  margin-top: 0.2em;
  font-size: 0.97em;
  color: #353535;
  line-height: 1.5;
  > div {
    margin-bottom: 0.25em;
  }
`;
