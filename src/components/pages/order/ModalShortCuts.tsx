import { theme } from "@/theme";
import styled from "styled-components";

type ModalShortCutsProps = {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ModalShortCuts = ({ onClose }: ModalShortCutsProps) => {
  return (
    <ModalShortCutsStyled>
      <span className="title">💡 Pour aller plus vite :</span>
      <span>⌘ + i : Toggle "mode" admin</span>
      <span>⌘ + j : Toggle "panel" admin</span>
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
  border-radius: 5px;
  background-color: ${theme.colors.dark};

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 12px;

  .title {
    font-weight: 700;
    font-style: Bold;
    line-height: 100%;
    letter-spacing: 0%;
    vertical-align: middle;
  }

  span {
    color: white;
  }
  button {
    border: 1px solid white;
    padding: 13px 58px;
    border-radius: 25px;
    color: white;
    background-color: ${theme.colors.dark};
    cursor: pointer;

    &:hover {
      transition: 200ms;
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }
    &:active {
      color: rgba(255, 159, 27, 0.5);
      border-color: rgba(255, 159, 27, 0.5);
    }
  }
`;
