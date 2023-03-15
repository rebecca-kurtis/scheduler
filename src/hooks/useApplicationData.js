import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  console.log('state.days:', state.days);

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

    return axios.put(`/api/appointments/${appointmentId}`, { interview })
      .then(() => {
        calculateSpots(appointmentId, "add");
        setState({ ...state, appointments })
      })

  };

  const cancelInterview = (appointmentId, interview) => {

    const appointment = {
      ...state.appointments[appointmentId],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    return axios.delete(`/api/appointments/${appointmentId}`)
      .then(() => {
        calculateSpots(appointmentId, "delete");
        setState({
          ...state,
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