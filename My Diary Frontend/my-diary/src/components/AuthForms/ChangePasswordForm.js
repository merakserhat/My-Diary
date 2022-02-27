import { useReducer, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForms.module.css";
import ChangeAuthType from "./components/ChangeAuthType";
import Input from "./components/Input";
import TitlePanel from "./components/TitlePanel";

const initialErrorState = {
  oldPasswordError: null,
  newPasswordError: null,
  validatePasswordError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "oldPassword":
      return { ...state, emailError: action.message };
    case "newPassword":
      return { ...state, passwordError: action.message };
    case "validatePassword":
      return { ...state, validatePasswordError: action.message };
    default:
      throw new Error("Action type is not recognized");
  }
}

const ChangePasswordForm = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState("");

  const [errorState, dispatchError] = useReducer(reducer, initialErrorState);
  props.setDispatchError(dispatchError);

  const submitHandler = (event) => {
    event.preventDefault();
    if (newPassword !== validatePassword) {
      dispatchError({
        type: "validatePassword",
        message: "Passwords must be equal!",
      });
    } else {
      props.onValidSubmit({
        oldPassword,
        newPassword,
      });
    }
  };

  return (
    <div className={classes.card}>
      {props.isLoading && <LoadingSpinner />}

      <TitlePanel title="Change Password" />
      <div className={classes.formPanel}>
        <form onSubmit={submitHandler}>
          <Input
            type="password"
            placeholder="Enter old password"
            required
            value={oldPassword}
            onChange={setOldPassword}
            error={errorState.oldPasswordError}
            onFocus={() =>
              dispatchError({
                type: "oldPassword",
                message: null,
              })
            }
          />
          <Input
            type="password"
            placeholder="Enter new password"
            required
            value={newPassword}
            onChange={setNewPassword}
            error={errorState.newPasswordError}
            onFocus={() =>
              dispatchError({
                type: "newPassword",
                message: null,
              })
            }
          />
          <Input
            type="password"
            placeholder="Validate new password"
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

export default ChangePasswordForm;
