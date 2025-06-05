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
import {
  Wrapper,
  Title,
  Form,
  Input,
  Button,
  ErrorMessage,
  AddressList,
  AddressItem,
  AddressText,
  ButtonRow,
} from "@/modules/users/public/styles/AccountStyles";
import { toast } from "react-toastify";

export default function AddressForm() {
  const { t } = useTranslation("account");
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const addresses = useSelector((state) => state.address.addresses || []);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const schema = yup.object({
    street: yup.string().required(t("address.errors.street")),
    houseNumber: yup.string().required(t("address.errors.houseNumber")),
    city: yup.string().required(t("address.errors.city")),
    zipCode: yup.string().required(t("address.errors.zipCode")),
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
      // Eğer düzenleme modundaysa ve silinen adres ise iptal et
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
    });
  };

  return (
    <Wrapper>
      <Title>{t("address.title")}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("street")} placeholder={t("address.street")} />
        {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}

        <Input {...register("houseNumber")} placeholder={t("address.houseNumber")} />
        {errors.houseNumber && <ErrorMessage>{errors.houseNumber.message}</ErrorMessage>}

        <Input {...register("city")} placeholder={t("address.city")} />
        {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

        <Input {...register("zipCode")} placeholder={t("address.zipCode")} />
        {errors.zipCode && <ErrorMessage>{errors.zipCode.message}</ErrorMessage>}

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
              {address.street}, {address.houseNumber}, {address.city} {address.zipCode}
            </AddressText>
            <ButtonRow>
              <Button type="button" onClick={() => handleUpdate(address)}>
                {t("address.update")}
              </Button>
              <Button type="button" $danger onClick={() => handleDelete(address._id)}>
                {t("address.remove")}
              </Button>
            </ButtonRow>
          </AddressItem>
        ))}
      </AddressList>
    </Wrapper>
  );
}
