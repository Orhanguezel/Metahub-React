import styled from "styled-components";

// Ana renkleri theme'den çekiyoruz, spacing sabit!
export const Form = styled.form`
  width: 100%;
  max-width: 420px;
  margin: 40px auto;
  padding: 32px 24px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 14px;
  box-shadow: 0 6px 24px #0002;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 4px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  width: 100%;
  border: 2px solid ${({ $hasError, theme }) =>
    $hasError ? theme.colors.accent : theme.colors.grey};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.grey + "15"};
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 10px 0;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 500;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 1;
    font-style: italic;
    font-size: 0.97em;
  }
  &:focus {
    outline: none;
  }
`;

export const TogglePassword = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.12em;
  padding: 0 6px;
  display: flex;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  margin-top: 3px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px 0;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.16s, color 0.13s;

  &:hover:not(:disabled),
  &:focus {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    color: #fff;
    transform: translateY(-2px) scale(1.012);
  }
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AltAction = styled.div`
  text-align: center;
  margin-top: 28px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textLight};
`;

// Stepper
export const StepperBar = styled.ol`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0;
  margin: 18px 0 28px 0;
  width: 100%;
  list-style: none;
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.grey};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent + "20" : "transparent"};
  border-radius: 8px 8px 0 0;
  padding: 0 10px;
`;

export const StepCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4em;
  height: 1.4em;
  font-size: 1em;
  font-weight: 700;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active
      ? theme.colors.primary
      : theme.colors.grey + "33"};
  color: #fff;
  border: 1.2px solid
    ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.grey};
  margin-right: 4px;
`;

export const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: inherit;
  margin-bottom: 1px;
  white-space: nowrap;
`;

export const StepConnector = styled.span`
  width: 1.5rem;
  height: 2px;
  background: ${({ theme }) => theme.colors.grey};
  border-radius: 3px;
  opacity: 0.36;
`;

export const Success = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-top: 0.5em;
  text-align: center;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: 10px;
`;

export const Icon = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  opacity: 0.87;
  font-size: 1.18em;
`;
