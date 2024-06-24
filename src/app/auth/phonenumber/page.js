"use client";
import { Button, Input, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useStoreContext } from "@/Context/store";
import { CONTACT_DETAILS, MESSAGE } from "../../../../utils/Constant";
import Image from "next/image";
import Login from "@/assets/Login.svg";
import text from "@/assets/text.svg";
import dustbin from "@/assets/dustbin.svg";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function PhoneNumber() {
  const {
    phoneNumber,
    setPhoneNumber,
    isLoading,
    handleSnackbarOpen,
    setIsLoggedIn,
    sendOTP,
  } = useStoreContext();

  const Router = useRouter();

  useEffect(() => {
    const loggedIn = Cookies.get("token");
    if (loggedIn) {
      Router.push("/");
    }
  },[]);

  const inputRef = useRef(null);

  const handleChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/[^\d]/g, "");
    setPhoneNumber(formattedValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("phoneNumber", formattedValue);
      console.log(phoneNumber);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPhoneNumber = localStorage.getItem("phoneNumber");
      if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber);
      }
    }
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= "0" && event.key <= "9") {
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sendOTPFunc = async () => {
    try {
      const res=await sendOTP(phoneNumber);
      console.log(res)
      if(!(res.success)){
        return
      }
      Router.push("/auth/verify");
      handleSnackbarOpen();
    } catch (error) {
      handleSnackbarOpen();
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendOTPFunc();

    // console.log("submitted")
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center">
      <div className="hidden lg:flex flex-col lg:w-3/5 gap-4 ">
        <Image src={text} alt="image.svg"></Image>
        <Image src={Login} alt="image.svg"></Image>
      </div>

      <div className="lg:w-2/5 bg-gray-100 p-4 rounded-lg border">
        <div className="mx-auto max-w-lg text-center flex flex-col gap-4">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Schedule Your Pickup
          </h1>

          <p className=" text-gray-500">{MESSAGE}</p>
          <Image src={dustbin} alt="image.svg" className="self-center"></Image>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <TextField
              className="bg-white"
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={handleChange}
                variant="outlined"
                required
                inputRef={inputRef}
                inputProps={{
                  pattern: "[0-9]{10}",
                  maxLength: 10,
                }}
                fullWidth
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
              variant="contained"
              disableElevation
              className={
                !isLoading
                  ? "text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200 cursor-not-allowed"
              }
            >
              {isLoading ? "Sending" : "Send OTP"}
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

export default PhoneNumber;
