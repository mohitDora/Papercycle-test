"use client";
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function Status({ tab, handleChange }) {
  return (
    <Box sx={{ width: "100%" }} className="mb-8">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Upcoming" value="upcoming" />
          <Tab label="Completed" value="completed" />
        </Tabs>
      </Box>
    </Box>
  );
}

export default Status;
