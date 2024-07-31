import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";

import SelectOption from "./select-option";

test("renders select option component", () => {
    render(<SelectOption />);
}
);
