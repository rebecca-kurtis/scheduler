import React from "react";

//import styles
import "components/Appointment/styles.scss"

//import components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

//import custom hooks
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOWY";
  const CREATE = "CREATE";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === CREATE && <Form student={props.student} interviewer={props.interviewer} interviewers={[]} onCancel={() => back()}/>}

    </article>
  );
};