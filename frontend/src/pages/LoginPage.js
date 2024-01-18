import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from '../misc/AuthContext';
import { bankingApi } from '../misc/BankingApi';
import { handleLogError } from '../misc/Helpers';

function Login() {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  const formValidation = () => {
    // Check all inputs
    if (!username || !password) {
      setErrorMessage("Please provide username and password")
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;

    try {
      const response = await bankingApi.authenticate(username, password)
      const { id, name, role } = response.data
      const authdata = window.btoa(username + ':' + password)
      const authenticatedUser = { id, name, role, authdata }

      Auth.userLogin(authenticatedUser)

      setUsername('')
      setPassword('')
    } catch (error) {
      handleLogError(error)
      setErrorMessage(error.response.data.message)
    }
  };

  if (isLoggedIn) {
    return <Navigate to={'/home'} />
  }

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
                          value={username}
                          name="username"
                          onChange={(e) => setUsername(e.target.value)}
                          id="username"
                          className="form-control form-control-lg"
                          placeholder="Username"
                        />
                        <label className="form-label" htmlFor="username">
                          Username
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
                          name="password"
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
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
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

