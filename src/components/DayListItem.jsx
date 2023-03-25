import React from "react";
import classNames from "classnames";

//import components
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>;
    } else if (spots === 1) {
      return <h3 className="text--light">1 spot remaining</h3>;
    } else {
      return <h3 className="text--light">{spots} spots remaining</h3>;
    }
  };

  return (
    <li className={dayClass} data-testid="day" onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
}
