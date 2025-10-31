//@ts-nocheck
export const checkIfProductIsClicked = (
  idProductInMenu: string,
  idProductClickedOn: string
) : boolean => {
  return idProductInMenu === idProductClickedOn;
};

export const getProductsToDisplay = (categoryAll: any, products: any, activeCategory: any) => {
  const productsToDisplayed = categoryAll.isActive
    ? products
    : products.filter(({ categories: categoriesFromMenu }) =>
        categoriesFromMenu?.some(
          (categoryFromMenu) => categoryFromMenu.label === activeCategory?.label
        )
      )
  return productsToDisplayed
}
