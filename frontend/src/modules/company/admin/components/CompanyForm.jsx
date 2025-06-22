import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import ImageUploadWithPreview from "@/shared/ImageUploadWithPreview";

export default function CompanyForm({ initialValues, onSubmit }) {
  const { t } = useTranslation("company");

  // Convert logos (string[] or CompanyLogo[]) to string[]
  const getUrlArray = (logos) => {
    if (!logos) return [];
    if (typeof logos[0] === "string") return logos;
    return logos.map((img) => img.url);
  };

  // Local UI states
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [existingImages, setExistingImages] = useState(
    getUrlArray(initialValues.logos)
  );

  useEffect(() => {
    setExistingImages(getUrlArray(initialValues.logos));
    setSelectedFiles([]);
    setRemovedImages([]);
  }, [JSON.stringify(initialValues.logos)]);

  // Validation schema
  const schema = yup.object().shape({
    companyName: yup.string().required(t("required", "Bu alan zorunludur")),
    email: yup
      .string()
      .email(t("invalidEmail", "Geçersiz e-posta"))
      .required(t("required", "Bu alan zorunludur")),
    phone: yup.string().required(t("required", "Bu alan zorunludur")),
    taxNumber: yup.string().required(t("required", "Bu alan zorunludur")),
    address: yup.object().shape({
      street: yup.string().required(t("required", "Bu alan zorunludur")),
      city: yup.string().required(t("required", "Bu alan zorunludur")),
      postalCode: yup.string().required(t("required", "Bu alan zorunludur")),
      country: yup.string().required(t("required", "Bu alan zorunludur")),
    }),
    bankDetails: yup.object().shape({
      bankName: yup.string().required(t("required", "Bu alan zorunludur")),
      iban: yup.string().required(t("required", "Bu alan zorunludur")),
      swiftCode: yup.string().required(t("required", "Bu alan zorunludur")),
    }),
    socialLinks: yup.object().shape({
      facebook: yup.string().url(t("invalidUrl", "Geçersiz URL")).nullable(),
      instagram: yup.string().url(t("invalidUrl", "Geçersiz URL")).nullable(),
      twitter: yup.string().url(t("invalidUrl", "Geçersiz URL")).nullable(),
      linkedin: yup.string().url(t("invalidUrl", "Geçersiz URL")).nullable(),
      youtube: yup.string().url(t("invalidUrl", "Geçersiz URL")).nullable(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      socialLinks: {
        facebook: initialValues.socialLinks?.facebook || "",
        instagram: initialValues.socialLinks?.instagram || "",
        twitter: initialValues.socialLinks?.twitter || "",
        linkedin: initialValues.socialLinks?.linkedin || "",
        youtube: initialValues.socialLinks?.youtube || "",
      },
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values, selectedFiles, removedImages);
    },
  });

  const handleLogoChange = useCallback((files, removed, current) => {
    setSelectedFiles(files);
    setRemovedImages(removed);
    setExistingImages(current);
  }, []);

  return (
    <FormStyled onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
      <SectionTitle>{t("companyInfo", "Company Info")}</SectionTitle>

      <Label htmlFor="companyName">{t("companyName", "Company Name")}</Label>
      <Input
        id="companyName"
        name="companyName"
        value={formik.values.companyName}
        onChange={formik.handleChange}
        autoComplete="organization"
        $hasError={!!formik.errors.companyName && !!formik.touched.companyName}
      />
      <FieldError>
        {formik.touched.companyName && formik.errors.companyName}
      </FieldError>

      <Label htmlFor="email">{t("email", "E-Mail")}</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        autoComplete="email"
        $hasError={!!formik.errors.email && !!formik.touched.email}
      />
      <FieldError>{formik.touched.email && formik.errors.email}</FieldError>

      <Label htmlFor="phone">{t("phone", "Phone")}</Label>
      <Input
        id="phone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        autoComplete="tel"
        $hasError={!!formik.errors.phone && !!formik.touched.phone}
      />
      <FieldError>{formik.touched.phone && formik.errors.phone}</FieldError>

      <Label htmlFor="taxNumber">{t("taxNumber", "Tax Number")}</Label>
      <Input
        id="taxNumber"
        name="taxNumber"
        value={formik.values.taxNumber}
        onChange={formik.handleChange}
        $hasError={!!formik.errors.taxNumber && !!formik.touched.taxNumber}
      />
      <FieldError>
        {formik.touched.taxNumber && formik.errors.taxNumber}
      </FieldError>

      <Label htmlFor="handelsregisterNumber">
        {t("handelsregisterNumber", "Handelsregister Number")}
      </Label>
      <Input
        id="handelsregisterNumber"
        name="handelsregisterNumber"
        value={formik.values.handelsregisterNumber}
        onChange={formik.handleChange}
      />

      <SectionTitle>{t("address", "Address")}</SectionTitle>
      <Label htmlFor="address.street">{t("street", "Street")}</Label>
      <Input
        id="address.street"
        name="address.street"
        value={formik.values.address.street}
        onChange={formik.handleChange}
        autoComplete="address-line1"
        $hasError={
          !!formik.errors.address?.street && !!formik.touched.address?.street
        }
      />
      <FieldError>
        {formik.touched.address?.street && formik.errors.address?.street}
      </FieldError>

      <Label htmlFor="address.city">{t("city", "City")}</Label>
      <Input
        id="address.city"
        name="address.city"
        value={formik.values.address.city}
        onChange={formik.handleChange}
        autoComplete="address-level2"
        $hasError={
          !!formik.errors.address?.city && !!formik.touched.address?.city
        }
      />
      <FieldError>
        {formik.touched.address?.city && formik.errors.address?.city}
      </FieldError>

      <Label htmlFor="address.postalCode">
        {t("postalCode", "Postal Code")}
      </Label>
      <Input
        id="address.postalCode"
        name="address.postalCode"
        value={formik.values.address.postalCode}
        onChange={formik.handleChange}
        autoComplete="postal-code"
        $hasError={
          !!formik.errors.address?.postalCode &&
          !!formik.touched.address?.postalCode
        }
      />
      <FieldError>
        {formik.touched.address?.postalCode &&
          formik.errors.address?.postalCode}
      </FieldError>

      <Label htmlFor="address.country">{t("country", "Country")}</Label>
      <Input
        id="address.country"
        name="address.country"
        value={formik.values.address.country}
        onChange={formik.handleChange}
        autoComplete="country"
        $hasError={
          !!formik.errors.address?.country && !!formik.touched.address?.country
        }
      />
      <FieldError>
        {formik.touched.address?.country && formik.errors.address?.country}
      </FieldError>

      <SectionTitle>{t("bankDetails", "Bank Details")}</SectionTitle>
      <Label htmlFor="bankDetails.bankName">{t("bankName", "Bank Name")}</Label>
      <Input
        id="bankDetails.bankName"
        name="bankDetails.bankName"
        value={formik.values.bankDetails.bankName}
        onChange={formik.handleChange}
        $hasError={
          !!formik.errors.bankDetails?.bankName &&
          !!formik.touched.bankDetails?.bankName
        }
      />
      <FieldError>
        {formik.touched.bankDetails?.bankName &&
          formik.errors.bankDetails?.bankName}
      </FieldError>

      <Label htmlFor="bankDetails.iban">{t("iban", "IBAN")}</Label>
      <Input
        id="bankDetails.iban"
        name="bankDetails.iban"
        value={formik.values.bankDetails.iban}
        onChange={formik.handleChange}
        $hasError={
          !!formik.errors.bankDetails?.iban &&
          !!formik.touched.bankDetails?.iban
        }
      />
      <FieldError>
        {formik.touched.bankDetails?.iban && formik.errors.bankDetails?.iban}
      </FieldError>

      <Label htmlFor="bankDetails.swiftCode">
        {t("swiftCode", "SWIFT Code")}
      </Label>
      <Input
        id="bankDetails.swiftCode"
        name="bankDetails.swiftCode"
        value={formik.values.bankDetails.swiftCode}
        onChange={formik.handleChange}
        $hasError={
          !!formik.errors.bankDetails?.swiftCode &&
          !!formik.touched.bankDetails?.swiftCode
        }
      />
      <FieldError>
        {formik.touched.bankDetails?.swiftCode &&
          formik.errors.bankDetails?.swiftCode}
      </FieldError>

      <SectionTitle>{t("socialMedia", "Social Media Accounts")}</SectionTitle>
      <Label htmlFor="socialLinks.facebook">Facebook</Label>
      <Input
        id="socialLinks.facebook"
        name="socialLinks.facebook"
        value={formik.values.socialLinks.facebook}
        onChange={formik.handleChange}
      />
      <Label htmlFor="socialLinks.instagram">Instagram</Label>
      <Input
        id="socialLinks.instagram"
        name="socialLinks.instagram"
        value={formik.values.socialLinks.instagram}
        onChange={formik.handleChange}
      />
      <Label htmlFor="socialLinks.twitter">Twitter</Label>
      <Input
        id="socialLinks.twitter"
        name="socialLinks.twitter"
        value={formik.values.socialLinks.twitter}
        onChange={formik.handleChange}
      />
      <Label htmlFor="socialLinks.linkedin">LinkedIn</Label>
      <Input
        id="socialLinks.linkedin"
        name="socialLinks.linkedin"
        value={formik.values.socialLinks.linkedin}
        onChange={formik.handleChange}
      />
      <Label htmlFor="socialLinks.youtube">YouTube</Label>
      <Input
        id="socialLinks.youtube"
        name="socialLinks.youtube"
        value={formik.values.socialLinks.youtube}
        onChange={formik.handleChange}
      />

      <SectionTitle>{t("logoUpload", "Upload Logo(s)")}</SectionTitle>
      <ImageUploadWithPreview
        max={5}
        defaultImages={existingImages}
        onChange={handleLogoChange}
        folder="company"
      />

      <Button
        type="submit"
        aria-label={t("save", "Save Company")}
        disabled={formik.isSubmitting}
      >
        {t("save", "Save Company")}
      </Button>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: ${({ theme }) => theme.spacings.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Label = styled.label`
  display: block;
  margin-top: ${({ theme }) => theme.spacings.md};
  margin-bottom: ${({ theme }) => theme.spacings.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacings.sm};
  margin-bottom: ${({ theme }) => theme.spacings.xs};
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const SectionTitle = styled.h4`
  margin-top: ${({ theme }) => theme.spacings.lg};
  margin-bottom: ${({ theme }) => theme.spacings.md};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const Button = styled.button`
  margin-top: ${({ theme }) => theme.spacings.lg};
  padding: ${({ theme }) => theme.spacings.sm}
    ${({ theme }) => theme.spacings.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: ${({ theme }) => theme.opacity.disabled};
    cursor: not-allowed;
  }
`;

const FieldError = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-bottom: ${({ theme }) => theme.spacings.xs};
  min-height: 18px;
`;
