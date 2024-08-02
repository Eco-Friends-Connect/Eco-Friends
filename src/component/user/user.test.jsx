import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";
import { MemoryRouter } from "react-router-dom";

import User from "./user";

test("renders user component", () => {
    render(
        <MemoryRouter>
            <User />
        </MemoryRouter>
    );
}
);
