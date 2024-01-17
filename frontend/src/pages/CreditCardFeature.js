import React, { useState, useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";

import "../styles/pages/CreditCardFeature.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import ActionButton from "../components/ActionButton";
import CreditCardTransaction from "../components/CreditCardTransactionHistory";
import Cards from "react-credit-cards-2";
import CreditDetails from "../components/CreditDetails";
import Cashback from "../components/CashBack";

import { useAuth } from "../misc/AuthContext";
import { bankingApi } from "../misc/BankingApi";
import { handleLogError } from "../misc/Helpers";

const CreditCardFeature = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cashbackVisible, setCashbackVisible] = useState(false);

  const maskCardNumber = (number) => {
    if (number) {
      const cardLength = number.length;
      const firstFourDigits = number.slice(0, 4);
      const lastFourDigits = number.slice(-4);
      const maskedDigits = "*".repeat(cardLength - 8);
      return `${firstFourDigits}${maskedDigits}${lastFourDigits}`;
    } else {
      return "";
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

  const handleCashbackClick = () => {
    setCashbackVisible(true);
  };

  const handleCloseCashback = () => {
    setCashbackVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await bankingApi.getUser(user);
        setUserDb(userResponse.data);

        if (userResponse.data && userResponse.data.creditCards) {
          const creditCardPromises = userResponse.data.creditCards.map(
            async (creditCard) => {
              const creditCardHistoryResponse =
                await bankingApi.getCreditCardTransactions(creditCard.id, user);
              const formattedTransactions = creditCardHistoryResponse.data.map(
                (transaction) => ({
                  id: transaction.id,
                  description: transaction.description,
                  amount: transaction.amount,
                  creditCardId: transaction.creditCardId,
                  date: transaction.createdAt,
                })
              );
              console.log(
                "Credit Card Transactions >>>",
                formattedTransactions
              );
              return {
                id: creditCard.id,
                number: creditCard.cardNumber,
                name: `${userResponse.data.firstName} ${userResponse.data.lastName}`,
                expiry: `${(new Date(creditCard.issueDate).getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${(new Date(creditCard.issueDate).getFullYear() + 2) % 100
                  }`,
                transactions: formattedTransactions,
                limit: creditCard.creditLimit,
                spent: creditCard.outstandingBalance,
                cashback: creditCard.cashback,
              };
            }
          );

          const userCards = await Promise.all(creditCardPromises);
          setCards(userCards);
          console.log("Cards>>>", userCards);
          setIsLoading(false);
        } else {
          console.error(
            "User data or credit card information is not available."
          );
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

  return (
    userDb && (
      <div className="CreditCardPage">
        <div className="middle">
          <div className="card-display mt-5">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {cards.length > 0 ? (
                  <div className="d-flex mt-5">
                    <div className="mt-5">
                      <Cards
                        number={maskCardNumber(cards[currentCardIndex]?.number)}
                        name={cards[currentCardIndex]?.name}
                        expiry={cards[currentCardIndex]?.expiry}
                        className="credit-card"
                      />
                      <div className="card-limit d-flex justify-content-center align-items-center bg-primary rounded mt-4 pt-3">
                        <p className="text-white fw-bold">
                          Card limit: ${cards[currentCardIndex]?.limit}
                        </p>
                      </div>
                    </div>
                    <div className="card-details" style={{ minWidth: "300px" }}>
                      <CreditDetails card={cards[currentCardIndex]} />
                    </div>
                  </div>
                ) : (
                  <p>No credit card data available</p>
                )}

                <div className="button-container">
                  <button className="arrow-btn me-3" onClick={handlePrevCard}>
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
            <NavLink to="/repayment">
              <ActionButton>
                <i className="bi bi-receipt" />
                <span className="ms-2">Bill Payment</span>
              </ActionButton>
            </NavLink>
            <NavLink to='/bill'>
          <ActionButton>
            <i className="bi bi-receipt" />
            <span className="ms-2">Statement</span>
          </ActionButton>
          </NavLink>
            <button
              className="btn btn-dark custom-button"
              onClick={handleCashbackClick}
            >
              <i className="bi bi-gift" />
              <span className="ms-2">Cashback</span>
            </button>
          </div>
        </div>
        {cashbackVisible && (
          <div className="cashback-overlay">
            <Cashback
              cashback={cards[currentCardIndex].cashback}
              onClose={handleCloseCashback}
            />
          </div>
        )}
        <hr />
        <div className="bottom">
          <div className="bottom-left">
            {currentCardIndex >= 0 && currentCardIndex < cards.length && (
              <CreditCardTransaction
                selectedCard={currentCardIndex}
                transactions={cards[currentCardIndex].transactions}
                cards={cards}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CreditCardFeature;
