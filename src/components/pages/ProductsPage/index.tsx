import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import Popup from 'reactjs-popup'

import {
  create,
  selectProducts
} from '../../../store/products/productsSlice'
import ProductsTable from '../../ProductsTable'
import Header from '../../Header'
import { validateCreateProduct } from '../../../store/products/validators'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import IconButton from '../../UI/IconButton'

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
      <Button
        text='Добавить товар'
        handler={() => {
          setName('')
          setPrice(0)
          setQuantity(0)
          setIsAdding(true)
        }}
      />
      <ProductsTable products={products} dispatch={dispatch} />
      <Popup
        open={isAdding}
        modal
        onClose={() => { setIsAdding(false) }}
      >
        <IconButton icon='close' handler={() => setIsAdding(false)} />
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
          text='Добавить'
          handler={() => {
            if (validateCreateProduct({ name, price, quantity }, products)) {
              dispatch(create({ name, price, quantity }))
              setIsAdding(false)
            }
          }}
        />
      </Popup>
    </>
  )
}

export default ProductsPage
