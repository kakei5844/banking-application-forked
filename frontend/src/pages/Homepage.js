import "../styles/pages/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ActionButton from "../components/ActionButton";
import BankAccountCard from "../components/BankAccountCard";
import CardDisplay from "../components/CardDisplay";
import Navbar from "../components/Navbar";
import BankTransactionHistory from "../components/BankTransactionHistory";
import { useEffect, useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../misc/AuthContext';
import { bankingApi } from '../misc/BankingApi';
import { handleLogError } from '../misc/Helpers';

const transactionData = [
  {
    id: 1,
    paymentType: "purchase",
    amount: 100.0,
    merchantCode: "M123",
    status: "Completed",
    datetime: "2022-01-01T12:30:00Z",
    cardNumber: "**** **** **** 1234",
  },
  {
    id: 2,
    paymentType: "purchase",
    amount: 50.0,
    merchantCode: "M456",
    status: "Pending",
    datetime: "2022-01-02T14:45:00Z",
    cardNumber: "**** **** **** 5678",
  },
  {
    id: 3,
    paymentType: "purchase",
    amount: 75.0,
    merchantCode: "M789",
    status: "Completed",
    datetime: "2022-01-03T10:15:00Z",
    cardNumber: "**** **** **** 9012",
  },
  {
    id: 4,
    paymentType: "repayment",
    amount: 120.0,
    merchantCode: "M345",
    status: "Failed",
    datetime: "2022-01-04T18:20:00Z",
    cardNumber: "**** **** **** 3456",
  },
  {
    id: 5,
    paymentType: "repayment",
    amount: 30.0,
    merchantCode: "M678",
    status: "Completed",
    datetime: "2022-01-05T09:00:00Z",
    cardNumber: "**** **** **** 7890",
  },
  // Add more transactions as needed
];

const bankTransactionData = [
  {
    id: 1,
    transactionType: "deposit",
    amount: 100.0,
    status: "Completed",
    datetime: "2022-01-01T12:30:00Z",
  },
  {
    id: 2,
    transactionType: "withdraw",
    amount: 50.0,
    status: "Completed",
    datetime: "2022-01-02T14:45:00Z",
  },
  {
    id: 3,
    transactionType: "transfer",
    amount: 75.0,
    status: "Completed",
    datetime: "2022-01-03T10:15:00Z",
  },
  {
    id: 4,
    transactionType: "repayment",
    amount: 120.0,
    status: "Failed",
    datetime: "2022-01-04T18:20:00Z",
  },
  {
    id: 5,
    transactionType: "repayment",
    amount: 120.0,
    status: "Pending",
    datetime: "2022-01-05T09:00:00Z",
  },
  // Add more transactions as needed
];

const HomePage = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);

  const [appliedToCreditCard, setAppliedToCreditCard] = useState(false);

  useEffect(()=> {
    loadUserDb()
  }, []);

  const loadUserDb = async () => {
      try {
          const response = await bankingApi.getUser(user)
          console.log(response.data)
          setUserDb(response.data)
      } catch (error) {
          handleLogError(error)
      }
  };

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  };

  return ( userDb &&
    <div className="HomePage">
      <div className="left-column">
        <Navbar />
      </div>

      <div className="right-column">
        <div className="top">
          {appliedToCreditCard ? (
            () => null
          ) : (
            <div className="credit-apply-div">
              <button className="credit-apply-btn">Apply To Credit Card</button>
            </div>
          )}
          <h1>Bank Account</h1>
        </div>

        <div className="middle">
          <div className="card-display">
            <CardDisplay />
          </div>
          <div className="button-list">
            <NavLink to="/credit-cards">
              <ActionButton>
                <i className="bi bi-credit-card" />
                <span className="ms-2">Cards</span>
              </ActionButton>
            </NavLink>
            <ActionButton>
              <i className="bi bi-gift" />
              <span className="ms-2">Cashback</span>
            </ActionButton>
            <NavLink to="/credit-cards">
              <ActionButton>
                <i className="bi bi-plus-circle" />
                <span className="ms-2">Deposit</span>
              </ActionButton>
            </NavLink>
            <NavLink to="/withdraw-deposit">
              <ActionButton>
                <i className="bi bi-dash-circle" />
                <span className="ms-2">Withdraw</span>
              </ActionButton>
            </NavLink>
            <NavLink to="/transfer">
              <ActionButton>
                <i className="bi bi-arrow-right-circle" />
                <span className="ms-2">Transfer</span>
              </ActionButton>
            </NavLink>
            <NavLink to="/repayment">
              <ActionButton>
                <i className="bi bi-receipt" />
                <span className="ms-2">Payment</span>
              </ActionButton>
            </NavLink>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="bottom-left">
            <div className="bottom-left-1">
              <BankAccountCard
                bankName="SG Bank"
                accountNumber={userDb.bankAccount.id}
                balance={userDb.bankAccount.balance}
              />
            </div>
            <div className="bottom-left-2">
              <h2>Transaction History</h2>
              <BankTransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// userTable
// we will have all credit cards and bank account
// we  will show each card
// when we pick, we change to the currentCard State
// we can show data for current card
