import styled from "styled-components";
import { theme } from "@/theme";
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";
import { initialiseUserSession } from "./helpers/initialiseUserSession";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOrderContext } from "@/context/OrderContext";
import { ModalShortCuts } from "@/components/pages/order/ModalShortCuts";

export default function OrderPage() {
  const { username } = useParams();
  const { setMenu, setBasket, setIsModeAdmin, setIsCollapsed, isModeAdmin } =
    useOrderContext();
  const [isModal, setIsModal] = useState(true);

  useEffect(() => {
    username && initialiseUserSession(username, setMenu, setBasket);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "i") {
        event.preventDefault();
        setIsModeAdmin((prev) => !prev);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "j") {
        event.preventDefault();
        setIsCollapsed((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleKeyUp);
    };
  }, []);

  return (
    <OrderPageStyled>
      {isModeAdmin && isModal && <ModalShortCuts onClose={() => setIsModal(false)} />}
      <div className="container">
        <Navbar />
        <Main />
      </div>
    </OrderPageStyled>
  );
}

const OrderPageStyled = styled.div`
  background: ${theme.colors.greyBlue};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background: red;
    height: 95vh;
    width: 1400px;
    display: flex;
    flex-direction: column;
    border-radius: ${theme.borderRadius.extraRound};
  }
`;
