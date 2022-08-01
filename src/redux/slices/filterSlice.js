import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilter: 0,
  sortType: 
    {type: 'rating', name: 'популярности', params: 'asc'},

};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedFilter(state, action) {
      state.selectedFilter = action.payload
    },
    setSelectedSort(state, action) {
      state.sortType = action.payload
    }
  }
});
export const { setSelectedFilter, setSelectedSort } = filterSlice.actions;

export default filterSlice.reducer;
