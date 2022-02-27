import React, { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import TitlePanel from "./components/TitlePanel";
import classes from "./AuthForms.module.css";
import Input from "./components/Input";

/*

We have created token and sent the link
-> Add email 
-> Disable sending reset emails before one hour 

*/

const ForgottenForm = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();
  //TODO: give this setEmailError func to forgotten page so that it can detect errors from the server responde and set the error of the form

  const submitHandler = (event) => {
    event.preventDefault();
    props.onValidSubmit(email);
  };

  return (
    <div className={classes.card}>
      {props.isLoading && <LoadingSpinner />}
      <TitlePanel title="Forgot password" />

      <div className={classes.formPanel}>
        {!props.isEmailSent && (
          <form onSubmit={submitHandler}>
            <label htmlFor="email" className={classes.label}>
              Please write your email that you registered with. We will send you
              a link for you to reset password
            </label>
            <Input
              type="email"
              placeholder="Enter e-mail"
              required
              name="email"
              value={email}
              onChange={setEmail}
              error={emailError}
              onFocus={() => setEmailError()}
            />
            <div className={classes.formField}>
              <button>Send</button>
            </div>
          </form>
        )}
        {props.isEmailSent && (
          <React.Fragment>
            <h2>Check your email | My Diary</h2>
            <p>{`We sent an email to ${email}`}</p>
            <p>
              You can reset your password with the link provided with the e-mail
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ForgottenForm;
