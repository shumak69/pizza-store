import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
    const findItem = state.items.find(obj => obj.id === action.payload.id)
    if(findItem) {
        findItem.count++
    } else {
        state.items.push({...action.payload, count: 1});
    }
      state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
    },
    removeItem(state, action) {
        state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0
    },
    minusCount(state, action) {
        const pizza = state.items.find(item => item.id == action.payload)
        pizza.count--;
        if(pizza.count <= 0) {
            state.items = state.items.filter((item) => item.id !== action.payload)
        }
        state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
    }
  },
});

export const { addItem, removeItem, clearItems, minusCount } = cartSlice.actions;

export default cartSlice.reducer;
