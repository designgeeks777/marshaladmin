import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";

const Alerts = ({ props }) => {
  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false);
  };

  // useEffect(() => {
  //   setVisible(props.isOpen);
  //   setTimeout(() => {
  //     setVisible(false);
  //   }, 3000);
  // }, [props.isOpen]);

  return (
    <div>
      <Alert
        isOpen={props.isOpen}
        color={props.type}
        className={`text-${props.type}`}
        fade={true}
      >
        <i
          className={`bi ${
            props.type === "success" ? "bi-check" : "bi-exclamation-circle-fill"
          } fa-lg`}
        ></i>{" "}
        {props.message}
      </Alert>
    </div>
  );
};

export default Alerts;
