import DeliveryForm from "@/components/Delivery/DeliveryForm";
import Header from "@/components/HomePage/Header";

import OrderCart from "../../components/Delivery/OrderCart";
import NavBar from "@/components/HomePage/Navbar";
import Footer from "@/components/HomePage/Footer";
import DeliveryLoader from "@/components/Loaders/DeliveryLoader";

export default function AddressPage() {
  return (
    <div className="">
      <Header/>
      <NavBar/>
      <main className="">
      <div className="flex flex-col md:grid grid-cols-2">
          <div className="order-2 md:order-1 p-4">
            <DeliveryForm />
          </div>
          <div className="order-1 md:order-2 p-4">
            <OrderCart />
          </div>
          
        </div>
        <DeliveryLoader/>
        <Footer/>
     </main>
    </div>
  );
}
