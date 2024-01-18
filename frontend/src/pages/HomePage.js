import "../styles/pages/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ActionButton from "../components/ActionButton";
import CardDisplay from "../components/CardDisplay";
import BankTransactionHistory from "../components/BankTransactionHistory";
import { useEffect, useState, useCallback } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../misc/AuthContext";
import { bankingApi } from "../misc/BankingApi";
import { handleLogError } from "../misc/Helpers";

const HomePage = () => {
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await bankingApi.getUser(user);
        console.log(userResponse.data);
        setUserDb(userResponse.data);

        if (userResponse.data && userResponse.data.bankAccount) {
          const bankResponse = await bankingApi.getTransactions(
            userResponse.data.bankAccount.id,
            user
          );
          console.log(bankResponse.data);

          // Transform the bank data into the format you want for transactions
          const formattedTransactions = bankResponse.data.map(
            (transaction) => ({
              id: transaction.id,
              description: transaction.description,
              amount: transaction.amount,
              bankAccountId: transaction.id,
              date: transaction.createdAt,
            })
          );

          setTransactions(formattedTransactions);
        } else {
          console.error(
            "User data or bank account information is not available."
          );
        }
      } catch (error) {
        handleLogError(error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    userDb && (
      <div className="home-page">
        <div className="top">
          <div className="credit-apply-div">
            <NavLink to="/application">
              <button className="credit-apply-btn mb-3">
                Apply To Credit Card
              </button>
            </NavLink>
          </div>
          <h1 className="mb-5">Bank Account</h1>
        </div>

        <div className="middle1">
          <div className="card-display1">
            <CardDisplay
              firstName={userDb.firstName}
              lastName={userDb.lastName}
              accountNumber={userDb.bankAccount.accountNumber}
              balance={userDb.bankAccount.balance}
            />
          </div>
          <div className="button-list1">
            <NavLink to="/withdraw-deposit">
              <ActionButton>
                <i className="bi bi-cash-coin" />
                <span className="ms-2">Withdraw/Deposit</span>
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
            <div className="bottom-left-2">
              <h2>Transaction History</h2>
              <BankTransactionHistory transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default HomePage;
