import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import BodyWrapper from "./BodyWrapper";
import { Orders } from "../PatientOrder";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/thunk/orders";
const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getOrders({ page, limit: 10 }));
  }, [page]);
  const orders = useSelector((state) => state.products).orders;

  return (
    <Layout>
      <BodyWrapper>
        <section className="crancy-adashboard crancy-show">
          <div className="container">
            <div className="row">
              <Orders
                orders={orders}
                isAdmin={true}
                handlePagination={(e) => {
                  setPage(Number(e.selected) + 1);
                }}
              />
            </div>
          </div>
        </section>
      </BodyWrapper>
    </Layout>
  );
};

export default Home;
