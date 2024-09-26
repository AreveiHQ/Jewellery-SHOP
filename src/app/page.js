// src/app/page.js

import Footer from "@/components/Delivery/Footer";
import Banner from "@/components/HomePage/Banner";
import ProductCategories from "@/components/HomePage/Category";
import Header from "@/components/HomePage/Header";
import HeroSlider from "@/components/HomePage/HeroSlider";
import NavBar from "@/components/HomePage/Navbar";
import ProductsCard from "@/components/HomePage/ProductsCard";
import Testimonials from "@/components/HomePage/Testimonials";


export default function HomePage() {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <HeroSlider/>
        <ProductCategories />
        <Banner />
        <ProductsCard/>
        <div className="w-full overflow-auto">
          <img src="/images/Flower.png" className="object-cover w-full" alt="" />
        </div>
        <Testimonials/>
      </main>
      <Footer/>
    </div>
  );
}
