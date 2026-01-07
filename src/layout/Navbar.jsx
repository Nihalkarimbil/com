import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PerfumeNavbar = () => {
  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    {
      id: 2,
      name: "Men",
      path: "/list",
      state: { id: 2, title: "Men", offer: null, type: "perfume" },
    },
    {
      id: 3,
      name: "Women",
      path: "/list",
      state: { id: 3, title: "Women", offer: null, type: "perfume" },
    },
    { id: 4, name: "About", path: "/about" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="relative flex items-center justify-between px-6 lg:px-20 py-5 bg-white border-b border-gray-100">
      {/* Left: Logo */}
      <div className="flex flex-col items-start leading-none" onClick={() => navigate('/')}>
        <span className="text-2xl font-serif text-[#E6916B]">Fashion Hub</span>
        <span className="text-[10px] tracking-[0.2em] text-[#E6916B] mt-1">
          YOUR STYLE destination
        </span>
      </div>

      <ul className="hidden md:flex items-center space-x-10 text-sm font-medium text-gray-800">
        {navLinks.map((link) => (
          <li
            key={link.id}
            onClick={() => navigate(link.path, { state: link.state })}
            className="cursor-pointer hover:text-gray-500 transition-colors"
          >
            {link.name}
          </li>
        ))}
      </ul>

      {/* Right: Icons */}
      <div className="hidden md:flex items-center space-x-3 text-gray-700">
        {/* <FaMagnifyingGlass className="w-6 h-6 cursor-pointer hover:text-gray-400" /> */}
        <User className="w-6 h-6 cursor-pointer hover:text-gray-400" onClick={() => navigate('/account')} />
        <Heart className="w-6 h-6 cursor-pointer hover:text-gray-400" onClick={() => navigate('/wishlist')} />
        <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-gray-400" onClick={() => navigate('/cart')} />
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center gap-4 text-gray-700">
        <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-400" onClick={() => navigate('/cart')} />
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden z-50">
          <ul className="flex flex-col p-4 space-y-4 font-medium text-gray-800">
            {navLinks.map((link) => (
              <li
                key={link.id}
                onClick={() => {
                  navigate(link.path, { state: link.state });
                  setIsMenuOpen(false);
                }}
                className="cursor-pointer hover:text-[#E6916B] transition-colors"
              >
                {link.name}
              </li>
            ))}
            <hr className="border-gray-100" />
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#E6916B]" onClick={() => { navigate('/account'); setIsMenuOpen(false); }}>
              <User size={18} /> Account
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-[#E6916B]" onClick={() => { navigate('/wishlist'); setIsMenuOpen(false); }}>
              <Heart size={18} /> Wishlist
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default PerfumeNavbar;
