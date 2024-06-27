// subscriptionSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  subCategoryName: '',
  category: '',
  cat: '',
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSubCategoryName: (state, action) => {
      state.subCategoryName = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCat: (state, action) => {
      state.cat = action.payload;
    },
  },
});

export const { setData, setSubCategoryName, setCategory, setCat } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
