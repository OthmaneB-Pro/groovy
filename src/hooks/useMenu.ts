import { Menu } from "@/types/Menu";
import { deepClone } from "@/utils/array";
import { useState } from "react";

export const useMenu = () => {
  const [menuPack, setMenuPack] = useState<Menu[] | []>([]);

  const handleAddMenu = (newMenu: Menu) => {
    if (menuPack) {
      const menuCopy = deepClone(menuPack);
      const menuUpdated = [newMenu, ...menuCopy];
      setMenuPack(menuUpdated);
    }
  };

  const handleDeleteMenu = (idMenu: string) => {
    const menuCopy = deepClone(menuPack);
    const deleteMenuById = menuCopy.filter((MenuId) => MenuId.id !== idMenu);
    setMenuPack(deleteMenuById);
  };

  return { handleAddMenu, handleDeleteMenu, menuPack, setMenuPack };
};
