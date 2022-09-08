import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { Product } from '../products/productsSlice'
import initialState from './initialState'

export interface Order {
  number: number
  date: string
  products: Array<Product>
}

export type OrdersState = Array<Order>

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Order>) => {

    },
    remove: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((o: Order) => o.number === action.payload)
      if (index !== -1)
        state.splice(index, 1)
    }
  }
})

export const { create, remove } = ordersSlice.actions

export const selectOrders = (state: RootState) => state.orders

export default ordersSlice.reducer
