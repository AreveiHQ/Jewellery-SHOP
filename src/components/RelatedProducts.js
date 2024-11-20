"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const RelatedProducts = ({ relatedProducts }) => {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-5 border-b-2 border-gray-300 pb-2">
                Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg p-4 hover:shadow-xl transition-all duration-300 ease-in-out"
                    >
                        <Link href={`/product/${product.id}`}>
                            <a>
                                {/* Product Image */}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={150}
                                    height={180}
                                    className="w-full h-44 sm:h-48 lg:h-52 object-cover rounded-lg mb-4"
                                />
                                {/* Product Details */}
                                <div className="px-1">
                                    <div className="flex justify-between items-center gap-2">
                                        <div className="flex gap-2">
                                            <span className="text-[#1E1E1E] font-semibold text-sm">
                                                ${product.price}
                                            </span>
                                            {product.oldPrice && (
                                                <span className="line-through text-[#F42222] text-sm">
                                                    ${product.oldPrice}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <span className="text-yellow-400">★</span>
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-gray-800 font-medium mt-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm">{product.category}</p>
                                </div>
                            </a>
                        </Link>
                        {/* Add to Cart Button */}
                        <button className="mt-4 bg-[#F8C0BF] hover:bg-[#fe6161] text-black transition-colors py-2 duration-300 px-4 rounded-md w-full capitalize text-sm">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
