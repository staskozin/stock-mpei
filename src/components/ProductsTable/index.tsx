import { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'

import { change, Product, remove } from '../../store/products/productsSlice'
import { validateProducts } from '../../store/products/validators'

import s from './ProductsTable.module.scss'
import 'reactjs-popup/dist/index.css'
import { formatPrice } from '../../helpers'
import IconButton from '../UI/IconButton'
import Input from '../UI/Input'
import Button from '../UI/Button'
import Radio from '../UI/Radio'
import Radios from '../UI/Radios'

const ProductsTable = (props: { products: Array<Product>, dispatch?: any }) => {
  const { products, dispatch } = props
  const [name, setName] = useState<string>('')
  const [changingName, setChangingName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [sortedProducts, setSortedProducts] = useState<Array<Product>>([])
  const [selectedSort, setSelectedSort] = useState<'name' | 'price' | 'quantity'>('quantity')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC')

  useEffect(() => {
    setSortedProducts(products.slice().sort(sorts[sortOrder][selectedSort]))
  }, [products, selectedSort, sortOrder])

  return (
    <>
      <div>
        <Radios text='Сортировать по'>
          <Radio handler={() => setSelectedSort('quantity')} checked={selectedSort === 'quantity'} text='кол-ву' />
          <Radio handler={() => setSelectedSort('price')} checked={selectedSort === 'price'} text='цене' />
          <Radio handler={() => setSelectedSort('name')} checked={selectedSort === 'name'} text='имени' />
        </Radios>
        <Radios text='Порядок сортировки'>
          <Radio handler={() => setSortOrder('DESC')} checked={sortOrder === 'DESC'} text='по убыванию' />
          <Radio handler={() => setSortOrder('ASC')} checked={sortOrder === 'ASC'} text='по возрастанию' />
        </Radios>
      </div>
      {
        products.length ?
          <table className={s.table}>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Кол&#8209;во</th>
                {
                  dispatch
                    ? <>
                      <th className={s['th-empty']}></th>
                      <th className={s['th-empty']}></th>
                    </>
                    : null
                }

              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((p: Product) => {
                return (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td>{p.quantity}</td>
                    {
                      dispatch
                        ? <>
                          <td className={s['button-wrap']}>
                            <IconButton icon='edit' handler={() => {
                              setName(p.name)
                              setPrice(p.price)
                              setQuantity(p.quantity)
                              setChangingName(p.name)
                              setIsEditing(true)
                            }} />
                          </td>
                          <td className={s['button-wrap']}>
                            <IconButton icon='delete' handler={() => dispatch(remove(p.name))} />
                          </td>
                        </>
                        : null
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
          : <p>Список товаров пуст.</p>
      }
      <Popup
        open={isEditing}
        modal
        onClose={() => { setIsEditing(false) }}
      >
        <div className="popup-header">
          <h2>Редактирование товара</h2>
          <IconButton icon='close' handler={() => setIsEditing(false)} />
        </div>
        <Input
          label='Наименование'
          type='text'
          value={name}
          handler={(e) => setName(e.target.value)}
        />
        <Input
          label='Цена'
          type='number'
          value={price}
          handler={(e) => setPrice(Number.parseFloat(e.target.value))}
        />
        <Input
          label='Количество'
          type='number'
          value={quantity}
          handler={(e) => setQuantity(Number.parseInt(e.target.value))}
        />
        <Button
          text='Изменить'
          handler={() => {
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
        />
      </Popup>
    </>

  )
}

const sorts = {
  'ASC': {
    name: (a: Product, b: Product) => {
      if (a.name < b.name)
        return -1
      if (a.name > b.name)
        return 1
      return 0
    },
    price: (a: Product, b: Product) => a.price - b.price,
    quantity: (a: Product, b: Product) => a.quantity - b.quantity
  },
  'DESC': {
    name: (a: Product, b: Product) => {
      if (a.name > b.name)
        return -1
      if (a.name < b.name)
        return 1
      return 0
    },
    price: (a: Product, b: Product) => b.price - a.price,
    quantity: (a: Product, b: Product) => b.quantity - a.quantity
  }
}

export default ProductsTable
