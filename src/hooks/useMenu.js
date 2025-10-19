import { useState } from "react"
import { fakeMenu } from "../fakeData/fakeMenu"
import { deepClone } from "../utils/array"
import { syncBothMenus } from "../api/product"

export const useMenu = () => {
  const [menu, setMenu] = useState()

  const handleAdd = (newProduct, username) => {
    const menuCopy = deepClone(menu)
    const menuUpdated = [newProduct, ...menuCopy]
    setMenu(menuUpdated)
    syncBothMenus(username, menuUpdated)
  }

  const handleDelete = (idOfProductToDelete, username) => {
  
    const menuCopy = deepClone(menu)
    const menuUpdated = menuCopy.filter((product) => product.id !== idOfProductToDelete)
    console.log("menuUpdated: ", menuUpdated)
    setMenu(menuUpdated)
    syncBothMenus(username, menuUpdated)
  }

  const handleEdit = (productBeingEdited, username) => {
    const menuCopy = deepClone(menu)
    const indexOfProductToEdit = menu.findIndex(
      (menuProduct) => menuProduct.id === productBeingEdited.id
    )
    menuCopy[indexOfProductToEdit] = productBeingEdited
    setMenu(menuCopy)
    syncBothMenus(username, menuCopy)
  }

  const resetMenu = (username) => {
    setMenu(fakeMenu.LARGE)
    syncBothMenus(username, fakeMenu.LARGE)
  }

  return { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu }
}
