import { Menu } from "@/types/Menu";
import { deepClone } from "@/utils/array";
import { useState } from "react";

export const useMenu = () => {
  const [menuPack, setMenuPack] = useState<Menu[] | []>([]);

  const handleAddMenu = (newProduct: Menu) => {
    if (menuPack) {
      const menuCopy = deepClone(menuPack);
      const menuUpdated = [newProduct, ...menuCopy];
      setMenuPack(menuUpdated);
    }
  };

  return { handleAddMenu, menuPack, setMenuPack };
};
