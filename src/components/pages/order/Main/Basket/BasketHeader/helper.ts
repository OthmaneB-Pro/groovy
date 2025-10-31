import { BasketProductQuantity, Product } from "@/types/Product";
import { findObjectById } from "@/utils/array";
import { convertStringToBoolean } from "@/utils/string";

export const calculateSumToPay = (
  basket: BasketProductQuantity[],
  menu: Product[]
): number => {
  return basket.reduce((total, basketProduct) => {
    if (menu === undefined) return 0;

    const menuProduct = findObjectById(basketProduct.id, menu);

    if (!menuProduct) return total;
    if (isNaN(menuProduct.price)) return total;

    if (convertStringToBoolean(menuProduct.isAvailable) === false) return total;
    total += menuProduct.price * basketProduct.quantity;
    return total;
  }, 0);
};
