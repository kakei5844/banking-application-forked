import '../styles/pages/TransferPage.css'
import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const TransferPage = () => {
  const [fromAccount, setFromAccount] = useState('123456789');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleToAccountChange = (event) => {
    const input = event.target.value;
    
    if (/^\d*$/.test(input)) {
      setToAccount(input);
    }
  };

  const handleAmountChange = (event) => {
    const input = event.target.value;
    
    if (/^\d*\.?\d*$/.test(input)) {
      setAmount(input);
    }
  };

  const handlePayButtonClick = (event) => {
    event.preventDefault();
    
    if (!toAccount && !amount) {
      setErrorMessage('To and Amount fields are required');
      setSuccessMessage('');
    } else if (!toAccount) {
      setErrorMessage('To field is required');
      setSuccessMessage('');
    } else if (!amount) {
      setErrorMessage('Amount field is required');
      setSuccessMessage('');
    } else {
      // Implement payment logic
      // API call for backend validation
      axios.post('http://localhost:8080/api/v1/bank-accounts/transfer', {
      fromAccount,
      toAccount,
      amount,
    })
      .then((response) => {
        console.log('Transfer response:', response.data);
        setErrorMessage('');
        setSuccessMessage('Successfully transferred');
        setToAccount('');
        setAmount('');
      })
      .catch((error) => {
        console.error('Transfer error:', error);
        setErrorMessage('Error transferring funds. Please try again.');
        setSuccessMessage('');
      });
    }
  };

  useEffect(() => {
    // Fetch bank account number from endpoint
    // Update the state
    // {bank_account_id} -> change to the user's bank acc id (1, 2, etc)
    axios.get('http://localhost:8080/api/v1/bank-accounts/{bank_account_id}')
    .then((response) => response.json())
    .then((data) => {
      if (data && data.accountNumber) {
        setFromAccount(data.accountNumber);
      }
    })
    .catch((error) => {
      console.error('Error fetching bank account:', error);
    });
  }, []);

  return (
    <div className="Page">
        <div className='left-column'>
            <Navbar />
        </div>

        <div className='right-column'>
            <div className='top'>
                <h1>Transfer</h1>
            </div>

            <div className="transfer-card-body">
                <form style={{width:'50%', marginLeft:'325px'}}>
                    <div className="form-group">
                        <label htmlFor="fromAccount" className="labelAmount mt-2">From:</label>
                        <input type="text" id="fromAccount" value={fromAccount} className="form-control mt-2" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="toAccount" className="labelAmount mt-2">To:</label>
                        <input type="text" id="toAccount" value={toAccount} onChange={handleToAccountChange} className="form-control mt-2" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount" className="labelAmount mt-2">Amount:</label>
                        <input type="text" id="amount" value={amount} onChange={handleAmountChange} className="form-control mt-2" />
                    </div>

                    <div className="btn-group mt-3">
                      <button onClick={handlePayButtonClick} className="btn btn-primary">
                          Transfer
                      </button>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
            </div>
        </div>
    </div>
  );
};

export default TransferPage;
