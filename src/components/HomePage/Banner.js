import { Carousel } from "@/MaterialTailwindNext";
export default function Banner() {
        return (
                <>
          {/* <section className="bg-yellow-100 py-12">
            <div className="container mx-auto flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-gray-800">ALL JEWELLERY</h2>
                <p className="text-gray-600">Celebrate her unconditional love</p>
              </div>
              <div className="flex space-x-4">
                <img src="/ring1.png" alt="Ring 1" className="w-24 h-24" />
                <img src="/ring2.png" alt="Ring 2" className="w-24 h-24" />
              </div>
            </div>
          </section> */}

     <Carousel className="rounded-xl" 
//      autoplay autoplayDelay={2000} loop
     >
       <img
         src="/images/Banner-1.png"
         alt="image 1"
         className="h-full w-full object-cover"
       />
       <img
         src="/images/Banner-1.png"
         alt="image 2"
         className="h-full w-full object-cover"
       />
       <img
         src="/images/Banner-1.png"
         alt="image 3"
         className="h-full w-full object-cover"
       />
     </Carousel>

          </>
        );
      }
      