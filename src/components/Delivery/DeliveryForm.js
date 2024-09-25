// components/DeliveryForm.js
import React from "react";

const DeliveryForm = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Delivery Section */}
      <h2 className="text-xl font-bold mb-4">Delivery</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Contact Number"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Flat No, Building Name"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
        <input
          type="text"
          placeholder="State"
          value="Gujarat"
          readOnly
          className="border border-gray-300 bg-gray-100 text-gray-700 rounded-lg p-3 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Road, Area, Landmark"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
        <input
          type="text"
          placeholder="City"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Area Pincode"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
          <span className="text-gray-700">Deliver as Gift</span>
        </label>
      </div>

      {/* Coupon Section */}
      <h2 className="text-xl font-bold mb-4">Apply Coupon</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 bg-gray-100 text-gray-400 rounded-lg p-3 w-full"
        />
      </div>

      <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg w-full">
        Proceed to Payment
      </button>
    </div>
  );
};

export default DeliveryForm;
