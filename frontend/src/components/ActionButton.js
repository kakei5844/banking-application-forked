import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/components/ActionButton.css";

const ActionButton = ({children}) => {
    return (
      <div className="ActionButton">
        <button type="button" className="btn btn-dark custom-button">
          {children}
        </button>
      </div>
    );
}

export default ActionButton;