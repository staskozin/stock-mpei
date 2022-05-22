import { Product } from './productSlice'

const MAX_QUANTITY = 256

export function validateProduct(product: Product): boolean {
  if (product.name === '') {
    window.alert('Не указано наименование товара')
    return false
  }
  if (product.price < 0) {
    window.alert('Цена меньше нуля')
    return false
  }
  if (product.quantity < 0) {
    window.alert('Количество товара меньше нуля')
    return false
  }
  return true
}

export function validateCreateProduct(product: Product, products: Array<Product>): boolean {
  if ((products.reduce((acc, cur) => acc + cur.quantity, 0) + product.quantity) > MAX_QUANTITY) {
    window.alert(`Количество товаров превышает ${MAX_QUANTITY}`)
    return false
  }
  if (products.find((p: Product) => p.name === product.name)) {
    window.alert('Товар с таким наименованием уже существует')
    return false
  }
  return validateProduct(product)
}

export function validateProducts(products: Array<Product>): boolean {
  if ((products.reduce((acc, cur) => acc + cur.quantity, 0)) > MAX_QUANTITY) {
    window.alert(`Количество товаров превышает ${MAX_QUANTITY}`)
    return false
  }
  const set = new Set(products.map(p => p.name))
  if (set.size < products.length) {
    window.alert('Товар с таким названием уже существует')
    return false
  }
  return true
}
