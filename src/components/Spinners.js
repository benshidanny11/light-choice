import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function Spinners() {
  const loading = useSelector((state) => state.global)?.loading;
  return (
    <div
      className="overlay"
      id="preloader"
      style={{ display: loading ? "flex" : "none" }}
    >
      <Spinner variant="primary" animation="border" size="lg" />
    </div>
  );
}
