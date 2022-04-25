import React, { useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp(){
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    // if (!password.match(/^(?=.*\d)(?=.*[a-z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,16}$/)) {
    if (!password.match(/^[a-z]{5,16}$/)) {
      formIsValid = false;
      setpasswordError(
        "Atleast a letter,digit, a special character and minimum 5 letters"
      );
      return false;
    }
    else if(password !== confirmPassword){
      formIsValid = false;
      setpasswordError(
        "Password doesn't match!"
      );
      return false;
    }
    else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const signUpSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()){
      const req = {
        email: email,
        password: password,
      };

      axios.post('https://reqres.in/api/register', req).then(
        (response) => {
          debugger;
          if (response.status === 200) {
            alert('Registration successful');
            navigate('/');
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
            <form id="loginform" onSubmit={signUpSubmit}>
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
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                  onChange={(event) => setConfirmPassword(event.target.value)}
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

export default SignUp;