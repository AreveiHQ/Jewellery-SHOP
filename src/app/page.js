import { lazy, Suspense } from "react";

import Footer from "@/components/HomePage/Footer";
const Banner = lazy(() => import("@/components/HomePage/Banner"));
const ProductCategories = lazy(() => import( "@/components/HomePage/Category"));
const HeroSlider = lazy(() => import( "@/components/HomePage/HeroSlider"));
import NavBar from "@/components/HomePage/Navbar";
const ProductsCard = lazy(() => import( "@/components/HomePage/ProductsCard"));
import Testimonials from "@/components/HomePage/Testimonials";
import Image from "next/image";


export default function HomePage() {  
  return (
    <div>
      {/* {products.length > 0 && (
        <div className="product-list-container">
          <ProductList products={products} />
        </div>
      )} */}
      <NavBar />
      <main>
      <Suspense fallback={<div>Loading...</div>}>

       <HeroSlider />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductCategories />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Banner />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
      <ProductsCard/>
      </Suspense>

      
      </main>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full overflow-auto">
          <Image width={900} height={400}  src="/images/Flower.png" className="object-cover w-full" alt="flower" />
        </div>
        <Testimonials/>
      <Footer/>
      </Suspense>
    </div>
  );
}
