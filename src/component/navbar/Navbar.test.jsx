import React from "react";
import { render } from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import { test } from "vitest";

import Navbar from "./Navbar";

test("renders navbar component", () => {

    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
        );
}
);
