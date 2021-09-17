import React from "react";
import Modal from "simple-react-modal";

const DefaultModal = (props) => {
  var containerStyle =
    props.containerStyle !== undefined ? props.containerStyle : {};

  return (
    <Modal
      show={props.showModal}
      onClose={props.onClose.bind(this)}
      style={{ display: "flex" }}
      containerStyle={{
        margin: "auto",
        width: "400px",
        maxWidth: "90%",
        borderRadius: "8px",
        // border: '1px solid rgba(0, 0, 0, 0.125)',
        border: "0",
        padding: "15px",
        ...containerStyle,
      }}
    >
      {props.children}
    </Modal>
  );
};

export default DefaultModal;
