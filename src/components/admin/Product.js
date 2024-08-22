import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import BodyWrapper from "./BodyWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  uploadPrescription,
} from "../../redux/thunk/products";
import {
  faCloudUploadAlt,
  faEdit,
  faExclamationTriangle,
  faEye,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import Alert from "../../shared/Alert";
import { setLoading } from "../../redux/slice/global";
import Pagination from "../../shared/Pagination";
const Product = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getProducts({ page, limit: 10 }));
  }, [page]);
  const products = useSelector((state) => state.products).list;
  const count = useSelector((state) => state.products).count;
  const [show, setShow] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <Layout>
      <BodyWrapper>
        <section className="crancy-adashboard crancy-show">
          <div className="container">
            <div className="row">
              <div className={`crancy-table" mg-top-30`}>
                <div className="crancy-table__heading">
                  <h3 className="crancy-table__title mb-0 mx-3">Products</h3>
                  <div>
                    <button
                      className="btn btn-primary text-light"
                      onClick={() => setShow(true)}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="#eee"
                        className="mx-1"
                      />
                      New Product
                    </button>
                  </div>
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
                            Name
                          </th>
                          <th className="crancy-table__column-2 crancy-table__h2">
                            Price
                          </th>
                          <th className="crancy-table__column-1 crancy-table__h1">
                            Marks
                          </th>
                          <th className="crancy-table__column-5 crancy-table__h5">
                            Description
                          </th>
                          <th className="crancy-table__column-2 crancy-table__h2">
                            Image
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className="crancy-table__body">
                        {products?.map((product, i) => {
                          return (
                            <tr key={i}>
                              <td className="crancy-table__column-3 crancy-table__data-3">
                                <p className="crancy-table__text crancy-table__time">
                                  {product.pname}
                                </p>
                              </td>

                              <td className="crancy-table__column-1 crancy-table__data-1">
                                <div className="crancy-table__product--id">
                                  <p className="crany-table__product--number">
                                    <span>{product.pprice} RWF</span>
                                  </p>
                                </div>
                              </td>

                              <td className="crancy-table__column-3 crancy-table__data-3">
                                <p className="crancy-table__text crancy-table__time">
                                  {product.pmark}
                                </p>
                              </td>
                              <td className="crancy-table__column-3 crancy-table__data-3">
                                <p className="crancy-table__text crancy-table__time">
                                  {product.pdesc}
                                </p>
                              </td>
                              <td className="crancy-table__column-3 crancy-table__data-3">
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="btn btn-secondary"
                                  title="View Image"
                                  onClick={() => setViewImage(product.pimage)}
                                />
                              </td>

                              <td>
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="btn btn-primary mx-2"
                                  onClick={() => setShow(product)}
                                />
                                <FontAwesomeIcon
                                  icon={faTrashAlt}
                                  className="btn btn-danger mx-2"
                                  onClick={() => setConfirmDelete(product.pid)}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>

                      {/* <!-- End crancy Table Body --> */}
                    </table>
                    {!products.length && (
                      <h2 className="text-center mt-3">Data not found</h2>
                    )}
                  </div>
                </div>
              </div>
              <Pagination
                handlePageClick={(e) => setPage(Number(e.selected) + 1)}
                totalRows={count}
                itemsPerPage={10}
              />
              <AddProduct show={show} setShow={setShow} />
              <ViewImage show={viewImage} setShow={setViewImage} />
              <DeleteConfirm
                show={confirmDelete}
                setShow={setConfirmDelete}
                yesAction={() => dispatch(deleteProduct(confirmDelete))}
              />
            </div>
          </div>
        </section>
      </BodyWrapper>
    </Layout>
  );
};
const AddProduct = ({ show, setShow }) => {
  const initialFormData = {
    productname: "",
    productmark: "",
    productimage: null,
    productdesc: "",
    productprice: "",
    producttags: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (show.pid) {
      setFormData({
        productname: show.pname || "",
        productmark: show.pmark || "",
        productdesc: show.pdesc || "",
        productprice: show.pprice || "",
        producttags: show.ptags ? show.ptags.join(", ") : "",
      });
    } else setFormData(initialFormData);
  }, [show]);
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      productimage: e.target.files[0],
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      productprice: parseFloat(formData.productprice),
      producttags: formData.producttags.split(",").map((tag) => tag.trim()),
    };
    setShow(false);
    if (formData.productimage) {
      dispatch(setLoading(true));
      const res = await uploadPrescription(productData.productimage);
      productData.productimage = res.url;
      dispatch(setLoading(false));
    }
    if (!show.pid && productData.productimage) {
      dispatch(addProduct(productData));
    } else {
      if (!productData.productimage) productData.productimage = show.pimage;
      dispatch(updateProduct(productData, show.pid));
    }
  };
  return (
    <Modal show={show} onHide={() => setShow(false)} centered size="xl">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {global.error && (
          <Alert info={{ type: "err", message: global.error }} />
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="productname"
              value={formData.productname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Product Mark:</label>
            <input
              type="text"
              name="productmark"
              value={formData.productmark}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field mb-3">
            <label htmlFor="productimage" className={`file-upload`}>
              <FontAwesomeIcon icon={faCloudUploadAlt} className="mx-2" />{" "}
              Upload Image{" "}
              {formData.productimage && (
                <b className="text-primary">{`(${formData.productimage?.name})`}</b>
              )}
            </label>
            <input
              style={{ display: "none" }}
              id="productimage"
              type="file"
              name="productimage"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label>Product Description:</label>
            <textarea
              name="productdesc"
              value={formData.productdesc}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Product Price:</label>
            <input
              type="number"
              name="productprice"
              value={formData.productprice}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Product Tags (comma-separated):</label>
            <input
              type="text"
              name="producttags"
              value={formData.producttags}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!show.pid && !formData.productimage}
            className="order-button"
          >
            {show.pid ? "Update Product" : "Add Product"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
const ViewImage = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img src={show} alt="Product image" />
      </Modal.Body>
    </Modal>
  );
};
export const DeleteConfirm = ({ show, setShow, yesAction, title }) => {
  const dispatch = useDispatch();
  return (
    <Modal show={show} centered>
      <Modal.Body>
        <p className="text-center mb-3">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            size="3x"
            className="text-danger"
          />
        </p>
        <p style={{ fontSize: "20px", color: "#000" }} className="text-center">
          {title || "Are you sure you want to delete this record?"}
        </p>
        <div className="d-flex justify-content-between mt-3">
          <span
            className="text-danger"
            onClick={() => {
              setShow(false);
              yesAction();
            }}
            style={{ cursor: "pointer", fontSize: "20px" }}
          >
            Yes
          </span>
          <span
            className="text-secondary"
            onClick={() => setShow(false)}
            style={{ cursor: "pointer", fontSize: "20px" }}
          >
            No
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Product;
