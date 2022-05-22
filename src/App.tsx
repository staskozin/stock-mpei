import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import ProductsPage from './features/products/ProductsPage'
import OrdersPage from './features/orders/OrdersPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
