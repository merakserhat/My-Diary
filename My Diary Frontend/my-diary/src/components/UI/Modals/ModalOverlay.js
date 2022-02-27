import React from "react";
import Card from "../Card";
import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
  const getActionButtons = () => {
    if (props.yes) {
      return (
        <React.Fragment>
          <button
            className={
              props.noButtonColor === "blue"
                ? classes.button_blue
                : classes.button_red
            }
            onClick={props.onNo}
          >
            {props.no}
          </button>
          <button
            className={
              props.yesButtonColor === "red"
                ? classes.button_red
                : classes.button_blue
            }
            onClick={props.onYes}
          >
            {props.yes}
          </button>
        </React.Fragment>
      );
    } else {
      return (
        <button
          onClick={props.onConfirm}
          className={
            props.noButtonColor === "blue"
              ? classes.button_blue
              : classes.button_blue
          }
        >
          Okay
        </button>
      );
    }
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>{getActionButtons()}</footer>
    </Card>
  );
};

export default ModalOverlay;
