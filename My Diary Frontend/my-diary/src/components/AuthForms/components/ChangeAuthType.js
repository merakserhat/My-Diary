import classes from "../AuthForms.module.css";
import { Link } from "react-router-dom";

const ChangeAuthType = (props) => {
  return (
    <div className={classes.bottomContent}>
      <span>{props.message}</span>
      <Link to={`/auth/${props.type}`}>{props.linkTitle}</Link>
    </div>
  );
};

export default ChangeAuthType;
