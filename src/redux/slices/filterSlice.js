import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilter: 0,
  sortType: 
    {type: 'rating', name: 'популярности', params: 'asc'},
  searchValue: '',
  currentPage: 0,
  pageCount: 0
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedFilter(state, action) {
      state.currentPage = 0
      state.selectedFilter = action.payload
    },
    setSelectedSort(state, action) {
      state.sortType = action.payload
    },
    setSearchValue(state, action) {
      state.currentPage = 0
      state.selectedFilter = 0
      state.searchValue = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload 
    },
    setPageCount(state, action) {
      state.pageCount = Math.ceil(action.payload / 4)
    },
    setFilters(state, action) {
      state.currentPage = +action.payload.currentPage;
      state.sortType = action.payload.sortType;
      state.selectedFilter = +action.payload.selectedFilter
    }
  }
});
export const { setSelectedFilter, setSelectedSort, setSearchValue, setCurrentPage, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
