import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk('cart/fetch',
        async(_,{rejectedWithValue})=>{
                try {
                        const response = await axios.get('/api/cart')
                        return response.data;
                } catch (error) {
                        return rejectedWithValue(error.message)
                }
        }
)

const initialState = {
        isLoggedIn: false,
        items: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart") || "[]") : [],
      };
      
      const cartSlice = createSlice({
        name: "cart",
        initialState,
        reducers: {
          addItem: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
              existingItem.quantity += action.payload.quantity;
            } else {
              state.items.push(action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
          },
          removeItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
          },
          clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart");
          },
          setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
          },
          syncCart: (state, action) => {
            state.items = action.payload;
            localStorage.setItem("cart", JSON.stringify(state.items));
          },
        },
        extraReducers: (builder) => {
          builder.addCase(HYDRATE, (state, action) => {
            return { ...state, ...action.payload.cart };
          });
        },
      });

      export const { addItem, removeItem, clearCart, setLoggedIn, syncCart } = cartSlice.actions;

export default cartSlice.reducer;