import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "../styles/components/Navbar.css";

import { useAuth } from "../misc/AuthContext";
import { bankingApi } from "../misc/BankingApi";
import { handleLogError } from "../misc/Helpers";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const Auth = useAuth();
  const userLogout = Auth.userLogout;
  const user = Auth.getUser();
  const isLoggedIn = Auth.userIsAuthenticated();
  const [userDb, setUserDb] = useState(null);

  useEffect(() => {
    loadUserDb()
  }, []);

  const loadUserDb = async () => {
    try {
      const response = await bankingApi.getUser(user)
      // console.log("Navbar >>>", response.data)
      setUserDb(response.data)
    } catch (error) {
      handleLogError(error)
    }
  };

  const logout = () => {
    userLogout();
  };

  return (
    isLoggedIn && userDb && (
      <div className="container-fluid">
        <div className="bg-dark col-auto col-md-12 min-vh-100 d-flex justify-content-between flex-column">
          <div>
            <NavLink
              className="nav-link text-decoration-none text-white d-flex align-itemcenter ms-3 mt-2"
              to="/home"
              activeclassname="active"
            >
              <span className="ms-1 fs-4">CreditConnect</span>
            </NavLink>

            <hr className="text-secondary" />

            <ul className="nav nav-pills flex-column">
              <li className="nav-item my-1">
                <NavLink
                  exact="true"
                  className="nav-link text-white fs-5"
                  to="/home"
                  activeclassname="active"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="ms-3">Home</span>
                </NavLink>
              </li>

              <li className="nav-item my-1">
                <NavLink
                  className="nav-link text-white fs-5"
                  to="/credit-cards"
                  activeclassname="active"
                >
                  <i className="bi bi-credit-card"></i>
                  <span className="ms-3">Cards</span>
                </NavLink>
              </li>

              <li className="nav-item my-1">
                <NavLink
                  className="nav-link text-white fs-5"
                  to="/withdraw-deposit"
                  activeclassname="active"
                >
                  <i className="bi bi-cash-coin"></i>
                  <span className="ms-3">Withdraw/Deposit</span>
                </NavLink>
              </li>

              <li className="nav-item my-1">
                <NavLink
                  className="nav-link text-white fs-5"
                  to="/transfer"
                  activeclassname="active"
                >
                  <i className="bi bi-arrow-right-circle"></i>
                  <span className="ms-3">Transfer</span>
                </NavLink>
              </li>

              <li className="nav-item my-1">
                <NavLink
                  className="nav-link text-white fs-5"
                  to="/repayment"
                  activeclassname="active"
                >
                  <i className="bi bi-receipt"></i>
                  <span className="ms-3">Bill Payment</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="dropdown open">
            <a
              className="text-decoration-none text-white dropdown-toggle p-3"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle"></i>
              <span className="ms-2">{userDb.firstName} {userDb.lastName}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <a className="dropdown-item" href="#">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                Setting
              </a>
              <a className="dropdown-item" href="/login" onClick={logout}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
