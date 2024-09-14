import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getPatientOrders, handleOder } from "../redux/thunk/orders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faQuestionCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { DeleteConfirm } from "./admin/Product";
import Pagination from "../shared/Pagination";

const PatientOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientOrders());
  }, [dispatch]);
  const orders = useSelector((state) => state.products).orders;

  return (
    <div id="qodef-page-wrapper">
      <Header />
      <Orders orders={orders} />
      <Footer />
    </div>
  );
};
export const Orders = ({ orders, isAdmin,handlePagination }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const ostate = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <div className={`crancy-table" mg-top-30`}>
      <div className="crancy-table__heading">
        <h3 className="crancy-table__title mb-0 mx-3">Orders</h3>
      </div>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="table_1"
          role="tabpanel"
          aria-labelledby="table_1"
        >
          <table
            id="crancy-table__main"
            className="crancy-table__main crancy-table__main-v1"
          >
            <thead className="crancy-table__head">
              <tr>
                <th className="crancy-table__column-2 crancy-table__h2">
                  Ordered On
                </th>
                {isAdmin && (
                  <th className="crancy-table__column-2 crancy-table__h2">
                    Ordered by
                  </th>
                )}
                <th className="crancy-table__column-1 crancy-table__h1">
                  Product
                </th>
                <th className="crancy-table__column-5 crancy-table__h5">
                  Price
                </th>
                <th className="crancy-table__column-2 crancy-table__h2">
                  Ordered Quantity
                </th>
                <th className="crancy-table__column-3 crancy-table__h3">
                  Amount
                </th>
                <th className="crancy-table__column-4 crancy-table__h4">
                  status
                </th>
                {isAdmin && (
                  <th className="crancy-table__column-4 crancy-table__h4">
                    Paid
                  </th>
                )}
                <th></th>
              </tr>
            </thead>
            <tbody className="crancy-table__body">
              {orders?.map((order, i) => {
                return (
                  <tr key={i}>
                    <td className="">
                      <p className="crancy-table__text crancy-table__time">
                        {new Date(order.createdAt).toLocaleString("en-GB")}
                      </p>
                    </td>
                    {isAdmin && (
                      <td className="crancy-table__column-1 crancy-table__data-1">
                        <div className="crancy-table__product--id">
                          <p className="crany-table__product--number">
                            <span>{`${order.user?.firstname} | ${order.user?.phonenumber}`}</span>
                          </p>
                        </div>
                      </td>
                    )}
                    <td className="crancy-table__column-1 crancy-table__data-1">
                      <div className="crancy-table__product--id">
                        <p className="crany-table__product--number">
                          <span>
                            {order.product?.pname} |{" "}
                            <b>{order.product?.pmark}</b>
                          </span>
                        </p>
                      </div>
                    </td>

                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        {order.product?.pprice} RWF
                      </p>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        {order.oquantity}
                      </p>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        {order.oamount} RWF
                      </p>
                    </td>
                    <td className="crancy-table__column-3 crancy-table__data-3">
                      <p className="crancy-table__text crancy-table__time">
                        {order.ostatus}
                      </p>
                    </td>
                    {isAdmin && (
                      <td className="crancy-table__column-3 crancy-table__data-3">
                        <p className="crancy-table__text crancy-table__time">
                          {order.orderpaid}
                        </p>
                      </td>
                    )}
                    <td>
                      {!isAdmin && (
                        <div className="btn btn-primary">
                          <FontAwesomeIcon
                            icon={faQuestionCircle}
                            className="mx-2"
                          />
                          Appeal
                        </div>
                      )}
                      {isAdmin && order.ostatus === "Pending" && (
                        <>
                          {order.orderpaid != "NO" && (
                            <FontAwesomeIcon
                              icon={faCheckSquare}
                              className=" btn btn-primary mx-2"
                              onClick={() =>
                                dispatch(handleOder("approved", order.oid))
                              }
                            />
                          )}{" "}
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="btn btn-danger"
                            onClick={() => setConfirmDelete(order.oid)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <DeleteConfirm
              show={confirmDelete}
              setShow={setConfirmDelete}
              title={"Are you sure you want to reject this order?"}
              yesAction={() => dispatch(handleOder("rejected", confirmDelete))}
            />
            {/* <!-- End crancy Table Body --> */}
          </table>
          {!orders.length && (
            <h2 className="text-center mt-3">Data not found</h2>
          )}
        </div>
        {isAdmin && (
          <Pagination
            handlePageClick={handlePagination}
            totalRows={ostate?.count}
            itemsPerPage={10}
          />
        )}
      </div>
    </div>
  );
};

export default PatientOrders;
