/* eslint-disable no-self-compare */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext, Suspense } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../app/features/product';
import { ProductPlaceholder } from '../shared/Placeholder';
import ProductItem from '../shared/ProductItem';


export default function ProductsShort() {

  const products = useSelector(state => state?.products?.data?.products);
  const dispatch =useDispatch();

  useEffect(() => {
    getProducts({page:1, limit:10}, dispatch)
  }, [dispatch]);

 

 console.log(products);

  // const filterMedicineFunction = () => {
  //   let meds = [];
  //   switch (activeFilter) {
  //     case 'Categories':
  //       if (dropText === 'Categories') break;
  //       meds = medicines?.medicines?.filter(medicine => medicine?.m_type === dropText);
  //       setMedicineCont(
  //         { medicines: meds, status: 'success', count: medicines?.count }
  //         ,
  //       );
  //       break;
  //     case 'New Products':
  //       meds = medicines?.medicines?.filter(medicine => medicine?.m_tags && _.includes(medicine?.m_tags, 'New products'));

  //       setMedicineCont(
  //         { medicines: meds, status: 'success', count: medicines?.count },
  //       );
  //       break;
  //     case 'Promotion':
  //       meds = medicines?.medicines?.filter(medicine => medicine?.m_tags && _.includes(medicine?.m_tags, 'Promotion'));
  //       setMedicineCont(
  //         { medicines: meds, status: 'success', count: medicines?.count },
  //       );
  //       break;
  //     case 'Popular':
  //       meds = medicines?.medicines?.filter(medicine => medicine?.m_tags && _.includes(medicine?.m_tags, 'Popular'));
  //       setMedicineCont(
  //         { medicines: meds, status: 'success', count: medicines?.count },
  //       );
  //       break;
  //     default:
  //       setMedicineCont(medicines);
  //   }
  // };
  // useEffect(() => {
  //   filterMedicineFunction();
  // }, [activeFilter, dropText]);
  return (
    <div className="product-lis">
      <div className="d-flex flex-column">
        <div className="px-1">
          
          <div className="item-list d-flex col-12 flex-wrap">
            {_.map(products, product => (
              <div className="p-1" key={product.pid}>
                <Suspense fallback={<ProductPlaceholder />}>
                  <ProductItem
                    // handleAddToCart={handleAddToCart}
                    // handleRemooveFromCart={handleRemoveFromCart}
                    productDetails={product}
                    // profile={profile}
                  />
                </Suspense>
              </div>
            ))}
          </div>
          {/* <Pagination
            handlePageClick={handlePageClick}
            totalRows={medicineCont?.count || 1}
            itemsPerPage={itemsPerPage}
          /> */}
        </div>
      </div>
      <div className="div-empty" />
    </div>
  );
}
