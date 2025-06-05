import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCompanyInfo,
  createCompany,
  updateCompanyInfo,
  resetMessages,
} from "@/modules/company/slice/companySlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { CompanyForm, CompanyInfoCard } from "@/modules/company";

export default function CompanyAdminPage() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("company");

  const { company, error, successMessage } = useAppSelector(
    (state) => state.company
  );

  useEffect(() => {
    if (!company) {
      dispatch(fetchCompanyInfo());
    }
  }, [dispatch, company]);

  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : t("genericError", "An error occurred."));
      dispatch(resetMessages());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetMessages());
    }
  }, [error, successMessage, dispatch, t]);

  const handleSubmit = (values, logos, removedLogos = []) => {
    const payload = {
      ...values,
      logos,
      removedLogos,
    };
    if (company && company._id) {
      dispatch(updateCompanyInfo({ ...company, ...payload }));
    } else {
      dispatch(createCompany(payload));
    }
  };

  return (
    <Container>
      <Title>{t("title", "Company Information")}</Title>
      <CompanyInfoCard company={company} />
      <CompanyForm
        initialValues={{
          companyName: company?.companyName || "",
          email: company?.email || "",
          phone: company?.phone || "",
          taxNumber: company?.taxNumber || "",
          handelsregisterNumber: company?.handelsregisterNumber || "",
          address: {
            street: company?.address?.street || "",
            city: company?.address?.city || "",
            postalCode: company?.address?.postalCode || "",
            country: company?.address?.country || "",
          },
          bankDetails: {
            bankName: company?.bankDetails?.bankName || "",
            iban: company?.bankDetails?.iban || "",
            swiftCode: company?.bankDetails?.swiftCode || "",
          },
          socialLinks: {
            facebook: company?.socialLinks?.facebook || "",
            instagram: company?.socialLinks?.instagram || "",
            twitter: company?.socialLinks?.twitter || "",
            linkedin: company?.socialLinks?.linkedin || "",
            youtube: company?.socialLinks?.youtube || "",
          },
          logos: company?.logos || [],
        }}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.sectionBackground};
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: center;
`;
