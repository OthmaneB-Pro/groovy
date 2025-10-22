import { useState } from "react";
import {
  deepClone,
  findObjectById,
  findIndexById,
  removeObjectById,
} from "@/utils/array";
import { setLocalStorage } from "@/utils/window";
import { BasketProductQuantity } from "@/types/Product";

export const useBasket = () => {
  const [basket, setBasket] = useState<BasketProductQuantity[]>([]);

  const handleAddToBasket = (idProductToAdd: string, username: string) => {
    const basketCopy = deepClone(basket);
    const productAlreadyInBasket = findObjectById(idProductToAdd, basketCopy);

    if (productAlreadyInBasket) {
      incrementProductAlreadyInBasket(idProductToAdd, basketCopy, username);
      return;
    }

    createNewBasketProductQuantity(
      idProductToAdd,
      basketCopy,
      setBasket,
      username
    );
  };

  const incrementProductAlreadyInBasket = (
    idProductToAdd: string,
    basketCopy: BasketProductQuantity[],
    username: string
  ) => {
    const indexOfBasketProductQuantityToIncrement = findIndexById(
      idProductToAdd,
      basketCopy
    );
    basketCopy[indexOfBasketProductQuantityToIncrement].quantity += 1;
    setBasket(basketCopy);
    setLocalStorage(username, basketCopy);
  };

  const createNewBasketProductQuantity = (
    idProductToAdd: string,
    basketCopy: BasketProductQuantity[],
    setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
    username: string
  ) => {
    const newBasketProductQuantity = { id: idProductToAdd, quantity: 1 };
    const newBasket = [newBasketProductQuantity, ...basketCopy];
    setBasket(newBasket);
    setLocalStorage(username, newBasket);
  };

  const handleDeleteBasketProductQuantity = (
    idBasketProductQuantity: string,
    username: string
  ) => {
    const basketUpdated = removeObjectById(idBasketProductQuantity, basket);
    setBasket(basketUpdated);
    setLocalStorage(username, basketUpdated);
  };

  return {
    basket,
    setBasket,
    handleAddToBasket,
    handleDeleteBasketProductQuantity,
  };
};
