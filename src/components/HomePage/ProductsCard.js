"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/MaterialTailwindNext";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getServerCookie } from "@/utils/serverCookie";


const products = [
  {
    id: 1,
    itemName: "Gold Necklace for Anniversary",
    cost: "Rs. 850",
    oldCost: "Rs. 950",
    rating: "4.5",
    imageUrl: "/images/Prod1.png",
  },
  {
    id: 2,
    itemName: "Diamond Ring for Engagement",
    cost: "Rs. 1,200",
    oldCost: "Rs. 1,500",
    rating: "4.7",
    imageUrl: "/images/Prod2.png",
  },
  {
    id: 3,
    itemName: "Platinum Bracelet for Graduation",
    cost: "Rs. 2,000",
    oldCost: "Rs. 2,300",
    rating: "4.8",
    imageUrl: "/images/Prod3.png",
  },
  {
    id: 4,
    itemName: "Emerald Earrings for Birthdays",
    cost: "Rs. 650",
    oldCost: "Rs. 800",
    rating: "4.2",
    imageUrl: "/images/Prod4.png",
  },
  {
    id: 5,
    itemName: "Ruby Pendant for Festivals",
    cost: "Rs. 750",
    oldCost: "Rs. 850",
    rating: "4.6",
    imageUrl: "/images/Prod5.png",
  },
  {
    id: 6,
    itemName: "Sapphire Studs for Special Occasions",
    cost: "Rs. 900",
    oldCost: "Rs. 1,000",
    rating: "4.4",
    imageUrl: "/images/Prod6.png",
  },
  {
    id: 7,
    itemName: "Pearl Bracelet for Everyday Wear",
    cost: "Rs. 400",
    oldCost: "Rs. 500",
    rating: "4.1",
    imageUrl: "/images/Prod7.png",
  },
  {
    id: 8,
    itemName: "Titanium Watch for Professionals",
    cost: "Rs. 3,500",
    oldCost: "Rs. 4,000",
    rating: "4.9",
    imageUrl: "/images/Prod8.png",
  },
];



const convertedProducts = products.map(product => ({
  ...product,
  price: parseFloat(product.cost.replace("Rs. ", "").replace(/,/g, "")), // Remove "Rs. " and convert to number
  oldPrice: parseFloat(product.oldCost.replace("Rs. ", "").replace(/,/g, "")), // Remove "Rs. " and convert to number
  rating: parseFloat(product.rating), // Convert rating to number
}));

const categories = [
  { id: 1, name: "Women", imageUrl: "/images/women-category.png" },
  { id: 2, name: "Men", imageUrl: "/images/men-category.png" },
];

export default function ProductsCard() {
  const [loadingProductId, setLoadingProductId] = useState(null);

  const handleAddToCart = async (product) => {
    const token = await getServerCookie('token');

    // Check if the user is logged in
    if (!token) {
      toast.info("Please log in to add products to your cart!");
      return;
    }

    setLoadingProductId(product.id); // Use product.id here, not product._id

    // No need to clean the price since it's already a number
    const cleanPrice = product.price; // Use the number directly

    const productData = {
      productId: product.id, // Use product.id
      img_src: product.imageUrl,
      name: product.itemName, // Corrected to match the property
      price: cleanPrice,
      quantity: 1,
    };

    try {
      console.log(token);
      const response = await axios.post("/api/cart/add", productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log("Product added to cart:", response.data);
      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err.response ? err.response.data : err.message);
      toast.error("Failed to add product to cart!");
    } finally {
      setLoadingProductId(null);
    }
  };


  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {convertedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-4 hover:shadow-xl transition-[--tw-shadow]"
            >
              <Image
                width={133}
                height={150}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <div className="px-1">
                <div className="flex justify-between items-center gap-2 mt-2">
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-[#1E1E1E] font-semibold text-base">
                     Rs  {product.price}
                    </span>
                    <span className="line-through text-[#F42222] text-xs">
                     Rs {product.oldPrice}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2 flex justify-center items-center gap-2">
                    <span className="text-[#F42222]">★</span>
                    <span>{product.rating}</span>
                  </div>
                </div>
                <div className="text-gray-600">{product.itemName}</div>
              </div>
              <Button
                className="mt-4 bg-[#F8C0BF] hover:bg-[#fe6161] transition-colors py-2 duration-300 px-4 rounded-md w-full capitalize text-sm"
                onClick={() => handleAddToCart(product)}
                disabled={loadingProductId === product.id}
              >
                {loadingProductId === product.id ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
        <div className="flex justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg w-40 h-60"
            >
              <Image
                width={133}
                height={150}
                src={category.imageUrl}
                alt={category.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 p-2 text-white">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Picks Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Hot Picks</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-md"
            >
              <Image
                width={133}
                height={150}
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="text-gray-600">{product.name}</div>
              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-red-500 text-lg">{product.price}</span>
                <span className="line-through text-gray-400">
                  {product.oldPrice}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {product.rating} ★
              </div>
              <Button
                className="mt-4 bg-[#fe6161] hover:bg-red-500 transition-colors text-white py-2 px-4 rounded-md w-full capitalize text-sm"
                onClick={() => handleAddToCart(product)}
                disabled={loadingProductId === product.id}
              >
                {loadingProductId === product.id ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
