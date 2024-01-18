import Withdraw from "../components/Withdraw";
import Deposit from "../components/Deposit";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "../styles/pages/WithdrawDeposit.css";
import { useAuth } from "../misc/AuthContext";
import { bankingApi } from "../misc/BankingApi";
import { handleLogError } from "../misc/Helpers";
import { Navigate } from "react-router-dom";

export default function WithdrawDeposit() {
  const [activeTab, setActiveTab] = useState("withdraw");
  const Auth = useAuth();
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    loadUserDb();
  }, []);

  const loadUserDb = async () => {
    try {
      const response = await bankingApi.getUser(user);
      // console.log(response.data)
      console.log(response.data.bankAccount.accountNumber); // use bankAccount number instead of bankAccount id for bank account operations (deposit, withdraw)
      setUserDb(response.data);
    } catch (error) {
      handleLogError(error);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    userDb && (
      <div className="withdraw-deposit-page">
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <div className="btn-group">
                <button
                  className={`btn btn-primary btn-lg ${
                    activeTab === "withdraw" ? "active" : ""
                  } `}
                  onClick={() => handleTabChange("withdraw")}
                >
                  Withdraw
                </button>

                <button
                  className={`btn btn-primary btn-lg ${
                    activeTab === "deposit" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("deposit")}
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              {activeTab === "withdraw" ? (
                <Withdraw bankAccountId={userDb.bankAccount.accountNumber} user={user}/>
              ) : (
                <Deposit bankAccountId={userDb.bankAccount.accountNumber} user={user}/>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
