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
    console.log("selectedCreditCardId>", selectedCreditCardId);
    setToCreditCard(selectedCreditCardId);
    const selectedCardInfo = creditCards.find((card) => card.id === selectedCreditCardId);
    console.log("creditCards >>>", creditCards[toCreditCard])
    setSelectedCard(selectedCardInfo);
  };

  const loadUserDb = async () => {
    try {
      const userResponse = await bankingApi.getUser(user);
      setUserDb(userResponse.data);

      if (userResponse.data && userResponse.data.creditCards) {
        const billDetailsPromises = userResponse.data.creditCards.map(async (creditCard) => {
          try {
            const billResponse = await bankingApi.getLatestBill(creditCard.id, user);

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
        console.log("billDetailsArray >", billDetailsArray);

        const updatedBillDetails = billDetailsArray.reduce(
          (acc, { creditCardId, balanceDue, remainingBalance, minimumPayment, dueDate, balancePaid }) => ({
            ...acc,
            [creditCardId]: { balanceDue, remainingBalance, minimumPayment, dueDate, balancePaid },
          }),
          {}
        );

        console.log("updatedBillDetails >", updatedBillDetails);
        setBillData(updatedBillDetails);
        setBilledTransactions(billDetailsArray[0]?.billedTransactionsDTO || {});
        setCreditCards(userResponse.data.creditCards);
        console.log("creditCards >", userResponse.data.creditCards);
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
    <div className='billContainer' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      {toCreditCard >= 0 && toCreditCard <= Math.max(...creditCards.map(card => card.id)) &&  (
      <CreditCardBill
        statementBalance={billData[toCreditCard].balanceDue}
        minimumPayment={billData[toCreditCard].minimumPayment}
        dueDate={formatDate(billData[toCreditCard].dueDate)}
        remainingBalance={billData[toCreditCard].remainingBalance}
        balancePaid={billData[toCreditCard].balancePaid}
        transactions={billedTransactions}
        cards={creditCards}
        selectedCard={selectedCard}
      />)}
      
    </div>
  );

};

export default BillPage;
