import DeliveryForm from "@/components/Delivery/DeliveryForm";
import Footer from "@/components/Delivery/Footer";

import OrderCart from "../../components/Delivery/OrderCart";

export default function AddressPage() {
  return (
    <div className="">
      <main className="">
      <div className="flex flex-col md:grid grid-cols-2">
          <div className="order-2 md:order-1 p-4">
            <DeliveryForm />
          </div>
          <div className="order-1 md:order-2 p-4">
            <OrderCart />
          </div>
        </div>
        <Footer/>
     </main>
    </div>
  );
}
