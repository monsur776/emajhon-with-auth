import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eye from "../../assets/eye.png";
import hide from "../../assets/hidden.png";
import { authContext } from "../AuthProvider/AuthProvider";

const Login = () => {
   // state section is here
   const [control, setControl] = useState(false);
   const { googleSignIn, login } = useContext(authContext);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const navigate = useNavigate();

   const location = useLocation();
   //    console.log(location);

   const from = location.state?.from?.pathname || "/";
   //    console.log(from);

   // login function start from here
   const handleLogin = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      login(email, password)
         .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError("");
            setSuccess("User loggedin successfully");
            navigate(from, { replace: true });
         })
         .catch((error) => {
            console.log(error.message);
            setSuccess("");
            setError(error.message);
         });
   };

   const handleGoogleSignIn = (email, password) => {
      googleSignIn(email, password)
         .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError("");
            setSuccess("User logged in successfully");
            navigate(from, { replace: true });
         })
         .catch((error) => {
            setSuccess("");
            setError(error.message);
         });
   };

   return (
      <div className="container">
         <form onSubmit={handleLogin} className="login-form">
            <h2 className="form-title">Log in</h2>
            <div className="form-control">
               <label htmlFor="email" className="login-form__label">
                  Email
               </label>
               <input
                  type="email"
                  name="email"
                  required
                  id="email"
                  className="login-form__input"
               />
            </div>
            <div className="form-control">
               <label htmlFor="password" className="login-form__label">
                  Password
               </label>
               <input
                  type={control ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="login-form__input"
               />
               <div
                  onClick={() => {
                     setControl(!control);
                  }}
                  className="control">
                  {control ? (
                     <img src={hide} alt="" />
                  ) : (
                     <img src={eye} alt="" />
                  )}
               </div>
            </div>
            <div className="alert">
               {error ? (
                  <p className="error">{error}</p>
               ) : (
                  <p className="success">{success}</p>
               )}
            </div>
            <button type="submit" className="login-form__button">
               Login
            </button>

            <div className="signup">
               <small>
                  New To Emazhon? <Link to="/signUp">Create Account</Link>{" "}
               </small>
            </div>

            <div className="or">
               <hr /> or <hr />
            </div>

            <button
               onClick={handleGoogleSignIn}
               type="button"
               className="login-form__google-button">
               <span className="login-form__google-icon"></span>
               Login with Google
            </button>
         </form>
      </div>
   );
};

export default Login;
