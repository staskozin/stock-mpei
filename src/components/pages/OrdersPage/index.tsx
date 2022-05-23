import { useState } from 'react'
import Popup from 'reactjs-popup'
import Select from 'react-select'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import Header from '../../Header'
import { formatPrice } from '../../../helpers'
import ProductsTable from '../../ProductsTable'
import {
  Order,
  remove,
  selectOrders
} from '../../../store/orders/ordersSlice'
import { Product, selectProducts } from '../../../store/products/productsSlice'

import s from './OrdersPage.module.scss'
import Button from '../../UI/Button'
import IconButton from '../../UI/IconButton'
import Input from '../../UI/Input'


const OrdersPage = () => {
  const products = useAppSelector(selectProducts)
  const orders = useAppSelector(selectOrders)
  const dispatch = useAppDispatch()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [addedProducts, setAddedProducts] = useState<Array<Product>>([])
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null)
  return (
    <>
      <Header />
      <Button
        text='Создать заказ'
        handler={() => {
          setIsCreating(true)
        }}
      />
      {
        orders.length
          ? orders.map((o: Order) => {
            const sum = o.products.reduce((acc, cur) => {
              return acc + cur.price * cur.quantity
            }, 0)
            const date = new Date(o.date)
            return (
              <div className={s.order} key={o.number}>
                <span className={s.header}>Заказ №{o.number}</span>
                <time className={s.datetime} dateTime={date.toISOString()}>
                  от {date.toLocaleString('ru-RU')}
                </time>
                <IconButton icon='delete' handler={() => dispatch(remove(o.number))} />
                <span className={s.sum}>Сумма: <span>{formatPrice(sum)}</span></span>
                <ProductsTable products={o.products} />
              </div>
            )
          })
          : <p>Список заказов пуст.</p>
      }
      <Popup
        open={isCreating}
        position='center center'
        modal
        onClose={() => { setIsCreating(false) }}
      >
        <div className="popup-header">
          <h2>Создание заказа</h2>
          <IconButton icon='close' handler={() => setIsCreating(false)} />
        </div>
        <label className={s.label}>
          <span>Товар</span>
          <Select
            className='react-select'
            classNamePrefix='react-select'
            options={products.map(p => {
              return { label: p.name, value: p }
            })}
            placeholder='Поиск товара...'
            onChange={(s: any) => {
              setSearchedProduct(s.value)
            }}
          />
        </label>
        <Input
          label='Кол-во'
          type='number'
          value={0}
          handler={() => { }}
        />
        <Button
          text='Добавить'
          disabled={!searchedProduct?.name}
          handler={() => {
            if (!addedProducts.find(p => p.name === searchedProduct?.name)) {
              setAddedProducts([...addedProducts, searchedProduct as Product])
              setSearchedProduct(null)
            } else {
              alert('Товар уже добавлен в заказ')
            }
          }}
        />
        <ProductsTable products={addedProducts} />
        <Button
          text='Создать заказ'
          disabled={!searchedProduct?.name}
          handler={() => {
            if (!addedProducts.find(p => p.name === searchedProduct?.name)) {
              setAddedProducts([...addedProducts, searchedProduct as Product])
              setSearchedProduct(null)
            } else {
              alert('Товар уже добавлен в заказ')
            }
          }}
        />
      </Popup>
    </>
  )
}

export default OrdersPage
