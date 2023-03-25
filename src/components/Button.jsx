import React from "react";

//import components
import classNames from "classnames";

//import styling
import "components/Button.scss";

export default function Button(props) {
  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
