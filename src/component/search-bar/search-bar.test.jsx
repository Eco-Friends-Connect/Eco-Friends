import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";

import SearchBar from "./search_bar";

test("renders search bar component", () => {
    render(<SearchBar />);
}
);