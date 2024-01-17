import React, { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import CreditCardBill from "../components/CreditBill"
import { useAuth } from '../misc/AuthContext';
import { bankingApi } from '../misc/BankingApi';
import { handleLogError } from '../misc/Helpers';


const BillPage = () => {
  
  const [transactions, setTransactions] = useState([
    // Transactions data as you have it in the Carousel component
    {
      paymentType: 'Credit Card',
      amount: '$50.00',
      description: 'Purchase from lazada',
      status: 'Completed',
      datetime: '2022-01-10T08:00:00',
      cardNumber: '5542123412341234',
    },
    {
      paymentType: 'Credit Card',
      amount: '$25.00',
      description: 'Purchase from lazada',
      status: 'Pending',
      datetime: '2022-01-10T08:15:00', // Replace with the actual datetime
      cardNumber: '5542123412341234', // Card number without masking
    },
    {
      paymentType: 'Credit Card',
      amount: '$80.00',
      description: 'Purchase from lazada',
      status: 'Failed',
      datetime: '2022-01-10T08:30:00', // Replace with the actual datetime
      cardNumber: '5542123412341234', // Card number without masking
    },
    {
      paymentType: 'Credit Card',
      amount: '$80.00',
      description: 'Purchase from lazada',
      status: 'Failed',
      datetime: '2022-02-10T08:30:00', // Replace with the actual datetime
      cardNumber: '5542123412341234', // Card number without masking
    },
    {
      paymentType: 'Credit Card',
      amount: '$80.00',
      description: 'Purchase from lazada',
      status: 'Failed',
      datetime: '2024-01-10T08:30:00', // Replace with the actual datetime
      cardNumber: '5542123412341234', // Card number without masking
    },
  ]);

  const [cards, setCards] = useState([
    {
      number: '4111111111111111',
      name: 'John Doe',
      expiry: '12/23',
      cvc: '123',
      focus: 'number',
    },
    { cvc: '123', expiry: '2020', focus: '', name: 'tom', number: '5542123412341234' },
    { cvc: '246', expiry: '2021', focus: '', name: 'jerry', number: '6134123412341234' },
    { cvc: '369', expiry: '2022', focus: '', name: 'tim', number: '4343123412341234' },
    { cvc: '322', expiry: '2022', focus: '', name: 'trey', number: '374312341234125' },
    { cvc: '387', expiry: '2022', focus: '', name: 'angus', number: '36431234123434' },
    { cvc: '365', expiry: '2022', focus: '', name: 'bob', number: '6243123412341234' },
    { cvc: '324', expiry: '2022', focus: '', name: 'bailey', number: '3543123412341234' }
    // Add other card data as needed
  ]);
  
  return (
    <CreditCardBill  transactions={transactions} cards={cards} />
  );
  
};

export default BillPage;
