import { Menu } from "@/types/Menu";
import { deepClone } from "@/utils/array";
import { useState } from "react";

export const useMenu = () => {
  const [menu, setMenu] = useState<Menu[] | undefined>(undefined);

  const handleAddMenu = (newProduct: Menu) => {
    if (menu) {
      const menuCopy = deepClone(menu);
      const menuUpdated = [newProduct, ...menuCopy];
      setMenu(menuUpdated);
    }
  };

  return {handleAddMenu};
};
