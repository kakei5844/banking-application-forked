import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

import { useAuth } from '../misc/AuthContext';
import { bankingApi } from '../misc/BankingApi';
import { handleLogError } from '../misc/Helpers';

const Application = () => {
    const Auth = useAuth();
    const user = Auth.getUser();
    const isLoggedIn = Auth.userIsAuthenticated();
    const [userDb, setUserDb] = useState(null);

    const [annualSalary, setAnnualSalary] = useState('');
    const [cardType, setCardType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCardTypeChange = (event) => {
        setCardType(event.target.value);
    };

    const handleAnnualSalaryChange = (event) => {
        const input = event.target.value;
        if (/^\d*\.?\d*$/.test(input)) {
            setAnnualSalary(input);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Validate the form fields
            if (!annualSalary || !cardType) {
                setErrorMessage('Please fill in all fields.');
                return;
            }

            // Additional validation for annualSalary
            if (parseFloat(annualSalary) <= 0) {
                setErrorMessage('Annual salary must be greater than zero.');
                return;
            }

            // Make API call to submit the application
            const response = await bankingApi.applyCreditCard(
                annualSalary,
                cardType,
                user
            );
            console.log(response.data)

            // Check the response and set success or error message accordingly
            if (response.status === 201) {
                setSuccessMessage('Application submitted successfully!');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to submit application. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            handleLogError(error);
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage('');
        }
    };

    useEffect(() => {
        loadUserDb();
    }, []);

    const loadUserDb = async () => {
        try {
            const response = await bankingApi.getUser(user)
            // console.log(response.data)
            setUserDb(response.data)
        } catch (error) {
            handleLogError(error);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to='/home' />
    };

    return (userDb &&
        <div className="Application-Page">
            <div className='top'>
                <h1>Credit Card Application</h1>
            </div>

            <form className="row justify-content-center" onSubmit={handleSubmit}>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label htmlFor="annualSalary">Annual Salary:</label>
                        <input
                            type="text"
                            id="annualSalary"
                            value={annualSalary}
                            onChange={handleAnnualSalaryChange}
                            className="form-control mt-2"
                            required
                        />

                        <label htmlFor="cardType" className="mt-2">Card Type:</label>
                        <select
                            id="cardType"
                            value={cardType}
                            onChange={handleCardTypeChange}
                            className="form-control mt-2"
                            required
                        >
                            <option value="" disabled>Select Card Type</option>
                            <option value="VISA">Visa</option>
                            <option value="MASTERCARD">MasterCard</option>
                        </select>
                    </div>

                    <div className="btn-group mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit Application
                        </button>
                    </div>

                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </div>
            </form>
        </div>
    )
}
export default Application;