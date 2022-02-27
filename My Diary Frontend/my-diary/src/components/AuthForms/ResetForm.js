import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForms.module.css";
import Input from "./components/Input";
import TitlePanel from "./components/TitlePanel";

const initialErrorState = {
  passwordError: null,
  validatePasswordError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "password":
      return { ...state, passwordError: action.message };
    case "validatePassword":
      return { ...state, validatePasswordError: action.message };
    default:
      throw new Error("Action type is not recognized");
  }
}

const ResetForm = (props) => {
  console.log(props.tokenError);
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const [errorState, dispatchError] = useReducer(reducer, initialErrorState);
  //props.setDispatchError(dispatchError);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== validatePassword) {
      dispatchError({
        type: "validatePassword",
        message: "Passwords must be equal!",
      });
    } else {
      props.onValidSubmit(password);
    }
  };

  return (
    <div className={classes.card}>
      {props.isLoading && <LoadingSpinner />}
      <TitlePanel title="Reset your password" />

      <div className={classes.formPanel}>
        {!props.tokenError && !props.isSuccessfullyFinished && (
          <form onSubmit={submitHandler}>
            <Input
              type="password"
              placeholder="Enter new password"
              required
              value={password}
              onChange={setPassword}
              error={errorState.passwordError}
              onFocus={() =>
                dispatchError({
                  type: "password",
                  message: null,
                })
              }
            />
            <Input
              type="password"
              placeholder="Validate password"
              required
              value={validatePassword}
              onChange={setValidatePassword}
              error={errorState.validatePasswordError}
              onFocus={() =>
                dispatchError({
                  type: "validatePassword",
                  message: null,
                })
              }
            />
            <div className={`${classes.formField} ${classes["top-margin"]}`}>
              <button>Reset</button>
            </div>
          </form>
        )}
        {props.tokenError && (
          <div className={classes.internalMessage}>
            {props.tokenError}
            <div className={classes.forgetContent}>
              <span>
                Get <Link to="/auth/forgotten">password reset link?</Link>
              </span>
            </div>
          </div>
        )}
        {!props.tokenError && props.isSuccessfullyFinished && (
          <div className={classes.internalMessage}>
            Your password has been successfully changed.
            <div className={classes.forgetContent}>
              <span>
                Please <Link to="/auth/login">Log in</Link>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetForm;
