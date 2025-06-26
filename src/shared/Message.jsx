import styled from "styled-components";
import React from "react";

// Styled Component: tipten arındırılmış
const Message = styled.div`
  margin: ${({ theme }) => theme.spacings.xs} 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.01em;
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacings.sm};
  background: ${({ theme, $success, $error, $warning }) =>
    $success
      ? theme.colors.success + "15"
      : $error
      ? theme.colors.danger + "15"
      : $warning
      ? theme.colors.warning + "15"
      : theme.colors.backgroundAlt};
  color: ${({ theme, $success, $error, $warning }) =>
    $success
      ? theme.colors.success
      : $error
      ? theme.colors.danger
      : $warning
      ? theme.colors.warning
      : theme.colors.textSecondary};
  box-shadow: ${({ theme, $error }) =>
    $error ? theme.shadows.md : theme.shadows.sm};
  border: ${({ theme, $success, $error, $warning }) =>
    $success
      ? `${theme.borders.thin} ${theme.colors.success}`
      : $error
      ? `${theme.borders.thin} ${theme.colors.danger}`
      : $warning
      ? `${theme.borders.thin} ${theme.colors.warning}`
      : "none"};
  transition: all ${({ theme }) => theme.transition.normal};
`;

// Pure ES6 fonksiyonel component, tip yok!
function MessageBox({
  children,
  $success,
  $error,
  $warning,
  className,
  ...rest
}) {
  return (
    <Message
      $success={$success}
      $error={$error}
      $warning={$warning}
      className={className}
      {...rest}
    >
      {children}
    </Message>
  );
}

export default MessageBox;
