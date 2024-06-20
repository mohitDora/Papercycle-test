"use client";
import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useStoreContext } from "@/Context/store";
import { CONTACT_DETAILS, MESSAGE } from "../../utils/Constant";
import Image from "next/image";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import recycle_image from "@/assets/recycle_image.svg";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormDialog from "./@Sections/Dialog";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Oliver Hansen", "Van Henry", "April Tucker"];

function recycle() {
  const {setIsLoggedIn}=useStoreContext()
  const [value, setValue] = React.useState(dayjs("2022-04-17"));
  const [time1, setTime1] = React.useState(dayjs("2022-04-17T15:30"));
  const [time2, setTime2] = React.useState(dayjs("2022-04-17T12:30"));
  const [remarks, setRemarks] = React.useState("");
  const [address, setAddress] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAddress(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
useEffect(()=>{
  setIsLoggedIn(true);
},[])


  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse gap-12">
      <Image src={recycle_image} className="hidden lg:block lg:w-2/3"></Image>
      <div className="lg:w-1/3">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Schedule Your Pickup
          </h1>

          <p className="mt-4 text-gray-500">
            {MESSAGE}
          </p>
        </div>

        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            fullWidth
            value={address}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={address.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}

            <div>
            <FormDialog></FormDialog>
              
            </div>
          </Select>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "MobileTimePicker"]}>
                <div className="flex flex-col gap-4">
                  <DatePicker
                    label="Date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                  <div className="flex gap-4">
                    <MobileTimePicker
                      label="Timeslot from"
                      value={time1}
                      onChange={(newValue) => setTime1(newValue)}
                    />
                    <MobileTimePicker
                      label="Timeslot to"
                      value={time2}
                      onChange={(newValue) => setTime2(newValue)}
                    />
                  </div>
                </div>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Remarks (optional)"
            placeholder="Write any note for our pickup executives"
            value={remarks}
            onChange={(event) => {
              setRemarks(event.target.value);
            }}
          />
          <div className="flex items-center justify-between">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disableElevation
              sx={{color:"white"}}
             
            >
              continue
            </Button>
          </div>
          <div>
            <p className=" text-gray-500">Facing any issues?</p>
            <p className=" text-gray-500">
              Call us at{" "}
              <span className="text-secondary">{CONTACT_DETAILS[0].value}</span>
            </p>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default recycle;
