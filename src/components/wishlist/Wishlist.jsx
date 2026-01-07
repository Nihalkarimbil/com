import { TrashIcon } from 'lucide-react';
import React, { useState } from 'react';


const initialWishlistItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'LOV',
    description: 'LOV by Westside Olive Solid Cotton-Blend T-Shirt',
    price: '₹999',
    category: 'Tops and tees'
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/1200x/17/a0/86/17a08637bbdb3a4326316dc25e3d7f58.jpg',
    brand: 'ZARA',
    description: 'Velvet Dress with Puff Sleeves',
    price: '₹2,590',
    category: 'Dresses'
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/736x/f0/b4/b5/f0b4b5c4c25165ae65b962a69362bc9b.jpg',
    brand: 'H&M',
    description: 'Relaxed Fit Linen Shirt',
    price: '₹1,299',
    category: 'Tops and tees'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'WESTSIDE',
    description: 'High-Rise Wide Leg Jeans',
    price: '₹1,699',
    category: 'Bottoms'
  }
];

const WishlistItem = ({ item, onDelete }) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 shadow-sm relative bg-white">

      <button
        onClick={() => onDelete(item.id)}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors hover:cursor-pointer"
        aria-label="Remove from wishlist"
      >
        <TrashIcon className="h-5 w-5 text-gray-500" />
      </button>

      <div className="aspect-3/4 h-52 w-full mb-2 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.image}
          alt={item.description}
          className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Add to Bag Button */}
      <button className="w-full bg-linear-to-r from-red-400 via-red-300 to-red-400 text-white py-2 px-4 rounded font-medium hover:bg-[#b01b47] transition-colors mb-1 hover:cursor-pointer">
        Add to Bag
      </button>

      {/* Product Details */}
      <div className="mt-auto">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{item.brand}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1 min-h-[40px]">{item.description}</p>
        <p className="text-base font-semibold text-gray-900 mt-1">{item.price}</p>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const [items, setItems] = useState(initialWishlistItems);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl min-h-screen mx-auto py-5 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Wishlist <span className='text-gray-500 text-lg font-normal'>({items.length} items)</span></h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
        {['All', 'Tops and tees', 'Dresses', 'Bottoms'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded border text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 2. Mapping the Array */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items
          .filter(item => activeFilter === 'All' || item.category === activeFilter)
          .map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Your wishlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;