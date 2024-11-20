import { Carousel } from "@/MaterialTailwindNext";
import Image from "next/image";
export default function Banner({slides}) {
        return (
                <>
     <Carousel className="rounded-xl h-[clamp(8rem,16vw,26rem)] w-[96%] mx-auto" 
     autoplay autoplayDelay={10000} loop
     >
      {slides?.map((item,index)=>  
       {return <Image width={900} height={300} 
       key={index}
         src={item.images}
         alt={`Banner ${index}`}
         className="h-full w-full object-cover"
       />})}

     </Carousel>

          </>
        );
      }
      