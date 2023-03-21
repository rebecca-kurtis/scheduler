import { useState, useEffect } from "react";
import axios from "axios";

import { calculateSpotsForOneDay } from "helpers/selectors";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // console.log('state.days:', state.days);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((response) =>
      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
    )
  }, [])

  const calculateSpots = (appointmentId, value) => {
    // if (state.appointments[appointmentId].interview !== null) {
    //   return; 
    // } else {
      for (const dayOBJ in state.days) {
        const day = state.days[dayOBJ];
        if (day.appointments.includes(appointmentId)) {
          const oldSpots = day.spots;
          if (value === "add") {
            day.spots = (oldSpots - 1);
          }
          if (value === "delete") {
            day.spots = (oldSpots + 1);
          }
        }
      }
    // }
    // console.log("state.appointments[appointmentId].interview", state.appointments[appointmentId].interview)
    
  };

  const bookInterview = (appointmentId, interview) => {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    }
    // console.log('bookinterview interview', interview)

    const days = state.days.map(day => {
      if (day.name === state.day){
          return {...day, spots: calculateSpotsForOneDay(state, state.day, appointments)}
      }
      return day;
    });

    return axios.put(`/api/appointments/${appointmentId}`, { interview })
      .then(() => {
        setState({ ...state, days, appointments })
      })

  };

  const cancelInterview = (appointmentId) => {

    const appointment = {
      ...state.appointments[appointmentId],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    const days = state.days.map(day => {
      if (day.name === state.day){
          return {...day, spots: day.spots + 1}
      }
      return day;
    });

    return axios.delete(`/api/appointments/${appointmentId}`)
      .then(() => {
        setState({
          ...state,
          days,
          appointments
        })
      })
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};