import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/TransactionHistory.css';

const BankTransactionHistory = ({ transactions }) => {
    const [filterType, setFilterType] = useState('date');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const clearFilters = () => {
        setSelectedDate(null);
    };

    const filteredTransactions = transactions.filter(transaction => {
        if (filterType === 'date' && selectedDate) {
            return transaction.date.includes(selectedDate.toISOString().split('T')[0]);
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
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction, index) => (
                        <tr key={index} className="transaction-item">
                            <td>{transaction.id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{new Date(transaction.date).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BankTransactionHistory;
