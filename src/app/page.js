// src/app/page.js

import Banner from "@/components/HomePage/Banner";
import ProductCategories from "@/components/HomePage/Category";
import Header from "@/components/HomePage/Header";
import HeroSlider from "@/components/HomePage/HeroSlider";
import NavBar from "@/components/HomePage/Navbar";
import ProductsCard from "@/components/HomePage/ProductsCard";
import AddressPage from "./Address/page";


export default function HomePage() {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        {/* <HeroSlider/>
        <ProductCategories />
        <Banner />
        <ProductsCard/> */}
        <AddressPage/>
      </main>
    </div>
  );
}
