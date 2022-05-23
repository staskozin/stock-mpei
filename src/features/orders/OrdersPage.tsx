import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Header from '../../components/Header'
import { formatPrice } from '../../helpers'
import ProductsTable from '../products/ProductsTable'

import {
  Order,
  remove,
  selectOrders
} from './ordersSlice'

import s from './OrdersPage.module.scss'
import Button from '../../components/Button'

const OrdersPage = () => {
  const orders = useAppSelector(selectOrders)
  const dispatch = useAppDispatch()

  return (
    <>
      <Header />
      <Button
        text='Создать заказ'
        handler={() => { }}
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
    </>
  )
}

export default OrdersPage
