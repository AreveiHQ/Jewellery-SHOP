import Product from "@/components/ProductPage/Product";
import Header from "@/components/HomePage/Header";
import Footer from "@/components/HomePage/Footer";
import ProductDetailsLoader from "@/components/Loaders/ProductDetailsLoader";
import RelatedProducts from "@/components/RelatedProducts";

export default function Page({ params }) {
    
    return( <>

        <div className="p-0 md:p-2">
            <Product id={params.id} />
            
        </div>
        
        <ProductDetailsLoader/>
       <Footer/>
    </>
    )
}