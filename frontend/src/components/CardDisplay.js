import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/CardDisplay.css";
import React, { useState } from "react";
import logo from "../images/logo.png";
import chip from "../images/chip.png";

const CardDisplay = ({ firstName, lastName, accountNumber, balance }) => {
  const [balanceVisible, setBalanceVisible] = useState(false);

  const revealBalance = () => {
    setBalanceVisible((prevVisibility) => !prevVisibility);
  };

  const formatAccountNumber = (accountNumber) => {
    // Remove existing spaces and add a space every 4 characters
    return accountNumber?.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
  };

  return (
    <div className="body">
      <div className="card-container" onClick={revealBalance}>
        <header>
          <span className="logo">
            <img src={logo} />
            <h5>Mastercard</h5>
          </span>
          <img src={chip} className="chip" />
        </header>

        <div className="card-details">
          <div className="name-number">
            <h6>Card Number</h6>
            <h5 className="number">{formatAccountNumber(accountNumber)}</h5>
            <h5 className="name">
              {firstName} {lastName}
            </h5>
            <h5>
              {balanceVisible ? `Balance: $${balance}` : "Balance: ******"}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
