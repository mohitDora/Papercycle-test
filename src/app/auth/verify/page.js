"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import { Button, IconButton } from "@mui/material";
import { useStoreContext } from "@/Context/store";
import Image from "next/image";
import Login from "@/assets/Login.svg";
import text from "@/assets/text.svg";
import dustbin from "@/assets/dustbin.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/navigation";

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

export default function OTPInput() {
  const { verifyOTP, isLoading, handleSnackbarOpen, sendOTP, phoneNumber } =
    useStoreContext();

  const [otp, setOtp] = useState("");
  const initialTime =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("countdownTime")) || 60
      : 10;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  useEffect(() => {
    let timer;
    if (typeof window !== "undefined") {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
          localStorage.setItem("countdownTime", timeLeft - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);
  const Router = useRouter();

  const verifyOTPFunc = async () => {
    try {
      await verifyOTP(otp);

      handleSnackbarOpen();
    } catch (error) {
      handleSnackbarOpen();
      console.log(error);
    }
  };

  const buttonClick = () => {
    if (otp.length !== 6) {
      return;
    }
    verifyOTPFunc();
  };

  const handleButtonClick = async () => {
    await sendOTP(phoneNumber);
    handleSnackbarOpen();
    localStorage.setItem("countdownTime", 60);
    setTimeLeft(60);
  };
  useEffect(()=>{
    localStorage.setItem("countdownTime", 60);
    setTimeLeft(60);
  },[])

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
     

      <div className="hidden lg:flex flex-col lg:w-2/3 gap-4 ">
        <Image src={text} alt="image.svg"></Image>
        <Image src={Login} alt="image.svg"></Image>
      </div>
      <div className="lg:w-1/3">
      <IconButton onClick={() => Router.back()}>
        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
      </IconButton>
        <div className="mx-auto max-w-lg text-center flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Enter The OTP</h1>

          <p className=" text-gray-500">
            we have send an OTP to your mobile number ******
            {phoneNumber.substring(6, 10)}
          </p>
          <Image src={dustbin} alt="image.svg"></Image>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <OTP
              separator={<span> </span>}
              value={otp}
              onChange={setOtp}
              length={6}
            />
            <Button
              disableElevation
              onClick={buttonClick}
              variant="contained"
              className={
                !isLoading
                  ? "text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-200 cursor-not-allowed"
              }
            >
              {isLoading ? "Verifying" : "Submit"}
            </Button>
            <div>
              <div className="flex items-center">
                <p>{`Resend OTP in ${timeLeft} seconds`}</p>
                {/* <Timer timeLeft={timeLeft} /> */}
                <Button onClick={handleButtonClick} disabled={timeLeft}>
                  Resend OTP
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  
  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
