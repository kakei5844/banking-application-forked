import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CreditCardBill from "../components/CreditBill";

import { useAuth } from "../misc/AuthContext";
import { bankingApi } from "../misc/BankingApi";
import { handleLogError } from "../misc/Helpers";

const BillPage = (props) => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();

  const [userDb, setUserDb] = useState(null);
  const [billData, setBillData] = useState({});
  const [billedTransactions, setBilledTransactions] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { cards, transactions } = props;

  const loadUserDb = async () => {
    try {
      const userResponse = await bankingApi.getUser(user);
      setUserDb(userResponse.data);

      if (userResponse.data && userResponse.data.creditCards) {
        const billDetailsPromises = userResponse.data.creditCards.map(async (creditCard) => {
          try {
            const billResponse = await bankingApi.getAllBill(creditCard.id, user);

            if (billResponse.data && billResponse.data.length > 0) {
              const latestBill = billResponse.data[0];
              const balanceDue = latestBill.balanceDue;
              const remainingBalance = latestBill.remainingBalance;
              const minimumPayment = latestBill.minimumPayment;
              const dueDate = latestBill.dueDate;
              const balancePaid = latestBill.totalRepaymentAmount;
              const billedTransactionsDTO = latestBill.billedTransactionsDTO;

              return {
                creditCardId: creditCard.id,
                balanceDue,
                remainingBalance,
                minimumPayment,
                dueDate,
                balancePaid,
                billedTransactionsDTO,
              };
            } else {
              console.log("Invalid or missing bill data for creditCardId", creditCard.id);
            }
          } catch (error) {
            console.log("Error fetching bill for creditCardId", creditCard.id, ":", error);
          }
        });

        const billDetailsArray = await Promise.all(billDetailsPromises);
        console.log("billDetailsArray >", billDetailsArray[0]);
        console.log("billedTransactionsDTO >", billDetailsArray[0]);
        setBillData(billDetailsArray[0]);
        setBilledTransactions(billDetailsArray[0]?.billedTransactionsDTO || {});
      }
    } catch (error) {
      handleLogError(error);
    }
  };

  useEffect(() => {
    loadUserDb();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return ( userDb &&
    <div className='billContainer' style={{ display: 'flex', justifyContent: 'center' }}>
      <CreditCardBill 
        statementBalance={billData.balanceDue} 
        minimumPayment={billData.minimumPayment}
        dueDate={formatDate(billData.dueDate)} 
        remainingBalance={billData.remainingBalance} 
        balancePaid={billData.balancePaid} 
        transactions={billedTransactions} 
        cards={cards} 
      />
    </div>
  );

};

export default BillPage;
