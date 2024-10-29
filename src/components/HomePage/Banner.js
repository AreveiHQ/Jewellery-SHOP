import { Carousel } from "@/MaterialTailwindNext";
import Image from "next/image";
export default function Banner({slides}) {
        return (
                <>
     <Carousel className="rounded-xl h-[clamp(8rem,16vw,26rem)] w-[96%] mx-auto" 
     autoplay autoplayDelay={10000} loop
     >
      {slides?.map((item)=>  
       {return <Image width={900} height={300} 
         src={item.images}
         alt="image 1"
         className="h-full w-full object-cover"
       />})}
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
      