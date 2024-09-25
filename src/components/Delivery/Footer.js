import Image from "next/image";
import logo from "../../public/image.png";

const Footer = () => {
  return (
    <footer className="bg-[#EFEFEF] p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div className="m-5">
          {/* Logo */}
          <div className="mb-8 flex justify-center md:justify-start">
            <Image
              src={logo}
              width={144}
              height={84}
              alt="Company Logo"
              className="mb-4"
            />
          </div>
          {/* Footer Cards */}
          <div className="">
            <FooterCard
              title={"Our Collection"}
              items={["Ring", "Necklace", "Pendants", "Bracelet", "Anklets"]}
            />
            <FooterCard
              title={"Shop by Price"}
              items={["₹500+", "₹1000+", "₹1499+", "₹2499+", "₹5000+"]}
            />
            <FooterCard
              title={"Shop by Occasion"}
              items={["Anniversary", "Engagement", "Proposal", "Wedding", "Festivals"]}
            />
            <FooterCard
              title={"Shop by Relation"}
              items={["For Mother", "For Sister", "For Wife", "For Husbands", "For Girlfriend"]}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-between">
          {/* Newsletter Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <input
              type="email"
              placeholder="Enter your Email ID"
              className="w-full md:w-2/3 p-2 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>

          {/* Menu Section */}
          <div className="mb-8 mt-2">
            <h2 className="text-xl font-semibold mb-4">Our Menu</h2>
            <ul className="text-black space-y-2">
              <li>Account</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Our Blogs</li>
              <li>Store Locator</li>
              <li>FAQ's & Support</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-black">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-black">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>All Rights Reserved © JP Jewellers</p>
        <p>Developed and Maintained by AREVEI</p>
      </div>
    </footer>
  );
};

// FooterCard Component
const FooterCard = ({ title, items }) => {
  return (
    <div className="mt-9">
      <h3 className="text-2xl font-bold text-black mb-2">{title}</h3>
      <p className="text-md text-[#2A2A2A] mt-2 ">{items.join(" | ")}</p>
    </div>
  );
};

export default Footer;
