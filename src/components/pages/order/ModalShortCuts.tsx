import { theme } from "@/theme";
import { isMac } from "@/utils/window";
import styled from "styled-components";

type ModalShortCutsProps = {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

const raccourci = isMac() ? "⌘" : "Ctrl";

export const ModalShortCuts = ({ onClose }: ModalShortCutsProps) => {
  return (
    <ModalShortCutsStyled>
      <span className="title">💡 Pour aller plus vite :</span>
      <span>{raccourci} + i : Toggle "mode" admin</span>
      <span>{raccourci} + j : Toggle "panel" admin</span>
      <button onClick={onClose}>Ne plus afficher</button>
    </ModalShortCutsStyled>
  );
};

const ModalShortCutsStyled = styled.div`
  z-index: 10;
  width: 220px;
  height: 143px;
  position: absolute;
  top: 40px;
  left: 40px;
  border-radius: ${theme.borderRadius.round};
  background-color: ${theme.colors.dark};

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.sm};

  .title {
    font-weight: ${theme.fonts.weights.bold};
    line-height: 100%;
  }

  span {
    color: ${theme.colors.white};
  }
  button {
    border: 1px solid ${theme.colors.white};
    padding: 13px 58px;
    border-radius: 25px;
    color: ${theme.colors.white};
    background-color: ${theme.colors.dark};
    cursor: pointer;

    &:hover {
      transition: ${theme.animations.speed.quick};
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }
    &:active {
      color: rgba(255, 159, 27, 0.5);
      border-color: rgba(255, 159, 27, 0.5);
    }
  }
`;
