import { callApi } from "../helper";
import { setCount, setOrders } from "../slice/products";

export const getPatientOrders = () => async (dispatch) => {
  const res = await callApi({
    url: `/order/findpatientorders`,
    dispatch,
    method: "get",
    token: localStorage.getItem("token"),
  });
  if (res) dispatch(setOrders(res));
};
export const handleOder = (orderstatus,id) => async (dispatch) => {
  const res = await callApi({
    url: `/order/aproveorreject/${id}`,
    dispatch,
    method: "put",
    body:{orderstatus},
    token: localStorage.getItem("token"),
  });
  if (res) dispatch(getOrders({page:1,limit:10}));
};
export const getOrders = ({page,limit}) => async (dispatch) => {
  const res = await callApi({
    url: `/order/findall?page=${page}&limit=${limit}`,
    dispatch,
    method: "get",
    token: localStorage.getItem("token"),
  });
  if (res) {
    dispatch(setOrders(res.orders));
    dispatch(setCount(res.count));
  }
};
