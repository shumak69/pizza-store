import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sort = {
  type: 'rating' | 'price' | 'title';
  name: string;
  params: string;
};

export interface FilterSliceState {
  selectedFilter: number;
  sortType: Sort;
  searchValue?: string;
  currentPage: number;
  pageCount?: number;
  limits: number
}

const initialState: FilterSliceState = {
  selectedFilter: 0,
  sortType: { type: "rating", name: "популярности", params: "asc" },
  searchValue: "",
  currentPage: 0,
  pageCount: 0,
  limits: Number(localStorage.getItem("limits")) || 4
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedFilter(state, action: PayloadAction<number>) {
      state.currentPage = 0;
      state.selectedFilter = action.payload;
    },
    setSelectedSort(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.currentPage = 0;
      state.selectedFilter = 0;
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = Math.ceil(action.payload / state.limits!) || 0;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = +action.payload.currentPage;
      state.sortType = action.payload.sortType;
      state.selectedFilter = +action.payload.selectedFilter;
    },
    setLimits(state, action: PayloadAction<number>) {
      state.limits = action.payload
    }
  },
});
export const {
  setSelectedFilter,
  setSelectedSort,
  setSearchValue,
  setCurrentPage,
  setPageCount,
  setFilters,
  setLimits,
} = filterSlice.actions;

export default filterSlice.reducer;
