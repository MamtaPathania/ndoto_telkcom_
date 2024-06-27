import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

import authReducer from '../slices/authSlice';
import categoryReducer from '../slices/categorySlice'
import bannerReducer from '../slices/bannerSlice';
const authPersistConfig = {
  key: 'auth',
  storage,
};

const categoryPersistConfig = {
  key: 'category',
  storage,
};

const bannerPersistConfig = {
  key: 'banner',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);
const persistedBannerReducer = persistReducer(bannerPersistConfig, bannerReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    category: persistedCategoryReducer,
    banner: persistedBannerReducer,
  },
});

export const persistor = persistStore(store);
