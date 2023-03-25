//Function gets all of the appointments that are in a day based on the state and what day is inputted.
export function getAppointmentsForDay(state, day) {
  const results = [];
  const daysArr = [];

  for (const element of state.days) {
    if (element.name === day) {
      results.push(...element.appointments);
    }
  }
  for (const value of results) {
    for (const appointment in state.appointments) {
      if (results.length <= 0) {
        return [];
      }
      if (value === state.appointments[appointment].id) {
        daysArr.push(state.appointments[appointment]);
      }
    }
  }
  return daysArr;
}

//Function gets all of the interviews that are currently booked based on the state and if the interview is null or not.
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = { ...interview };
  for (const element in state.interviewers) {
    if (interview.interviewer === state.interviewers[element].id) {
      result.interviewer = state.interviewers[element];
    }
  }
  return result;
}

//Function gets all of the interviewers that are available for that day based on the state and what day is inputted.
export function getInterviewersForDay(state, day) {
  const results = [];
  const interviewArr = [];

  for (const element of state.days) {
    if (element.name === day) {
      results.push(...element.interviewers);
    }
  }
  for (const value of results) {
    for (const interview in state.interviewers) {
      if (results.length <= 0) {
        return [];
      }
      if (value === state.interviewers[interview].id) {
        interviewArr.push(state.interviewers[interview]);
      }
    }
  }
  return interviewArr;
}

//Calculates how many spots are available for that day based on how many appointmetns there are with null interviews.
export function calculateSpotsForOneDay(state, day, appointments) {
  const dayObj = state.days.find((data) => {
    return data.name === day;
  });

  if (!dayObj) {
    return null;
  }

  const appointmentsForOneDay = dayObj.appointments.map(
    (appointmentsId) => appointments[appointmentsId]
  );
  const nullInterviews = appointmentsForOneDay.filter(
    (appointment) => appointment.interview === null
  );
  const spots = nullInterviews.length;
  return spots;
}
