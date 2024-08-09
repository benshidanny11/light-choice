/* eslint-disable max-len */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'products',
  initialState: {},
  reducers: {
    setProducts: (state, action) => {
      state.data = action?.payload;
    },
  },
});

export const {
  setProducts,
} = productSlice.actions;
export default productSlice.reducer;
