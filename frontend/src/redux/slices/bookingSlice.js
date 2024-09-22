import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const saveBooking = createAsyncThunk(
  'booking/saveBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/bookings/create', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
  }
);

export const savePayment = createAsyncThunk(
  'booking/savePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/payments', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    currentBooking: null,
    currentPayment: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBookingState: (state) => {
      state.currentBooking = null;
      state.currentPayment = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.success = true;
      })
      .addCase(saveBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(savePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
        state.success = true;
      })
      .addCase(savePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
