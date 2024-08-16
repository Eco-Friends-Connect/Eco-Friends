import React,{useContext} from "react";
import { render } from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import { test } from "vitest";
import AuthProvider from "../auth-provider";

import Navbar from "./Navbar";

test("renders navbar component", () => {

    render(
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </AuthProvider>
        );
}
);
