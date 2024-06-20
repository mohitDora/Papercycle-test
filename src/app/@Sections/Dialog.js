"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import Sonner from "../@components/shared/Sonner";
import { useStoreContext } from "@/Context/store";

export default function FormDialog() {
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {snackbarOpen, handleSnackbarClose,handleSnackbarOpen}=useStoreContext()
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("notifications");
  const [formValues, setFormValues] = useState({
    fullAddress: "",
    landmark: "",
    pinCode: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "pinCode") {
      const formattedValue = value.replace(/[^\d]/g, "");
      setFormValues({ ...formValues, [name]: formattedValue });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // const handleSnackbarOpen = () => {
  //   setSnackbarOpen(true);
  // };

  // const handleSnackbarClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSnackbarOpen(false);
  // };
  return (
    <React.Fragment>
      <Button fullWidth className="py-4 flex gap-2" onClick={handleClickOpen}>
        <AddCircleIcon></AddCircleIcon>
        <p>Add new address</p>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleSnackbarOpen();
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 py-4">
            <TextField
              placeholder="House No., building, apartment, street name"
              id="fullAddress"
              name="fullAddress"
              label="Full Address"
              variant="outlined"
              value={formValues.fullAddress}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Eg : Nearby Gold gym, Nayapalli"
              id="landmark"
              name="landmark"
              label="Landmark"
              variant="outlined"
              value={formValues.landmark}
              onChange={handleChange}
              required
            />
            <TextField
              placeholder="Enter 6 digit PIN Code"
              id="pinCode"
              name="pinCode"
              label="PIN Code"
              variant="outlined"
              value={formValues.pinCode}
              // type="tel"
              onChange={handleChange}
              inputProps={{
                pattern: "[0-9]{6}",
                maxLength: 6,
              }}
              required
            />
            <nav
              className="flex gap-6 align-middle flex-wrap"
              aria-label="Tabs"
            >
              <button
                onClick={() => handleTabChange("settings")}
                className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                  selectedTab === "settings"
                    ? "text-white bg-secondary"
                    : "text-gray-500  hover:text-gray-700"
                }`}
              >
                Settings
              </button>

              <button
                onClick={() => handleTabChange("messages")}
                className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                  selectedTab === "messages"
                    ? "text-white bg-secondary"
                    : "text-gray-500  hover:text-gray-700"
                }`}
              >
                Messages
              </button>

              <button
                onClick={() => handleTabChange("archive")}
                className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                  selectedTab === "archive"
                    ? "text-white bg-secondary"
                    : "text-gray-500  hover:text-gray-700"
                }`}
              >
                Archive
              </button>

              <button
                onClick={() => handleTabChange("notifications")}
                className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                  selectedTab === "notifications"
                    ? "text-white bg-secondary"
                    : "text-gray-500  hover:text-gray-700"
                }`}
                aria-current={
                  selectedTab === "notifications" ? "page" : undefined
                }
              >
                Notifications
              </button>
            </nav>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      <Sonner open={snackbarOpen} handleClose={handleSnackbarClose} />
    </React.Fragment>
  );
}
