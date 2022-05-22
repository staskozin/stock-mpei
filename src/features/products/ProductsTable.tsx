import { useState } from 'react'
import Popup from 'reactjs-popup'

import { change, Product, remove } from './productSlice'
import { validateProducts } from './validators'

import s from './ProductsTable.module.scss'
import 'reactjs-popup/dist/index.css'

const ProductsTable = (props: { products: Array<Product>, dispatch: any }) => {
  const [name, setName] = useState<string>('')
  const [changingName, setChangingName] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { products, dispatch } = props
  return (
    <>
      {
        products.length ?
          <table className={s.table}>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Кол&#8209;во</th>
                <th className={s['th-empty']}></th>
                <th className={s['th-empty']}></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: Product) => {
                return (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td className={s['button-wrap']}>
                      <button className={s.button} onClick={() => {
                        setName(p.name)
                        setPrice(p.price)
                        setQuantity(p.quantity)
                        setChangingName(p.name)
                        setIsEditing(true)
                      }}>
                        <img src='/icon/edit.svg' alt='Изменить товар' />
                      </button>
                    </td>
                    <td className={s['button-wrap']}>
                      <button className={s.button} onClick={() => dispatch(remove(p.name))}>
                        <img src='/icon/delete.svg' alt='Удалить товар' />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          : <p>Список товаров пуст.</p>
      }
      <Popup
        open={isEditing}
        position='center center'
        modal
        onClose={() => { setIsEditing(false) }}
      >
        <button onClick={() => { setIsEditing(false) }}>×</button>
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
            const productsCopy: Array<Product> = JSON.parse(JSON.stringify(products))
            const index = products.findIndex((p: Product) => p.name === changingName)
            if (index !== -1) {
              if (validateProducts(productsCopy)) {
                dispatch(change({ name: changingName, changes: { name, price, quantity } }))
                setIsEditing(false)
              }
            } else {
              alert('Товар не найден')
            }
          }}
        >
          ИЗМЕНИТЬ ТОВАР
        </button>
      </Popup>
    </>

  )
}

export default ProductsTable
