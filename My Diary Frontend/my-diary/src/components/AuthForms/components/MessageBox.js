import classes from "../AuthForms.module.css";

const MessageBox = (props) => {
  return <div className={classes.messageBox}>{props.message}</div>;
};

export default MessageBox;
