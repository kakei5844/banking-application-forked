import Navbar from '../components/Navbar';
import React, { useState } from 'react';

const Application = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic for handling credit card application
        // Endpoints
        // setErrorMessage and setSuccessMessage
    };

    return(
        <div className="Page">
            <div className="left-column">
                <Navbar />
            </div>
            <div className='right-column'>
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
                            className="form-control"
                            required
                            />

                            <label htmlFor="cardType">Card Type:</label>
                            <select
                            id="cardType"
                            value={cardType}
                            onChange={handleCardTypeChange}
                            className="form-control"
                            required
                            >
                                <option value="" disabled>Select Card Type</option>
                                <option value="Visa">Visa</option>
                                <option value="MasterCard">MasterCard</option>
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
        </div>
    )
}
export default Application;