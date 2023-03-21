import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Appointment from "components/Appointment";


afterEach(cleanup);

describe("Appointment", () => {

  it("renders an appointment and shows the appointment component in Empty state", async () => {
    const { getByTestId, container } = render(<Appointment />);

    await waitForElement(() => container.getElementsByClassName("appointment"));
   
      // fireEvent.click(getByText("Tuesday"));
      expect(getByTestId("add-appointment")).toBeInTheDocument();
    });
  });

  // xit("defaults to Monday and changes the schedule when a new day is selected", () => {
  
  //   return waitForElement(() => getByText("Monday")).then(() => {
  //     fireEvent.click(getByText("Tuesday"));
  //     expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //   });

// });
// });

