// src/modules/users/public/components/auth/AuthFormStyles.js

import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  max-width: 840px;
  margin: ${({ theme }) => theme.spacing.xxl} auto ${({ theme }) => theme.spacing.lg};
  padding: clamp(2.2rem, 6vw, 3.6rem) clamp(1.5rem, 5vw, 2.6rem);
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.form};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: clamp(1.1rem, 3vw, 2.1rem);
  border: ${({ theme }) => theme.borders.thick} ${({ theme }) => theme.colors.inputBorder};
  transition: background ${({ theme }) => theme.transition.normal}, box-shadow ${({ theme }) => theme.transition.normal}, border-color ${({ theme }) => theme.transition.normal};

  ${({ theme }) => theme.media.small} {
    max-width: 98vw;
    padding: 1.1rem 0.4rem;
    border-radius: ${({ theme }) => theme.radii.lg};
    gap: 1rem;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: clamp(1.1rem, 2vw, 1.7rem);
  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.textLight};
    letter-spacing: 0.03em;
    text-shadow: 0 1px 8px #0005;
  }
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.12rem;
  padding: 0.44em 1.1em;
  width: 100%;
  border: 2.2px solid
    ${({ $hasError, theme }) => $hasError ? theme.colors.danger : theme.colors.inputBorder};
  background: ${({ theme }) => theme.colors.inputBackgroundLight};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 1px 14px 0 #0a0a0a14;
  transition: border-color ${({ theme }) => theme.transition.normal}, box-shadow ${({ theme }) => theme.transition.normal}, background ${({ theme }) => theme.transition.fast};
  z-index: 1;

  &:focus-within {
    border-color: ${({ $hasError, theme }) => $hasError ? theme.colors.danger : theme.colors.inputBorderFocus};
    background: ${({ theme }) => theme.colors.inputBackgroundSofter};
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.colors.inputBorderFocus},
      0 2px 18px 0 #0005;
    animation: pulseGlow 1.8s cubic-bezier(.45,1.1,.45,1) infinite;
  }

  @keyframes pulseGlow {
    0% {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.inputBorderFocus}, 0 2px 18px 0 #0005;
    }
    60% {
      box-shadow: 0 0 0 6px ${({ theme }) => theme.colors.inputBorderFocus}cc, 0 2px 22px 0 #000a;
    }
    100% {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.inputBorderFocus}, 0 2px 18px 0 #0005;
    }
  }

  ${({ theme }) => theme.media.small} {
    padding: 0.34em 0.6em;
    gap: 0.6rem;
  }
`;

export const Icon = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.87;
  font-size: 1.18em;
  filter: drop-shadow(0 2px 10px #0008);
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 0.74em 0;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 500;
  letter-spacing: 0.01em;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    opacity: 1;
    font-style: italic;
    font-size: 0.98em;
    letter-spacing: 0.02em;
    text-shadow: 0 2px 8px #0006;
  }

  &:focus {
    outline: none;
  }
`;

export const TogglePassword = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.21em;
  display: flex;
  align-items: center;
  padding: 0 0.35em;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primaryHover};
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 0.32rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
  letter-spacing: 0.01em;
  font-weight: 500;
  text-shadow: 0 2px 6px #0009;
`;

export const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: 0.7rem;

  ${({ theme }) => theme.media.small} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7em;

  input[type="checkbox"] {
    width: 1.13em;
    height: 1.13em;
    border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.borderLight};
    border-radius: ${({ theme }) => theme.radii.sm};
    accent-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    margin-right: 0.29em;
    cursor: pointer;
    transition: border-color ${({ theme }) => theme.transition.fast}, box-shadow ${({ theme }) => theme.transition.fast};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.backgroundSecondary}, 0 1px 8px #0007;

    &:checked {
      background: ${({ theme }) => theme.colors.inputBackgroundLight};
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryTransparent};
    }
  }

  label {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    letter-spacing: 0.01em;
    text-shadow: 0 1px 4px #0004;
    user-select: none;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primaryLight},
    ${({ theme }) => theme.colors.primary}
  );
  color: ${({ theme }) => theme.colors.buttonText};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.buttonBorder || theme.colors.inputBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.button};
  transition: background ${({ theme }) => theme.transition.fast}, transform 0.13s, color 0.13s, border-color ${({ theme }) => theme.transition.fast};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.45s cubic-bezier(0.54, 1.4, 0.62, 1);
    z-index: 1;
  }

  &:hover:not(:disabled),
  &:focus {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primaryHover},
      ${({ theme }) => theme.colors.primaryLight}
    );
    color: #fff;
    border-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1.5px) scale(1.012);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.54;
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.disabled};
  }
`;

