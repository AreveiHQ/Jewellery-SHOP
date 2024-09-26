import { NavList } from "./Header";

// components/NavBar.js
export default function NavBar() {
        return (
          <nav className="bg-gray-100 hidden lg:block">
            <div className="container mx-auto flex justify-between p-4">
              <ul className="flex space-x-4 text-gray-600">
                {/* <li><a href="#">Shop by Category</a></li>
                <li><a href="#">Shop by Occasion</a></li>
                <li><a href="#">Hot Collections</a></li>
                <li><a href="#">Budget Gift</a></li>
                <li><a href="#">Premium Gifts</a></li>
                <li><a href="#">For Couples</a></li>
                <li><a href="#">Men</a></li> */}
        <div className="hidden lg:block">
          <NavList />
        </div>
              </ul>
            </div>
          </nav>
        );
      }
      