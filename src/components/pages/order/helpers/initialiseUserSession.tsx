import { getCategories } from "@/api/categories";
import { getMenu } from "@/api/product";
import { Category } from "@/types/Category";
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
  const basketReceived = getLocalStorage(username);
  if (basketReceived) setBasket(basketReceived as BasketProductQuantity[]);
};

const intialiseCategories = async (
  username: string,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  const categoriesReceived = await getCategories(username);
  setCategories(categoriesReceived as Category[]);
};

export const initialiseUserSession = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
): Promise<void> => {
  if (!username) return;
  await intialiseMenu(username, setMenu);
  await intialiseCategories(username, setCategories);
  intialiseBasket(username, setBasket);
};
