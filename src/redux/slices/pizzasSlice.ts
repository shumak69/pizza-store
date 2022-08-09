import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaBlockProps } from "../../Components/pizzaBlock";

type SortTypeState = {
  type: string;
  params: string;
};

interface FetchPizzasArgs {
  currentPage: number;
  selectedFilter: number;
  sortType: SortTypeState;
  searchValue: string;
  limits: number;
}

export interface AxiosRes {
  items: PizzaBlockProps[]
}

export const fetchPizzas = createAsyncThunk<AxiosRes, FetchPizzasArgs>(
  "pizzas/fetchPizzasStatus",
  async ({ currentPage, selectedFilter, sortType, searchValue, limits }) => {
    const res = await axios.get(
      `https://62e3c9643c89b95396d05783.mockapi.io/items?`,
      {
        params: {
          page: currentPage + 1,
          limit: limits,
          category: selectedFilter > 0 ? selectedFilter : null,
          sortBy: sortType.type,
          order: sortType.params || "asc",
          search: searchValue ? searchValue : "",
        },
      }
    );
    return res.data;
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzaSliceState {
  items: PizzaBlockProps[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload.items;
    },);
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    },);
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
