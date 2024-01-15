import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "../styles/components/Navbar.css";
import { useAuth } from "../misc/AuthContext";

const Navbar = () => {

  const { getUser, userIsAuthenticated, userLogout } = useAuth()

  const logout = () => {
    userLogout()
  }

  return (
    <div className="container-fluid">
      <div className="bg-dark col-auto col-md-12 min-vh-100 d-flex justify-content-between flex-column">
        <div>
          <a
            href="/home"
            className="text-decoration-none text-white d-flex align-itemcenter ms-3 mt-2"
          >
            <span className="ms-1 fs-4">CreditConnect</span>
          </a>
          <hr className="text-secondary" />
          <ul className="nav nav-pills flex-column">
            <li className="nav-item text-white fs-4 my-1">
              <a
                href="/home"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-house"></i>
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li className="nav-item text-white fs-4 my-1">
              <a
                href="/credit-cards"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-credit-card"></i>
                <span className="ms-3">Cards</span>
              </a>
            </li>
            <li className="nav-item text-white fs-4 my-1">
              <a
                href="/withdraw-deposit"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-cash-coin"></i>
                <span className="ms-3">Withdraw/Deposit</span>
              </a>
            </li>
            <li className="nav-item text-white fs-4 my-1">
              <a
                href="/transfer"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-cash-coin"></i>
                <span className="ms-3">Transfer</span>
              </a>
            </li>
            <li className="nav-item text-white fs-4 my-1">
              <a
                href="/repayment"
                className="nav-link text-white fs-5"
                aria-current="page"
              >
                <i className="bi bi-cash-coin"></i>
                <span className="ms-3">Pay</span>
              </a>
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
            <span className="ms-2">User123</span>
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
  );
};

export default Navbar;
