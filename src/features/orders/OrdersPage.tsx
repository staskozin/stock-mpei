import { useState } from 'react'
import Popup from 'reactjs-popup'
import Select from 'react-select'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Header from '../../components/Header'
import { formatPrice } from '../../helpers'
import ProductsTable from '../products/ProductsTable'
import {
  Order,
  remove,
  selectOrders
} from './ordersSlice'
import { Product, selectProducts } from '../products/productsSlice'

import s from './OrdersPage.module.scss'
import Button from '../../components/Button'


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
            return (
              <div className={s.order} key={o.number}>
                <span className={s.header}>Заказ №{o.number}</span>
                <time className={s.datetime} dateTime={o.date.toISOString()}>
                  от {o.date.toLocaleString('ru-RU')}
                </time>
                <button className={s.button} onClick={() => dispatch(remove(o.number))}>
                  <img src='/icon/delete.svg' alt='Удалить заказ' />
                </button>
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
        <button onClick={() => { setIsCreating(false) }}>×</button>
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
          <button
            disabled={!searchedProduct?.name}
            onClick={() => {
              if (!addedProducts.find(p => p.name === searchedProduct?.name)) {
                setAddedProducts([...addedProducts, searchedProduct as Product])
                setSearchedProduct(null)
              } else {
                alert('Товар уже добавлен в заказ')
              }
            }}
          >Добавить</button>
        </label>
        <ProductsTable products={addedProducts} />
      </Popup>
    </>
  )
}

export default OrdersPage
