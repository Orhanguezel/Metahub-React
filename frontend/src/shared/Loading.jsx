// src/modules/shared/components/Loading.jsx
import styled from "styled-components";

const Loading = () => <LoadingText>Loading...</LoadingText>;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default Loading;
