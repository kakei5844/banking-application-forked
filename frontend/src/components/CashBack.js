import React from "react";
import "../styles/pages/CreditCardFeature.css";

const CashBack = ({ cashback, onClose }) => {
  return (
    <div className="cashback-popup">
      <button className="close-button" onClick={onClose}>
        <i className="bi bi-x" />
      </button>
      <h2 className="cashback-title">Cashback</h2>
      <div className="cashback-value-container d-grid gap-2">
        <div className="fs-5 text-white">Your cashback value is: </div>
        <span className="cashback-value text-center">${cashback}</span>
      </div>
      <div className="button-container">
        <button className="popup-button btn btn-dark">Details</button>
        <button className="popup-button btn btn-dark">Pay with Cashback</button>
      </div>
    </div>
  );
};

export default CashBack;
