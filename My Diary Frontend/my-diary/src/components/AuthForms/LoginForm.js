import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForms.module.css";
import ChangeAuthType from "./components/ChangeAuthType";
import Input from "./components/Input";
import MessageBox from "./components/MessageBox";
import TitlePanel from "./components/TitlePanel";

const initialErrorState = {
  emailError: null,
  passwordError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, emailError: action.message };
    case "password":
      return { ...state, passwordError: action.message };
    default:
      throw new Error("Action type is not recognized");
  }
}

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorState, dispatchError] = useReducer(reducer, initialErrorState);
  props.setDispatchError(dispatchError);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onValidSubmit({
      email,
      password,
    });
  };

  return (
    <div className={classes.card}>
      {props.isLoading && <LoadingSpinner />}
      <TitlePanel title="Log in" />
      {props.message && <MessageBox message={props.message} />}
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
          <div className={classes.forgetContent}>
            <span>
              Forgot <Link to="/auth/forgotten">password?</Link>
            </span>
          </div>
          <div className={classes.formField}>
            <button>Log in</button>
          </div>

          <ChangeAuthType
            type="register"
            message="Don't have an account?"
            linkTitle="REGISTER NOW"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
