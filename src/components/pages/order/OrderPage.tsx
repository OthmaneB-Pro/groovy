import styled from "styled-components";
import { theme } from "@/theme";
//@ts-ignore
import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";
import { initialiseUserSession } from "./helpers/initialiseUserSession";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOrderContext } from "@/context/OrderContext";

export default function OrderPage() {
  const { username } = useParams();
  const { setMenu, setBasket } = useOrderContext();

  useEffect(() => {
    username && initialiseUserSession(username, setMenu, setBasket);
  }, []);

  return (
    <OrderPageStyled>
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
