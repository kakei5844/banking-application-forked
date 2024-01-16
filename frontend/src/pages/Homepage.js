import "../styles/pages/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ActionButton from "../components/ActionButton";
import CardDisplay from "../components/CardDisplay";
import Navbar from "../components/Navbar";
import BankTransactionHistory from "../components/BankTransactionHistory";
import { useEffect, useState, useCallback } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../misc/AuthContext';
import { bankingApi } from '../misc/BankingApi';
import { handleLogError } from '../misc/Helpers';

const HomePage = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [appliedToCreditCard, setAppliedToCreditCard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await bankingApi.getUser(user);
        console.log(userResponse.data);
        setUserDb(userResponse.data);

        if (userResponse.data && userResponse.data.bankAccount) {
          const bankResponse = await bankingApi.getTransactions(userResponse.data.bankAccount.id);
          console.log(bankResponse.data);

          const formattedTransactions = bankResponse.data.map(transaction => ({
            id: transaction.id,
            description: transaction.description,
            amount: transaction.amount,
            bankAccountId: transaction.bankAccountid,
            date: transaction.createdAt,
          }));

          setTransactions(formattedTransactions);
        } else {
          console.error('User data or bank account information is not available.');
        }
      } catch (error) {
        handleLogError(error);
      }
    };

    // Check if user is logged in before fetching data
    if (isLoggedIn) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return ( userDb &&
    <div className="HomePage">
      <div className="left-column">
        <Navbar 
          firstName={userDb.firstName}
          lastName={userDb.lastName}
        />
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
              <CardDisplay
                firstName={userDb.firstName}
                lastName={userDb.lastName}
                accountNumber={userDb.bankAccount.accountNumber}
                balance={userDb.bankAccount.balance}
              />
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
            <h2>Transaction History</h2>
            <BankTransactionHistory transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
