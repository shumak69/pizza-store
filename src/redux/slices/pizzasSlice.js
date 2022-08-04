import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzasStatus", async ({currentPage, selectedFilter, sortType, searchValue}) => {
  const res = await axios.get(`https://62e3c9643c89b95396d05783.mockapi.io/items?`,
    {
      params: {
        page: currentPage + 1,
        limit: 4,
        category: selectedFilter > 0 ? selectedFilter : null,
        sortBy: sortType.type,
        order: sortType.params || "asc",
        search: searchValue ? searchValue : "",
      },
    }
  );
  return res.data;
});

const initialState = {
  items: [],
  status: 'loading'
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
        state.status = 'loading'
        state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.status = 'success'
        state.items = action.payload.items
    },
    [fetchPizzas.rejected]: (state) => {
        state.status = 'error'
        state.items = []
    }
  }
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
