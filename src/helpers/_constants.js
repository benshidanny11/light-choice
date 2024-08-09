/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable camelcase */
export default {
  login_api: '/auth/login',
  signup_api: '/auth/signup',
  get_all_products: ({page, limit}) => `/product/getall?page=${page}&limit=${limit}`
};
