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
import { useState } from "react";


export default function HomePage() {
  const [products, setProducts] = useState([]);

  const handleSearch = async (query) => {
    if (!query) return setProducts([]);

    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setProducts(data);
  };

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
        <HeroSlider/>
        <ProductCategories />
        <Banner />
        <ProductsCard/>
        <div className="w-full overflow-auto">
          <Image width={900} height={400}  src="/images/Flower.png" className="object-cover w-full" alt="" />
        </div>
        <Testimonials/>
      </main>
      <HomePageLoader/>
      <Footer/>
    </div>
  );
}
