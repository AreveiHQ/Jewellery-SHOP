// src/app/page.js
"use client"
import Footer from "@/components/HomePage/Footer";
import Banner from "@/components/HomePage/Banner";
import ProductCategories from "@/components/HomePage/Category";
import Header from "@/components/HomePage/Header";
import HeroSlider from "@/components/HomePage/HeroSlider";
import NavBar from "@/components/HomePage/Navbar";
import ProductsCard from "@/components/HomePage/ProductsCard";
import Testimonials from "@/components/HomePage/Testimonials";
import Image from "next/image";
import HomePageLoader from "@/components/Loaders/HomePageLoader";
import ProductList from "@/components/HomePage/ProductList";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Skel from '@skel-ui/react';
export default function HomePage() {
  const [products, setProducts] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return setProducts([]);

    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setProducts(data);
  };

  const [getSlides,setSlides] = useState([])
  const [slideLoader,setSlideLoader] = useState(false)
  const handleGetSlides = async () => {
    setSlideLoader(true)
    try {
      const response = await axios.get(`/admin/slides/`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Slides Get", response.data.slides);
      setSlides(response.data.slides)
      setSlideLoader(false)
    } catch (err) {
      console.error("Error getting Slides", err.response ? err.response.data : err.message);
      toast.error("Failed to get Slides ");
      setSlideLoader(false)
    }

  };
  useEffect(()=>{
    handleGetSlides();
  },[])
  return (
    <div>
      <Header onSearch={handleSearch} />
      {products.length > 0 && (
        <div className="product-list-container">
          <ProductList products={products} />
        </div>
      )}
      <NavBar />
      <main>
       {!slideLoader ? <HeroSlider slides={getSlides}/> :<div className="w-full h-[clamp(12rem,30vw,40rem)] bg-gray-200 shimmer rounded-lg" />}
        <ProductCategories />
        {!slideLoader ? <Banner slides={getSlides}/> :<div className=" h-[clamp(8rem,16vw,26rem)] w-[96%] bg-gray-200 shimmer rounded-lg mx-auto"/>}
        <ProductsCard/>
        <div className="w-full overflow-auto">
          <Image width={900} height={400}  src="/images/Flower.png" className="object-cover w-full" alt="flower" />
        </div>
        <Testimonials/>
      </main>
      <HomePageLoader/>
      <Footer/>
    </div>
  );
}