export const AltAction = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: ${({ theme }) => theme.borders.dashed} ${({ theme }) => theme.colors.inputBorder};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  letter-spacing: 0.01em;

  ${({ theme }) => theme.media.small} {
    font-size: 97%;
    margin-top: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.sm};
  }
`;


export const InputIcon = styled.div`
  color: ${({ theme }) => theme.colors.inputIcon};
  opacity: 0.97;
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-right: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  filter: drop-shadow(0 2px 10px #0008);
`;

export const Terms = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
  margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.lg} 0`};
  letter-spacing: 0.01em;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-shadow: 0 1px 8px #000a;
  opacity: 0.97;

  a {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    text-decoration: underline;
    text-shadow: 0 2px 8px #0008;
    transition: color ${({ theme }) => theme.transition.fast}, text-shadow ${({ theme }) => theme.transition.fast};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.primaryHover};
      text-shadow: 0 4px 18px ${({ theme }) => theme.colors.primaryTransparent};
    }
  }
`;

export const StepperNavBar = styled.div`
  width: 100vw;
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  background: ${({ theme }) => theme.colors.backgroundAlt}e8;
  border-radius: 0;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;

  ${({ theme }) => theme.media.small} {
    padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  }
`;

export const StepperBar = styled.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;

  ${({ theme }) => theme.media.small} {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const StepItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.medium};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  border-bottom: 2.5px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primaryTransparent : "transparent"};
  border-radius: ${({ theme }) => `${theme.radii.sm} ${theme.radii.sm} 0 0`};
  padding: 0 ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xs};
  transition: color ${({ theme }) => theme.transition.fast}, border ${({ theme }) => theme.transition.fast}, background ${({ theme }) => theme.transition.fast};
`;

export const StepIndex = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7em;
  height: 1.7em;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryHover})`
      : theme.colors.inputBackground};
  color: ${({ $active, theme }) =>
    $active ? "#fff" : theme.colors.textSecondary};
  border: ${({ theme }) => theme.borders.thin} ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.border};
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadows.sm : "none")};
  margin-right: ${({ theme }) => theme.spacing.xs};
  transition: background ${({ theme }) => theme.transition.fast}, color ${({ theme }) => theme.transition.fast}, border ${({ theme }) => theme.transition.fast}, box-shadow ${({ theme }) => theme.transition.fast};
`;


export const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.medium};
  color: inherit;
  margin-bottom: 1px;
  white-space: nowrap;
  ${({ theme }) => theme.media.small} {
    font-size: 94%;
  }
`;

export const StepConnector = styled.span`
  width: 2.2rem;
  height: 2.5px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.xs};
  opacity: 0.36;
  ${({ theme }) => theme.media.small} {
    width: 1rem;
    margin: 0 2px;
  }
`;

export const TooltipText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.17em 0.8em;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  letter-spacing: 0.017em;
  margin-left: ${({ theme }) => theme.spacing.xs};
  position: relative;
  z-index: 11;
  text-shadow: 0 2px 8px #0003;
  opacity: 0.97;
  border: none;
`;

