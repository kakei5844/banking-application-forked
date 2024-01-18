import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/BillTransactionHistory.css'; 

const revealLastFourDigits = (cardNumber) => {
  const hiddenDigits = cardNumber.slice(0, -4).replace(/\d/g, '*');
  const lastFourDigits = cardNumber.slice(-4);
  return `${hiddenDigits}${lastFourDigits}`;
};

const BillTransactionHistory = ({ selectedCard, transactions, cards, month, year }) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);


  const filterTransactions = () => {
    const filteredTransactions = transactions
      .filter(
        (transaction) =>
          transaction.cardNumber === cards[selectedCard].number &&
          (!month || new Date(transaction.datetime).getMonth() + 1 === parseInt(month, 10)) &&
          (!year || new Date(transaction.datetime).getFullYear() === parseInt(year, 10))
      )
      .reverse();

    setFilteredTransactions(filteredTransactions);
  };

  useEffect(() => {
    // Automatically filter when month or year changes
    filterTransactions();
  }, [transactions, selectedCard, month, year]);

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>

      {filteredTransactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Payment Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
              <th>Time</th>
              <th>Card Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.paymentType}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.status}</td>
                <td>{new Date(transaction.datetime).toLocaleDateString()}</td>
                <td>{new Date(transaction.datetime).toLocaleTimeString()}</td>
                <td>{revealLastFourDigits(transaction.cardNumber)}</td>
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

export default BillTransactionHistory;
