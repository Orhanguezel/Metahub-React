import React from "react";
import styled from "styled-components";

export default function FooterLinks({ title, links }) {
  const validLinks = (links || []).filter(
    (item) => item.label?.trim() && item.href?.trim()
  );
  if (validLinks.length === 0) return null;

  return (
    <FooterBlock>
      <FooterTitle>{title}</FooterTitle>
      <FooterList>
        {validLinks.map((item, idx) => (
          <FooterListItem key={idx}>
            <StyledAnchor
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </StyledAnchor>
          </FooterListItem>
        ))}
      </FooterList>
    </FooterBlock>
  );
}

// 🎨 Styled Components

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacings.xs};
`;

const FooterBlock = styled.div`
  margin: ${({ theme }) => theme.spacings.md};
  max-width: 300px;
  text-align: center;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacings.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  text-decoration: none;
  transition: color ${({ theme }) => theme.transition.fast};
  display: inline-block;
  padding: 2px 0;
  border-bottom: 1px solid transparent;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
