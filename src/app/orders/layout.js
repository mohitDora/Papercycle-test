"use client";
import React from "react";
import Status from "./@sections/Status";
import Heading from "@/app/@components/ui/Heading";
import { useStoreContext } from "@/Context/store";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "About us",
// };
function layout({ children }) {
  
  const { tab } = useStoreContext();

  const Router = useRouter();
  const handleChange = (event, newValue) => {
    Router.replace(`/orders/${newValue}`);
  };
  return (
    <>
      <Heading title="My Orders"></Heading>
      <Status tab={tab} handleChange={handleChange}></Status>
      {children}
    </>
  );
}

export default layout;