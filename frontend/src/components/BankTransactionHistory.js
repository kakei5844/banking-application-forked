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

    const checkColor = (amount) => {
        if (amount < 0) {
            return "red";
        } else {
            return "green";
        }
    }

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
                        <th>Date and Time</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction, index) => (
                        <tr key={transaction.id} className="transaction-item">
                            <td>{new Date(transaction.date).toLocaleString()}</td>
                            <td>{transaction.description}</td>
                            <td style={{ color: `${checkColor(transaction.amount)}` }}>{Math.abs(transaction.amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BankTransactionHistory;
