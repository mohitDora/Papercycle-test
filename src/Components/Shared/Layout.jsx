"use client";

import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StoreProvider, useStoreContext } from "../../../lib/Context/store";
import theme from "../../../lib/Theme/theme";
import Sonner from "./Sonner";
import { StyledEngineProvider } from "@mui/material";

const LayoutContent = ({ children }) => {
    const { snackbarOpen, handleSnackbarClose, sonner } = useStoreContext();

    return (
        <>
            <Sonner
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
                severity={sonner.severity}
                message={sonner.message}
            />
            {children}
        </>
    );
};

const Layout = ({ children }) => {
    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                {/* <CssBaseline></CssBaseline> */}
                <LayoutContent>{children}</LayoutContent>
            </ThemeProvider>
            {/* </StyledEngineProvider> */}
        </StoreProvider>
    );
};

export default Layout;
