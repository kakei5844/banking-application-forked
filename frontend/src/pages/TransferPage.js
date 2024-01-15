import '../styles/pages/TransferPage.css';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../misc/AuthContext';
import { bankingApi } from '../misc/BankingApi';
import { handleLogError } from '../misc/Helpers';
import { Navigate } from 'react-router-dom';

const TransferPage = () => {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()
  const user = Auth.getUser()
  const [userDb, setUserDb] = useState(null)

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

  const handlePayButtonClick = async (event) => {
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
      try {
        const response = await bankingApi.transfer(userDb.bankAccount.id, toAccount, amount)
        console.log(response.data)
        setErrorMessage('');
        setSuccessMessage('Successfully transferred');
        setToAccount('');
        setAmount('');

      } catch (error) {
        handleLogError(error)
        setErrorMessage('Error transferring funds. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  useEffect(() => {
    loadUserDb()
  }, []);

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  const loadUserDb = async () => {
    try {
      const response = await bankingApi.getUser(user)
      console.log(response.data)
      setUserDb(response.data)
    } catch (error) {
      handleLogError(error)
    }
  }

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
