"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStoreContext } from "@/Context/store";
import Map from "../@components/ui/Map";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function FormDialog() {
  const { handleSnackbarOpen, addAddress, setSonner } = useStoreContext();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");

  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  const [formValues, setFormValues] = useState({
    fullAddress: address,
    landmark: "",
    pinCode: postcode,
  });

  const addAddressTo = async () => {
    
    const address = {
      coordinates: [marker.lat, marker.lng],
      selectedLocality: "",
      addressDetails: {
        addressLine: formValues.fullAddress,
        landmark: formValues.landmark,
      },
      radioSelected: selectedTab,
    };
    try {
      const res = await addAddress(address);
      console.log(res);
      setSonner({
        severity: "success",
        message: "Address Added successfully",
      });
      handleSnackbarOpen();
      
    } catch (error) {
      setSonner({
        severity: "error",
        message: "Something Went Wrong",
      });
      handleSnackbarOpen();
    }
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      fullAddress: address,
      pinCode: postcode,
    });
  }, [address, postcode]);

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
  const handleTabChange = (e) => {
    setSelectedTab(e.target.value);
  };

  const handleSubmit=()=>{
    addAddressTo();
            handleSnackbarOpen();
            handleClose();
  }

  const Array = ["home", "business", "other"];

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

          className: "min-w-[80%] lg:min-w-[60%] bg-transparnt",
          // component: "form",
          // onSubmit: (event) => {
          //   event.preventDefault();
          //   addAddressTo();
          //   handleSnackbarOpen();
          //   handleClose();
          // },
        }}
      >
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent className="flex flex-col lg:flex-row gap-4 py-4">
          <Map
            setMarker={setMarker}
            setPostcode={setPostcode}
            setAddress={setAddress}
            marker={marker}
          ></Map>

          <div className="flex flex-col gap-4 grow">
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
            
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={selectedTab}
              onChange={handleTabChange}
              row
            >
              {Array?.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={item}
                    control={<Radio />}
                    label={item}
                    className="capitalize"
                  />
                );
              })}
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
