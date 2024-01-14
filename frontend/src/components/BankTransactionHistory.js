import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/TransactionHistory.css';

const bankTransactionData = [
    {
        id: 1,
        transactionType: "deposit",
        amount: 100.0,
        datetime: "2022-01-01T12:30:00Z",
    },
    {
        id: 2,
        transactionType: "withdraw",
        amount: 50.0,
        datetime: "2022-01-02T14:45:00Z",
    },
    {
        id: 3,
        transactionType: "transfer",
        amount: 75.0,
        datetime: "2022-01-03T10:15:00Z",
    },
    {
        id: 4,
        transactionType: "repayment",
        amount: 120.0,
        datetime: "2022-01-04T18:20:00Z",
    },
    {
        id: 5,
        transactionType: "repayment",
        amount: 120.0,
        datetime: "2022-01-05T09:00:00Z",
    },
    // Add more transactions as needed
];

const BankTransactionHistory = () => {

    // const {
    //     id,
    //     transactionType,
    //     amount,
    //     status,
    //     datetime,
    // } = bankTransactionData || {};

    const [filterType, setFilterType] = useState('date');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const clearFilters = () => {
        setSelectedDate(null);
    };

    const filteredTransactions = bankTransactionData.filter(transaction => {
        if (filterType === 'date' && selectedDate) {
            return transaction.datetime.includes(selectedDate.toISOString().split('T')[0]);
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

                <div className="button-container">
                    <button onClick={clearFilters}>Clear Filters</button>
                </div>
            </div>

            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Transaction Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date and Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction, index) => (
                        <tr key={index} className="transaction-item">
                            <td>{transaction.id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>{new Date(transaction.datetime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BankTransactionHistory;