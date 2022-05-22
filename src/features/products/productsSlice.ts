import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface Product {
  name: string
  price: number
  quantity: number
}

export interface ProductChange {
  name: string,
  changes: Partial<Product>
}

export type ProductsState = Array<Product>

const initialState: ProductsState = [
  {
    "name": "Volkswagen Polo V",
    "price": 850000,
    "quantity": 6
  },
  {
    "name": "Kia Venga I",
    "price": 920000,
    "quantity": 5
  },
  {
    "name": "Volkswagen Caddy Maxi IV",
    "price": 2051760,
    "quantity": 3
  },
  {
    "name": "Skoda Rapid I",
    "price": 869000,
    "quantity": 15
  },
  {
    "name": "Mitsubishi Outlander III",
    "price": 1195000,
    "quantity": 9
  },
  {
    "name": "LADA (ВАЗ) Kalina I",
    "price": 189000,
    "quantity": 20
  }
]

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Product>) => {
      state.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((p: Product) => p.name === action.payload)
      if (index !== -1)
        state.splice(index, 1)
    },
    change: (state, action: PayloadAction<ProductChange>) => {
      const newState: Array<Product> = JSON.parse(JSON.stringify(state))
      const index = state.findIndex((p: Product) => p.name === action.payload.name)
      newState[index] = { ...newState[index], ...action.payload.changes }
      return newState
    }
  }
})

export const { create, remove, change } = productsSlice.actions

export const selectProducts = (state: RootState) => state.products

export default productsSlice.reducer
