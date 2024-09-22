import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shopkeeperReducer from "./slices/shopkeeperSlice";
import adminSlice from './slices/adminSlice';
import adminAuthSlice from './slices/adminAuthSlice';
import shopReducer from './slices/shopSlice';
import bookingReducer from './slices/bookingSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    shopkeeper: shopkeeperReducer,
    admin: adminSlice,
    adminAuth: adminAuthSlice,
    shop: shopReducer,
    booking: bookingReducer,
  },
});

export default store;
