import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function Sonner({ open, handleClose,severity,message }) {

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
