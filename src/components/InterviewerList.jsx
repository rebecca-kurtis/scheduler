import React from "react";
import PropTypes from 'prop-types';

//import styles
import "components/InterviewerList.scss"
//import components
import InterviewerListItem from "./InterviewerListItem";


const InterviewerList = (props) => {
  const mappedInterviews = props.interviewers.map((interview) => {
    return (
      <InterviewerListItem 
      key={interview.id} 
      name={interview.name} 
      avatar={interview.avatar} 
      selected={interview.id === props.value}
      setInterviewer={() => props.onChange(interview.id)}>
      </InterviewerListItem>
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviews}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;