/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import { Button } from "./Buttons";
import { Price, ItemFotter } from "./Elements";
import { useDispatch, useSelector } from "react-redux";
import { setOrderMode, setShowOrder } from "../redux/slice/products";

export default function ProductItem({ productDetails }) {
  const { pid, pprice, pname, pimgage } = productDetails;
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="product-item">
      <div className="top">
        {/* {m_discount && (
        <div className="disc">
          <FloatingButton link="/" text="-2%" icon="bi bi-bag" />
        </div>
        )} */}
        <img src={pimgage} alt="item" />
      </div>
      <div className="down p-2">
        <div className="p-1">
          <h5 className="text-center">
            <Link to={`/product/${pid}`} className="text-center product-name">
              {pname}
            </Link>
          </h5>
        </div>
        <div className="py-2">
          <Price price={pprice} center />
        </div>
        <div className="py-2 d-flex justify-content-center align-items-center">
          <Button
            id={pid}
            handleOnclick={() => {
              if (auth.isAuthenticated) dispatch(setShowOrder(productDetails));
              else {
                dispatch(setOrderMode(productDetails));
                navigate("/login");
              }
            }}
            text="Order now"
            icon="bi bi-bag"
          />
        </div>
        <div className="py-1 d-flex justify-content-center align-items-center">
          <ItemFotter medicine={pid} />
        </div>
      </div>
    </div>
  );
}
