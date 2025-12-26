import { getMenu } from "@/api/product";
import { getLocalStorage } from "@/utils/window";
import { getCategories } from "@/api/categories";
import { BasketProductQuantity, Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { Menu } from "@/types/Menu";
import { getMenus } from "@/api/menus";

const intialiseProducts = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<Product[] | undefined>>
) => {
  const productsReceived = await getMenu(username);
  setMenu(productsReceived);
};

const intialiseMenus = async (
  username: string,
  setMenuPack: React.Dispatch<React.SetStateAction<Menu[] | undefined>>
) => {
  const menusReceived = await getMenus(username);
  if (!menusReceived) {
    setMenuPack([]);
    return;
  }
  setMenuPack(menusReceived);
};

const intialiseBasket = (
  username: string,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>
) => {
  const basketReceived = getLocalStorage(username); // localStorage est synchrone, pas besoin de "await".
  if (basketReceived) setBasket(basketReceived as BasketProductQuantity[]);
};

const intialiseCategories = async (
  username: string,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  const categoriesReceived = await getCategories(username);
  if (categoriesReceived) {
    setCategories(categoriesReceived as Category[]);
  }
};

export const initialiseUserSession = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  setMenuPack: React.Dispatch<React.SetStateAction<Menu[] | undefined>>
) => {
  await intialiseProducts(username, setMenu);
  intialiseBasket(username, setBasket);
  await intialiseCategories(username, setCategories);
  intialiseMenus(username, setMenuPack);
};
