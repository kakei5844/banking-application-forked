import React, { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import Cards from 'react-credit-cards-2';

import "../styles/pages/CreditCardFeature.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import ActionButton from "../components/ActionButton";
import Navbar from "../components/Navbar";
import CreditCardTransaction from "../components/CreditCardTransactionHistory";

import { useAuth } from '../misc/AuthContext';
import { bankingApi } from '../misc/BankingApi';
import { handleLogError } from '../misc/Helpers';

const CreditCardFeature = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const maskCardNumber = (number) => {
    if (number) {
      const cardLength = number.length;
      const firstFourDigits = number.slice(0, 4);
      const lastFourDigits = number.slice(-4);
      const maskedDigits = "*".repeat(cardLength - 8);
      return `${firstFourDigits}${maskedDigits}${lastFourDigits}`;
    } else {
      return '';
    }
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await bankingApi.getUser(user);
        setUserDb(userResponse.data);

        if (userResponse.data && userResponse.data.creditCards) {
          const creditCardPromises = userResponse.data.creditCards.map(async (creditCard) => {
            const creditCardHistoryResponse = await bankingApi.getCreditCardTransactions(creditCard.id);
            const formattedTransactions = creditCardHistoryResponse.data.map((transaction) => ({
              id: transaction.id,
              description: transaction.description,
              amount: transaction.amount,
              creditCardId: transaction.creditCardId,
              date: transaction.createdAt,
            }));
            setTransactions(formattedTransactions);
            console.log("Credit Card Transactions >>>", formattedTransactions);

            return {
              id: creditCard.id,
              number: creditCard.cardNumber,
              name: `${userResponse.data.firstName} ${userResponse.data.lastName}`,
              expiry: `${(new Date(creditCard.issueDate).getMonth() + 1)
                .toString()
                .padStart(2, '0')}/${(new Date(creditCard.issueDate).getFullYear() + 2) % 100}`,
              transactions: formattedTransactions,
            };
          });

          const userCards = await Promise.all(creditCardPromises);
          setCards(userCards);
          console.log("Cards>>>", userCards);
          setIsLoading(false); // Set loading to false when data is fetched
        } else {
          console.error('User data or credit card information is not available.');
        }
      } catch (error) {
        handleLogError(error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (userDb &&
    <div className="CreditCardPage">
      {/* <div className="left-column">
        <Navbar />
      </div> */}

      <div className="middle">
        <div className="card-display">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {cards.length > 0 ? (
                <Cards
                  number={maskCardNumber(cards[currentCardIndex]?.number)}
                  name={cards[currentCardIndex]?.name}
                  expiry={cards[currentCardIndex]?.expiry}
                  className="credit-card"
                />
              ) : (
                <p>No credit card data available</p>
              )}
              <div className="button-container">
                <button className="arrow-btn" onClick={handlePrevCard}>
                  Previous
                </button>
                <button className="arrow-btn" onClick={handleNextCard}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        <div className="credit-card-button-list">
          <ActionButton>
            <i className="bi bi-receipt" />
            <span className="ms-2">Payment</span>
          </ActionButton>
        </div>
      </div>

      <hr />

      <div className="bottom">
        <div className="bottom-left">
          <CreditCardTransaction
            selectedCard={currentCardIndex}
            transactions={transactions}
            cards={cards}
          />
        </div>
      </div>

    </div>
  );
};

export default CreditCardFeature;
