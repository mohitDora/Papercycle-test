"use client"
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStoreContext } from "@/Context/store";
import { CONTACT_DETAILS, MESSAGE } from "../../../../utils/Constant";
import Login from "@/assets/Login.svg";
import text from "@/assets/text.svg";
import Image from "next/image";
import dustbin from "@/assets/dustbin.svg";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { setSonner, registerUser, isLoading, handleSnackbarOpen } =
    useStoreContext();

  const registerUserFunc = async () => {
    try {
      await registerUser(formData.name, formData.email);

      handleSnackbarOpen();
    } catch (error) {

      handleSnackbarOpen();
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUserFunc();
  };
  return (
    <div className="py-16 flex flex-col lg:flex-row gap-12">
      <div className="hidden md:flex flex-col lg:w-3/5 gap-4 ">
      <Image src={text} alt="image.svg"></Image>
      <Image src={Login} alt="image.svg"></Image>
      </div>
      <div className="w-[100%] lg:w-2/5 bg-gray-100 p-8 rounded-lg border max-w-md m-auto">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">You're Almost There!</h1>

        <p className="mt-4 text-gray-500">
        Sign up with papercycle.in! Help us make the world greener, one recycle at a time.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-0 mt-8 space-y-4"
      >
        <TextField
        className="bg-white"
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />

        <TextField
        className="bg-white"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />

        <div className="flex items-center justify-between">
          <Button
            fullWidth
            type="submit"
            disableElevation
            variant="contained"
            className={
              !isLoading
                ? "text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-200 cursor-not-allowed"
            }
          >
            {!isLoading ? "Register" : "Processing"}
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

export default RegisterPage;
