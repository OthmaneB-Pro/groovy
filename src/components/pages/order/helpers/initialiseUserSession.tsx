import { getMenu } from "@/api/product";
import { BasketProductQuantity, Product } from "@/types/Product";
import { getLocalStorage } from "@/utils/window";

const intialiseMenu = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<Product[] | undefined>>
): Promise<void> => {
  const menuReceived = await getMenu(username);
  setMenu(menuReceived);
};

const intialiseBasket = (
  username: string,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>
) => {
  const basketReceived = getLocalStorage(username); // localStorage est synchrone, pas besoin de "await".
  if (basketReceived) setBasket(basketReceived as BasketProductQuantity[]);
};

export const initialiseUserSession = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>
): Promise<void> => {
  if (!username) return;
  await intialiseMenu(username, setMenu);
  intialiseBasket(username, setBasket);
};
