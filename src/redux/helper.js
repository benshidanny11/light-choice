import axios from "axios";
import { setError, setLoading } from "./slice/global";
import { logoutUser } from "./slice/authSlice";
const baseUrl = process.env.REACT_APP_API_URL;
export const callApi = async (options) => {
  try {
    options.dispatch(setLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (options.token) {
      config.headers.Authorization = `Bearer ${options.token}`;
    }

    let res = {};

    if (options.method === "get") {
      res = await axios.get(baseUrl + options.url, config);
    } else if (options.method === "delete") {
      res = await axios.delete(baseUrl + options.url, config);
    } else if (options.method === "put") {
      res = await axios.put(baseUrl + options.url, options.body, config);
    } else {
      res = await axios.post(baseUrl + options.url, options.body, config);
    }

    options.dispatch(setLoading(false));
    if (res) {
      return res.data;
    }
  } catch (error) {
    options.dispatch(setLoading(false));
    !options.noNotification &&
      options.dispatch(
        setError(
          error.response?.data?.error?.message ||
            error.response?.data?.error?.errormessage ||
            error.response?.data?.errormessage ||
            error.message
        )
      );
  }
};
