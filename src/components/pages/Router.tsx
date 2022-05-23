import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import ProductsPage from './ProductsPage'
import OrdersPage from './OrdersPage'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
