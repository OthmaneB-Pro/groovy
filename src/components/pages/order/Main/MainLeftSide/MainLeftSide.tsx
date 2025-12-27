import styled from "styled-components";
import { useOrderContext } from "@/context/OrderContext";
import { theme } from "@/theme";
import Admin from "./Admin/Admin";
import LoadingMessage from "./CatalogProducts/LoadingMessage";
import CatalogProducts from "./CatalogProducts/CatalogProducts";
import { Filters } from "./Filters";
import CatalogMenus from "./CatalogMenus/CatalogMenus";

export default function MainLeftSide() {
  const { isModeAdmin, menu, categoryMenus, menuPack } = useOrderContext();

  return (
    <MainLeftSideStyled>
      {menu === undefined ? (
        <LoadingMessage />
      ) : (
        <div className="filters-and-catalog-products">
          <Filters />
          {categoryMenus.isActive ? (
            <CatalogMenus menus={menuPack} />
          ) : (
            <CatalogProducts />
          )}
        </div>
      )}
      {isModeAdmin && <Admin />}
    </MainLeftSideStyled>
  );
}

const MainLeftSideStyled = styled.div`
  position: relative;
  overflow-y: hidden;
  display: grid;
  box-shadow: ${theme.shadows.strong};

  .filters-and-catalog-products {
    overflow-x: hidden;
  }
`;
