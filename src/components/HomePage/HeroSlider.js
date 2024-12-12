"use client"
import { Carousel} from "@/MaterialTailwindNext";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getHeroSlides } from "@/lib/reducers/slidesReducer";
import { useEffect } from "react";
import toast from "react-hot-toast";
 
export default function HeroSlider() {
  const dispatch = useAppDispatch();

  const {heroSlides,heroloading,isherofetched,heroFetcherror}= useAppSelector((state)=>state.slides)
  useEffect(()=>{
    const handleGetSlides = async () => {
      try {
        if(!isherofetched){
          dispatch(getHeroSlides())
        }
      } catch (err) {
        console.error("Error getting Slides", heroFetcherror);
        toast.error("Error getting Slides")
      }
  
    };
    handleGetSlides();
  },[])
   if(heroloading){
    return <div className="w-full h-[clamp(12rem,30vw,40rem)] bg-gray-200 shimmer rounded-lg" />
   }
  return (
    <Carousel className=" cursor-pointer bg-blue-gray-50 h-[clamp(12rem,30vw,40rem)]"
     autoplay autoplayDelay={10000} loop
    >
      {heroSlides?.map((item,index)=>  
       {return <div className="relative h-full w-full" key={index}>
        <Image width={900} height={300} 
          src={item?.desktopBannerImage}
          alt={`Hero ${index}`}
          className="h-full w-full object-cover"
        />
      </div>})}
    </Carousel>
  );
}