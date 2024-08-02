import React from "react";
import {render } from "@testing-library/react";
import {test} from "vitest";

import PopOut from "./pop-out";

test("renders pop out component", () => {
    render(<PopOut />);
}
);
