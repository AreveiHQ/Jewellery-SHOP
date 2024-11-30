"use client"
import { Carousel} from "@/MaterialTailwindNext";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
 
export default function HeroSlider() {
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
    <Carousel className=" cursor-pointer bg-blue-gray-50 h-[clamp(12rem,30vw,40rem)]"
     autoplay autoplayDelay={10000} loop
    >
      {slides?.map((item,index)=>  
       {return <div className="relative h-full w-full" key={index}>
        <Image width={900} height={300} 
          src={item.images}
          alt={`Hero ${index}`}
          className="h-full w-full object-cover"
        />
      </div>})}
      
      {/* <div className="relative h-full w-full">
      <Image width={900} height={300} 
          src="/images/SL2.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0  flex  items-center h-full w-full  bg-black/10">
          <div className="w-3/4  md:w-1/3 ml-20 hidden lg:block">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="pink" variant="contained">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
      <Image width={900} height={300} 
          src="/images/SL3.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0  flex  items-center h-full w-full  bg-black/10">
          <div className="w-3/4  md:w-1/3 ml-20 hidden lg:block">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that quality
              of air that emanation from old trees, that so wonderfully changes
              and renews a weary spirit.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="pink" variant="contained">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div> */}
    </Carousel>
  );
}