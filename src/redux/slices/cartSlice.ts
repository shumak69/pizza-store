import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemProps } from "../../Components/CartItem";
import { RootState } from "../store";


interface CartSliceState  {
  totalPrice: number;
  items: CartItemProps[]
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemProps>) {
    const findItem = state.items.find(obj => obj.id === action.payload.id)
    if(findItem) {
        findItem.count++
    } else {
        state.items.push({...action.payload, count: 1});
    }
      state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
    },
    removeItem(state, action: PayloadAction<string>) {
        state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0
    },
    minusCount(state, action: PayloadAction<string>) {
        const pizza = state.items.find(item => item.id == action.payload)
        pizza!.count--;
        if(pizza!.count <= 0) {
            state.items = state.items.filter((item) => item.id !== action.payload)
        }
        state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
    }
  },
});


export const selectCart = (state: RootState) => state.cart

export const selectCartItemById = (id: string) => (state : RootState) => state.cart.items.find(item => item.id === id)

export const { addItem, removeItem, clearItems, minusCount } = cartSlice.actions;

export default cartSlice.reducer;
