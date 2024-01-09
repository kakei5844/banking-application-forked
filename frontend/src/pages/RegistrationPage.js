import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const createUser = () => {
    // TODO: Create new user in DB by post request
  };

  const checkUserExistence = () => {
    // TODO: Check if user exist in DB
  };

  const formValidation = () => {
    // Check all inputs
    if (
      !firstName ||
      !lastName ||
      !dob ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      alert("Please ensure all fields are filled in.");
      return false;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      alert(
        "Please ensure the values entered for 'Password' and 'Confirm Password' match. Please try again."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValidation()) return;

    let userExist = false;
    checkUserExistence();
    if (userExist === false) {
      createUser();
      alert("Account created successfully!");
      navigate("/login");
    } else {
      alert("User already exist. Please proceed to the login page!");
      return;
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
                  Banking System Registration
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-floating">
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          placeholder="First Name"
                        />
                        <label className="form-label" htmlFor="firstName">
                          First Name
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-floating">
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          placeholder="Last Name"
                        />
                        <label className="form-label" htmlFor="lastName">
                          Last Name
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-floating">
                        <input
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          type="date"
                          id="dob"
                          className="form-control form-control-lg"
                          placeholder="Birthday"
                          style={{ fontSize: "15px" }}
                        />
                        <label className="form-label" htmlFor="dob">
                          Birthday
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
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
                    <div className="col-md-6 mb-4">
                      <div className="form-floating">
                        <input
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          type="tel"
                          id="phoneNumber"
                          className="form-control form-control-lg"
                          placeholder="Phone no."
                        />
                        <label className="form-label" htmlFor="phoneNumber">
                          Phone no.
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
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
                    <div className="col-md-6 mb-4">
                      <div className="form-floating">
                        <input
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          id="confirmPassword"
                          className="form-control form-control-lg"
                          placeholder="Confirm Password"
                        />
                        <label className="form-label" htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <button className="btn btn-secondary btn-lg" type="submit">
                      Register
                    </button>
                  </div>
                </form>
                <div className="mt-4 pt-2">
                  <button
                    className="btn btn-outline-secondary link-btn"
                    onClick={() => navigate("/login")}
                  >
                    Already have an account? Login here.
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

export default Registration;
