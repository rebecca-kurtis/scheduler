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
import Error from "./Error";

//import custom hooks
import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";

export default function Appointment(props) {
  console.log('props', props);

  const EMPTY = "EMPTY";
  const SHOW = "SHOWY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // const {
  //   calculateSpots
  // } = useApplicationData();

  const save = (name, interviewer, spotsMode) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true))
  };


  const deleteInterview = () => {
    transition(DELETING, true)
    props
      .cancelInterview(props.id, props.interview)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
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
      {mode === ERROR_SAVE && <Error message={"Could not save appointment."} onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment."} onClose={() => back()} />}



    </article>
  );
};