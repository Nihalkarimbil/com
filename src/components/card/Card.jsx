import React, { useState } from "react";
import {
  ArrowUpRight,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

const ProductCard = ({ images, name, tag, oldPrice, price }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageList = images?.length > 0 ? images : [];
  const currentImage = imageList[currentImageIndex];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageList.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === imageList.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="group bg-white rounded-2xl p-3 transition-all">
      <div className="relative aspect-5/5 overflow-hidden rounded bg-[#F3F4F6] mb-4">
        <img
          src={currentImage}
          alt={name}
          className="w-full h-full object-cover transition-all duration-300"
        />
        {tag && (
          <span className="absolute top-3 left-3 bg-[#E0E7FF] text-[#4F46E5] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {tag}
          </span>
        )}
        <button className="absolute top-3 right-3 p-1.5 bg-white/50 backdrop-blur-md rounded-full text-gray-500 hover:text-red-500 transition-colors hover:cursor-pointer">
          <Heart size={16} />
        </button>

        {imageList?.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/50 backdrop-blur-md rounded-full text-gray-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/50 backdrop-blur-md rounded-full text-gray-700 hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {imageList.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${index === currentImageIndex
                      ? "bg-white w-6"
                      : "bg-white/50 w-1.5 hover:bg-white/70"
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-end px-1">
        <Link to={"/product-details"}>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
              {name}
            </h3>
            <p className="text-[10px] text-gray-400 font-medium mb-1">
              Price :
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">₹{price}</span>
              {oldPrice && (
                <span className="text-gray-300 text-xs line-through">
                  ₹{oldPrice}
                </span>
              )}
            </div>
          </div>
        </Link>
        <Tooltip title="add to cart">
          <button className="bg-red-500 cursor-pointer p-2.5 rounded-xl text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            <ShoppingCart size={18} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProductCard;
