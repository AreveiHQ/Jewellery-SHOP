

const OrderCart = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg mt-5 ">
      {/* Cart Title */}
      <h2 className="text-xl font-semibold mb-4">Cart</h2>

      {/* Scrollable Items */}
      <div className="h-[400px] overflow-y-auto mb-4">
        {/* Item 1 */}
        <div className="flex items-start p-4 border-b border-gray-300">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600 mr-4" />
          <img
            src="https://via.placeholder.com/80"
            alt="Item 1"
            className="w-20 h-20 object-cover rounded-md mr-4"
          />
          <div>
            <h3 className="text-sm font-semibold">About the Item - Headline</h3>
            <p className="text-sm">Size: M</p>
            <p className="text-sm">Qty: 1</p>
            <p className="text-sm text-pink-600 cursor-pointer">Add | Remove</p>
            <p className="text-lg font-semibold">Price: Rs 543</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start p-4 border-b border-gray-300">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600 mr-4" />
          <img
            src="https://via.placeholder.com/80"
            alt="Item 2"
            className="w-20 h-20 object-cover rounded-md mr-4"
          />
          <div>
            <h3 className="text-sm font-semibold">About the Item - Headline</h3>
            <p className="text-sm">Size: M</p>
            <p className="text-sm">Qty: 1</p>
            <p className="text-sm text-pink-600 cursor-pointer">Add | Remove</p>
            <p className="text-lg font-semibold">Price: Rs 543</p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600 mr-2" />
          <span className="text-sm">Select All</span>
        </label>
        <button className="text-pink-600 text-sm font-semibold flex items-center space-x-1">
          <span>&#10006;</span>
          <span>Remove</span>
        </button>
      </div>

      {/* Footer Buttons */}
      <div className="text-pink-700 cursor-pointer">
                X Remove
      </div>
    </div>
  );
};

export default OrderCart;
