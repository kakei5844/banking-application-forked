import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/TransactionHistory.css'; 

const transactionData = [
    {
      id: 1,
      paymentType: 'purchase',
      amount: 100.0,
      merchantCode: 'M123',
      status: 'Completed',
      datetime: '2022-01-01T12:30:00Z',
      cardNumber: '**** **** **** 1234',
    },
    {
      id: 2,
      paymentType: 'purchase',
      amount: 50.0,
      merchantCode: 'M456',
      status: 'Pending',
      datetime: '2022-01-02T14:45:00Z',
      cardNumber: '**** **** **** 5678',
    },
    {
      id: 3,
      paymentType: 'purchase',
      amount: 75.0,
      merchantCode: 'M789',
      status: 'Completed',
      datetime: '2022-01-03T10:15:00Z',
      cardNumber: '**** **** **** 9012',
    },
    {
      id: 4,
      paymentType: 'repayment',
      amount: 120.0,
      merchantCode: 'M345',
      status: 'Failed',
      datetime: '2022-01-04T18:20:00Z',
      cardNumber: '**** **** **** 3456',
    },
    {
      id: 5,
      paymentType: 'repayment',
      amount: 30.0,
      merchantCode: 'M678',
      status: 'Completed',
      datetime: '2022-01-05T09:00:00Z',
      cardNumber: '**** **** **** 7890',
    },
    // Add more transactions as needed
  ];
  
  const TransactionHistory = () => {
    
    const [filterType, setFilterType] = useState('date');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCard, setSelectedCard] = useState('');
  
    const handleDateChange = date => {
      setSelectedDate(date);
    };
  
    const handleCardChange = event => {
      setSelectedCard(event.target.value);
    };
  
    const clearFilters = () => {
      setSelectedDate(null);
      setSelectedCard('');
    };
  
    const filteredTransactions = transactionData.filter(transaction => {
      if (filterType === 'date' && selectedDate) {
        return transaction.datetime.includes(selectedDate.toISOString().split('T')[0]);
      } else if (filterType === 'card' && selectedCard) {
        return transaction.cardNumber === selectedCard;
      }
      return true; 
    });
  
    return (
      <div className="transaction-container">
        <div className="filter-options">
          <label>
            Filter by:
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="date">Date</option>
              <option value="card">Card</option>
            </select>
          </label>
  
          {filterType === 'date' && (
            <div className="date-filter">
              <label>Month and Year:</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/yyyy" 
                showMonthYearPicker
              />
            </div>
          )}
  
          {filterType === 'card' && (
            <div className="card-filter">
              <label>Card:</label>
              <select value={selectedCard} onChange={handleCardChange}>
                <option value="">All Cards</option>
                {/* Assuming unique card numbers */}
                {Array.from(new Set(transactionData.map(transaction => transaction.cardNumber))).map(card => (
                  <option key={card} value={card}>{`**** **** **** ${card.slice(-4)}`}</option>
                ))}
              </select>
            </div>
          )}
  
          <div className="button-container">
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        </div>
  
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Payment Type</th>
              <th>Amount</th>
              <th>Merchant Code</th>
              <th>Status</th>
              <th>Date and Time</th>
              <th>Card Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className="transaction-item">
                <td>{transaction.id}</td>
                <td>{transaction.paymentType}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.merchantCode}</td>
                <td>{transaction.status}</td>
                <td>{new Date(transaction.datetime).toLocaleString()}</td>
                <td>**** **** **** {transaction.cardNumber.slice(-4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default TransactionHistory;
