import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

const RepaymentPage = () => {
  const [fromAccount, setFromAccount] = useState("123456789");
  const [creditCards, setCreditCards] = useState([
    "1111222233334444",
    "5555666677778888",
    "9999888877776666",
  ]);
  const [creditCardDetails, setCreditCardDetails] = useState({
    1111222233334444: 2000,
    5555666677778888: 5000,
    9999888877776666: 9000,
  });

  const [amount, setAmount] = useState("");
  const [toCreditCard, setToCreditCard] = useState("");


  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFullPayment = () => {
    setAmount(creditCardDetails[toCreditCard].toString());
  };

  const handleMinPayment = () => {
    const minPayment = 100;
    setAmount(minPayment.toString());
  };

  const handleToCreditCardChange = (event) => {
    setToCreditCard(event.target.value);
  };

  const handleAmountChange = (event) => {
    const input = event.target.value;

    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  };

  const handlePayButtonClick = (event) => {
    event.preventDefault();

    if (!amount) {
      setErrorMessage("Amount field is required");
      setSuccessMessage("");
    } else {
      // Implement repayment logic
      // API call for backend validation
      console.log(
        `Repayment of credit card bill initiated from ${fromAccount} to ${toCreditCard} with amount ${amount}`
      );
      setErrorMessage("");
      setSuccessMessage("Successfully transferred");
      setAmount("");
    }
  };

  useEffect(() => {
    // Fetch credit card data
    // Insert the URL with actual API endpoint
    {
      /*
    fetch('/path/to/example.json') // Adjust the path accordingly
      .then((response) => response.json())
      .then((data) => {
        if (data && data.creditCards) {
          setCreditCards(data.creditCards);
          // Set the first credit card as the default selection
          setToCreditCard(data.creditCards[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching credit cards:', error);
      });
  }, []);
    */
    }

    setToCreditCard(creditCards[0]);
  }, [creditCards]);

  const placeholderAmount =
    creditCardDetails[toCreditCard] !== undefined
      ? creditCardDetails[toCreditCard]
      : "";

  return (
    <div className="repayment-page">
      <div className="top">
        <h1>Pay Credit Card Bill</h1>
      </div>

      <div className="card-body">
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
                <option key={creditCard} value={creditCard}>
                  {creditCard}
                </option>
              ))}
            </select>
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

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RepaymentPage;
