/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Button, FloatingButton } from './Buttons';
import { Price, ItemFotter } from './Elements';

export default function ProductItem({
  handleAddToCart,
  handleRemoveFromCart,
  productDetails: {
    pid, pprice, pname, pimgage,
  },
  profile,
}) {
  const [status, setStatus] = useState();
  const productBotton = useRef();
  // const cart = profile?.cart || [];
  // const cart_item = _.find(cart, item => item?.medicine?.m_id === m_id);
  const changeStatus = status => {
    setStatus(status);
  };
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
          <Button id={pid} handleOnclick={e => { handleAddToCart(pid, changeStatus); }} text="Add to cart" icon="bi bi-bag" />
        </div>
        <div className="py-1 d-flex justify-content-center align-items-center">
          <ItemFotter medicine={pid} />
        </div>
      </div>
    </div>
  );
}
