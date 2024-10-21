import NavBar from "@/components/HomePage/Navbar";
import Product from "@/components/ProductPage/Product";
import Header from "@/components/HomePage/Header";

import Footer from "@/components/HomePage/Footer";
import ProductDetailsLoader from "@/components/Loaders/ProductDetailsLoader";
export default function Page(){
    return( <>
        <Header/>
        <NavBar/>
        <div className="p-0 md:p-2">
        <Product/>
        </div>
        <ProductDetailsLoader/>
       <Footer/>
    </>
    )
}