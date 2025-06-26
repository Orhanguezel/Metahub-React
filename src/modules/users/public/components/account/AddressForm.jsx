import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
} from "@/modules/users/slice/addressSlice";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function AddressForm() {
  const { t } = useTranslation("account");
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const addresses = useSelector((state) => state.address.addresses || []);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // Frontend validasyon şeması (backend kontrolüyle uyumlu)
  const schema = yup.object({
    street: yup.string().required(t("address.errors.street")),
    houseNumber: yup.string().required(t("address.errors.houseNumber")),
    city: yup.string().required(t("address.errors.city")),
    zipCode: yup.string().required(t("address.errors.zipCode")),
    phone: yup.string().required(t("address.errors.phone")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      street: "",
      houseNumber: "",
      city: "",
      zipCode: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await dispatch(updateAddress({ id: editingId, data })).unwrap();
        toast.success(t("address.updated"));
        setEditingId(null);
      } else {
        await dispatch(createAddress(data)).unwrap();
        toast.success(t("address.success"));
      }
      reset();
    } catch (err) {
      toast.error(err?.message || t("address.error"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
      toast.success(t("address.deleted"));
      if (editingId === id) {
        setEditingId(null);
        reset();
      }
    } catch (err) {
      toast.error(err?.message || t("address.error"));
    }
  };

  const handleUpdate = (address) => {
    setEditingId(address._id);
    reset({
      street: address.street,
      houseNumber: address.houseNumber,
      city: address.city,
      zipCode: address.zipCode,
      phone: address.phone,
    });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("street")} placeholder={t("address.street")} />
        {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}

        <Input
          {...register("houseNumber")}
          placeholder={t("address.houseNumber")}
        />
        {errors.houseNumber && (
          <ErrorMessage>{errors.houseNumber.message}</ErrorMessage>
        )}

        <Input {...register("city")} placeholder={t("address.city")} />
        {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

        <Input {...register("zipCode")} placeholder={t("address.zipCode")} />
        {errors.zipCode && (
          <ErrorMessage>{errors.zipCode.message}</ErrorMessage>
        )}

        <Input {...register("phone")} placeholder={t("address.phone")} />
        {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? t("address.saving")
            : editingId
            ? t("address.save")
            : t("address.add")}
        </Button>
      </Form>

      <AddressList>
        {addresses.map((address) => (
          <AddressItem key={address._id}>
            <AddressText>
              {address.street}, {address.houseNumber}, {address.city}{" "}
              {address.zipCode}
            </AddressText>
            <ButtonRow>
              <Button type="button" onClick={() => handleUpdate(address)}>
                {t("address.update")}
              </Button>
              <Button
                type="button"
                $danger
                onClick={() => handleDelete(address._id)}
              >
                {t("address.remove")}
              </Button>
            </ButtonRow>
          </AddressItem>
        ))}
      </AddressList>
    </Wrapper>
  );
}

// Stiller Sayfa Altında
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: #ef4444; // Sabit danger rengi
  font-size: 1rem;
  margin-top: 8px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 900px) {
    padding: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd; // Sabit border rengi
  border-radius: 8px;
  font-size: 1rem;
  color: #333; // Sabit text rengi
  background-color: #f9f9f9; // Sabit input background rengi
  &:focus {
    border-color: #00fff7; // Sabit primary color
    outline: none;
  }
`;

const Button = styled.button`
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
  align-self: center;
  width: auto;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary || "#303030"};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.8em 1.6em;
  }
`;

const AddressList = styled.ul`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  margin-top: 20px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 900px) {
    padding: 16px;
  }
`;

const AddressItem = styled.li`
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const AddressText = styled.p`
  font-size: 1rem;
  color: #333; // Sabit text rengi
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
`;
