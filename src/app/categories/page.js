import Footer from "@/components/HomePage/Footer";
import Header from "@/components/HomePage/Header";
import NavBar from "@/components/HomePage/Navbar";
import { Button } from "@/MaterialTailwindNext";

// components/CategoryGrid.js
export default function CategoryGrid() {
  const categories = [
    { name: "Rings", image: "/path-to-image", link: "#" },
    { name: "Necklace", image: "/path-to-image", link: "#" },
    { name: "Pendants", image: "/path-to-image", link: "#" },
  ];

  const collections = [
    { name: "Love in Paris", image: "/path-to-image", link: "#" },
    { name: "Just Arrived", image: "/path-to-image", link: "#" },
    { name: "Occasion", image: "/path-to-image", link: "#" },
  ];

  return (
     <div>
        <Header/>
        <NavBar/>
    <div className="space-y-8 container mx-auto my-10">
      {/* Categories Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="text-center">
            <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
            <div className="bg-gray-300 h-48 rounded-md"></div>
            <Button className="mt-4 bg-[#F8C0BF]  hover:bg-[#fe6161] hover: text-black transition-colors  duration-300 py-2 px-4 rounded-md w-full capitalize text-sm ">
                Explore
              </Button>
          </div>
        ))}
      </div>

      {/* Collections Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {collections.map((collection) => (
          <div key={collection.name} className="text-center">
            <h3 className="mt-4 text-lg font-semibold">{collection.name}</h3>
            <div className="bg-gray-300 h-48 rounded-md"></div>
            <Button className="mt-4 bg-[#F8C0BF]  hover:bg-[#fe6161] hover: text-black transition-colors  duration-300 py-2 px-4 rounded-md w-full capitalize text-sm ">
                Explore
              </Button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
}
