import React from "react";
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";
import reactDOM from "react-dom";

const RemoveDiaryModal = (props) => {
  return (
    <React.Fragment>
      {reactDOM.createPortal(
        <Backdrop onCancel={props.onCancel} />,
        document.getElementById("backdrop-root")
      )}
      {reactDOM.createPortal(
        <ModalOverlay
          title="Are you sure?"
          message={`Are you sure you want to delete your diary page dated ${props.customDate.stringDDMLongYYYY}? You can't take it back!`}
          yes="Remove"
          no="Cancel"
          yesButtonColor="red"
          noButtonColor="blue"
          onNo={props.onCancel}
          onYes={props.onRemove}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default RemoveDiaryModal;
