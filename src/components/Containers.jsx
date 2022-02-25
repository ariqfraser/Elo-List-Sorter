import styled from "@emotion/styled";
import React from "react";

export const PageWrapper = styled("div")({
    display: "grid",
    gridTemplateColumns: "70px 1fr",
    gridTemplateRows: "50px auto 30px",
    height: "100vmin",
});

export const MainLayout = styled("div")({
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "50vh auto",
    // height: '100%',
     borderLeft: '2px solid var(--black)',
    // gridColumn: 2,
});

export const TopNav = styled("div")({
    display: "flex",
    height: "100%",
    borderLeft: "2px solid var(--black)",
});

export const SideNav = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>.split": {
        marginTop: "auto",
    },
    "&>svg": {},
    width: "100%",
    gridRow: "span 3",
    color: "#fff",
    fill: "#fff",
    padding: "24px 0",

});

export const Footer = styled("div")({
    display: "flex",
    width: "100%",
    borderTop: "2px solid var(--black)",
});

export const BattleBox = styled("div")({
    gridColumn: "span 2",
    width: "100%",
    height: "487px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid var(--grey)",
    "&>button": {
        height: "100%",
        width: "50%",
        fontSize: "1.25em",
        color: "white",
        border: "none",
        position: "relative",
        backgroundColor: 'rgb(124,24,50)',
        '&:hover': {
            backgroundColor: 'var(--green)',
        },
        transition: '200ms ease'
    },
});

export const ImportBox = styled("div")({
    gridColumn: "span 2",

    display: "flex",
    borderTop: "1px solid var(--grey)",
});

export const CreateBox = styled("div")({
    gridColumn: "span 3",
    borderRight: "1px solid var(--grey)",
});

export const FeedBox = styled("div")({
    gridColumn: "span 1",
    border: "1px solid var(--grey)",
    borderLeft: "none",
});
