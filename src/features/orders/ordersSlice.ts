import { Product } from "../products/productSlice"

export interface Order {
  number: number
  date: Date
  products: Array<Product>
}
