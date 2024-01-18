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
  const [creditCards, setCreditCards] = useState([]);
  const [toCreditCard, setToCreditCard] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);


  const { cards, transactions } = props;

  const handleToCreditCardChange = (event) => {
    const selectedCreditCardId = event.target.value;
    setToCreditCard(selectedCreditCardId);
    console.log(toCreditCard)
    const selectedCardInfo = creditCards.find((card) => card.id === selectedCreditCardId);
    console.log(creditCards[toCreditCard])
    setSelectedCard(selectedCardInfo);
  };

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
        setCreditCards(userResponse.data.creditCards);
        console.log(creditCards)
        setToCreditCard(userResponse.data.creditCards[0].id);
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

  

  return (userDb &&
    <div>
      <div>
        <label htmlFor="toCreditCard" className="labelAmount mt-2">
          Choose a card:
        </label>
        <select
          id="toCreditCard"
          value={toCreditCard}
          onChange={handleToCreditCardChange}
          className="form-control mt-2"
        >
          {creditCards.map((creditCard) => (
            <option key={creditCard.cardNumber} value={creditCard.id}>
              {creditCard.cardNumber}
            </option>
          ))}
        </select>
      </div>
      {toCreditCard >= 0 && toCreditCard < creditCards.length && (
      <CreditCardBill
        statementBalance={billData.balanceDue}
        minimumPayment={billData.minimumPayment}
        dueDate={formatDate(billData.dueDate)}
        remainingBalance={billData.remainingBalance}
        balancePaid={billData.balancePaid}
        transactions={billedTransactions}
        cards={creditCards}
        selectedCard={selectedCard}
      />)}
      
    </div>
  );

};

export default BillPage;
