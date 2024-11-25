"use client"
import Image from "next/image";

import {  Carousel } from "@/MaterialTailwindNext";
import Customers from "./Customers";
import axios from 'axios';
import { useEffect, useState } from 'react';
import RelatedProducts from "../RelatedProducts";
// const products = [
//     {
//       id: 1,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod1.png", // Replace with actual path
//     },
//     {
//       id: 2,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod2.png", // Replace with actual path
//     },
//     {
//       id: 3,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod3.png", // Replace with actual path
//     },
//     {
//       id: 4,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod4.png", // Replace with actual path
//     },
//     {
//       id: 5,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod5.png", // Replace with actual path
//     },
//     {
//       id: 6,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod6.png", // Replace with actual path
//     },
//     {
//       id: 7,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod7.png", // Replace with actual path
//     },
//     {
//       id: 8,
//       name: "Silver Earing for Birthday",
//       price: "Rs. 543",
//       oldPrice: "Rs. 634",
//       rating: "4.3",
//       imageUrl: "/images/Prod8.png", // Replace with actual path
//     },
//     // Add more products...
//   ];

export default function Product({ id }) {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`/api/products/${id}`);
                    setProduct(response.data.product);
                    setRelatedProducts(response.data.relatedProducts);
                } catch (error) {
                    setError("Error fetching product or related products");
                    console.error(error);
                }
            };

            fetchProduct();
        }
    }, [id]);


    return (
        <div className="flex flex-col lg:flex-row gap-2 ">
           <div className="w-full lg:w-[40%]">
            <div className="p-3 bg-[#F3F3F3] rounded-md md:mx-9  sticky top-24">
            <div className="flex item-center justify-center rounded-md p-2">
            <Carousel
            className="rounded-xl w-[500px]  md:w-full  max-w-[500px] md:max-w-none pb-16"
            navigation={({ setActiveIndex, activeIndex }) => (
                <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {product?.images?.map((img, i) => (
                    <Image
                    width={1000}
                    height={1000}
                    src={img}
                    key={`productDetails ${i}`}
                    alt={`productDetails ${i}`}
                    className={`block my-auto cursor-pointer rounded-2xl transition-all content-[''] border-2 ${
                        activeIndex === i ? "w-16 h-16  bg-white border-pink-300" : "w-10 h-10 bg-white/50 border-blue-gray-100"
                    }`}
                    onClick={() => setActiveIndex(i)}
                    />
                ))}
                </div>
            )}
            >
                {product?.images?.map((img,ind)=><Image
                width={400}
                height={400}
                    src={img}
                    alt={`Product${ind}`}
                    key={`Product${ind}`}
                    className="object-contain w-full h-auto "
                />)}
                </Carousel>
            </div>
        
        </div>
            </div>

            <div className="w-full lg:w-[60%] px-4 lg:px-0">
                <ProductInfo info={product} />
                <RelatedProducts relatedProducts={relatedProducts} />
                <Customers productId={id} />
            </div>
        </div>
    );
}

// function ProductImageSection({product}) {
//     return (
//         <div className="p-3 bg-[#F3F3F3] rounded-md md:mx-9  sticky top-24">
//             <div className="flex item-center justify-center rounded-md p-2">
//             <Carousel
//             className="rounded-xl w-[500px]  md:w-[449px] md:h-[528px] max-w-[500px] md:max-w-none"
//             navigation={({ setActiveIndex, activeIndex }) => (
//                 <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
//                 {product?.images?.map((img, i) => (
//                     <Image
//                     width={500}
//                     height={500}
//                     src={img}
//                     key={`productDetails ${i}`}
//                     alt={`productDetails ${i}`}
//                     className={`block my-auto cursor-pointer rounded-2xl transition-all content-[''] border-2 ${
//                         activeIndex === i ? "w-16 h-16  bg-white border-pink-300" : "w-10 h-10 bg-white/50 border-blue-gray-100"
//                     }`}
//                     onClick={() => setActiveIndex(i)}
//                     />
//                 ))}
//                 </div>
//             )}
//             >
//                 {product?.images?.map((img,ind)=><Image
//                 width={400}
//                 height={400}
//                     src={img}
//                     alt={`Product${ind}`}
//                     key={`Product${ind}`}
//                     className="object-contain w-full h-auto"
//                 />)}
//                 </Carousel>
//             </div>
//             {/* <div className="flex justify-center mt-4 gap-2">
//             {Array(4)
//                 .fill("")
//                 .map((_, index) => (
//                     <div
//                         key={index}
//                         className="w-16 h-16 bg-gray-300 border border-gray-300"
//                     ></div>
//                 ))}
//         </div> */}
//         </div>
//     );
// }





function ProductInfo({info}) {
    return (
        <div className="py-4 pr-4 max-w-[800px]">
            <h2 className="text-xl font-semibold">
                {info?.name}
            </h2>
            <div className="flex py-2">
                <p className="text-sm text-gray-600">Made with 925 Silver |</p>
                <button className="text-[#BC264B] text-sm mx-3 underline">Add to wishlist</button>
                <button className="text-[#BC264B] text-sm mx-2 underline">Share</button>
            </div>
            <div className="mt-2">
                {/* <span className="p-2 bg-[#D9D9D9] rounded text-sm">★ {info?.averageRating.toFixed(1)}</span> */}
                

<div className="flex items-center">
    <svg className="w-4 h-4 text-pink-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{info?.averageRating.toFixed(1)}</p>
    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
    <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{info?.numReviews} reviews</a>
</div>

            </div>
            <div className="mt-4">
            <h3 className="text-md font-semibold ">Description</h3>
            <div className="bg-[#F6F6F6] p-3 rounded-md" dangerouslySetInnerHTML={{__html:info?.description}}>
               
            </div>
            <div className="mt-4">
                <button className="text-[#BC264B] text-sm mx-3 underline">See the Offers</button>
            </div>
        </div>
            <ProductFeatures />
            <div className="mt-6">
            <p className="mb-2 mt-2 text-xl font-semibold">Check our Pincode</p>
            <input
                type="text"
                placeholder="Enter 6 Digit Pincode"
                className="border text-black bg-[#EAEAEA] p-2 rounded w-1/2"
            />
            <div className="">
                <button className="text-[#BC264B] text-sm mt-2 mb-3 underline">Check</button>
            </div>

            <div className="mt-2 mb-4 ">
                <input
                    type="checkbox"
                    id="gift"
                    className="rounded-none"
                />
                <label htmlFor="gift" className="font-semibold text-sm mx-2">Add gift wrap to your order (Rs.50)</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="bg-[#F8C0BF] text-black font-semibold  p-2 rounded w-full m-2">
                    Buy Now
                </button>
                <button className=" border-[1px] border-[#F8C0BF] hover:bg-[#F8C0BF] text-black font-semibold p-2 rounded w-full m-2">
                    Add to Cart
                </button>
            </div>
        </div>
        </div>
    );
}


function ProductFeatures() {
    return (
        <div className="grid grid-cols-2 gap-4 mt-4 mx-2 text-sm">
            <FeatureItem label="Easy 30 Day Return" />
            <FeatureItem label="Lifetime Plating" />
            <FeatureItem label="925 Silver" />
            <FeatureItem label="6-Month Warranty" />
        </div>
    );
}

function FeatureItem({ label }) {
    return <div className="font-semibold">{label}</div>;
}

