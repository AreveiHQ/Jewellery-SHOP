import { Carousel } from "@/MaterialTailwindNext";
import Image from "next/image";
export default function Banner() {
        return (
                <>
     <Carousel className="rounded-xl" 
     autoplay autoplayDelay={10000} loop
     >
       <Image width={900} height={300} 
         src="/images/Banner-1.png"
         alt="image 1"
         className="h-full w-full object-cover"
       />
       <Image width={900} height={300} 
         src="/images/Banner-1.png"
         alt="image 2"
         className="h-full w-full object-cover"
       />
       <Image width={900} height={300} 
         src="/images/Banner-1.png"
         alt="image 3"
         className="h-full w-full object-cover"
       />
     </Carousel>

          </>
        );
      }
      