import { Heart, ShoppingBag, User, Menu, X, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PerfumeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { id: 1, name: "Home", path: "/" },

    {
      id: 3,
      name: "shop",
      path: "/list",
      state: { id: 3, title: "All", offer: null, type: "fashion" },
    },
    { id: 4, name: "About", path: "/about" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleNavigation = (path, state) => {
    navigate(path, { state });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
          ? "bg-white/80 backdrop-blur-md border-gray-200 py-4 shadow-sm"
          : "bg-white border-transparent py-5"
          }`}
      >
        <div className="px-6 lg:px-12 flex items-center justify-between">
          {/* LEFT: Mobile Menu Button & Desktop Links */}
          <div className="flex-1 flex items-center justify-start">
            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigation(link.path, link.state)}
                    className={`text-sm font-medium tracking-wide transition-colors relative group ${location.pathname === link.path && !link.state
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                      }`}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: Logo */}
          <div className="flex-1 flex justify-center">
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <h1 className="text-xl md:text-3xl font-serif text-gray-900 tracking-tight group-hover:opacity-80 transition-opacity">
                Fashion Hub
              </h1>
              <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mt-1 hidden sm:block">
                Your Style Destination
              </span>
            </div>
          </div>

          {/* RIGHT: Utility Icons */}
          <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/account")}
              className="p-1 hover:text-gray-500 transition-colors relative"
            >
              <User className="w-5 h-5 text-gray-800" />
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="p-1 hover:text-gray-500 transition-colors relative"
            >
              <Heart className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="p-1 hover:text-gray-500 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-gray-800" />
              {/* Optional: Add badge here if needed */}
              {/* <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span> */}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <span className="text-xl font-serif text-gray-900">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigation(link.path, link.state)}
                    className="w-full text-left px-6 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-black transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="my-2 border-t border-gray-100"></div>
            <ul className="flex flex-col">
              <li>
                <button
                  onClick={() => handleNavigation("/account")}
                  className="w-full text-left px-6 py-4 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors flex items-center gap-3"
                >
                  <User className="w-5 h-5" /> Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/wishlist")}
                  className="w-full text-left px-6 py-4 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors flex items-center gap-3"
                >
                  <Heart className="w-5 h-5" /> Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 bg-gray-50">
            <p className="text-xs text-center text-gray-400">
              © 2024 Fashion Hub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfumeNavbar;
