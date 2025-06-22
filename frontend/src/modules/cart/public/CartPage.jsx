// src/pages/CartPage.jsx
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  fetchCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  clearCartMessages,
} from "@/modules/cart/slice/cartSlice";
import { useTranslation } from "react-i18next";

const DEFAULT_IMAGE = "/placeholder.jpg";
const getLocalized = (obj, lang) =>
  typeof obj === "object"
    ? obj?.[lang] || obj?.en || Object.values(obj)[0] || ""
    : obj || "";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation("cart");
  const lang = i18n.language || "en";
  const { cart, loading, error, successMessage } = useAppSelector(
    (state) => state.cart
  );

  console.log("cart", cart);

  useEffect(() => {
    dispatch(fetchCart());
    return () => {
      dispatch(clearCartMessages());
    };
  }, [dispatch]);

  // Sepet boş ise
  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  // Toplam fiyat hesaplama
  const totalCost = useMemo(() => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.quantity * (item.priceAtAddition || 0),
      0
    );
  }, [cart]);

  // Miktarı güncelleme
  const handleQuantityChange = (productId, newQty, currentQty) => {
    if (newQty > currentQty) {
      dispatch(increaseQuantity(productId));
    } else if (newQty < currentQty) {
      dispatch(decreaseQuantity(productId));
    }
  };

  // Sepetten çıkar
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };
  console.log("cart", cart);

  return (
    <CartPageWrapper>
      <MainContent>
        <Title>{t("title", "Shopping Cart")}</Title>
        {loading && (
          <EmptyCartMessage>{t("loading", "Loading...")}</EmptyCartMessage>
        )}
        {error && (
          <EmptyCartMessage style={{ color: "red" }}>{error}</EmptyCartMessage>
        )}
        {isEmpty ? (
          <EmptyCartMessage>
            <p>{t("empty", "Your cart is currently empty.")}</p>
            <CheckoutButton to="/all-bikes">
              {t("continueShopping", "Continue Shopping")}
            </CheckoutButton>
          </EmptyCartMessage>
        ) : (
          <CartLayout>
            <CartItemsList>
              {cart.items.map((item, idx) => {
                const product = item.product || {};
                const image = product.images?.[0]?.url || DEFAULT_IMAGE;
                const name = getLocalized(product.name, lang);
                const price = item.priceAtAddition || product.price || 0;
                return (
                  <CartItem key={product._id || idx}>
                    <ItemImage src={image} alt={name} />
                    <ItemDetails>
                      <ItemName>
                        <Link to={`/bike/${product._id}`}>{name}</Link>
                      </ItemName>
                      <ItemInfo>
                        {t("size", "Size")}:{" "}
                        {item.size || t("oneSize", "One Size")}
                      </ItemInfo>
                      <ItemInfo>
                        {t("price", "Price")}: {price}{" "}
                        {product.currency || "EUR"}
                      </ItemInfo>
                      <ItemActions>
                        <QuantityControl>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                product._id,
                                item.quantity - 1,
                                item.quantity
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                product._id,
                                item.quantity + 1,
                                item.quantity
                              )
                            }
                          >
                            +
                          </button>
                        </QuantityControl>
                        <RemoveButton onClick={() => handleRemove(product._id)}>
                          {t("remove", "Remove")}
                        </RemoveButton>
                      </ItemActions>
                    </ItemDetails>
                  </CartItem>
                );
              })}
            </CartItemsList>

            <CartSummary>
              <h2>{t("summary", "Order Summary")}</h2>
              <SummaryRow>
                <span>{t("subtotal", "Subtotal")}</span>
                <span>{totalCost.toFixed(2)} EUR</span>
              </SummaryRow>
              <SummaryRow>
                <span>{t("shipping", "Shipping")}</span>
                <span>{t("shippingFree", "FREE")}</span>
              </SummaryRow>
              <SummaryRow className="total">
                <span>{t("total", "Total")}</span>
                <span>{totalCost.toFixed(2)} EUR</span>
              </SummaryRow>
              <CheckoutButton to="/checkout">
                {t("checkout", "Proceed to Checkout")}
              </CheckoutButton>
              <RemoveButton
                style={{ marginTop: 18 }}
                onClick={() => dispatch(clearCart())}
              >
                {t("clearCart", "Clear Cart")}
              </RemoveButton>
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
            </CartSummary>
          </CartLayout>
        )}
      </MainContent>
    </CartPageWrapper>
  );
};

export default CartPage;

// --- Styled Components ---

const CartPageWrapper = styled.div`
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

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ItemInfo = styled.p`
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.darkGrey || "#555"};
`;

const ItemActions = styled.div`
  margin-top: auto;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 600px) {
    margin-top: 1rem;
    justify-content: center;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.attention || "red"};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 0.9rem;
  &:hover {
    color: darkred;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 4px;

  button {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #e0e0e0;
    }
  }

  span {
    min-width: 20px;
    text-align: center;
    font-weight: 500;
  }
`;

const CartSummary = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.white || "#fff"};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  align-self: flex-start;
  h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
  }
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

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border: none;
  padding: 0.9em 1.5em;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 25px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 4rem 0;
  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;
