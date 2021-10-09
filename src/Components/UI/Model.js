import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};
const ModelOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default function Model(props) {
  const portalElement = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModelOverlay>{props.children}</ModelOverlay>,
        portalElement
      )}
    </>
  );
}
