
import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    cat: '',
    subcategories: [],
    selectedSubcategory: '',
    subCategoryName: '',
    videos: [],
    searchQuery: '',
    categoryname:'',
  },
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryname = action.payload;
    },
    setCategory: (state, action) => {
      state.cat = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setSelectedSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
    },
    setSubCategoryName: (state, action) => {
      state.subCategoryName = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {

  setCategoryName,
  setCategory,
  setSubcategories,
  setSelectedSubcategory,
  setSubCategoryName,
  setVideos,
  setSearchQuery,
} = categorySlice.actions;

export default categorySlice.reducer;
