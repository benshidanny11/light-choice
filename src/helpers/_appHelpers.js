/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
export const sortProducts = (prod1, prod2) => {
  if (prod1.pname < prod2.pname) {
    return -1;
  }
  if (prod1.pname > prod2.pname) {
    return 1;
  }
  return 0;
};

export const sortOrders = (order1, order2) => Date.parse(order2.createdAt) - Date.parse(order1.createdAt);

// {
//   if (order1.createdAt < order2.createdAt) {
//     return -1;
//   }
//   if (order1.createdAt > order2.createdAt) {
//     return 1;
//   }
//   return 0;
// };
