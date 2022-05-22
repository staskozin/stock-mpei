import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import Popup from 'reactjs-popup'

import {
  create,
  selectProducts
} from './productSlice'
import ProductsTable from './ProductsTable'
import Header from '../../components/Header'
import { validateCreateProduct } from './validators'

import s from './Products.module.scss'

const ProductsPage = () => {
  const products = useAppSelector(selectProducts)
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [isAdding, setIsAdding] = useState<boolean>(false)

  return (
    <>
      <Header />
      <div>
        <button className={s.button} onClick={() => {
          setName('')
          setPrice(0)
          setQuantity(0)
          setIsAdding(true)
        }}>
          Добавить товар
        </button>
        <Popup
          open={isAdding}
          position='left center'
          modal
          onClose={() => { setIsAdding(false) }}
        >
          <button onClick={() => { setIsAdding(false) }}>×</button>
          <label className={s.label}>
            <span>Наименование</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className={s.label}>
            <span>Цена</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number.parseInt(e.target.value))}
            />
          </label>

          <label className={s.label}>
            <span>Количество</span>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
            />
          </label>

          <button
            onClick={() => {
              if (validateCreateProduct({ name, price, quantity }, products)) {
                dispatch(create({ name, price, quantity }))
                setIsAdding(false)
              }
            }}
          >
            ДОБАВИТЬ ТОВАР
          </button>
        </Popup>

        <ProductsTable products={products} dispatch={dispatch} />
      </div>
    </>
  )
}

export default ProductsPage
