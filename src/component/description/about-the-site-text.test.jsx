import React from "react";
import { render } from "@testing-library/react";
import { test } from "vitest";

import AboutTheSiteText from "./about-the-site-text";

test("renders about the site text component", () => {
    render(<AboutTheSiteText />);

});
