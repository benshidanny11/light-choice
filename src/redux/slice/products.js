import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    orderMode: false,
    ShowOrder: false,
    orderSuccess: false,
    paymentStatus: "",
    paymentRes: null,
    orders: [],
    count: 1,
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setShowOrder: (state, action) => {
      state.ShowOrder = action.payload;
    },
    setOrderMode: (state, action) => {
      state.orderMode = action.payload;
    },
    setOrderSuccess: (state, action) => {
      state.orderSuccess = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setPaymentRes: (state, action) => {
      state.paymentRes = action.payload;
    },
    clearOrder: (state) => {
      state.paymentRes = null;
      state.paymentStatus = "";
      state.orderSuccess = false;
    },
  },
});

export const {
  setProducts,
  setOrderMode,
  setShowOrder,
  setOrderSuccess,
  setPaymentStatus,
  setPaymentRes,
  clearOrder,
  setOrders,
  setCount,
} = productSlice.actions;

export default productSlice.reducer;
