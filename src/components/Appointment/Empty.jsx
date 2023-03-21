import React from "react";

export default function Empty(props) {
  return (
    <main className="appointment__add" data-testid ="add-appointment">
      <img 
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={props.onAdd}
      />
    </main>
  );
};