//@ts-nocheck
import { useState } from "react";
import { deepClone } from "@/utils/array";
import { CATEGORY_ALL } from "@/constants/categories";
import { CATEGORY_MENUS } from "@/constants/menus";
import { updateCategoriesInDB } from "@/api/categories";
import { fakeCategories } from "@/fakeData/fakeCategories";
// import { updateMenus } from "@/api/product";
import { Category } from "@/types/Category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(
    fakeCategories.LARGE
  );
  const [categoryAll, setCategoryAll] = useState<Category>(CATEGORY_ALL);
  const [categoryMenus, setCategoryMenus] = useState<Category>(CATEGORY_MENUS);

  const handleAddCategory = (categoryToAdd: Category, username: string) => {
    if (!categories) return;
    const categoriesCopy = deepClone(categories);
    const categoriesUpdated = [categoryToAdd, ...categoriesCopy];
    setCategories(categoriesUpdated);
    updateCategoriesInDB(username, categoriesUpdated);
  };

  const handleDeleteCategory = (
    idOfProductToDelete: string,
    username: string
  ) => {
    if (!categories) return;
    const menuCopy = deepClone(categories);

    const menuUpdated = menuCopy.filter(
      (product) => product.id !== idOfProductToDelete
    );

    setCategories(menuUpdated);
    // updateMenus(username, menuUpdated)
  };

  const toggleAllCategories = () => {
    const categoriesUpdated = categories.map((category) => ({
      ...category,
      isActive: false, // Désactiver "tous les filtres produit individuels"
    }));

    setCategoryAll({ ...categoryAll, isActive: true });
    setCategoryMenus({ ...categoryMenus, isActive: false });
    setCategories(categoriesUpdated);
  };

  const toggleCategoryById = (idCategoryToToggle: string) => {
    const categoriesUpdated = categories.map((category) => ({
      ...category,
      isActive: category.id === idCategoryToToggle,
    }));

    setCategoryAll({ ...categoryAll, isActive: false }); // Désactiver le bouton "Tous"
    setCategoryMenus({ ...categoryMenus, isActive: false }); // Désactiver le bouton "Menus"
    setCategories(categoriesUpdated);
  };

  const toggleMenusCategory = () => {
    const isCurrentlyActive = categoryMenus.isActive ?? false;
    if (isCurrentlyActive) return;
    setCategoryMenus({ ...categoryMenus, isActive: true });

    const categoriesUpdated = categories.map((category) => ({
      ...category,
      isActive: false,
    }));
    setCategories(categoriesUpdated);

    // 3. Désactiver aussi le bouton "Tous"
    setCategoryAll({ ...categoryAll, isActive: false });
  };

  const handleEditCategory = (
    productBeingEdited: Category,
    username: string
  ) => {
    if (!categories) return;
    const menuCopy = deepClone(categories);

    const indexOfProductToEdit = categories.findIndex(
      (menuProduct) => menuProduct.id === productBeingEdited.id
    );
    menuCopy[indexOfProductToEdit] = productBeingEdited;

    setCategories(menuCopy);
    // updateMenus(username, menuCopy)
  };

  const resetCategories = (username: string) => {
    setCategories(fakeCategories.SMALL);
    // updateMenus(username, fakeMenu.SMALL)
  };

  return {
    categories,
    setCategories,
    handleAddCategory,
    handleDeleteCategory,
    handleEditCategory,
    resetCategories,
    toggleCategoryById,
    categoryAll,
    toggleAllCategories,
    toggleMenusCategory,
    categoryMenus,
  };
};
