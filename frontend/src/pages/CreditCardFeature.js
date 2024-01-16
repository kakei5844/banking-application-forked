/*
this page will look cleaner after integration with backend
*/

import "../styles/pages/CreditCardFeature.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ActionButton from "../components/ActionButton";
import CardScroll from "../components/CardScroll";
import TransactionHistory from "../components/TransactionHistory";
// // import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Carousel from "../components/CardCarousel";
import { useState } from "react";
import CreditCardTransaction from "../components/CreditCardTransactionHistory";
import Cards from "react-credit-cards-2";

const maskCardNumber = (number) => {
  const cardLength = number.length;
  const firstFourDigits = number.slice(0, 4);
  const lastFourDigits = number.slice(-4);
  const maskedDigits = "*".repeat(cardLength - 8); // Replace middle digits with asterisks
  return `${firstFourDigits}${maskedDigits}${lastFourDigits}`;
};

const maskCVC = (cvc) => {
  return "*".repeat(cvc.length); // Replace all CVV digits with asterisks
};

const CreditCardFeature = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const [transactions, setTransactions] = useState([
    // Transactions data as you have it in the Carousel component
    {
      paymentType: "Credit Card",
      amount: "$50.00",
      merchantCode: "902",
      status: "Completed",
      datetime: "2022-01-10T08:00:00",
      cardNumber: "5542123412341234",
    },
    {
      paymentType: "Credit Card",
      amount: "$25.00",
      merchantCode: "902",
      status: "Pending",
      datetime: "2022-01-10T08:15:00", // Replace with the actual datetime
      cardNumber: "5542123412341234", // Card number without masking
    },
    {
      paymentType: "Credit Card",
      amount: "$80.00",
      merchantCode: "902",
      status: "Failed",
      datetime: "2022-01-10T08:30:00", // Replace with the actual datetime
      cardNumber: "5542123412341234", // Card number without masking
    },
    {
      paymentType: "Credit Card",
      amount: "$80.00",
      merchantCode: "902",
      status: "Failed",
      datetime: "2022-02-10T08:30:00", // Replace with the actual datetime
      cardNumber: "5542123412341234", // Card number without masking
    },
    {
      paymentType: "Credit Card",
      amount: "$80.00",
      merchantCode: "902",
      status: "Failed",
      datetime: "2024-01-10T08:30:00", // Replace with the actual datetime
      cardNumber: "5542123412341234", // Card number without masking
    },
  ]);

  const [cards, setCards] = useState([
    {
      number: "4111111111111111",
      name: "John Doe",
      expiry: "12/23",
      cvc: "123",
      focus: "number",
    },
    {
      cvc: "123",
      expiry: "2020",
      focus: "",
      name: "tom",
      number: "5542123412341234",
    },
    {
      cvc: "246",
      expiry: "2021",
      focus: "",
      name: "jerry",
      number: "6134123412341234",
    },
    {
      cvc: "369",
      expiry: "2022",
      focus: "",
      name: "tim",
      number: "4343123412341234",
    },
    {
      cvc: "322",
      expiry: "2022",
      focus: "",
      name: "trey",
      number: "374312341234125",
    },
    {
      cvc: "387",
      expiry: "2022",
      focus: "",
      name: "angus",
      number: "36431234123434",
    },
    {
      cvc: "365",
      expiry: "2022",
      focus: "",
      name: "bob",
      number: "6243123412341234",
    },
    {
      cvc: "324",
      expiry: "2022",
      focus: "",
      name: "bailey",
      number: "3543123412341234",
    },
    // Add other card data as needed
  ]);

  const maskedCardNumber = maskCardNumber(cards[currentCardIndex].number);
  const maskedCVC = maskCVC(cards[currentCardIndex].cvc);

  return (
    <div className="credit-card-page">
      <div className="top">
        <h1>Credit Card</h1>
      </div>

      <div className="middle">
        <div className="card-display">
          <Cards
            className="credit-card"
            {...cards[currentCardIndex]}
            number={maskedCardNumber}
            cvc={maskedCVC}
          />
          <div className="button-container">
            <button className="arrow-btn" onClick={handlePrevCard}>
              Previous
            </button>
            <button className="arrow-btn" onClick={handleNextCard}>
              Next
            </button>
          </div>
          {/* <Carousel transactions={transactions} cards={cards} /> */}
        </div>
        <div className="credit-card-button-list">
          <ActionButton>
            <i className="bi bi-credit-card" />
            <span className="ms-2">Bank Account</span>
          </ActionButton>
          <ActionButton>
            <i className="bi bi-gift" />
            <span className="ms-2">Cashback</span>
          </ActionButton>
          <NavLink to="/credit-cards">
            <ActionButton>
              <i className="bi bi-receipt" />
              <span className="ms-2">Payment</span>
            </ActionButton>
          </NavLink>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <div className="bottom-left">
          <h2>Transaction History</h2>
          <CreditCardTransaction
            selectedCard={currentCardIndex}
            transactions={transactions}
            cards={cards} // Pass the 'cards' array here
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardFeature;
