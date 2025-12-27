import { Category } from "./Category"
import { Menu } from "./Menu"
import { Product } from "./Product"

export type User = {
  menu: Product[]
  username: string
  categories: Category[]
  menuPack: Menu[]
}
