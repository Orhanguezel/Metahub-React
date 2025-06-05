import { TooltipWrap } from "@/modules/users/public/styles/AuthFormStyles";
import { FaInfoCircle } from "react-icons/fa";

export default function RegisterInfoTooltip({ text }) {
  return (
    <TooltipWrap aria-label={text}>
      <FaInfoCircle size={16} />
      <span>{text}</span>
    </TooltipWrap>
  );
}
