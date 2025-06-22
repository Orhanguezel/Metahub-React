import React from "react";
import styled from "styled-components";
import RegisterStepper from "@/modules/users/public/components/stepper/RegisterStepper";

const RegisterPage = () => (
  <PageWrapper>
    <FormColumn>
      <FormTitle>Create Account</FormTitle>
      <RegisterStepper />
    </FormColumn>
  </PageWrapper>
);

export default RegisterPage;

// ---- STYLES (KOPYA) ----

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 120px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.grey || "#f4f4f4"};
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const FormColumn = styled.div`
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
const FormTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin.top: 220px;
  text-align: center;
  color: #333;
`;
