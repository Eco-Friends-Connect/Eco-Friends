import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

test("renders event form component", () => {
    render(<BrowserRouter>
            <Footer />;
            </BrowserRouter>);
});
