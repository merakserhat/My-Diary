import { Link } from "react-router-dom";
import classes from "./ErrorPage.module.css";

const getErrorMessage = (error) => {
  if (error && error.type) {
    switch (error.type) {
      case "invalid id": {
        return "Diary id is not valid. Probably this url is broken!";
      }
      case "not found": {
        return "Diary not found. Probably this page is removed or you are not authorized to read it!";
      }
      default: {
        return "We are sorry... Please try again.";
      }
    }
  } else {
    return "We are sorry... Please try again.";
  }
};

const ErrorPage = (props) => {
  let message = getErrorMessage(props.error);

  return (
    <div className={classes.holder}>
      <p className={classes.title}>Something went wrong!</p>
      <p className={classes.message}>{message}</p>

      <Link to="/" className={classes.link}>
        Go to first page
      </Link>
    </div>
  );
};

export default ErrorPage;
