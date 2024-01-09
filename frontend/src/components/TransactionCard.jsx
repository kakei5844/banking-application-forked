/*

  we will pass in here data from homepage



*/

import React from "react";
import "../styles/components/TransactionCard.css";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

export const TransactionCard = ({ transactionData }) => {
  const {
    id,
    paymentType,
    amount,
    merchantCode,
    status,
    datetime,
    cardNumber,
  } = transactionData || {};

  console.log(transactionData);
  return (
    <div className="transaction-div">
      <div className="transaction-card">
        <div>
          <div>
            <p>Transaction ID {id}</p>
          </div>
          <p>Payment Type {paymentType}</p>
          <p>Amount {amount}</p>
          <p>Status {status}</p>
          <p>Date And Time {datetime}</p>
          <p>Card Number {cardNumber}</p>
        </div>
      </div>
    </div>
  );
};
