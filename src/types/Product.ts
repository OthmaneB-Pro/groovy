import { Category } from "./Category"

export type Product = {
  id: string
  imageSource: string
  title: string
  price: number
  quantity?: number 
  isAvailable: boolean
  isPublicised: boolean
  categories?: Category[]
}

export type BasketProductQuantity = {
  id: string
  quantity: number
}

export type BasketProduct = Product & BasketProductQuantity
