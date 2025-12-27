import { updateMenusInDB } from "@/api/menus";
import { fakeMenu } from "@/fakeData/fakeMenus";
import { Menu } from "@/types/Menu";
import { deepClone } from "@/utils/array";
import { useState } from "react";

export const useMenu = () => {
  const [menuPack, setMenuPack] = useState<Menu[] | undefined>();

  const handleAddMenu = (username: string, newMenu: Menu) => {
    if (menuPack) {
      const menuCopy = deepClone(menuPack);
      const menuUpdated = [newMenu, ...menuCopy];
      setMenuPack(menuUpdated);
      updateMenusInDB(username, menuUpdated);
    }
  };

  const handleDeleteMenu = (username: string, idMenu: string) => {
    if (menuPack) {
      const menuCopy = deepClone(menuPack);
      const menuUpdated = menuCopy.filter((menu) => menu.id !== idMenu);
      setMenuPack(menuUpdated);
      updateMenusInDB(username, menuUpdated);
    }
  };
  const resetMenus = (username: string) => {
    setMenuPack(fakeMenu.MEDIUM);
    updateMenusInDB(username, fakeMenu.MEDIUM);
  };

  return { handleAddMenu, handleDeleteMenu, menuPack, setMenuPack, resetMenus };
};
