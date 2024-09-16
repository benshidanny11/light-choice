import Button from 'react-bootstrap/Button';
import React, { Suspense } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFilteredProducts } from "../../redux/thunk/products";

import { clearFilter } from "../../redux/slice/products";
import {
  faCheckSquare,
  faQuestionCircle,
  faTimesCircle,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { Card } from 'react-bootstrap';
import { ProductPlaceholder } from '../../shared/Placeholder';
import { Link, useNavigate } from 'react-router-dom';

const FilterProductModal = (props) => {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products).filteredList;
  const navigate = useNavigate();

  console.log(products);


  return (
    <Modal
      {...props}
      size="lg"
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div class="container d-flex" onClick={() => {
          // console.log("Hello")
          // setShowFilterModal(true)
        }}>
          <input type="search" id="qodef-search-form-66e3f486e008c" class="qodef-search-form-field search-input-text" name="s" placeholder="Type to search"
            onChange={(e) => {
              if (e.target.value !== '') {
                dispatch(clearFilter())
                dispatch(getFilteredProducts({ query: e.target.value }));
              }

            }}
          />
          <button type="submit" class="qodef-search-form-button ">
            <FontAwesomeIcon
              icon={faSearch}
            // className="mx-2"
            />
          </button>
        </div>
        <Modal.Title id="contained-modal-title-vcenter">

        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {_.map(products, (product) => (
          <div className="p-1" key={product.pid}>
            <Suspense fallback={<ProductPlaceholder />}>
              {/* <a href={`/filter/products/${product.pid}?origin=filter`}>   */}
               <Card onClick={()=>navigate(`/filter/products/${product.pid}`)}>
                <Card.Body className='container'> <Card.Title>{product.pname}</Card.Title>
                  <Card.Text>
                    {product.pdesc}
                  </Card.Text>

                </Card.Body>
              </Card>
              {/* </a> */}

            </Suspense>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
export default FilterProductModal;