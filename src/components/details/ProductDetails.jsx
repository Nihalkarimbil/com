import React, { useState } from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Star,
  MessageCircle,
  Truck,
  Shield,
  Search,
} from "lucide-react";
import ProductCard from "../card/Card";
import { Image, Modal, Tooltip, Form, Input, Rate, Button, message } from "antd";

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Orange");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [stockInfo, setStockInfo] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [qnaModalOpen, setQnaModalOpen] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
  ];

  const allProducts = Array.from({ length: 4 }, (_, i) => {
    return {
      id: i + 1,
      name: [
        "Line-Pattern Zipper Sweatshirt",
        "Black Fantasy Sweatshirt",
        "Brooklyn-NYC Sweatshirt",
        "Basic Plain Shirt",
        "Premium Cotton Hoodie",
        "Casual T-Shirt",
        "Oversized Sweatshirt",
        "Tech Hoodie",
      ][i % 8],
      price: Math.floor(Math.random() * 800) + 150,
      oldPrice:
        Math.random() > 0.6 ? Math.floor(Math.random() * 400) + 400 : null,
      tag: ["NEW", "BEST SELLER", "HOT PROMO", null][
        Math.floor(Math.random() * 4)
      ],

      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
      ],

      brand: ["Roadster", "Mochi", "Metro", "Provogue"][i % 4],
      subcategory: ["Casual", "Premium", "Sports"][i % 3],
      color: ["Black", "Brown", "Tan", "Olive", "Grey"][i % 5],
      rating: Math.floor(Math.random() * 2) + 3.5,
      reviews: Math.floor(Math.random() * 500) + 50,
      discount: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 10 : 0,
      inStock: Math.random() > 0.2,
      description:
        "High-quality comfortable sweatshirt perfect for everyday wear.",
    };
  });

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Orange", "Brown", "Black", "Gray"];

  const checkStock = () => {
    if (pincode.length === 6) {
      setStockInfo({
        pincode,
        available: Math.random() > 0.3,
        delivery: "2-3 days",
        cod: true,
      });
    }
  };

  const tabs = ["description", "specifications", "reviews", "qna"];

  const specifications = [
    { label: "Material", value: "Premium Leather" },
    { label: "Color", value: "Orange" },
    { label: "Dimensions", value: "149 x 98 x 40 cm" },
    { label: "Weight", value: "85 kg" },
    { label: "Warranty", value: "10 years" },
    { label: "Assembly", value: "Required" },
  ];

  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      comment: "Excellent sofa! Very comfortable and well made.",
      date: "2 weeks ago",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Good quality, delivery was quick.",
      date: "1 month ago",
    },
  ];

  const qna = [
    {
      q: "Is assembly included?",
      a: "Yes, free assembly and installation included.",
    },
    {
      q: "What is the warranty period?",
      a: "10-year limited warranty on frame and mechanism.",
    },
  ];

  const offers = [
    { code: "SAVE50", discount: "₹50 off", min: "Min order ₹500" },
    { code: "WELCOME20", discount: "20% off", min: "First purchase" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 mt-18">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-red-500 text-sm font-medium">Leather Sofas</p>
            {/* <div className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left - Images */}
            <div>
              <div className="bg-white mb-4 relative">
                <Image
                  src={images[0]}
                  alt="Product"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className=" overflow-hidden border-2 border-gray-200 hover:border-purple-600"
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Middle - Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Orange <span className="font-normal">Leather Sofa</span>
              </h1>
              <p className="text-gray-600 text-sm mb-4">
                Sofa, Grandmothered brown, black wood
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-orange-500">
                  {[...Array(4)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="text-gray-300">★</span>
                </div>
                <span className="text-gray-700 font-semibold">4.3</span>
                <span className="text-gray-600 text-sm">(127 reviews)</span>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl font-bold text-gray-800">₹449</span>
                  <span className="text-2xl line-through text-gray-500">
                    ₹560
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    20% OFF
                  </span>
                </div>
                <p className="text-green-600 text-sm font-medium">
                  You save ₹111
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Size
                </label>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-semibold transition ${selectedSize === size
                        ? "border-red-400 bg-purple-50 text-red-400"
                        : "border-gray-300 text-gray-700 hover:border-purple-300"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Color
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color}`}
                      title={color}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color
                        ? "border-white ring-2 ring-purple-600 ring-offset-2 shadow-sm"
                        : "border-gray-200 hover:scale-110"
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Stock Availability by Pincode */}
              <div className="mb-6 bg-gray-50 rounded-lg">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Check Availability
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter 6-digit pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                    maxLength="6"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    onClick={checkStock}
                    className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition hover:cursor-pointer"
                  >
                    Check
                  </button>
                </div>
                {stockInfo && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                    {stockInfo.available ? (
                      <div>
                        <p className="text-green-600 font-semibold">
                          ✓ In Stock
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Delivery in {stockInfo.delivery}
                        </p>
                        <p className="text-sm text-gray-600">
                          Cash on Delivery Available
                        </p>
                      </div>
                    ) : (
                      <p className="text-red-600 font-semibold">
                        ✗ Out of Stock in {stockInfo.pincode}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <div className="flex justify-between gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 border-l border-r border-gray-300">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Tooltip title="add to cart">
                    <button className="flex-1 mt-8 hover:cursor-pointer bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                      <ShoppingCart size={20} />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="add to wishlist"
                    className="hover:cursor-pointer"
                  >
                    <button
                      onClick={() => setWishlist(!wishlist)}
                      className={`px-6 py-3 rounded-lg border-2 font-semibold transition  mt-8 hover:cursor-pointer ${wishlist
                        ? "bg-red-50 border-red-500 text-red-600"
                        : "border-gray-300 text-gray-700 hover:border-red-500"
                        }`}
                    >
                      <Heart
                        size={20}
                        fill={wishlist ? "currentColor" : "none"}
                      />
                    </button>
                  </Tooltip>
                  <Tooltip title="share" className="hover:cursor-pointer">
                    <button className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:cursor-pointer text-gray-700 hover:border-gray-400  mt-8 transition">
                      <Share2 size={20} />
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 mb-6"></div>
            </div>

            {/* Right - Seller Info & Offers */}
            <div>
              

              <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">
                  Available Offers
                </h3>
                <div className="space-y-3">
                  {offers.map((offer, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <p className="font-bold text-blue-600">
                        {offer.discount}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Code: {offer.code}
                      </p>
                      <p className="text-xs text-gray-600">{offer.min}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Support */}
              <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                <div className="flex items-start gap-3">
                  <Truck
                    className="text-red-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">Free Delivery</p>
                    <p className="text-sm text-gray-600">
                      On orders above ₹499
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield
                    className="text-red-500 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      10-Year Warranty
                    </p>
                    <p className="text-sm text-gray-600">
                      On frame & mechanism
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b border-gray-200 px-6">
              <div className="flex gap-4 md:gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 font-semibold capitalize transition hover:cursor-pointer ${activeTab === tab
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-gray-800"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "description" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    A well-deserved stay in the daytime and nice relaxing with
                    family and friends in the evening. This sofa is designed for
                    maximum comfort with high back and neck support. Embracing
                    quality and genuineness, it features premium leather
                    upholstery and durable wooden frame.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You sit comfortably thanks to the pocket springs that
                    support the right places and follow the body exactly. The
                    sofa holds extra soft and easy to sit in thanks to the top
                    layer of high-density foam. The armrests with extra filling
                    are designed to be comfortable for resting or sleeping.
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between border-b border-gray-200 pb-3"
                      >
                        <span className="text-gray-600 font-medium">
                          {spec.label}
                        </span>
                        <span className="text-gray-800 font-semibold">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-6">
                    Ratings & Reviews
                  </h3>
                  <div className="space-y-6">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-3">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {review.name}
                            </p>
                            <div className="flex text-yellow-400 text-sm mt-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                              {[...Array(5 - review.rating)].map((_, i) => (
                                <span key={i} className="text-gray-300">
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="text-gray-600 text-sm">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setReviewModalOpen(true)}
                    className="mt-6 px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-purple-50 transition font-semibold hover:cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>
              )}

              {activeTab === "qna" && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-6">Q&A</h3>
                  <div className="space-y-6">
                    {qna.map((item, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-6">
                        <p className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <MessageCircle size={18} className="text-red-500" />
                          {item.q}
                        </p>
                        <p className="text-gray-700 ml-8">{item.a}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-purple-50 transition font-semibold" onClick={() => setQnaModalOpen(true)}>
                    Ask a Question
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Similar Products */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Similar Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  oldPrice={p.oldPrice}
                  tag={p.tag}
                  images={p.images}
                  price={p.price}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={reviewModalOpen}
        onCancel={() => setReviewModalOpen(false)}
        title="Write a Review"
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log("Review Submitted:", values);
            message.success("Review submitted successfully!");
            setReviewModalOpen(false);
          }}
        >
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please select a rating' }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Review"
            rules={[{ required: true, message: 'Please write your review' }]}
          >
            <Input.TextArea rows={4} placeholder="Write your experience..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-red-500 hover:bg-red-600 w-full">
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={qnaModalOpen}
        onCancel={() => setQnaModalOpen(false)}
        title="Ask a Question"
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log("Review Submitted:", values);
            message.success("Review submitted successfully!");
            setReviewModalOpen(false);
          }}
        >
          <Form.Item
            name="question"
            label="Question"
            className="mb-6"
            rules={[{ required: true, message: 'Please ask your question' }]}
          >
            <Input.TextArea rows={4} placeholder="ask your question..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-red-500 hover:bg-red-600 w-full">
              Submit Question
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
