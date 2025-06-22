import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

export default function RegisterInfoTooltip({ text }) {
  return (
    <TooltipWrap aria-label={text}>
      <FaInfoCircle size={16} />
      <span>{text}</span>
    </TooltipWrap>
  );
}

// --- Stil ---
const TooltipWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 13px;
  padding: 3px 10px;
  margin-bottom: 6px;
  color: #5dc7e0;

  svg {
    color: #5dc7e0;
    margin-top: 2px;
    flex-shrink: 0;
    font-size: 1.08em;
    filter: drop-shadow(0 1.5px 6px #0003);
  }

  span {
    color: #c2c2c2;
    line-height: 1.56;
    font-size: 13px;
    font-weight: 400;
    word-break: break-word;
    flex: 1;
    text-shadow: 0 2px 8px #0002;
  }
`;
