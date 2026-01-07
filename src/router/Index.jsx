import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ProductList from '../components/productdetails/ProductList'
import PerfumeNavbar from '../layout/Navbar'
import Cart from '../components/cart/Cart'
import Wishlist from '../components/wishlist/Wishlist'
import CheckoutPage from '../components/checkout/Checkout'
import ProductDetails from '../components/details/ProductDetails'

function index() {
  return (
    <>
    <PerfumeNavbar />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/list" element={<ProductList />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/checkout' element={<CheckoutPage />} />
        <Route path="/product-details" element={<ProductDetails />} />
      
    </Routes>
    </>
  )
}

export default index
