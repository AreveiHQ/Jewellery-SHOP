import Image from "next/image";

// components/ProductCategories.js
export default function ProductCategories() {
        const categories = [
          { name: 'Pendants', image: '/images/pendants.png' },
          { name: 'Earing', image: '/images/earings.png' },
          { name: 'Necklace', image: '/images/necklaces.png' },
          { name: 'Bracelets', image: '/images/bracelets.png' },
          { name: 'Sets', image: '/images/sets.png' },
          { name: 'Anklets', image: '/images/anklets.png' },
        ];
      
        return (
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-6 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="text-center">
                  <Image width={100} height={100} 
                    src={category.image}
                    alt={category.name}
                    className="w-24 h-24 mx-auto mb-2"
                  />
                  <h3 className="text-gray-600">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        );
      }
      