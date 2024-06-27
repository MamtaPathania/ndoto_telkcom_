import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phoneNumber: '',
  userExists: false,
  userData: null,
  isActive: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setUserExists: (state, action) => {
      state.userExists = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setPhoneNumber,
  setUserExists,
  setUserData,
  setIsActive,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
