import React from "react";
import styled from "styled-components";

const AddressForm = ({ t, formData, handleChange }) => (
  <>
    <InputGroup>
      <Label htmlFor="fullname" className="required">
        {t("fullName", "Full Name")}
      </Label>
      <Input
        type="text"
        id="fullname"
        value={formData.fullname}
        onChange={handleChange}
        required
      />
    </InputGroup>
    <InputGroup>
      <Label htmlFor="street" className="required">
        {t("street", "Street")}
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
      <Label htmlFor="houseNumber" className="required">
        {t("houseNumber", "House Number")}
      </Label>
      <Input
        type="text"
        id="houseNumber"
        value={formData.houseNumber}
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
      <Label htmlFor="zipCode" className="required">
        {t("postalCode", "Postal Code")}
      </Label>
      <Input
        type="text"
        id="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        required
      />
    </InputGroup>
    <InputGroup>
      <Label htmlFor="country" className="required">
        {t("country", "Country")}
      </Label>
      <Input
        type="text"
        id="country"
        value={formData.country}
        onChange={handleChange}
        required
      />
    </InputGroup>
    <InputGroup>
      <Label htmlFor="phone">{t("phone", "Phone")}</Label>
      <Input
        type="text"
        id="phone"
        value={formData.phone}
        onChange={handleChange}
      />
    </InputGroup>
  </>
);

export default AddressForm;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.darkGrey || "#555"};

  &.required::after {
    content: " *";
    color: red;
  }
`;

const Input = styled.input`
  padding: 0.8em 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #0a0a0a;
  }
`;
