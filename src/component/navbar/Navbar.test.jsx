import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from '../auth-provider';
import { test } from "vitest"; 

import Navbar from "./Navbar";

test("renders navbar component", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
            </AuthProvider>
        </BrowserRouter>
    );
});
