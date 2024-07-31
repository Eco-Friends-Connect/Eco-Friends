import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";

import EcoButton from "./eco-button";

test("renders eco button component", () => {
    render(<EcoButton />);

});
