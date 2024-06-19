"use client";
import React from "react";
import {
  Address,
  CONTACT_DETAILS,
  NAV_ITEMS,
  PROFILE_ITEMS,
  SOCIAL_MEDIA,
} from "../../../utils/Constant";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useStoreContext } from "../../../lib/Context/store";
import Image from "next/image";
import Logo from "../../../lib/assets/logo ppcy.svg";

function Footer() {
  const { isLoggedIn } = useStoreContext();
  return (
    <footer className="bg-gray-200 mt-12">
      <div className="px-12 md:max-w-screen-xl m-auto flex flex-col md:flex-row justify-between  gap-12 py-16">
        <div className="flex flex-col">
          <div>
            <div>
            <Image src={Logo} component="div" width={300}></Image>
              {/* <Typography className="text-secondary font-bold" variant="h2">
                PaperCycle
              </Typography> */}
              <div className="flex gap-2 my-2">
                {SOCIAL_MEDIA.map((item, index) => {
                  return (
                    <Link key={index} href={item.link} target="blank">
                      {item.logo}
                    </Link>
                  );
                })}
              </div>
            </div>

            <p className="mt-4 max-w-xs text-gray-">
              Payperprint Pvt. Ltd. All rights reserved
            </p>

            <div className="mt-8 flex gap-6"></div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="max-w-sm flex gap-4 flex-col">
            <div>
              <p className="font-medium text-gray-900">Address</p>
              <div className="mt-4 space-y-4 text-sm">
                <Typography>{Address}</Typography>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Contact Us</p>
              <div className="mt-4 text-sm">
                {CONTACT_DETAILS.map((item, index) => {
                  return <Typography key={index}>{item.value}</Typography>;
                })}
              </div>
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-900">Links</p>

            <div className="mt-4 space-y-2 text-sm">
              {NAV_ITEMS?.map((item, index) => {
                if (
                  item?.isLoggedIn == isLoggedIn ||
                  item?.isLoggedIn === "both"
                ) {
                  return (
                    <Typography key={index}>
                      <Link href={item.link}>{item.text}</Link>
                    </Typography>
                  );
                }
              })}
              {isLoggedIn &&
                PROFILE_ITEMS?.map((item, index) => {
                  return (
                    <Typography key={index}>
                      <Link href={item.link}>{item.text}</Link>
                    </Typography>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary px-4 py-3 text-whte">
        <p className="text-cnter text-sm font-medium">
          &copy; 2024. PaperCycle. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
