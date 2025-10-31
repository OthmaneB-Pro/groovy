import styled from "styled-components";
import { useOrderContext } from "@/context/OrderContext";
import { theme } from "@/theme";
import { formatPrice } from "@/utils/maths";
import CasinoEffect from "@/components/reusable-ui/CasinoEffect";
import Header from "@/components/reusable-ui/Header";
import { calculateSumToPay } from "./helper";
import { Product } from "@/types/Product";

export default function BasketHeader() {
  const { basket, menu } = useOrderContext();

  const sumToPay = calculateSumToPay(basket, menu as Product[]);

  return (
    <Header>
      <BasketHeaderStyled>
        <span className="total">Total</span>
        <CasinoEffect count={formatPrice(sumToPay)} />
      </BasketHeaderStyled>
    </Header>
  );
}

const BasketHeaderStyled = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.primary};
  font-family: "Amatic SC", cursive;
  font-size: ${theme.fonts.size.P4};
  font-weight: ${theme.fonts.weights.bold};
  letter-spacing: 2px;
`;
