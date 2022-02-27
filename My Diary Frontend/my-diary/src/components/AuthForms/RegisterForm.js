import { useReducer, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForms.module.css";
import ChangeAuthType from "./components/ChangeAuthType";
import Input from "./components/Input";
import TitlePanel from "./components/TitlePanel";

const initialErrorState = {
  emailError: null,
  passwordError: null,
  validatePasswordError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, emailError: action.message };
    case "password":
      return { ...state, passwordError: action.message };
    case "validatePassword":
      return { ...state, validatePasswordError: action.message };
    default:
      throw new Error("Action type is not recognized");
  }
}

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const [errorState, dispatchError] = useReducer(reducer, initialErrorState);
  props.setDispatchError(dispatchError);

  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== validatePassword) {
      dispatchError({
        type: "validatePassword",
        message: "Passwords must be equal!",
      });
    } else {
      props.onValidSubmit({
        email,
        password,
      });
    }
  };

  return (
    <div className={classes.card}>
      {props.isLoading && <LoadingSpinner />}

      <TitlePanel title="Register" />
      <div className={classes.formPanel}>
        <form onSubmit={submitHandler}>
          <Input
            type="email"
            placeholder="Enter e-mail"
            required
            value={email}
            onChange={setEmail}
            error={errorState.emailError}
            onFocus={() =>
              dispatchError({
                type: "email",
                message: null,
              })
            }
          />
          <Input
            type="password"
            placeholder="Enter password"
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

          <div className={classes.formField}>
            <button>Register</button>
          </div>
          <ChangeAuthType
            type="login"
            message="Already have an account?"
            linkTitle="Log in"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
