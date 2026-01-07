import React, { useState } from "react";
import {
  CreditCard,
  Truck,
  MapPin,
  Wallet,
  Landmark,
  Banknote,
  ShieldCheck,
  Tag,
  Download,
  ChevronDown,
  Smartphone,
} from "lucide-react";
import { Select } from "antd";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [promoCode, setPromoCode] = useState("");

  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      variant: "Midnight Blue",
      price: 299.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      variant: "Mesh Back",
      price: 899.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=200",
    },
  ];

  const paymentOptions = [
    {
      id: "upi",
      label: "UPI (Google Pay, PhonePe, BHIM)",
      icon: <Smartphone className="w-5 h-5 text-purple-600" />,
      content: (
        <div className="space-y-3 pt-2">
          <p className="text-xs text-gray-500">
            Enter your VPA / UPI ID to receive a payment request
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. user@okaxis"
              className="flex-1 p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button className="bg-red-400 text-white px-4 py-2 rounded-lg text-xs font-bold hover:cursor-pointer hover:bg-red-500 ">
              Verify
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "card",
      label: "Credit / Debit Cards",
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      content: (
        <div className="space-y-3 pt-2">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="password"
              placeholder="CVV"
              className="w-1/2 p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Cardholder Name"
            className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      ),
    },
    {
      id: "netbanking",
      label: "Net Banking",
      icon: <Landmark className="w-5 h-5 text-orange-600" />,
      content: (
        <div className="pt-2">
          <Select
            className="w-full"
            placeholder="Select a bank"
            options={[
              { value: "HDFC Bank", label: "HDFC Bank" },
              { value: "ICICI Bank", label: "ICICI Bank" },
              { value: "State Bank of India", label: "State Bank of India" },
              { value: "Axis Bank", label: "Axis Bank" },
            ]}
          />
        </div>
      ),
    },
    {
      id: "cod",
      label: "COD (Cash on Delivery)",
      icon: <Banknote className="w-5 h-5 text-green-600" />,
      content: (
        <p className="text-xs text-gray-500 pt-2 italic">
          Pay using Cash, UPI, or Card at the time of delivery.
        </p>
      ),
    },
    {
      id: "emi",
      label: "EMI (Easy Installments)",
      icon: <CreditCard className="w-5 h-5 text-red-600" />,
      content: (
        <p className="text-xs text-gray-500 pt-2 font-medium">
          Available on select Credit and Debit cards. Choose card on next step.
        </p>
      ),
    },
  ];

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully! Your invoice is being generated...");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4 ">
              <div className="flex">
                <MapPin className="text-red-500 mr-2" size={20} />
                <h2 className="text-xl font-semibold">Delivery Address</h2>
              </div>
              <div>
                <button className="bg-red-400 text-white px-4 py-2 rounded-lg text-xs font-bold hover:cursor-pointer hover:bg-red-500 ">
                  Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="border-2 border-blue-500 p-4 rounded-lg bg-blue-50 relative">
                <p className="font-bold text-gray-800">Home</p>
                <p className="text-sm text-gray-600">
                  123 Tech Park, Silicon Valley, CA 94025
                </p>
                <span className="absolute top-2 right-2 bg-blue-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  Selected
                </span>
              </div>
              {/* <button className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-gray-500 hover:bg-gray-50 transition flex flex-col items-center justify-center">
                <span className="text-lg">+</span>
                <span className="text-xs font-semibold">Add New Address</span>
              </button> */}
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Truck className="text-red-500 mr-2" size={20} />
              <h2 className="text-xl font-semibold">Delivery Options</h2>
            </div>
            <div className="grid gap-3">
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="delivery"
                  className="w-4 h-4 text-blue-600"
                  defaultChecked
                />
                <div className="ml-4">
                  <p className="font-medium text-sm">
                    Standard Delivery (Free)
                  </p>
                  <p className="text-xs text-gray-500">
                    Delivered within 3-5 business days
                  </p>
                </div>
              </label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <ShieldCheck className="text-red-500 mr-2" size={20} />
              <h2 className="text-xl font-semibold">Payment Options</h2>
            </div>

            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border rounded-xl transition-all duration-200 overflow-hidden hover:cursor-pointer ${paymentMethod === option.id
                      ? "border-gray-400 ring-1 ring-gray-400"
                      : "border-gray-200"
                    }`}
                >
                  <button
                    onClick={() => setPaymentMethod(option.id)}
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors hover:cursor-pointer ${paymentMethod === option.id
                        ? "bg-blue-50/50"
                        : "bg-white hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-4 ">
                      <div
                        className={`p-2 rounded-lg bg-white border shadow-sm hover:cursor-pointer ${paymentMethod === option.id
                            ? "border-blue-200"
                            : "border-gray-100"
                          }`}
                      >
                        {option.icon}
                      </div>
                      <span
                        className={`font-semibold text-sm ${paymentMethod === option.id
                            ? "text-blue-900"
                            : "text-gray-700"
                          }`}
                      >
                        {option.label}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${paymentMethod === option.id
                          ? "rotate-180 text-blue-600"
                          : "text-gray-400"
                        }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${paymentMethod === option.id
                        ? "max-h-64 opacity-100"
                        : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="p-4 pt-0 border-t border-gray-100">
                      {option.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-6 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover rounded-lg border border-gray-100"
                      />
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">{item.variant}</p>
                      <p className="text-sm font-semibold text-blue-600 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition">
                  Apply
                </button>
              </div>

              <div className="space-y-3 border-t pt-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$1,198.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>$125.50</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-2">
                  <span>Total</span>
                  <span>$1,323.50</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-red-400 hover:cursor-pointer text-white py-2 rounded-xl font-bold hover:bg-red-500 transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  Place Order & Pay
                </button>
                <button className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 font-medium py-2 hover:bg-blue-50 rounded-lg transition">
                  <Download className="w-4 h-4" />
                  Preview Invoice (PDF)
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
                256-bit SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
