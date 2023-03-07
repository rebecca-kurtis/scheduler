export function getAppointmentsForDay(state, day) {
  // console.log("state", state);
  const results = [];
  const daysArr = [];

  for (const element of state.days) {
    if( element.name === day) {
      results.push(...element.appointments);
    }
  }
  for (const value of results) {
    for (const appointment in state.appointments) {
      if (results.length <= 0) {
        return [];
      }
      if ( value === state.appointments[appointment].id) {
        daysArr.push(state.appointments[appointment]);
      } 
    }
  }
  return daysArr;

};