import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Button } from "../shared/Elements";
import {
  faCheckCircle,
  faCloudUploadAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOrder,
  setOrderSuccess,
  setPaymentStatus,
  setShowOrder,
} from "../redux/slice/products";
import {
  createPayment,
  orderProduct,
  uploadPrescription,
  verifyPayment,
} from "../redux/thunk/products";
import Alert from "../shared/Alert";
import { setError, setLoading } from "../redux/slice/global";
const validateMobile = (mobile) => {
  const regex = /^(078|079|073|072)\d{7}$/;
  return regex.test(mobile);
};
const OrderModal = () => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [prescription, setPrescription] = useState();
  const [disable, setDisable] = useState(true);
  const order = useSelector((state) => state.products);
  const global = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const validate = (e) => {
    const form = e.target.form;
    setDisable(!form.checkValidity());
  };
  const [mobile, setMobile] = useState();
  return (
    <Modal
      show={order.ShowOrder}
      onHide={() => dispatch(setShowOrder(false))}
      centered
      size="xl"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Order ${order.ShowOrder?.pname} now`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {global.error && (
          <Alert
            info={{ type: "err", message: global.error }}
            handleCloseAlert={() => dispatch(setError(null))}
          />
        )}
        {!order.orderSuccess && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const user = localStorage.getItem("user");
              dispatch(setLoading(true));
              const uploadRes = await uploadPrescription(prescription);
              dispatch(setLoading(false));
              const data = {
                productid: order.ShowOrder?.pid,
                prescription: uploadRes?.url,
                orderby: user && JSON.parse(user).uid,
                orderaddress: address,
                orderquantity: quantity,
                orderamount: Number(quantity) * order.ShowOrder?.pprice,
              };
              dispatch(orderProduct(data));
              //   dispatch(setOrderSuccess(true));
            }}
          >
            <div className="c-content-fields w-auto">
              <div className="field">
                <label>Quantity</label>
                <input
                  className={`input-field`}
                  type="number"
                  onChange={(e) => {
                    validate(e);
                    e.target.value && setQuantity(Number(e.target.value));
                  }}
                  placeholder="Quantity"
                  required
                  style={{ backgroundColor: "red" }}
                  value={quantity}
                  min={1}
                />
              </div>
              <div className="field">
                <label>Order Address</label>
                <input
                  className={`input-field`}
                  type="text"
                  value={address}
                  placeholder="Order Address"
                  required
                  onChange={(e) => {
                    validate(e);
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="field">
                <label>Price</label>
                <input
                  className={`input-field`}
                  type="text"
                  value={`${order.ShowOrder?.pprice * quantity || 0} RWF`}
                  disabled={true}
                />
              </div>
              <div className="field mb-3">
                <label htmlFor="prescription" className={`file-upload`}>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="mx-2" />{" "}
                  Upload Prescription{" "}
                  {prescription && (
                    <b className="text-primary">{`(${prescription?.name})`}</b>
                  )}
                </label>
                <input
                  style={{ display: "none" }}
                  id="prescription"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={async (e) => {
                    validate(e);
                    const file = e.target.files[0];
                    setPrescription(file);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                }}
              >
                <Button
                  label="Order"
                  classes="primary-button order-button"
                  disable={disable}
                />
              </div>
            </div>
          </form>
        )}
        {order.orderSuccess && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const data = {
                orderid: order.orderSuccess?.orderid,
                paymentmode: "MOMO",
                amount: Number(quantity) * order.ShowOrder?.pprice,
                number: mobile,
              };
              dispatch(createPayment(data));
              //   dispatch(setPaymentStatus("pending"));
              //   dispatch(setShowOrder(false));
            }}
          >
            <div className="c-content-fields w-auto">
              <div className="field">
                <label>Amount to pay</label>
                <input
                  className={`input-field`}
                  type="text"
                  value={`${order.ShowOrder?.pprice * quantity || 0} RWF`}
                  disabled={true}
                />
              </div>
              <div className="field">
                <label>
                  Payment mobile number{" "}
                  {mobile && !validateMobile(mobile) && (
                    <b className="text-danger">
                      {"  "}( Mobile number should be 10 digits and starts with
                      078,079,073 or 072)
                    </b>
                  )}
                </label>
                <input
                  className={`input-field`}
                  type="text"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  width: "100%",
                }}
              >
                <Button
                  label="Pay"
                  classes="primary-button order-button"
                  disable={!validateMobile(mobile)}
                />
              </div>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
};
export const PaymentStatus = () => {
  const order = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    let intervalId;
    if (order.paymentStatus === "pending") {
      intervalId = setInterval(() => {
        dispatch(
          verifyPayment({
            ref: order.paymentRes?.paymentref,
            transactionid: order.paymentRes?.payid,
            orderid: order.orderSuccess?.orderid,
          })
        );
      }, 20000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [order.paymentStatus]);
  return (
    <Modal
      show={order.paymentStatus != ""}
      onHide={() => dispatch(clearOrder())}
      centered
    >
      <Modal.Body>
        {order.paymentStatus === "pending" && (
          <div className="status-modal">
            <Spinner variant="info" animation="border" />
            <h2 className="text-info"> Pending payment</h2>
            <p style={{ textAlign: "center", width: "50%" }}>
              Thank you for initiating payment, check your pending transaction
              on *182*7*1# and follow the instruction
            </p>
          </div>
        )}
        {order.paymentStatus === "failed" && (
          <div className="status-modal">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="text-danger"
              size="2x"
            />
            <h4 className="text-danger mb-2"> Failed</h4>
            <p
              style={{ textAlign: "center", width: "50%" }}
              className="text-danger"
            >
              Payment failed check well and try again!
            </p>
          </div>
        )}
        {order.paymentStatus === "successful" && (
          <div className="status-modal">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-success"
              size="2x"
            />
            <h4 className="text-Success"> Success</h4>
            <p
              style={{ textAlign: "center", width: "50%" }}
              className="text-success"
            >
              Payment successful, Thank you for using light choice.
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
