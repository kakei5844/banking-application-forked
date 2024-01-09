import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const verifyCredentials = () => {
    // TODO: Send get request to server api for user login
    return true;
  };

  const formValidation = () => {
    // Check all inputs
    if (!email || !password) {
      alert("Please ensure all fields are filled in.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValidation()) return;

    if (verifyCredentials()) {
      alert("Successfully logged in!");
      navigate("/home");
    } else {
      alert("Wrong credentials. Please try again.");
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h2 className="mb-4 pb-2 pb-md-0 mb-md-5">
                  Banking System Login
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 mb-4">
                      <div className="form-floating">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 mb-4">
                      <div className="form-floating">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button className="btn btn-secondary btn-lg" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div className="mt-4 pt-2">
                  <button
                    className="btn btn-outline-secondary link-btn"
                    onClick={() => navigate("/registration")}
                  >
                    Don't have an account? Register here.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
