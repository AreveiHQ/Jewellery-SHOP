'use client';
import { useState } from "react";
import Image from "next/image";
import product from "../../assets/product.png";

const OrderCart = () => {
  // Cart items state
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "About the Item - Headline", size: "M", qty: 1, price: 543 },
    { id: 2, name: "About the Item - Headline", size: "M", qty: 1, price: 543 },
    { id: 3, name: "About the Item - Headline", size: "M", qty: 1, price: 543 },
    { id: 4, name: "About the Item - Headline", size: "M", qty: 1, price: 543 },
    { id: 5, name: "About the Item - Headline", size: "M", qty: 1, price: 543 },
    { id: 6, name: "About the Item - Headline", size: "M", qty: 1, price: 543 }
  ]);

  // Selected items state (IDs of checked items)
  const [selectedItems, setSelectedItems] = useState([]);

  // Function to toggle item selection
  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // Function to remove selected items
  const removeSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]); // Clear selection after removing
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-[#EFEFEF] rounded-lg shadow-lg mt-5">
      {/* Cart Title */}
      <h2 className="text-xl font-semibold mb-4">Cart</h2>

      {/* Scrollable Items */}
      <div className="h-[413px] overflow-y-auto mb-4 bg-[#FBFBFB] ">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            isSelected={selectedItems.includes(item.id)}
            onSelect={() => toggleSelectItem(item.id)}
            onRemove={() => setCartItems(cartItems.filter((i) => i.id !== item.id))} // Remove individual item
          />
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-pink-600 mr-2"
            onChange={(e) => {
              if (e.target.checked) {
                // Select all items
                setSelectedItems(cartItems.map((item) => item.id));
              } else {
                // Deselect all items
                setSelectedItems([]);
              }
            }}
            checked={selectedItems.length === cartItems.length && cartItems.length > 0}
          />
          <span className="text-sm">Select All</span>
        </label>
        <div
          className="text-pink-700 cursor-pointer"
          onClick={removeSelectedItems}
        >
          <span className="text-black font-semibold">x</span> Remove
        </div>
      </div>
    </div>
  );
};

export default OrderCart;

const CartItem = ({ item, isSelected, onSelect, onRemove }) => {
  return (
    <div className="flex items-start p-2 my-2 mb-2">
      <input
        type="checkbox"
        className="form-checkbox items-center h-4 w-4 text-pink-600 mr-4"
        checked={isSelected}
        onChange={onSelect}
      />
      <div>
        <Image
          src={product}
          width={78}
          height={78}
          className="rounded-lg mr-2"
          alt="Product Image"
        />
        <div className="mt-2 text-[11px] text-pink-600 cursor-pointer">
          Add to wishlist
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-semibold">{item.name}</h3>
        <p className="text-sm">Size: {item.size}</p>
        <p className="text-sm">Qty: {item.qty}</p>
        <p className="text-[12px] text-pink-600 cursor-pointer">Add | <button className="text-[12px] text-pink-600 cursor-pointer mt-2"
          onClick={onRemove} >Remove</button></p>
        <p className="text-sm font-bold">Price: Rs {item.price}</p>
        
      </div>
    </div>
  );
};
