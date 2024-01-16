// TransactionHistory.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/CreditCardTransactionHistory.css'; 

// const revealLastFourDigits = (cardNumber) => {
//   const hiddenDigits = cardNumber.slice(0, -4).replace(/\d/g, '*');
//   const lastFourDigits = cardNumber.slice(-4);
//   return `${hiddenDigits}${lastFourDigits}`;
// };

const CreditCardTransaction = ({ selectedCard, transactions, cards }) => {

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Generate an array of months (1 to 12)
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  // Generate an array of years (current year and the past 3 years)
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);

  const selectedTransactions = transactions.filter(
    (transaction) =>
      transaction.creditCardId === cards[selectedCard].id &&
      (!selectedMonth || new Date(transaction.datetime).getMonth() + 1 === parseInt(selectedMonth, 10)) &&
      (!selectedYear || new Date(transaction.datetime).getFullYear() === parseInt(selectedYear, 10))
  );
  
  const handleResetFilters = () => {
    setSelectedMonth('');
    setSelectedYear('');
  };

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>

      <div className="filter-container">
        <label>Filter by Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(currentYear, month - 1, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <label>Filter by Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button onClick={handleResetFilters}>Reset</button>
      </div>

      {selectedTransactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
            <th>Transaction ID</th>
              {/* <th>Payment Type</th> */}
              <th>Amount</th>
              <th>Description</th>
              {/* <th>Merchant Code</th>
              <th>Status</th> */}
              <th>Date</th>
              <th>Time</th>
              {/* <th>Card Number</th> */}
            </tr>
          </thead>
          <tbody>
            {selectedTransactions.map((transaction) => (
              <tr key={`${transaction.id}-${transaction.creditCardId}`}>
                <td>{transaction.id}</td>
                {/* <td>{transaction.paymentType}</td> */}
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                {/* <td>{transaction.merchantCode}</td>
                <td>{transaction.status}</td> */}
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{new Date(transaction.date).toLocaleTimeString()}</td>
                {/* <td>{revealLastFourDigits(transaction.cardNumber)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions for the selected card.</p>
      )}
    </div>
  );
};

export default CreditCardTransaction;