import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/CreditCardTransactionHistory.css';

const CreditCardTransaction = ({ selectedCard, transactions, cards }) => {

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);

  const selectedTransactions = transactions
    .filter(
      (transaction) =>
        transaction.creditCardId === (cards[selectedCard]?.id || null) &&
        (!selectedMonth || new Date(transaction.date).getMonth() + 1 === parseInt(selectedMonth, 10)) &&
        (!selectedYear || new Date(transaction.date).getFullYear() === parseInt(selectedYear, 10))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const checkColor = (amount) => {
    if (amount < 0) {
      return "green";
    } else {
      return "red";
    }
  }

  const handleResetFilters = () => {
    setSelectedMonth('');
    setSelectedYear('');
  };

  return (
    <div className="transaction-history-container">
      <h2 style={{ textAlign: 'center' }}>Transaction History</h2>

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
              <th>Date and Time</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedTransactions.map((transaction) => (
              <tr key={`${transaction.id}-${transaction.creditCardId}`}>
                <td>{new Date(transaction.date).toLocaleString()}</td>
                <td>{transaction.description}</td>
                <td style={{ color: `${checkColor(transaction.amount)}` }}>{Math.abs(transaction.amount)}</td>
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
