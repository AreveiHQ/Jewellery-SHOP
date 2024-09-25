'use Client'
import Image from "next/image";
import logo from "../../public/image.png"
export default function Header() {
    return (
      <header className="p-3 flex gap-9 items-center">
        <div className="">
            <Image src={logo}
             width={144}
             height={84}
             className=" ml-3"
             alt="Picture of the author"
            />
        </div>
       
       <input
          type="text"
          placeholder="Search Pendants..."
          className=" rounded-full p-3 pl-3 w-1/2 bg-[#D9D9D9]"
        />
     
        
      </header>
    );
  }
  