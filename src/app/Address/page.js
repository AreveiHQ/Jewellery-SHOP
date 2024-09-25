import Category from "@/components/Delivery/Categories";
import DeliveryForm from "@/components/Delivery/DeliveryForm";
import Footer from "@/components/Delivery/Footer";
import Header from "@/components/Delivery/Header";
import OrderCart from "@/components/Delivery/OrderCart";

export default function CartPage() {
  return (
    <div className="">
      <main className="">
        <Header/>
        <Category/>
        <div className="flex justify-around">
         <div>
          <DeliveryForm/>
         </div>
         <div>
           <OrderCart/>
         </div>
        </div>
        <Footer/>
     </main>
    </div>
  );
}
