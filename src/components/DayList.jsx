import React from "react";
import DayListItem from "./DayListItem";

import { calculateSpotsForDay } from "helpers/selectors";



export default function DayList(props) {

  

  const mappedDays = props.days.map((day) => {
    // const spots = calculateSpotsForDay(state, day, state.appointments);
    return (
      <DayListItem 
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value}
      setDay={() => props.onChange(day.name)}>

      </DayListItem>
    );
  })
  return (
    <ul>
      {mappedDays}
    </ul>
  );
};