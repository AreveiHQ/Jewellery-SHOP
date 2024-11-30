"use client"
import { Carousel } from "@/MaterialTailwindNext";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Banner() {
  const [slides,setSlides] = useState([])
  const [slideLoader,setSlideLoader] = useState(false)
  const handleGetSlides = async () => {
    setSlideLoader(true)
    try {
      const response = await axios.get(`/admin/slides/`,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Slides Get", response.data.slides);
      setSlides(response.data.slides)
      setSlideLoader(false)
    } catch (err) {
      console.error("Error getting Slides", err.response ? err.response.data : err.message);
      toast.error("Failed to get Slides ");
      setSlideLoader(false)
    }

  };
  useEffect(()=>{
    handleGetSlides();
  },[])
  if(slideLoader){
    return <div className="w-full h-[clamp(12rem,30vw,40rem)] bg-gray-200 shimmer rounded-lg" />
   }
        return (
                <>
     <Carousel className="rounded-xl h-[clamp(8rem,16vw,26rem)] w-[96%] mx-auto" 
     autoplay autoplayDelay={10000} loop
     >
      {slides?.map((item,index)=>  
       {return <Image width={900} height={300} 
        loading="lazy"
       key={index}
         src={item.images}
         alt={`Banner ${index}`}
         className="h-full w-full object-cover"
       />})}

     </Carousel>

          </>
        );
      }
      