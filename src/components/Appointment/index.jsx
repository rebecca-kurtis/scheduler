import React from "react";

//import styles
import "components/Appointment/styles.scss"

//import components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


//import custom hooks
import useVisualMode from "hooks/useVisualMode";



export default function Appointment(props) {
  console.log('props', props);

  const EMPTY = "EMPTY";
  const SHOW = "SHOWY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  };


  const deleteInterview = () => {
    transition(DELETING, true)
    props
      .cancelInterview(props.id, props.interview)
      .then(() => transition(EMPTY))
  };


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={() => transition(DELETE)}/>}
      {mode === CREATE && <Form student={props.student} interviewer={props.interviewer} interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === DELETE && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => transition(SHOW)} onConfirm={deleteInterview}/>}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}


    </article>
  );
};