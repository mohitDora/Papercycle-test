"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../utils/Constant";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tab, setTab] = useState("upcoming");
  const [token, setToken] = useState(Cookies.get("token"));
  const [sonner, setSonner] = useState({
    severity: "",
    message: "",
  });

  const Router = useRouter();

  const sendOTP = async (phoneNumber) => {
    setIsLoading(true);
    try {
      console.log(phoneNumber);
      const res = await fetch(`${BASE_URL}/api/auth/sendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error",
        });
        return
        
      }

      const result = await res.json();
      setSonner({
        severity: "success",
        message: "OTP sent Successfully",
      });
      // setStep(2);
      Router.push("/auth/verify");
      console.log(result);
    } catch (error) {
      setSonner({
        severity: "error",
        message: "Failed to send OTP",
      });
      console.log(error);
      // setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otpInput) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otpInput }),
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error",
        });
        return
        
      }

      const result = await res.json();
      if (result?.token) {
        Router.push("/");
        Cookies.set("token", result.token, { expires: 7 });

        return;
      }
      console.log(result);

      setSonner({
        severity: "success",
        message: "OTP Verified Successfully",
      });
      Router.push("/auth/register");
    } catch (error) {
      console.log(error);

      setSonner({
        severity: "error",
        message: "OTP Mismatched",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const registerUser = async (name, email) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/registerMobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNumber }),
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error",
        });
        return
        
      }

      const result = await res.json();
      Cookies.set("token", result?.token, { expires: 7 });
      console.log(result);
      // setStep(1);
      setSonner({
        severity: "success",
        message: "Registration Successfull",
      });
      Router.push("/");
    } catch (error) {
      setSonner({
        severity: "error",
        message: "Registration Failed",
      });
      console.log(error);
      // setStep(3);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  // Example of checking token (could be in a utility function)
  // const hasToken = () => {
  //   const token = localStorage.getItem('token');
  //   setIsLoggedIn(true) // Example: retrieve token from localStorage
  //   return !!token; // Convert to boolean, true if token exists
  // };
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <StoreContext.Provider
      value={{
        isLoading,
        setIsLoading,
        step,
        setStep,
        isLoggedIn,
        setIsLoggedIn,
        sendOTP,
        verifyOTP,
        phoneNumber,
        setPhoneNumber,
        registerUser,
        handleSnackbarOpen,
        handleSnackbarClose,
        snackbarOpen,
        sonner,
        setSonner,
        tab,
        setTab,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
