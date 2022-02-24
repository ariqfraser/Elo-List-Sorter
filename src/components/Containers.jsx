import styled from "@emotion/styled";
import React from "react";

export const Center = styled("div")({
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    "&> button": {
        padding: "8px 16px",
        fontSize: "1.25em",
        margin: '0 1em',

    },
});
