import React from 'react';
import '../styles/components/Bill.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import BillTransactionHistory from './BillTransactionHistory';

const CreditCardBill = ({ statementBalance, minimumPayment, dueDate, remainingBalance, balancePaid, transactions, cards, selectedCard }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
  const months = Array.from({ length: 12 }, (_, index) =>
    new Date(currentDate.getFullYear(), index, 1).toLocaleString('default', { month: 'long' })
  );

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isStatementGenerated, setIsStatementGenerated] = useState(false);

  const [selectedMonth2, setSelectedMonth2] = useState('');
  const [selectedYear2, setSelectedYear2] = useState('');


  const handleGenerateStatement = () => {
    setIsStatementGenerated(true);
    setSelectedMonth2(selectedMonth)
    setSelectedYear2(selectedYear)
  };
  
const handleViewTransactions = () => {

    const popupWindow = window.open('', 'Transactions Popup', 'width=800,height=600');
    popupWindow.document.write('<html><head><title>Transactions Popup</title>');

    popupWindow.document.write('<style>');
    popupWindow.document.write(`
    .transaction-history-container {
      margin-top: 20px;
      font-family: 'Arial', sans-serif;
    }
    
    .filter-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    
    .filter-container label {
      font-weight: bold;
      margin-right: 10px;
    }
    
    .filter-controls {
      display: flex;
      align-items: center;
    }
    
    .filter-container select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 10px;
    }
    
    .filter-container button {
      padding: 8px 15px;
      border: none;
      border-radius: 4px;
      background-color: #3498db;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .filter-container button:hover {
      background-color: #2980b9;
    }
    
    .transaction-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 14px;
    }
    
    .transaction-table th,
    .transaction-table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    
    .transaction-table th {
      background-color: #3498db;
      color: #fff;
    }
    
    .transaction-table tbody tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    
    .transaction-table tbody tr:hover {
      background-color: #e5e5e5;
    }
    
    `);
    popupWindow.document.write('</style>');
  
    popupWindow.document.write('</head><body></body></html>');
  
    ReactDOM.render(
      <BillTransactionHistory
        transactions={transactions}
        cards={cards}
        selectedCard={1}
        month={isStatementGenerated ? selectedMonth2 : currentMonth}
        year={isStatementGenerated ? selectedYear2 : currentYear}
      />,
      popupWindow.document.body
    );
  };

  return (
    <div className="credit-card-bill">
      <div className="statement-details">
      {isStatementGenerated ? (
          <div className="field-title">{`Current Statement: ${months[selectedMonth2 - 1]} ${selectedYear2}`}</div>
        ) : (
          <div className="field-title">{`Current Statement: ${months[currentMonth - 1]} ${currentYear}`}</div>
        )}
        <div className="field-value">Statement Details</div>

        <div className="bill-field">
        <div className="field-title">Statement Balance</div>
        <div className="field-value">${statementBalance}</div>
      </div>

      <div className="bill-field">
        <div className="field-title">Minimum Payment</div>
        <div className="field-value">${minimumPayment}</div>
      </div>

      <div className="bill-field">
        <div className="field-title">Due Date</div>
        <div className="field-value">{dueDate}</div>
      </div>

      <div className="bill-field">
        <div className="field-title">Transactions</div>
        <button className="view-transactions-button" onClick={handleViewTransactions}>
            View Transactions
          </button>
      </div>
    </div>

    <div className="payment-details">
         <div className="field-value">Payment Details</div>
         <div className="bill-field">
           <div className="field-title">Balance</div>
           <div className="field-value">${statementBalance}</div>
         </div>
         
         <div className="bill-field">
           <div className="field-title">Remaining Balance</div>
           <div className="field-value">${remainingBalance}</div>
         </div>

         <div className="bill-field">
           <div className="field-title">Balance Paid</div>
           <div className="field-value">${balancePaid}</div>
         </div>
       </div>
      
      <div className="previous-statement">
      <div className="field-value">Previous Statements</div>
      <div className="dropdown-container">
          <label htmlFor="yearDropdown">Choose Year:</label>
          <select
            id="yearDropdown"
            className="year-dropdown"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label htmlFor="monthDropdown">Choose Month:</label>
          <select
            id="monthDropdown"
            className="month-dropdown"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
          >
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
          <button className="generate-button" onClick={handleGenerateStatement}>
          Generate Statement
        </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCardBill;
