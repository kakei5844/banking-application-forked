import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../misc/AuthContext";
import { bankingApi } from "../misc/BankingApi";
import { handleLogError } from "../misc/Helpers";

const RepaymentPage = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();

  const [userDb, setUserDb] = useState(null);
  const [fromAccount, setFromAccount] = useState("");
  const [creditCards, setCreditCards] = useState([]);
  const [creditCardDetails, setCreditCardDetails] = useState({});
  const [remainingBalance, setRemainingBalance] = useState("");
  const [minimumPayment, setMinimumPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [toCreditCard, setToCreditCard] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleToCreditCardChange = (event) => {
    const selectedCreditCardId = event.target.value;

    if (creditCardDetails[selectedCreditCardId]) {
      setToCreditCard(selectedCreditCardId);
      setRemainingBalance(
        creditCardDetails[selectedCreditCardId].remainingBalance || ""
      );
      setMinimumPayment(
        creditCardDetails[selectedCreditCardId].minimumPayment || ""
      );
    }
  };

  const handleFullPayment = () => {
    setAmount(remainingBalance.toString());
  };

  const handleMinPayment = () => {
    setAmount(minimumPayment.toString() || "");
  };

  const handleAmountChange = (event) => {
    const input = event.target.value;

    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  };

  const handlePayButtonClick = async (event) => {
    event.preventDefault();

    if (!amount) {
      setErrorMessage("Amount field is required");
      setSuccessMessage("");
    } else {
      try {
        const creditCardId = toCreditCard;
        const bankAccountNumber = fromAccount;
        console.log(
          "id:",
          creditCardId,
          "BAN",
          bankAccountNumber,
          "amount",
          amount
        );

        const response = await bankingApi.payBill(
          creditCardId,
          bankAccountNumber,
          amount,
          user
        );

        console.log("Repayment response:", response);

        setErrorMessage("");
        setSuccessMessage("Successfully paid the bill");
        setAmount("");
        loadUserDb();
      } catch (error) {
        handleLogError(error);
        setErrorMessage("Error in processing payment. Please try again.");
        setSuccessMessage("");
      }
    }
  };

  const loadUserDb = async () => {
    try {
      const userResponse = await bankingApi.getUser(user);
      setUserDb(userResponse.data);

      if (userResponse.data && userResponse.data.bankAccount) {
        setFromAccount(userResponse.data.bankAccount.accountNumber);
      }

      if (userResponse.data && userResponse.data.creditCards) {
        const creditCardDetailsPromises = userResponse.data.creditCards.map(
          async (creditCard) => {
            try {
              const billResponse = await bankingApi.getBill(
                creditCard.id,
                user
              );

              if (billResponse.data && billResponse.data.length > 0) {
                const latestBill = billResponse.data[0];
                const remainingBalance = latestBill.remainingBalance;
                const minimumPayment = latestBill.minimumPayment;

                console.log(
                  "Data for creditCardId",
                  creditCard.id,
                  ":",
                  remainingBalance,
                  "|",
                  minimumPayment
                );

                return {
                  creditCardId: creditCard.id,
                  remainingBalance,
                  minimumPayment,
                };
              } else {
                console.log(
                  "Invalid or missing bill data for creditCardId",
                  creditCard.id,
                );
                return {
                  creditCardId: creditCard.id,
                  remainingBalance: 0,
                  minimumPayment: 0,
                };
              }
            } catch (error) {
              console.log(
                "Error fetching bill for creditCardId",
                creditCard.id,
                ":",
                error
              );
              return {
                creditCardId: creditCard.id,
                remainingBalance: 0,
                minimumPayment: 0,
              };
            }
          }
        );

        const creditCardDetailsArray = await Promise.all(
          creditCardDetailsPromises
        );
        console.log("creditCardDetailsArray >", creditCardDetailsArray);

        const updatedCreditCardDetails = creditCardDetailsArray.reduce(
          (acc, { creditCardId, remainingBalance, minimumPayment }) => ({
            ...acc,
            [creditCardId]: { remainingBalance, minimumPayment },
          }),
          {}
        );

        console.log("updatedCreditCardDetails >", updatedCreditCardDetails);

        setCreditCardDetails(updatedCreditCardDetails);
        setRemainingBalance(creditCardDetailsArray[0].remainingBalance);
        setMinimumPayment(creditCardDetailsArray[0].minimumPayment);
        setCreditCards(userResponse.data.creditCards);
        setToCreditCard(userResponse.data.creditCards[0].id);
      }
    } catch (error) {
      handleLogError(error);
    }
  };

  useEffect(() => {
    loadUserDb();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const placeholderAmount =
    creditCardDetails[toCreditCard]?.totalRepaymentAmount !== undefined
      ? creditCardDetails[toCreditCard].totalRepaymentAmount.toString()
      : "";

  return (
    userDb && (
      <div className="repayment-page">
        <div className="top">
          <h1>Pay Credit Card Bill</h1>
        </div>

        <div className="card-body ms-5 ps-5">
          <form style={{ width: "50%", marginLeft: "325px" }}>
            <div className="form-group">
              <label htmlFor="fromAccount" className="labelAmount mt-2">
                From:
              </label>
              <input
                type="text"
                id="fromAccount"
                value={fromAccount}
                readOnly
                className="form-control mt-2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="toCreditCard" className="labelAmount mt-2">
                For (Credit Card Number):
              </label>
              <select
                id="toCreditCard"
                value={toCreditCard}
                onChange={handleToCreditCardChange}
                className="form-control mt-2"
              >
                {creditCards.map((creditCard) => (
                  <option key={creditCard.cardNumber} value={creditCard.id}>
                    {creditCard.cardNumber}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="remainingBalance" className="labelAmount mt-2">
                Balance Due:
              </label>
              <input
                type="text"
                id="remainingBalance"
                value={remainingBalance}
                readOnly
                className="form-control mt-2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount" className="labelAmount mt-2">
                Amount:
              </label>
              <input
                className="form-control mt-2"
                type="text"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                placeholder={placeholderAmount}
              />
            </div>

            <div className="btn-group mt-3">
              <button
                className="btn btn-outline-primary rounded me-2"
                type="button"
                onClick={() => handleFullPayment()}
              >
                Pay Full Amount
              </button>
              <button
                className="btn btn-outline-primary rounded me-2"
                type="button"
                onClick={() => handleMinPayment()}
              >
                Pay Min Amount
              </button>
            </div>
            <br />

            <div className="btn-group mt-3">
              <button
                onClick={handlePayButtonClick}
                type="button"
                className="btn btn-primary mt-3 btn-lg"
              >
                Pay
              </button>
            </div>

            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
    )
  );
};

export default RepaymentPage;
