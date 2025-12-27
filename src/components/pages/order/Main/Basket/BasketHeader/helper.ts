import { Menu } from "@/types/Menu";
import { BasketProductQuantity, Product } from "@/types/Product";
import { convertStringToBoolean } from "@/utils/string";
import { getBasketItem } from "../BasketBody/helper";

export const calculateSumToPay = (
  basket: BasketProductQuantity[],
  menu: Product[] | undefined,
  menuPack: Menu[] | undefined
): number => {
  if (menu === undefined || menuPack === undefined) return 0;
  return basket.reduce((total, basketProductQuantity) => {
    let itemFound = getBasketItem(basketProductQuantity.id, menu, menuPack);

    if (!itemFound) return total;
    if (isNaN(itemFound.price)) return total;

    if (convertStringToBoolean(itemFound.isAvailable) === false) return total;
    total += itemFound.price * basketProductQuantity.quantity;
    return total;
  }, 0);
};
