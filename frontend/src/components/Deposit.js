import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleLogError } from "../misc/Helpers";
import { bankingApi } from "../misc/BankingApi";

function Deposit({ bankAccountId }) {
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const response = await bankingApi.deposit(bankAccountId, amount)
      console.log(response.data);
        setErrorMessage("");
        setSuccessMessage("Successfully deposited money");
        setAmount(0);
    } catch (error) {
      handleLogError(error);
      setSuccessMessage("");
      setErrorMessage(error.response.data.message);
      setAmount(0);
    }
    
  };

  const handleAmountButtonClick = (buttonAmount) => {
    setAmount(buttonAmount);
  };

  return (
    <form className="row justify-content-center" onSubmit={handleDeposit}>
      <div className="col-12 col-md-6">
        <h2>Deposit</h2>
        <div className="form-group">
          <label className="labelAmount mt-2" htmlFor="depositAmount">
            Amount
          </label>
          <input
            type="number"
            id="depositAmount"
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

        <div>
          <button className="btn btn-primary mt-3 btn-lg">Deposit</button>
        </div>
        {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
      </div>
    </form>
  );
}
export default Deposit;
