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
  const [userData, setUserData] = useState({});
  const [userAddresses, setUserAddresses] = useState([]);
  const [token, setToken] = useState(Cookies.get("token"));
  const [sonner, setSonner] = useState({
    severity: "",
    message: "",
  });

  const Router = useRouter();
  console.log(!!token)

  useEffect(() => {
    if(typeof window !== "undefined"){
      const storedPhoneNumber = localStorage.getItem('phoneNumber');
      if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber);
      }
    }
  }, []);

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
          message: "Server Error Please Refresh The Page",
        });
        // Router.refresh()
        return;
      }
      setSonner({
        severity: "success",
        message: "OTP sent Successfully",
      });
      return await res.json();
    } catch (error) {
      setSonner({
        severity: "error",
        message: "Failed to send OTP",
      });
      console.log(error);
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
          message: "Server Error  Please Refresh The Page",
        });
        return;
      }

      const result = await res.json();
      console.log(result?.success);
      if (result?.success) {
        setSonner({
          severity: "success",
          message: "OTP Verified Successfully",
        });
        Router.push("/auth/register");
      } else {
        setSonner({
          severity: "error",
          message: "OTP Mismatched",
        });
      }
      if (result?.token) {
        Router.replace("/");
        Cookies.set("token", result.token, { expires: 7 });

        return;
      }
      console.log(result);
    } catch (error) {
      console.log(error);

      setSonner({
        severity: "error",
        message: "Error in Verification",
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
          message: "Server Error  Please Refresh The Page",
        });
        return;
      }

      setSonner({
        severity: "success",
        message: "Registration Successfull",
      });
      const result = await res.json();
      Cookies.set("token", result?.token, { expires: 7 });
      console.log(result);
      Router.replace("/");
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

  const Logout = () => {
    console.log("hello");
    const token=Cookies.set("token", "", { expires: new Date(0) });
   
      Router.replace("/auth/phonenumber")
    
    
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      Router.replace("/")
    } else {
      setIsLoggedIn(false);
      Router.replace("/auth/phonenumber")
    }
  }, [token]);

  const getMe = async () => {
    const token=Cookies.get("token")
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/getMe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error Please Refresh The Page",
        });
        handleSnackbarOpen();
        return;
      }

      const response=await res.json();
      setUserAddresses(response?.data?.savedAddresses);
      setUserData(response?.data)
        if (typeof window !== "undefined") {
          localStorage.setItem("name", response?.data?.name);
        }
    } catch (error) {
      setSonner({
        severity: "error",
        message: "Error Fetching Profile",
      });
      handleSnackbarOpen();
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRecycleOrderByUser = async () => {
    const token=Cookies.get("token")
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/recycle/getRecycleOrderByUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error Please Refresh The Page",
        });
        handleSnackbarOpen();
        return;
      }

      return await res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getRecycleOrderById = async (orderId) => {
    const token=Cookies.get("token")
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/recycle/getRecycleOrderById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error Please Refresh The Page",
        });
        handleSnackbarOpen();
        return;
      }

      const respone = await res.json();

      return respone;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const addAddress = async (address) => {
    const token=Cookies.get("token")
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error Please Refresh The Page",
        });
        handleSnackbarOpen();
        return;
      }
      const response = await res.json();
      const getMeData = await getMe();
      if (getMeData?.data) {
        setUserAddresses(getMeData?.data?.savedAddresses);
      }

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const placeOrder = async (orderDetails) => {
    const token=Cookies.get("token")
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/recycle/createRecycleOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (!res.ok) {
        setSonner({
          severity: "error",
          message: "Server Error Please Refresh The Page",
        });
        handleSnackbarOpen();
        return;
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        Logout,
        getMe,
        getRecycleOrderByUser,
        getRecycleOrderById,
        addAddress,
        placeOrder,
        userAddresses,
        setUserAddresses,userData, setUserData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
