"use client"
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useStoreContext } from "@/Context/store";
import { MESSAGE } from "../../../../utils/Constant";
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
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
      <div className="hidden md:flex flex-col lg:w-2/3 gap-4 ">
      <Image src={text} ></Image>
      <Image src={Login} ></Image>
      </div>
      <div className="lg:w-1/3">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">You're Almost There!</h1>

        <p className="mt-4 text-gray-500">
          {MESSAGE}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <TextField
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
                : "bg-gray-200 text-gray-600 hover:bg-gray-200"
            }
          >
            {!isLoading ? "Register" : "Processing"}
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default RegisterPage;
