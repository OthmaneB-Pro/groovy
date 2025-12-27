import styled from "styled-components";
import { useOrderContext } from "@/context/OrderContext";
import { formatPrice } from "@/utils/maths";
import Card from "@/components/reusable-ui/Card";
import EmptyCatalogProductsClient from "@/components/pages/order/Main/MainLeftSide/CatalogProducts/EmptyCatalogProductsClient";
import { IMAGE_COMING_SOON, IMAGE_NO_STOCK } from "@/constants/product";
import { isEmpty } from "@/utils/array";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { convertStringToBoolean } from "@/utils/string";
import RibbonAnimated from "../CatalogProducts/RibbonAnimated";
import { useParams } from "react-router-dom";
import { Menu } from "@/types/Menu";
import { checkIfProductIsClicked } from "../CatalogProducts/helper";
import { theme } from "@/theme";
import { EMPTY_MENU } from "@/constants/menus";
import EmptyCatalogMenusAdmin from "./EmptyCatalogMenusAdmin";

type CatalogMenusProps = {
  menus: Menu[] | undefined;
};

export default function CatalogMenus({ menus }: CatalogMenusProps) {
  const {
    isModeAdmin,
    handleAddToBasket,
    resetMenus,
    handleDeleteMenu,
    setMenuSelected,
    menuSelected,
  } = useOrderContext();

  const { username } = useParams();

  const handleMenuClick = (id: string) => {};

  const handleAddButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idProductToAdd: string
  ) => {
    event.stopPropagation();
    username && handleAddToBasket(idProductToAdd, username);
  };

  const handleCardDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idOfMenuToDelete: string
  ) => {
    event.stopPropagation();
    if (!username) return;
    handleDeleteMenu(username, idOfMenuToDelete);
    // handleDeleteBasketProduct(idOfMenuToDelete, username) // à gérer dans un ticket future
    idOfMenuToDelete === menuSelected.id && setMenuSelected(EMPTY_MENU);
  };

  let cardContainerClassName = isModeAdmin
    ? "card-container is-hoverable"
    : "card-container";

  if (menus === undefined) return null;

  if (isEmpty(menus)) {
    if (!isModeAdmin) return <EmptyCatalogProductsClient />;
    if (username)
      return <EmptyCatalogMenusAdmin onReset={() => resetMenus(username)} />;
  }

  return (
    <TransitionGroup component={CatalogMenusStyled} className="menus">
      {menus.map((menu) => {
        const isMenu = "products" in menu;
        const {
          id,
          title,
          imageSource,
          price,
          isAvailable,
          isPublicised,
          categories,
        } = menu;
        return (
          <CSSTransition classNames={"menus-animation"} key={id} timeout={300}>
            <div className={cardContainerClassName}>
              {convertStringToBoolean(isPublicised) && <RibbonAnimated />}
              <Card
                title={title}
                imageSource={imageSource || IMAGE_COMING_SOON}
                leftDescription={formatPrice(
                  typeof price === "string" ? parseFloat(price) : price
                )}
                hasDeleteButton={isModeAdmin}
                onDelete={(event) => handleCardDelete(event, id)}
                isHoverable={isModeAdmin}
                isSelected={checkIfProductIsClicked(id, menuSelected.id)}
                isMenu={isMenu}
                onAdd={(event) => handleAddButton(event, id)}
                overlapImageSource={IMAGE_NO_STOCK}
                isOverlapImageVisible={
                  convertStringToBoolean(isAvailable) === false
                }
                categories={categories}
                onClick={() => handleMenuClick(id)}
              />
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

const CatalogMenusStyled = styled.div`
  background: transparent;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 100px;
  padding: 20px 50px 150px;
  justify-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 220px;

  .card-container {
    position: relative;
    height: 330px;
    border-radius: ${theme.borderRadius.extraRound};

    &.is-hoverable {
      :hover {
        transform: scale(1.05);
        transition: ease-out 0.4s;
      }
    }
  }

  .ribbon {
    z-index: 2;
  }
`;
