import Withdraw from "../components/Withdraw";
import Deposit from "../components/Deposit";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "../styles/pages/WithdrawDeposit.css";
import Navbar from "../components/Navbar";

export default function WithdrawDeposit() {
  const [activeTab, setActiveTab] = useState("withdraw");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="Page">
      <div className="left-column">
        <Navbar />
      </div>
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
            {activeTab === "withdraw" ? <Withdraw /> : <Deposit />}
          </div>
        </div>
      </div>
    </div>
  );
}