export const TooltipWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  min-height: 2em;
  width: 100%;

  svg {
    color: ${({ theme }) => theme.colors.info};
    margin-top: 2px;
    flex-shrink: 0;
    font-size: 1.08em;
    filter: drop-shadow(0 1.5px 6px #0003);
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.56;
    font-size: inherit;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    word-break: break-word;
    flex: 1;
    text-shadow: 0 2px 8px #0002;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: ${({ theme }) => `${theme.spacing.xl} auto`};
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 6px 38px 2px ${({ theme }) => theme.colors.primaryTransparent}, ${({ theme }) => theme.shadows.form};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.media.medium} {
    max-width: 98vw;
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.sm}`};
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  ${({ theme }) => theme.media.small} {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xs}`};
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

export const IconWrap = styled.div`
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    filter: drop-shadow(0 3px 10px ${({ theme }) => theme.colors.success});
    font-size: 2.6rem;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.title};
  letter-spacing: 0.02em;
  text-shadow: 0 2px 12px ${({ theme }) => theme.colors.primaryTransparent};
`;

export const Desc = styled.p`
  color: ${({ theme }) => theme.colors.textAlt};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-shadow: 0 1px 10px #000a;
`;

export const UserMail = styled.div`
  color: ${({ theme }) => theme.colors.info};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.98;
  word-break: break-word;
  text-shadow: 0 1px 8px #000a;
`;

export const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryHover}
  );
  color: ${({ theme }) => theme.colors.buttonText};
  border: ${({ theme }) => theme.borders.normal} ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.primaryTransparent};
  transition: background ${({ theme }) => theme.transition.fast}, border ${({ theme }) => theme.transition.fast}, transform ${({ theme }) => theme.transition.fast};
  position: relative;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.18),
      transparent
    );
    transition: left 0.5s ease;
    z-index: 1;
  }

  &:hover:not(:disabled),
  &:focus {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primaryHover},
      ${({ theme }) => theme.colors.primary}
    );
    border-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: translateY(-2px) scale(1.017);
    &::before {
      left: 100%;
    }
  }
  &:active {
    opacity: 0.92;
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.62;
    cursor: not-allowed;
  }
`;


export const RedirectMsg = styled.div`
  color: ${({ theme }) => theme.colors.info};
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.85;
  text-align: center;
`;

export const Resend = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.info};
  color: ${({ theme }) => theme.colors.buttonText};
  border: 1.5px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  box-shadow: 0 1px 8px ${({ theme }) => theme.colors.info}44, ${({ theme }) => theme.shadows.button};
  transition: background 0.18s, color 0.17s, border 0.13s;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover:not(:disabled),
  &:focus {
    background: ${({ theme }) => theme.colors.primaryHover};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &:disabled {
    opacity: 0.64;
    cursor: not-allowed;
  }
`;




export const ResendBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ResendButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-left: ${({ theme }) => theme.spacing.xs};
  transition: color 0.17s, text-shadow 0.15s;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primaryHover};
    text-shadow: 0 1px 10px ${({ theme }) => theme.colors.primaryTransparent};
  }
`;


export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const ActionButton = styled.button`
  flex: 1 1 170px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryHover}
  );
  color: ${({ theme }) => theme.colors.buttonText};
  border: 1.5px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  box-shadow: 0 2px 8px 0 ${({ theme }) => theme.colors.primaryTransparent}, ${({ theme }) => theme.shadows.button};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s, border 0.16s, transform 0.13s;

  &:hover,
  &:focus {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primaryHover},
      ${({ theme }) => theme.colors.primary}
    );
    border-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    transform: translateY(-2px) scale(1.018);
  }
  &:active {
    opacity: 0.92;
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    margin-right: 8px;
    font-size: 1.1em;
  }
`;

export const AltButton = styled.button`
  flex: 1 1 170px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  box-shadow: 0 2px 8px 0 ${({ theme }) => theme.colors.primaryTransparent};
  transition: background 0.18s, color 0.18s, border 0.15s;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.buttonText};
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1em;
  }
`;

export const Success = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 0.5em;
  text-align: center;
  line-height: 1.4;
  text-shadow: 0 1px 12px ${({ theme }) => theme.colors.success}44;
`;


