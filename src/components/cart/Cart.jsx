import { ArrowUp, CarrotIcon, ChevronRightIcon, HeartIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  // Mock data representing the cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      brand: 'LOV by Westside',
      name: 'Olive Solid Cotton-Blend T-Shirt',
      price: 999.00,
      color: 'Olive',
      size: 'XS',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      returnPeriod: 7,
      deliveryDate: '22nd Dec'
    },
    {
      id: 1,
      brand: 'LOV by Westside',
      name: 'Olive Solid Cotton-Blend T-Shirt',
      price: 999.00,
      color: 'Olive',
      size: 'XS',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      returnPeriod: 7,
      deliveryDate: '22nd Dec'
    }
  ]);

  // Pricing Logic
  const processingFeeOriginal = 99.00;
  const processingFeeDiscounted = 19.00;

  const bagTotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalAmount = bagTotal + processingFeeDiscounted;

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white relative overflow-hidden  text-gray-800">

      {/* Decorative Background Blobs (Top Left & Top Right) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Bag</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN: Cart Items */}
          <div className="flex-1">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 p-4 rounded-md shadow-sm mb-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-32 h-40 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md bg-gray-50"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col sm:flex-row justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium text-gray-900">{item.brand} {item.name}</h3>
                        <p className="text-lg font-semibold">₹{item.price.toFixed(2)}</p>
                        <p className="text-gray-500 text-sm">Color: {item.color}</p>

                        {/* Selectors */}
                        <div className="flex gap-3 mt-4">
                          <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-1 pl-3 pr-8 rounded focus:outline-none focus:border-gray-500 text-sm">
                              <option>{item.size}</option>
                              <option>S</option>
                              <option>M</option>
                            </select>
                            <span className="absolute right-0 top-0 bottom-0 flex items-center pr-2 pointer-events-none text-gray-500 text-xs">▼</span>
                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Size</label>
                          </div>

                          <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-1 pl-3 pr-8 rounded focus:outline-none focus:border-gray-500 text-sm">
                              <option>{item.qty}</option>
                              <option>2</option>
                              <option>3</option>
                            </select>
                            <span className="absolute right-0 top-0 bottom-0 flex items-center pr-2 pointer-events-none text-gray-500 text-xs">▼</span>
                            <label className="absolute -top-2 left-2 bg-white px-1 text-[10px] text-gray-500">Qty</label>
                          </div>
                        </div>
                      </div>

                      {/* Delivery & Return Info (Right side of card on desktop) */}
                      <div className="mt-4 sm:mt-0 sm:text-right space-y-2 text-sm text-gray-600">
                        <div className="flex items-center sm:justify-end gap-2">
                          <ArrowUp className="w-4 h-4 text-gray-900" />
                          <span><strong>{item.returnPeriod} Days</strong> Return</span>
                        </div>
                        <div className="flex items-center sm:justify-end gap-2">
                          <TruckIcon className="w-4 h-4 text-gray-900" />
                          <span>Delivery by <strong>{item.deliveryDate}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="border-t border-gray-100 mt-4 pt-3 flex items-center justify-end gap-6 text-sm font-medium text-gray-800">
                    <button className="flex items-center gap-1 hover:text-[#D42257] transition-colors">
                      <HeartIcon className="w-5 h-5" />
                      Save to wishlist
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded border border-dashed border-gray-300">
                <p className="text-gray-500">Your bag is empty.</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Summary Sidebar */}
          <div className="w-full lg:w-96 space-y-4">

            {/* Address Section */}
            <div className="bg-white border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">Deliver To</span>
                <button className="text-[#D42257] text-sm font-bold hover:underline">Change</button>
              </div>
              <p className="font-semibold text-gray-900">679327, Nilambur</p>
            </div>

            {/* Coupons Section */}
            <button className="w-full bg-white border border-gray-200 p-4 rounded-md flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                <span className="w-5 h-5 flex items-center justify-center border border-gray-800 rounded text-xs font-bold">%</span>
                Check for Coupons
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>

            {/* Price Details Section */}
            <div className="bg-white border border-gray-200 p-4 rounded-md">
              <div className="space-y-3 pb-4 border-b border-gray-100 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span>₹{bagTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <div>
                    <span className="line-through text-gray-400 mr-2">₹{processingFeeOriginal.toFixed(2)}</span>
                    <span className="text-gray-900">₹{processingFeeDiscounted.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 text-right">
                  <span className="underline cursor-pointer">See how this is calculated</span>
                  <span className="text-[#D42257] ml-2 font-medium cursor-pointer">Know More</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Bag Subtotal</span>
                  <span>₹{(bagTotal + processingFeeDiscounted).toFixed(2)}</span>
                </div>
              </div>

              {/* Total & Checkout */}
              <div className="flex justify-between items-center mt-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-gray-600 text-sm">Total</span>
                  <span className="text-xl font-bold text-gray-900">₹ {totalAmount.toFixed(0)}</span>
                </div>
                <button className="bg-linear-to-r from-red-400 via-red-300 to-red-400 text-white px-8 py-3 hover:cursor-pointer rounded-full font-bold hover:bg-[#b01b47] transition-colors shadow-sm" onClick={() => navigate('/checkout')}>
                  Checkout
                </button>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-white border border-gray-200 p-4 rounded-md flex gap-3 items-start">
              <ShieldCheckIcon className="w-6 h-6 text-teal-600 flex-shrink-0" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Safe and secure payments. Easy returns. <br />
                100% Authentic products.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;