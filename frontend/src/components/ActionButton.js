import 'bootstrap/dist/css/bootstrap.min.css'

const ActionButton = ({children}) => {
    return (
        <div className="ActionButton">
            <button
                type="button"
                className="btn btn-dark"
            >
                {children}
            </button>
        </div>
    )
}

export default ActionButton;