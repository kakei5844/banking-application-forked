import React, { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import CreditCardBill from "../components/CreditBill"


const BillPage = ( cards, transactions ) => {
  
  const [billData, setBillData] = useState({
    id: 0,
    issueDate: '',
    dueDate: '',
    balanceDue: 0.0,
    minimumPayment: 0.0,
    totalRepaymentAmount: 0.0,
    remainingBalance: 0.0,
    billedTransactionsDTO: [], // Initialize as an empty array
  });

  const [billedTransactions, setBilledTransactions] = useState({
    id: 0,
                creditCardId: 0,
                amount: 0.0,
                description: '',
                createdAt: ''
  })

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {

        const user = 'john';
        const password = 888;
        const basicAuthCredentials = btoa(`${user}:${password}`);

        const response = await fetch('http://localhost:8080/api/v1/bills/credit-card/2', {
          headers: {
            'Authorization': `Basic ${basicAuthCredentials}`,
            // Add any other headers if required
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setBillData(data[0]);
        setBilledTransactions(data[0].billedTransactionsDTO) // Assuming your API returns an array with one object
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(billedTransactions)
    fetchData();
  }, []);

  // Access billedTransactionsDTO
  // const billedTransactions = billData.billedTransactionsDTO || []

  // console.log(billedTransactions.amount)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <CreditCardBill statementBalance={billData.balanceDue} minimumPayment={billData.minimumPayment} 
    dueDate={formatDate(billData.dueDate)} remainingBalance={billData.remainingBalance} balancePaid={billData.totalRepaymentAmount} transactions={billedTransactions} cards={cards} />
  );
  
};


export default BillPage;