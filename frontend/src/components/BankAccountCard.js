import React, { useState } from "react";
import '../styles/components/BankAccountCard.css';

const BankAccountCard = ({ accountNumber, initialBalance, bankName }) => {

    const [balanceVisible, setBalanceVisible] = useState(false);
  
    const revealBalance = () => {
      setBalanceVisible((prevVisibility) => !prevVisibility);
    };
  
    return (
      <div className="bank-card" onClick={revealBalance}>
        <div className="card-content">
        <div className="bank-name">{bankName}</div>
          <div className="account-number">{`Account Number: ${accountNumber}`}</div>
          <div className="balance">
            {balanceVisible ? `Balance: $${initialBalance}` : 'Balance: *********'}
          </div>
        </div>
      </div>
    );
}

export default BankAccountCard;