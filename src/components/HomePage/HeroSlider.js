import { Carousel} from "@/MaterialTailwindNext";
import Image from "next/image";
 
export default function HeroSlider({slides}) {
  return (
    <Carousel className=" cursor-pointer h-[clamp(12rem,30vw,40rem)]"
     autoplay autoplayDelay={10000} loop
    >
      {slides?.map((item,index)=>  
       {return <div className="relative h-full w-full">
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