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
        <IconButton icon='close' handler={() => setIsCreating(false)} />
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
        <Button
          text='Создать'
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
      </Popup>
    </>
  )
}

export default OrdersPage
