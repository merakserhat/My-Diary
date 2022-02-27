import { NavLink } from "react-router-dom";
import classes from "./AuthButtons.module.css";

const AuthButtons = () => {
  return (
    <ul className={classes.authButtons}>
      <NavLink className={classes.login} to="/auth/login">
        Login
      </NavLink>
      <NavLink className={classes.register} to="/auth/register">
        Register
      </NavLink>
    </ul>
  );
};

export default AuthButtons;
