import axios from './_axios';
import { Constants } from '../helpers';

const {
   get_all_products ,
  
  } = Constants;
  
  export const getProducts = async (pagination, callback) => {
    try {
      const { data } = await axios.get(get_all_products({ ...pagination }));
      callback(null, data);
    } catch (error) {
      callback(error);
    }
  };
  

  