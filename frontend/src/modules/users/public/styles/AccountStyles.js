// src/modules/users/public/components/auth/AuthFormStyles.js

import styled from "styled-components";



export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: ${({ theme }) => `${theme.spacing.xl} auto`};
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.form};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.borderLight};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.media.small} {
    max-width: 98vw;
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.sm}`};
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;



export const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primaryLight}, ${({ theme }) => theme.colors.primary});
  color: ${({ theme }) => theme.colors.buttonText};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.buttonBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.button};
  transition: all ${({ theme }) => theme.durations.normal} ease;
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
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primaryHover}, ${({ theme }) => theme.colors.primaryLight});
    color: ${({ theme }) => theme.colors.textPrimary};
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
    opacity: ${({ theme }) => theme.opacity.disabled};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.disabled};
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

export const Success = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: center;
  line-height: ${({ theme }) => theme.lineHeights.normal};
  text-shadow: 0 1px 12px ${({ theme }) => theme.colors.success}44;
`;

export const ErrorMessage = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.01em;
  text-shadow: 0 2px 6px #0009;
`;


export const Section = styled.section`
  width: 100%;
  margin: ${({ theme }) => theme.spacing["2xl"]} 0;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.borderLight};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: box-shadow ${({ theme }) => theme.transition.normal}, background ${({ theme }) => theme.transition.normal}, border-color ${({ theme }) => theme.transition.normal};

  ${({ theme }) => theme.media.medium} {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
  ${({ theme }) => theme.media.small} {
    margin: ${({ theme }) => theme.spacing.lg} 0;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radii.md};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 16px ${({ theme }) => theme.colors.primaryTransparent}, 0 1px 4px #0006;

  ${({ theme }) => theme.media.small} {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;


// --- Styled Components ---
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
    margin-bottom: 0.56rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: 1.1em;
    color: ${({ theme }) => theme.colors.textLight};
    letter-spacing: 0.03em;
    text-shadow: 0 1px 8px #0005;
  }
`;



export const Input = styled.input`
  flex: 1;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 500;
  letter-spacing: 0.01em;
  box-shadow: 0 1px 6px 0 ${({ theme }) => theme.colors.primaryTransparent};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1.5px solid ${({ theme }) => theme.colors.inputBorder};
  transition: border-color ${({ theme }) => theme.transition.fast}, box-shadow ${({ theme }) => theme.transition.fast}, background ${({ theme }) => theme.transition.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    opacity: 1;
    font-style: italic;
    font-size: 0.98em;
    letter-spacing: 0.02em;
    text-shadow: 0 2px 8px #0006;
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
  &:focus-within {
    border-color: ${({ $hasError, theme }) => $hasError ? theme.colors.danger : theme.colors.inputBorderFocus};
    background: ${({ theme }) => theme.colors.inputBackgroundSofter};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.inputBorderFocus}, 0 2px 18px 0 #0005;
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




export const AddressList = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

export const AddressItem = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 1.25rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: ${({ theme }) => theme.borders.thick} ${({ theme }) => theme.colors.accent};
  box-shadow: 0 2px 18px 0 ${({ theme }) => theme.colors.primaryTransparent};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: border-color ${({ theme }) => theme.transition.fast}, background ${({ theme }) => theme.transition.fast}, box-shadow ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryHover};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    box-shadow: 0 4px 24px 0 ${({ theme }) => theme.colors.primaryTransparent};
  }
`;


export const AddressText = styled.p`
  color: ${({ theme }) => theme.colors.textAlt};
  font-size: 1.13rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  letter-spacing: 0.04em;
  margin: 0 0 1.15rem 0;
  word-break: break-word;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.7rem;
  width: 100%;
  justify-content: flex-end;

  ${({ theme }) => theme.media.small} {
    flex-direction: column;
    gap: 0.6rem;
    align-items: stretch;
  }
`;


export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textAlt};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  opacity: 0.92;
  letter-spacing: 0.01em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const UserInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
  strong {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    letter-spacing: 0.01em;
    filter: brightness(1.2);
    text-shadow: 0 1.5px 8px ${({ theme }) => theme.colors.primaryTransparent};
  }
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
`;

export const Checkbox = styled.input`
  transform: scale(1.14);
  margin-right: 0.62em;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border-radius: 0.4em;
  background: ${({ theme }) => theme.colors.inputBackground};
  box-shadow: 0 2px 6px #0003;
  border: ${({ theme }) => theme.borders.thin} ${({ theme }) => theme.colors.borderLight};
  transition: border-color ${({ theme }) => theme.transition.fast};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ImagePreview = styled.img`
  width: 148px;
  height: 148px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.circle};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: 0 4px 22px 0 ${({ theme }) => theme.colors.primaryTransparent};
  border: ${({ theme }) => theme.borders.thick} ${({ theme }) => theme.colors.borderLight};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: border-color ${({ theme }) => theme.transition.fast}, box-shadow ${({ theme }) => theme.transition.fast};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 6px 26px 0 ${({ theme }) => theme.colors.primaryTransparent};
  }

  ${({ theme }) => theme.media.small} {
    width: 110px;
    height: 110px;
  }
`;

export const FileInput = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  border: none;
  outline: none;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;
