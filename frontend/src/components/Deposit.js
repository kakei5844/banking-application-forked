import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Deposit() {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");

  const handleDeposit = (e) => {
    // e.preventDefault();

    if (amount <= 0) {
      alert("Please input a valid positive number");
      return;
    } else {
      alert("Withdrawal success");
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
          <div className="fromBankAccount">
            <label className="toBA " htmlFor="from">
              To:
            </label>
            <input
              type="text"
              id="toBank"
              className="form-control mt-2"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Bank Account"
            />
          </div>

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
      </div>
    </form>
  );
}
export default Deposit;
