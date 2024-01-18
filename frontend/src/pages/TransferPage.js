import "../styles/pages/TransferPage.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../misc/AuthContext";
import { bankingApi } from "../misc/BankingApi";
import { handleLogError } from "../misc/Helpers";
import { Navigate } from "react-router-dom";

const TransferPage = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);

  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadUserDb();
  }, []);

  const loadUserDb = async () => {
    try {
      const response = await bankingApi.getUser(user);
      console.log(response.data);
      setUserDb(response.data);
    } catch (error) {
      handleLogError(error);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleTransfer = async (event) => {
    event.preventDefault();

    if (!accountNumber && !amount) {
      setErrorMessage("To and Amount fields are required");
      setSuccessMessage("");
    } else if (!accountNumber) {
      setErrorMessage("To field is required");
      setSuccessMessage("");
    } else if (!amount) {
      setErrorMessage("Amount field is required");
      setSuccessMessage("");
    } else {
      try {
        const response = await bankingApi.transfer(
          userDb.bankAccount.accountNumber,
          accountNumber,
          amount,
          user
        );
        console.log(response.data);
        setErrorMessage("");
        setSuccessMessage("Successfully transferred");
        setAccountNumber("");
        setAmount("");
      } catch (error) {
        handleLogError(error);
        setErrorMessage(error.response.data.message);
        setSuccessMessage("");
      }
    }
  };

  const handleAmountButtonClick = (buttonAmount) => {
    setAmount(buttonAmount);
  };

  return (
    userDb && (
      <div className="transfer-page">
        <div className="top">
          <h1>Transfer</h1>
        </div>

        <form className="row justify-content-center" onSubmit={handleTransfer}>
          <div className="col-12 col-md-6">
            <div className="form-group mt-5">
              <div className="toBankAccount mb-3">
                <label className="toBA " htmlFor="to">
                  To:
                </label>
                <input
                  type="text"
                  id="toBank"
                  className="form-control mt-2"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Bank Account Number"
                />
              </div>

              <label className="amount mt-2" htmlFor="transferAmount">
                Amount:
              </label>
              <input
                type="number"
                id="transferAmount"
                className="form-control mt-2"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            <div className="btn-group mt-3">
              <button
                className="btn btn-outline-primary rounded me-2"
                type="button"
                onClick={() => handleAmountButtonClick(100)}
              >
                100
              </button>
              <button
                className="btn btn-outline-primary rounded me-2"
                type="button"
                onClick={() => handleAmountButtonClick(200)}
              >
                200
              </button>
              <button
                className="btn btn-outline-primary rounded  me-2"
                type="button"
                onClick={() => handleAmountButtonClick(500)}
              >
                500
              </button>
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-primary mt-3 btn-lg" type="submit">
                Make Transfer
              </button>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
        </form>
      </div>
    )
  );
};

export default TransferPage;
