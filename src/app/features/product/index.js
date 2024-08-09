/* eslint-disable import/prefer-default-export */
import { setProducts, } from './_productSlice';
import { getProducts as getPrdcts, } from '../../../api';
import { sortProducts } from '../../../helpers';

export const getProducts = ({ page, limit }, dispatch) => {
  dispatch(setProducts({ status: 'pending' }));
  getPrdcts({ page, limit }, (err, data) => {
    console.log("Error====>",err);
    if (err) {
      dispatch(setProducts({ status: 'fail', message: 'Something went wrong.😞' }));
    } else {
      dispatch(setProducts({ products: [...data.products.sort(sortProducts)], status: 'success', count: data.count }));
    }
  });
};