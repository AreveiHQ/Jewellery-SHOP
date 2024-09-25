








import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Category from "../Components/Categories";
import DeliveryForm from "../Components/DeliveryForm";
import OrderCart from "../Components/OrderCart";

export default function Home() {
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
