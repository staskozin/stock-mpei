import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Product } from '../products/productsSlice'

export interface Order {
  number: number
  date: Date
  products: Array<Product>
}

export type OrdersState = Array<Order>

const initialState: OrdersState = [
  {
    "number": 2,
    "date": new Date("2022-05-01T10:12:58.676Z"),
    "products": [
      {
        "name": "LADA (ВАЗ) Kalina I",
        "price": 189000,
        "quantity": 1
      }
    ]
  },
  {
    "number": 1,
    "date": new Date("2022-05-01T06:32:10.409Z"),
    "products": [
      {
        "name": "Volkswagen Polo V",
        "price": 850000,
        "quantity": 1
      },
      {
        "name": "Kia Venga I",
        "price": 920000,
        "quantity": 1
      }
    ]
  }
]

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
