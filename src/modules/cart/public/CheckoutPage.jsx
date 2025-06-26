import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/modules/cart/slice/cartSlice";
import { useTranslation } from "react-i18next";
import { createOrder } from "@/modules/order/slice/ordersSlice";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";

// ... styled components (aynı kalacak)

const CheckoutPage = () => {
  const { t } = useTranslation("cart");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart.cart) || { items: [] };
  const addresses = useAppSelector((state) => state.address.addresses) || [];
  const user = useAppSelector((state) => state.account.profile) || {};

  useEffect(() => {
    if (!addresses.length) {
      alert("Lütfen önce adres bilgilerinizi girin.");
      navigate("/account");
    }
  }, [addresses, navigate]);

  const defaultAddress =
    addresses.find((a) => a.isDefault) || addresses[0] || {};

  const [formData, setFormData] = useState({
    fullname: "",
    email: user.email || "",
    street: "",
    houseNumber: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
    paypalEmail: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullname:
        defaultAddress.fullname ||
        user.fullname ||
        user.name ||
        prev.fullname ||
        "",
      street: defaultAddress.street || prev.street || "",
      houseNumber: defaultAddress.houseNumber || prev.houseNumber || "",
      city: defaultAddress.city || prev.city || "",
      zipCode: defaultAddress.zipCode || prev.zipCode || "",
      country: defaultAddress.country || prev.country || "",
      phone: defaultAddress.phone || prev.phone || "",
    }));
    // eslint-disable-next-line
  }, [
    defaultAddress.fullname,
    defaultAddress.street,
    defaultAddress.houseNumber,
    defaultAddress.city,
    defaultAddress.zipCode,
    defaultAddress.country,
    defaultAddress.phone,
    user.fullname,
    user.name,
  ]);

  const handleChange = (e) => {
    const { id, value, name, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id || name]: type === "radio" ? value : value,
    }));
  };

  const totalCost = useMemo(() => {
    return cart.items.reduce(
      (total, item) =>
        total +
        item.quantity * (item.priceAtAddition || item.product?.price || 0),
      0
    );
  }, [cart.items]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cart.items || cart.items.length === 0) return;

    const orderData = {
      items: cart.items.map((item) => ({
        product: item.product?._id || item.product,
        quantity: item.quantity,
      })),
      shippingAddress: {
        name: formData.fullname,
        phone: formData.phone,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        postalCode: formData.zipCode,
        country: formData.country,
      },
      totalPrice: totalCost,
      paymentMethod: formData.paymentMethod,
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      alert(t("orderError", "Sipariş oluşturulamadı!", err));
    }
  };

  return (
    <CheckoutPageWrapper>
      <MainContent>
        <Title>{t("checkout", "Checkout")}</Title>
        <CheckoutForm onSubmit={handlePlaceOrder}>
          <FormSection>
            <InnerFormLayout>
              <SectionTitle>{t("shipping", "Shipping Address")}</SectionTitle>
              <AddressForm
                t={t}
                formData={formData}
                handleChange={handleChange}
              />

              <SectionTitle style={{ marginTop: "2rem" }}>
                {t("paymentInfo", "Payment Information")}
              </SectionTitle>
              <PaymentForm
                t={t}
                formData={formData}
                handleChange={handleChange}
              />

              <RequiredInfo>
                * {t("requiredFields", "Required fields")}
              </RequiredInfo>
            </InnerFormLayout>
          </FormSection>
          <OrderSummary>
            <SectionTitle>{t("orderSummary", "Order Summary")}</SectionTitle>
            <SummaryRow>
              <span>{t("subtotal", "Subtotal")}</span>
              <span>{totalCost.toFixed(2)} EUR</span>
            </SummaryRow>
            <SummaryRow>
              <span>{t("shipping", "Shipping")}</span>
              <span>{t("free", "FREE")}</span>
            </SummaryRow>
            <SummaryRow className="total">
              <span>{t("total", "Total")}</span>
              <span>{totalCost.toFixed(2)} EUR</span>
            </SummaryRow>
            <PlaceOrderButton type="submit">
              {t("placeOrder", "Place Order")}
            </PlaceOrderButton>
            <CheckoutButton to="/all-bikes">
              {t("continueShopping", "Continue Shopping")}
            </CheckoutButton>
          </OrderSummary>
        </CheckoutForm>
      </MainContent>
    </CheckoutPageWrapper>
  );
};

export default CheckoutPage;

const CheckoutPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey || "#f0f0f0"};
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 2rem 4rem;
  color: ${({ theme }) => theme.colors.black || "#000"};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey || "#ddd"};
  padding-bottom: 1rem;
`;

const CheckoutForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const InnerFormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #eee;
  color: #111;
  border: none;
  padding: 0.7em 1.5em;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 25px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ddd;
  }
`;

const PlaceOrderButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  background-color: #0a0a0a;
  color: #fff;
  border: none;
  padding: 0.9em 1.5em;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #303030;
  }
`;

const RequiredInfo = styled.p`
  font-size: 0.8rem;
  color: #555;
  margin-top: 1.5rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const OrderSummary = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 120px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  &.total {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #ddd;
  }
`;
