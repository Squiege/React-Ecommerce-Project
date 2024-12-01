import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import NewCustomer from './components/NewCustomer';
import NewOrder from './components/NewOrder';
import NewProduct from './components/CreateProduct';
import ReadCustomer from './components/ReadCustomer';
import ReadProducts from './components/ReadProducts';
import ReadOrders from './components/ReadOrder';

function App() {
  // Routes
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/newCustomer' element={<NewCustomer />} />
          <Route path='/updateCustomer/:customerId' element={<NewCustomer />} />
          <Route path='/allCustomers' element={<ReadCustomer />} />
          <Route path='/createProduct' element={<NewProduct />} />
          <Route path='/updateProduct/:productId' element={<NewProduct />} />
          <Route path='/allProducts' element={<ReadProducts />} />
          <Route path='/editProduct/:id' element={<NewProduct />} />
          <Route path='/newOrder' element={<NewOrder />} />
          <Route path='/ALLOrders' element={<ReadOrders />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
