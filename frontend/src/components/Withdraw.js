import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Withdraw() {
    const [amount, setAmount] = useState(0);

    const handleWithdraw = (e) => {  
        // e.preventDefault();

        if(amount<=0){
          alert("Please input a valid positive number")
          return;
        } else{
            alert("Withdrawal success")
        }
        
      };
    
    const handleAmountButtonClick = (buttonAmount) => {
        setAmount(buttonAmount);
        
    };

      return (
            <form className="row justify-content-center" onSubmit={handleWithdraw} >
                <div className="col-12 col-md-6">
                    <h2>Withdraw</h2>
                    <div className="form-group">
                        <div className="from mt-2">
                            <label htmlFor="from">From:</label>
                            <div className = "bank">

                            
                            <button class="btn btn-secondary dropdown-toggle mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled = "true">
                                Bank Account
                            </button>
                            </div>
                        </div>
                        

                        <label class = "amount mt-2" htmlFor="withdrawAmount">Amount:</label>
                        <input
                        type="number"
                        id="withdrawAmount"
                        className="form-control mt-2"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>

                    <div className="btn-group mt-3">
                        <button className="btn btn-outline-primary rounded me-2" type="button" onClick={() => handleAmountButtonClick(100)}>
                            100
                        </button>
                        <button className="btn btn-outline-primary rounded me-2" type="button" onClick={() => handleAmountButtonClick(200)}>
                            200
                        </button>
                        <button className="btn btn-outline-primary rounded  me-2" type="button" onClick={() => handleAmountButtonClick(500)}>
                            500
                        </button>
                    </div>
                    
                    <div>
                        <button className="btn btn-primary mt-3 btn-lg" type = "submit">
                            Withdraw
                        </button>
                    </div>
                </div>
            </form>
      );
}
export default Withdraw;