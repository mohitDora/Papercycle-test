"use client";
import { Button, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { removeDuplicate } from "@/RemoveDuplicate";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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

function recycle() {
  const {
    setIsLoggedIn,
    getMe,
    placeOrder,
    setSonner,
    handleSnackbarOpen,
    isLoading,
    userAddresses,
    setUserAddresses,
  } = useStoreContext();
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [time1, setTime1] = React.useState(dayjs().hour(9).minute(0).second(0));
  const [time2, setTime2] = React.useState(
    dayjs().hour(17).minute(0).second(0)
  );
  const [remarks, setRemarks] = React.useState("");

  const [address, setAddress] = useState("");
  const [addressId, setAddressID] = useState("");

  const Router = useRouter();

  const handleChange = (event) => {
    setAddress(event.target.value);
  };
  const getMeData=async()=>{
    await getMe()
  }
  useEffect(() => {
    const loggedIn = Cookies.get("token");
    if (!loggedIn) {
      Router.push("/auth/phonenumber");
      return;
    }
    getMeData();
    setIsLoggedIn(true);
  }, []);
  console.log(userAddresses);
  const placeOrderTo = async () => {
    const orderDetails = {
      addressId: addressId,
      date: value,
      timings: `${time1} - ${time2}`,
    };
    try {
      if (!address || !value || !time1 || !time2) {
        setSonner({
          severity: "error",
          message: "Please Fill All Details",
        });
        handleSnackbarOpen();
        return;
      }
      const res = await placeOrder(orderDetails);
      setSonner({
        severity: "success",
        message: "Order Placed Successfully",
      });
      handleSnackbarOpen();
      console.log(res);
    } catch (error) {
      setSonner({
        severity: "error",
        message: "Something Went Wrong",
      });
      handleSnackbarOpen();
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrderTo();
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse gap-12">
      <Image
        src={recycle_image}
        className="hidden lg:block lg:w-3/5"
        alt="recycle_image.svg"
      ></Image>
      <div className="lg:w-2/5 bg-gray-100 py-4 px-8 rounded-lg border">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Schedule Your Pickup
          </h1>

          {/* <p className="mt-4 text-gray-500">{MESSAGE}</p> */}
        </div>

        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <InputLabel id="demo-single-checkbox-label">Address</InputLabel>
          <Select
          className="bg-white"
            labelId="demo-single-checkbox-label"
            id="demo-single-checkbox"
            fullWidth
            placeholder="Select Address"
            value={address}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected}
            MenuProps={MenuProps}
          >
            {removeDuplicate(userAddresses, "addressLine").length == 0 ? (
              <p className="p-4 m-auto">No address Found</p>
            ) : (
              removeDuplicate(userAddresses, "addressLine")?.map(
                (item, index) => (
                  <MenuItem
                    key={index}
                    value={item?.addressLine}
                    onClick={() => setAddressID(item?.id)}
                  >
                    <Checkbox checked={item?.id === addressId} />
                    <ListItemText
                      primary={`${item?.nickName} | ${item?.addressLine}`}
                    />
                  </MenuItem>
                )
              )
            )}

            <div>
              <FormDialog />
            </div>
          </Select>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "MobileTimePicker"]}>
                <div className="flex flex-col gap-4">
                  <DatePicker
                  sx={{backgroundColor:"white"}}
                    label="Date"
                    format="DD/MM/YYYY"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                  <div className="flex gap-4">
                    <MobileTimePicker
                    sx={{backgroundColor:"white"}}
                      label="Timeslot from"
                      value={time1}
                      required
                      onChange={(newValue) => setTime1(newValue)}
                    />
                    <MobileTimePicker
                    sx={{backgroundColor:"white"}}
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
            className="bg-white"
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
              disabled={isLoading}
              onClick={handleSubmit}
              variant="contained"
              disableElevation
              className={
                !isLoading
                  ? "text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200 cursor-not-allowed"
              }
            >
              {isLoading ? "Please Wait" : "Place Order"}
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
