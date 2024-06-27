// bannerSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptionData: [],
  subCategoryName: '',
  category: '',
  banners: [],
  isLoading: false,
};

const bannerSlice = createSlice({
  name: 'bannerSlice',
  initialState,
  reducers: {
    setSubscriptionData: (state, action) => {
      state.subscriptionData = action.payload;
      state.subCategoryName = action.payload[0].category_name;
      state.category = action.payload[0].name;
    },
    setBanners: (state, action) => {
      state.banners = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSubscriptionData, setBanners, setLoading } = bannerSlice.actions;

export default bannerSlice.reducer;
