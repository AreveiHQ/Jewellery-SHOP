"use client"
import Image from "next/image";
import product2 from "../../assets/product2.png";
import RatingSVG from '../../assets/rating.svg'
import { Button, Carousel } from "@/MaterialTailwindNext";
import Customers from "./Customers";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function Product({id}) {
    const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data);
        //   console.log(response.data)
        } catch (error) {
          setError('Error fetching product');
        } 
      };

      fetchProduct();
    }
  }, [id]);
    return (
        <div className="flex flex-col lg:flex-row">
            <div>
            <ProductImageSection images={product?.images?product.images:[]}/>
            </div>
            <div>
            <ProductInfo info={product} />
            <Products/>
            <Customers productId={id} />
            </div>
        </div>
    );
}

function ProductImageSection({images}) {
    return (
        <div className="p-3 bg-[#F3F3F3] rounded-md md:mx-9  sticky top-24">
            <div className="flex item-center justify-center rounded-md p-2">
            <Carousel
            className="rounded-xl w-[500px]  md:w-[449px] md:h-[528px] max-w-[500px] md:max-w-none"
            navigation={({ setActiveIndex, activeIndex }) => (
                <div className="absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {images.map((img, i) => (
                    <Image
                    width={500}
                    height={500}
                    src={img}
                    key={i}
                    className={`block my-auto cursor-pointer rounded-2xl transition-all content-[''] border-2 ${
                        activeIndex === i ? "w-16 h-16  bg-white border-pink-300" : "w-10 h-10 bg-white/50 border-blue-gray-100"
                    }`}
                    onClick={() => setActiveIndex(i)}
                    />
                ))}
                </div>
            )}
            >
                {images.map((img,ind)=><Image
                width={400}
                height={400}
                    src={img}
                    alt={`Product${ind}`}
                    className="object-contain w-full h-auto"
                />)}
                </Carousel>
            </div>
            {/* <div className="flex justify-center mt-4 gap-2">
            {Array(4)
                .fill("")
                .map((_, index) => (
                    <div
                        key={index}
                        className="w-16 h-16 bg-gray-300 border border-gray-300"
                    ></div>
                ))}
        </div> */}
        </div>
    );
}



function ProductInfo({info}) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold">
                {info?.name}
            </h2>
            <div className="flex py-2">
                <p className="text-sm text-gray-600">Made with 925 Silver |</p>
                <button className="text-[#BC264B] text-sm mx-3 underline">Add to wishlist</button>
                <button className="text-[#BC264B] text-sm mx-2 underline">Share</button>
            </div>
            <div className="mt-2">
                <span className="p-2 bg-[#D9D9D9] rounded text-sm">★ 4.8</span>
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



function Products() {
    return (
        <>
           <div className="mt-2 font-semibold text-xl">
           You May Also Like it
           </div>
            <div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-y-2 md:gap-y-4">
        {products.map((product) => (
            <div
                key={product.id}
                className="bg-white rounded-lg p-4 hover:shadow-xl transition-all duration-300 ease-in-out"
            >
                <div>
                    {/* Adjusted the width and height for responsiveness */}
                    <Image
                        width={150}
                        height={180} // Adjusted for slightly larger images
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-40 sm:h-44 lg:h-52 object-cover rounded-lg mb-4"
                    />
                    <div className="px-1">
                        <div className="flex justify-between items-center gap-2 mt-2">
                            <div className="flex gap-2">
                                <span className="text-[#1E1E1E] font-semibold text-xs">
                                    {product.price}
                                </span>
                                <span className="line-through text-[#F42222] text-xs">
                                    {product.oldPrice}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 mt-2 flex justify-center items-center gap-2">
                                <span className="text-[#F42222]">
                                    <RatingSVG />
                                </span>
                                <span>{product.rating}</span>
                            </div>
                        </div>
                        <div className="text-gray-600">{product.name}</div>
                    </div>
                </div>
                <button className="mt-4 bg-[#F8C0BF] hover:bg-[#fe6161] text-black transition-colors py-2 duration-300 px-4 rounded-md w-full capitalize text-sm">
                    Add to Cart
                </button>
            </div>
        ))}
    </div>
</div>

        </>
    )
}
