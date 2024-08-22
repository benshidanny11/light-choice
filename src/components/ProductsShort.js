import React, { useEffect, Suspense, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { ProductPlaceholder } from "../shared/Placeholder";
import ProductItem from "../shared/ProductItem";
import Pagination from "../shared/Pagination";
import { getProducts } from "../redux/thunk/products";
import { setShowOrder } from "../redux/slice/products";
import OrderModal, { PaymentStatus } from "./Order";

export default function ProductsShort() {
  const products = useSelector((state) => state.products).list;
  const order = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ page, limit: 20 }));
  }, [page]);
  useEffect(() => {
    if (order.orderMode && auth.isAuthenticated)
      dispatch(setShowOrder(order.orderMode));
  }, [auth.isAuthenticated]);

  return (
    <div className="product-lis">
      <div className="d-flex flex-column">
        <div className="px-1">
          <div className="item-list d-flex col-12 flex-wrap">
            {_.map(products, (product) => (
              <div className="p-1" key={product.pid}>
                <Suspense fallback={<ProductPlaceholder />}>
                  <ProductItem productDetails={product} />
                </Suspense>
              </div>
            ))}
          </div>
          <Pagination
                handlePageClick={(e) => setPage(Number(e.selected) + 1)}
                totalRows={order?.count}
                itemsPerPage={20}
              />
        </div>
      </div>
      <OrderModal />
      <PaymentStatus />
    </div>
  );
}
