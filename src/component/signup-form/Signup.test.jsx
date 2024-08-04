import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";  
import Signup from "./Signup";

test("renders signup component", () => {
    render(<Signup />);
}
);
