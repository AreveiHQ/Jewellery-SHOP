"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/HomePage/Footer";
import Header from "@/components/HomePage/Header";
import NavBar from "@/components/HomePage/Navbar";
import Image from "next/image";
import { Button } from "@/MaterialTailwindNext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerCookie } from "@/utils/serverCookie";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; 
import CheckoutLoader from "@/components/Loaders/CheckoutLoader";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useRouter();
  useEffect(() => {
    const fetchCartData = async () => {
      const token = await getServerCookie("token");
      setToken(token);
      try {
        const itemsResponse = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (itemsResponse.status === 200) {
          const items = itemsResponse.data.items || [];
          setCartItems(items);
          calculateTotal(items);
          console.log(items); 
        } else {
          setError("Failed to fetch cart items.");
        }
      } catch (err) {
        console.error(
          "Error fetching cart data",
          err.response ? err.response.data : err.message
        );
        setError("Server error while fetching cart data.");
      }
    };

    fetchCartData();
  }, []);

  const handleOrder=async ()=>{
    const token = await getServerCookie("token");
    const response=await axios.post("/api/orders/",{
      headers: {
        Authorization: `Bearer ${token}`, // Include token in request headers
      },
      // data to be append;
    })
  }

  const formatPrice = (price) => {
    return price ? `Rs.${parseFloat(price).toFixed(2)}` : "N/A";
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = async (itemId) => { 
    console.log("Removing item with ID:", itemId);
    try {
      const response = await axios.delete("/api/cart/remove", {
        data: { productId: itemId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedCartItems = cartItems.filter((item) => item._id !== itemId); 
        setCartItems(updatedCartItems);
        calculateTotal(updatedCartItems);
        toast.success("Item removed from cart");
      } else {
        setError("Failed to remove item from the cart.");
      }
    } catch (error) {
      console.error("Error removing item:", error.response ? error.response.data : error.message);
      setError("Server error while removing item from cart.");
    }
  };

  useEffect(() => {
    calculateTotal(cartItems);
    console.log("Total price calculated:", totalPrice);
  }, [cartItems]);

  return (
    <>
      <Header />
      <NavBar />

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

        {error && <p className="text-red-500">{error}</p>}

        {/* Cart Items Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => {
                return (
                  <div key={item._id} className="flex flex-col md:flex-row items-center border p-4 rounded-lg">
                    <Image
                      height={96}
                      width={96}
                      src={item.img_src }
                      alt={item.name }
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#1E1E1E] font-semibold text-base">
                          {formatPrice(item.price)}
                        </span>

                      </div>
                      <h2 className="font-semibold text-[#2A2A2A]">
                        {item.name || "Unknown Product"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Add gift wrap to your order (₹50)
                      </p>

                      <div className="mt-4 md:mt-0 flex space-x-4 w-full">
                        <Button className="mt-4 bg-[#F8C0BF] hover:bg-[#fe6161] hover:text-black transition-colors duration-300 py-2 px-4 rounded-md w-full capitalize text-sm">
                          Add to Wishlist
                        </Button>
                        <Button
                          className="mt-4 bg-[#fe6161] hover:text-black transition-colors duration-300 py-2 px-4 rounded-md w-full capitalize text-sm"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Order Summary Section */}
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Estimated Total:</span>
              <span className="font-bold">{formatPrice(totalPrice)}</span>
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

        <div className="mt-8">
          <button className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600"
           onClick={()=>navigate.push('/delivery')}>
            Checkout Securely
          </button>
        </div>
        <CheckoutLoader/>
      </div>

      <Footer />
    </>
  );
}
