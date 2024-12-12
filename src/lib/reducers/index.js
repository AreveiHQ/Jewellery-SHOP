import { combineReducers } from "@reduxjs/toolkit"
import categoryReducer from "./categoryReducer"
import slidesReducer from "./slidesReducer"
import userReducer from "./userReducer"
import productReducer from "./productbyIdReducer"
import wishListReducer from "./wishlistReducer"
import cartReducer from "./cartReducer"

const rootReducer = combineReducers({
        categories:categoryReducer,
        slides:slidesReducer,
        user:userReducer,
        wishlist:wishListReducer,
        product:productReducer,
        cart:cartReducer,
  })
  export default rootReducer;