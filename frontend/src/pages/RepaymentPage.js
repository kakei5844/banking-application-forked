import '../styles/pages/HomePage.css'
//import '../styles/pages/TransferPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react'

const RepaymentPage = () => {
  const [fromAccount, setFromAccount] = useState('123456789');
  const [creditCards, setCreditCards] = useState([
    "1111222233334444",
    "5555666677778888",
    "9999888877776666"
  ]);
  const [creditCardDetails, setCreditCardDetails] = useState({
    '1111222233334444': 2000,
    '5555666677778888': 5000,
    '9999888877776666': 9000,
  });
  const [toCreditCard, setToCreditCard] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleToCreditCardChange = (event) => {
    setToCreditCard(event.target.value);
  };

  const handleAmountChange = (event) => {
    // setAmount(event.target.value);

    const input = event.target.value;

    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  };

  const handlePayButtonClick = (event) => {
    event.preventDefault();

    if (!amount) {
      setErrorMessage('Amount field is required');
      setSuccessMessage('');
    } else {
      // Implement repayment logic
      // API call for backend validation
      console.log(`Repayment of credit card bill initiated from ${fromAccount} to ${toCreditCard} with amount ${amount}`);
      setErrorMessage('');
      setSuccessMessage('Successfully transferred');
      setAmount('');
    }
  };

  useEffect(() => {
    // Fetch credit card data
    // Insert the URL with actual API endpoint
    {/*
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
    */}

    setToCreditCard(creditCards[0]);
  }, [creditCards]);

  const placeholderAmount =
    creditCardDetails[toCreditCard] !== undefined
      ? creditCardDetails[toCreditCard]
      : '';
  
  return (
    <div className="HomePage">
        <div className='left-column'>
          <Navbar />
        </div>

        <div className='right-column'>
          <div className='top'>
              <h1>Pay Credit Card Bill</h1>
          </div>

          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="fromAccount" className="label">
                  From:
                </label>
                <input type="text" id="fromAccount" value={fromAccount} readOnly className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="toCreditCard" className="label">
                  To (Credit Card Number):
                </label>
                <select id="toCreditCard" value={toCreditCard}  onChange={handleToCreditCardChange} className="form-control">
                  {/* Options for credit card numbers */}
                  {creditCards.map((creditCard) => (
                    <option key={creditCard} value={creditCard}>
                      {creditCard}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount" className="label">
                  Amount:
                </label>
                <input type="text" id="amount" value={amount} onChange={handleAmountChange} placeholder={placeholderAmount} className="form-control" />
              </div>
              <button onClick={handlePayButtonClick} className="button">
                Pay
              </button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
              </form>
          </div>
        </div>
    </div>
  );
};

export default RepaymentPage;
