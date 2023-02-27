import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const mappedDays = props.days.map((day) => {
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