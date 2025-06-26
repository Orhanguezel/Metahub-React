import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/modules/cart/slice/cartSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddToCartButton = ({
  productId,
  size,
  quantity = 1,
  disabled = false,
  style,
  children,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("cart");
  const loading = useAppSelector((state) => state.cart.loading);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled || loading || clicked) return;

    setClicked(true);
    dispatch(
      addToCart({
        productId,
        quantity,
        ...(size && { size }),
      })
    )
      .unwrap()
      .then(() => {
        toast.success(t("added", "Added to cart!"));
      })
      .catch((err) => {
        toast.error(
          err?.message || t("addToCartError", "Could not add to cart!")
        );
      })
      .finally(() => setClicked(false));
  };

  return (
    <ButtonStyled
      onClick={handleClick}
      disabled={disabled || loading || clicked}
      style={style}
    >
      {children || t("addToCart", "Add to Cart")}
    </ButtonStyled>
  );
};

export default AddToCartButton;

const ButtonStyled = styled.button`
  background-color: ${({ theme }) => theme.colors.primary || "#0a0a0a"};
  color: ${({ theme }) => theme.colors.white || "#fff"};
  border: none;
  padding: 0.9em 1.8em;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  align-self: flex-start;
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
    transform: translateY(-2px);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
