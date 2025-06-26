import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCart } from "@/modules/cart/slice/cartSlice";
import { useTranslation } from "react-i18next";
import { createOrder } from "@/modules/order/slice/ordersSlice";

const CheckoutPage = () => {
  const { t } = useTranslation("cart");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cart = useAppSelector((state) => state.cart.cart) || { items: [] };

  // Tüm zorunlu alanlar!
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Germany",
    // ödeme bilgisi frontendde sadece görsel
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });

  // Toplam fiyat (unitPrice)
  const totalCost = useMemo(() => {
    return cart.items.reduce(
      (total, item) =>
        total +
        item.quantity *
          // Sepete eklenirken kaydedilmiş fiyat veya ürün fiyatı
          (item.priceAtAddition || item.unitPrice || item.product?.price || 0),
      0
    );
  }, [cart.items]);

  // Submit handler
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cart.items || cart.items.length === 0) return;

    // Modeldeki isimlerle shippingAddress ve items!
    const orderData = {
      items: cart.items.map((item) => ({
        product: item.product?._id || item.product, // ObjectId
        quantity: item.quantity,
        unitPrice: item.priceAtAddition || item.unitPrice || item.product?.price,
      })),
      shippingAddress: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      totalPrice: totalCost,
      // paymentMethod gibi alanlar istersen ekle!
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      alert(t("orderError", "Sipariş oluşturulamadı!"));
    }
  };

  // ...
  // (Aşağıda stil ve countries kodların aynen kalabilir)
  // ...
  // (Form inputlarının id değerlerini yeni field adlarına göre güncelle!)

  return (
    <CheckoutPageWrapper>
      <MainContent>
        <Title>{t("checkout", "Checkout")}</Title>
        <CheckoutForm onSubmit={handlePlaceOrder}>
          <FormSection>
            <InnerFormLayout>
              <SectionTitle>{t("shipping", "Shipping Address")}</SectionTitle>

              <InputGroup>
                <Label htmlFor="name" className="required">
                  {t("fullName", "Full Name")}
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="phone" className="required">
                  {t("phone", "Phone")}
                </Label>
                <Input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email" className="required">
                  {t("email", "E-mail")}
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="street" className="required">
                  {t("address", "Address & Street Nr.")}
                </Label>
                <Input
                  type="text"
                  id="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="city" className="required">
                  {t("city", "City")}
                </Label>
                <Input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="postalCode" className="required">
                  {t("postalCode", "Postal Code")}
                </Label>
                <Input
                  type="text"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="country" className="required">
                  {t("country", "Country")}
                </Label>
                <Select
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  {/* ...countries list */}
                </Select>
              </InputGroup>
              {/* ...ödeme inputları sadece görsel */}
            </InnerFormLayout>
          </FormSection>
          {/* ...OrderSummary aynı */}
        </CheckoutForm>
      </MainContent>
    </CheckoutPageWrapper>
  );
};

// --- Styled Components (Aynen kalabilir) ---

export default CheckoutPage;
