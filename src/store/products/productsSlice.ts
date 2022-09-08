import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import initialState from './initialState'

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
