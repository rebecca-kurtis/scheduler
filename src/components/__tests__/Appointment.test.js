import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders an appointment and shows the appointment component in Empty state", async () => {
    const { getByTestId, container } = render(<Appointment />);

    await waitForElement(() => container.getElementsByClassName("appointment"));

    expect(getByTestId("add-appointment")).toBeInTheDocument();
  });
});
