import React from "react";
// A sample product data for the design
import RatingSVG from '../../assets/rating.svg'
import { Button } from "@/MaterialTailwindNext";
const products = [
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod1.png", // Replace with actual path
  },
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod2.png", // Replace with actual path
  },
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod3.png", // Replace with actual path
  },
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod4.png", // Replace with actual path
  },
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod5.png", // Replace with actual path
  },
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod6.png", // Replace with actual path
  },
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod7.png", // Replace with actual path
  },
  {
    id: 1,
    name: "Silver Earing for Birthday",
    price: "Rs. 543",
    oldPrice: "Rs. 634",
    rating: "4.3",
    imageUrl: "/images/Prod8.png", // Replace with actual path
  },
  // Add more products...
];

const categories = [
  { id: 1, name: "Women", imageUrl: "/images/women-category.png" },
  { id: 2, name: "Men", imageUrl: "/images/men-category.png" },
];

export default function ProductsCard() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Top Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white  rounded-lg p-4  hover:shadow-xl"
            >
                <div >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <div className=" px-1">
              <div className="flex justify-between items-center gap-2 mt-2 ">
                <div className="flex justify-center items-center gap-2">
                <span className="text-[#1E1E1E] font-semibold text-base ">{product.price}</span>
                <span className="line-through text-[#F42222] text-xs">
                  {product.oldPrice}
                </span>
                </div>
              <div className="text-sm text-gray-500 mt-2 flex justify-center items-center gap-2 ">
                <span className="text-[#F42222]"><RatingSVG/></span>
                <span>{product.rating} </span>
              </div>
              </div>
              <div className="text-gray-600">{product.name}</div>
              </div>
              </div>
              <Button  className="mt-4 bg-[#F8C0BF]  hover:bg-[#fe6161] hover: text-black transition-colors py-2 duration-300 px-4 rounded-md w-full capitalize text-sm">
                Add to Cart
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
              <img
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
              <img
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
              <Button className="mt-4 bg-[#fe6161] hover:bg-red-500 transition-colors text-white py-2 px-4 rounded-md w-full capitalize text-sm ">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
