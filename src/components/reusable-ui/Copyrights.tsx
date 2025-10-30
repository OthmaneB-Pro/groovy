import { theme } from "@/theme";
import styled from "styled-components";

type CopyrightsProps = {
  className?: string;
};

export default function Copyrights({ className }: CopyrightsProps) {
  return (
    <CopyrightsStyled className={className}>
      <span>© 2025 Groovy Burger — Tous droits réservés.</span>
      <span>Made with ❤️ by Othmane</span>
    </CopyrightsStyled>
  );
}

const CopyrightsStyled = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 2%;
  color: ${theme.colors.white};
  font-family: ${theme.fonts.family.openSans};
  font-size: ${theme.fonts.size.SM};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  pointer-events: none;
`;
