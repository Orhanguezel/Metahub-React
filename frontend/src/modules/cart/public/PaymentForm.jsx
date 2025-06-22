import React from "react";
import styled from "styled-components";

const PAYMENT_OPTIONS = [
  { value: "credit_card", label: "Credit Card" },
  { value: "cash_on_delivery", label: "Cash on Delivery" },
  { value: "paypal", label: "PayPal" },
];

const PaymentForm = ({ t, formData, handleChange }) => (
  <>
    <InputGroup>
      <Label className="required">{t("paymentMethod", "Payment Method")}</Label>
      <RadioGroup>
        {PAYMENT_OPTIONS.map((option) => (
          <RadioLabel key={option.value}>
            <input
              type="radio"
              name="paymentMethod"
              value={option.value}
              checked={formData.paymentMethod === option.value}
              onChange={handleChange}
            />
            {t(`payment.method.${option.value}`, option.label)}
          </RadioLabel>
        ))}
      </RadioGroup>
    </InputGroup>

    {formData.paymentMethod === "credit_card" && (
      <>
        <InputGroup>
          <Label htmlFor="cardName" className="required">
            {t("cardName", "Name on Card")}
          </Label>
          <Input
            type="text"
            id="cardName"
            value={formData.cardName}
            onChange={handleChange}
            required
            autoComplete="cc-name"
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="cardNumber" className="required">
            {t("cardNumber", "Card Number")}
          </Label>
          <Input
            type="text"
            id="cardNumber"
            placeholder="•••• •••• •••• ••••"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            autoComplete="cc-number"
          />
        </InputGroup>
        <FlexRow>
          <InputGroup style={{ flex: 1 }}>
            <Label htmlFor="expiryDate" className="required">
              {t("expiryDate", "Expiry Date")}
            </Label>
            <Input
              type="text"
              id="expiryDate"
              placeholder="MM / YY"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              autoComplete="cc-exp"
            />
          </InputGroup>
          <InputGroup style={{ flex: 1 }}>
            <Label htmlFor="cvc" className="required">
              {t("cvc", "CVC")}
            </Label>
            <Input
              type="text"
              id="cvc"
              placeholder="•••"
              value={formData.cvc}
              onChange={handleChange}
              required
              autoComplete="cc-csc"
            />
          </InputGroup>
        </FlexRow>
      </>
    )}

    {formData.paymentMethod === "paypal" && (
      <InputGroup>
        <Label htmlFor="paypalEmail" className="required">
          {t("paypalEmail", "PayPal Email")}
        </Label>
        <Input
          type="email"
          id="paypalEmail"
          value={formData.paypalEmail}
          onChange={handleChange}
          required
        />
      </InputGroup>
    )}
  </>
);

export default PaymentForm;

// Styled components
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.1rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  margin-bottom: 0.45rem;
  color: ${({ theme }) => theme.colors.darkGrey || "#555"};
  &.required::after {
    content: " *";
    color: red;
  }
`;

const Input = styled.input`
  padding: 0.75em 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #0a0a0a;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 0.2rem;
`;

const RadioLabel = styled.label`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
