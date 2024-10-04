// components/ShoppingCart.js
import React from "react";
import Footer from "@/components/HomePage/Footer";
import Header from "@/components/HomePage/Header";
import NavBar from "@/components/HomePage/Navbar";
import Image from "next/image";
import { Button } from "@/MaterialTailwindNext";
export default function ShoppingCart() {
  const cartItems = [
    {
      id: 1,
      name: "Rose Gold Sparkling Infinity Pendant with Link Chain",
      price: 543,
      originalPrice: 1543,
      image: "/images/prod1.png",
    },
    {
      id: 2,
      name: "Rose Gold Sparkling Infinity Pendant with Link Chain",
      price: 543,
      originalPrice: 1543,
      image: "/images/prod1.png",
    },
  ];

  const estimatedTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
    <Header/>
    <NavBar/>
  
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      {/* Cart Items Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center border p-4 rounded-lg"
            >
              {/* Product Image */}
              <Image
              height={96}
              width={96}

                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover mr-4"
              />
              {/* Product Info */}
              <div className="flex-grow">
              <div className="flex  items-center gap-2 mt-2">
                <span className="text-[#1E1E1E] font-semibold text-base ">Rs.{item.price}</span>
                <span className="line-through text-[#F42222] text-xs">
                  Rs.{item.originalPrice}
                </span>
                </div>
                <h2 className=" font-semibold text-[#2A2A2A]">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Add gift wrap to your order (₹50)
                </p>
              {/* Wishlist and Remove Buttons */}
               
                <div className="mt-4 md:mt-0 flex space-x-4 w-full">
                <Button className="mt-4 bg-[#F8C0BF]  hover:bg-[#fe6161] hover: text-black transition-colors  duration-300 py-2 px-4 rounded-md w-full capitalize text-sm ">
                Add to Wishlist
              </Button>
                <Button className="mt-4 bg-white hover:bg-[#fe6161] hover: text-black transition-colors  duration-300 py-2 px-4 rounded-md w-full capitalize text-sm ">
                Remove
              </Button>
              </div>
              </div>

              
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span>Estimated Total:</span>
            <span className="font-bold">₹{estimatedTotal}</span>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border w-full p-2 rounded-md"
            />
            <p className="text-xs text-gray-400">
              Per India flat shipping for orders above ₹500
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-8">
        <button className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600">
          Checkout Securely
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}