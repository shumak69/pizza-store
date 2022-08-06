import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sort = {
  type: 'rating' | 'price' | 'title';
  name: string;
  params: string;
};

interface FilterSliceState {
  selectedFilter: number;
  sortType: Sort;
  searchValue?: string;
  currentPage: number;
  pageCount?: number;
}

const initialState: FilterSliceState = {
  selectedFilter: 0,
  sortType: { type: "rating", name: "популярности", params: "asc" },
  searchValue: "",
  currentPage: 0,
  pageCount: 0,
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
      state.pageCount = Math.ceil(action.payload / 4);
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = +action.payload.currentPage;
      state.sortType = action.payload.sortType;
      state.selectedFilter = +action.payload.selectedFilter;
    },
  },
});
export const {
  setSelectedFilter,
  setSelectedSort,
  setSearchValue,
  setCurrentPage,
  setPageCount,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
