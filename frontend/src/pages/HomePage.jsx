import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../HomePage.css";
import ActionButton from "../components/ActionButton";
import CardDisplay from "../components/CardDisplay";
import Navbar from "../components/Navbar";

function HomePage() {
  return (
    <div className="App">
      <div className="left-column">
        <Navbar />
      </div>

      <div className="right-column">
        <div className="top">
          <h1>Credit Card</h1>
        </div>

        <div className="middle">
          <div className="card-display">
            <CardDisplay />
          </div>
          <div className="button-list">
            <ActionButton>
              <i className="bi bi-credit-card" />
              <span className="ms-2">Cards</span>
            </ActionButton>
            <ActionButton>
              <i className="bi bi-gift" />
              <span className="ms-2">Cashback</span>
            </ActionButton>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <h2>Transaction History</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
