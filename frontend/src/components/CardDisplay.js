import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CardDisplay.css";
import logo from "../images/logo.png";
import chip from "../images/chip.png";

const CardDisplay = () => {
  return (
    <div className="body">
      <div className="card-container">
        <header>
          <span className="logo">
            <img src={logo} />
            <h5>Mastercard</h5>
          </span>
          <img src={chip} className="chip" />
        </header>

        <div className="card-details">
          <div className="name-number">
            <h6>Card Number</h6>
            <h5 className="number">1234 1234 1234 1234</h5>
            <h5 className="name">Test User</h5>
          </div>

          <div className="valid-date">
            <h6>Valid To</h6>
            <h5>10/30</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
