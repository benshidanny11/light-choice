import axios from "axios";
import { callApi } from "../helper";
import {
  setCount,
  setOrderSuccess,
  setPaymentRes,
  setPaymentStatus,
  setProducts,
  setShowOrder,
} from "../slice/products";
import { setSuccess } from "../slice/global";

export const getProducts =
  ({ page, limit }) =>
  async (dispatch) => {
    const res = await callApi({
      url: `/product/getall?page=${page}&limit=${limit}`,
      dispatch,
      method: "get",
    });
    if (res) {
      dispatch(setProducts(res.products));
      dispatch(setCount(res.count));
    }
  };

export const orderProduct = (data) => async (dispatch) => {
  const res = await callApi({
    url: "/order/createorder",
    body: data,
    token: localStorage.getItem("token"),
    dispatch,
  });

  if (res) dispatch(setOrderSuccess(res));
};
export const addProduct = (data) => async (dispatch) => {
  const res = await callApi({
    url: "/product/createnew",
    body: data,
    token: localStorage.getItem("token"),
    dispatch,
  });

  if (res) dispatch(getProducts({ page: 1, limit: 10 }));
};
export const updateProduct = (data, id) => async (dispatch) => {
  const res = await callApi({
    url: `/product/updateproduct/${id}`,
    body: data,
    method: "put",
    token: localStorage.getItem("token"),
    dispatch,
  });

  if (res) dispatch(getProducts({ page: 1, limit: 10 }));
};
export const createPayment = (data) => async (dispatch) => {
  const res = await callApi({
    url: "/payment/createpayment",
    body: data,
    token: localStorage.getItem("token"),
    dispatch,
  });
  if (res) {
    dispatch(setPaymentStatus("pending"));
    dispatch(setPaymentRes(res));
    dispatch(setShowOrder(false));
  }
};
export const uploadPrescription = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "LightchoiceUploads");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dqpwqfbjf/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const verifyPayment = (data) => async (dispatch) => {
  const res = await callApi({
    url: "/payment/verifypayment",
    body: data,
    token: localStorage.getItem("token"),
    dispatch,
  });
  if (res) {
    //console.log(res, "verify response");

    dispatch(setPaymentStatus(res.paymentStatus));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const res = await callApi({
    url: `/product/deleteproduct/${id}`,
    dispatch,
    method: "delete",
    token: localStorage.getItem("token"),
  });
  if (res) dispatch(getProducts({ page: 1, limit: 10 }));
};
