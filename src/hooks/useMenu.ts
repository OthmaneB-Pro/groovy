import { useState } from "react";
import { fakeMenu } from "@/fakeData/fakeMenu";
import { deepClone } from "@/utils/array";
import { updateMenus } from "@/api/product";
import { Product } from "@/types/Product";

export const useMenu = () => {
  const [menu, setMenu] = useState<Product[] | undefined>(undefined);

  const handleAdd = (newProduct: Product, username: string) => {
    if (menu) {
      const menuCopy = deepClone(menu);
      const menuUpdated = [newProduct, ...menuCopy];
      setMenu(menuUpdated);
      updateMenus(username, menuUpdated);
    }
  };

  const handleDelete = (idOfProductToDelete: string, username: string) => {
    if (menu) {
      const menuCopy = deepClone(menu);
      const menuUpdated = menuCopy.filter(
        (product) => product.id !== idOfProductToDelete
      );
      console.log("menuUpdated: ", menuUpdated);
      setMenu(menuUpdated);
      updateMenus(username, menuUpdated);
    }
  };

  const handleEdit = (productBeingEdited: Product, username: string) => {
    if (menu) {
      const menuCopy = deepClone(menu);
      const indexOfProductToEdit = menu.findIndex(
        (menuProduct) => menuProduct.id === productBeingEdited.id
      );
      menuCopy[indexOfProductToEdit] = productBeingEdited;
      setMenu(menuCopy);
      updateMenus(username, menuCopy);
    }
  };

  const resetMenu = (username: string) => {
    setMenu(fakeMenu.LARGE);
    updateMenus(username, fakeMenu.LARGE);
  };

  return { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu };
};
