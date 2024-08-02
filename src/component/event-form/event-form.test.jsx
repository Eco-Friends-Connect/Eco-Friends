import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";

import EventForm from "./event-form";

test("renders event form component", () => {
    render(<EventForm />);
}
);

