import React, { useState, useContext }  from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserTokenContext } from "../App";

export default function Login(){
  const {setToken} = useContext(UserTokenContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-z]{5,16}$/)) {
      formIsValid = false;
      setpasswordError(
        "Password is incorrect"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()){
      const req = {
        email: email,
        password: password,
      };

      axios.post('https://reqres.in/api/login', req).then(
        (response) => {
          if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('token', token);
            setToken(token)
            navigate('/users');
          } else {
            alert('An error occurred. Please try again later.');
          }

        },

        (err) => {
          alert('Could not establish connection',err.message);
        }

      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label">Check me out</label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}