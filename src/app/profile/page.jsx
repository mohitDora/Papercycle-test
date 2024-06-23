"use client";
import Heading from "@/app/@components/ui/Heading";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ScaleIcon from "@mui/icons-material/Scale";
import { Divider, IconButton, Tooltip } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import ForestIcon from "@mui/icons-material/Forest";
import { useStoreContext } from "@/Context/store";
import { removeDuplicate } from "@/RemoveDuplicate";
import CircularLoader from "../@components/ui/CircularLoader";
import FormDialog from "../@Sections/Dialog";

function profile() {
  const [userData, setUserData] = useState({});
  const { getMe,userAddresses } = useStoreContext();

  useEffect(() => {
    const getMeData = async () => {
      const res = await getMe();
      if(res?.data){
        setUserData(res?.data);
      }
      
    };
    getMeData();
  }, []);

  console.log(userData);
  return (
    <>
      <Heading title="My Profile"></Heading>
      {
        Object.keys(userData).length === 0?<CircularLoader></CircularLoader>
      :
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
          <article className="flex items-center gap-4 rounded-lg border bg-gray-100 p-6">
            <div>
              <ScaleIcon className="text-secondary"></ScaleIcon>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>

              <p className="text-sm text-gray-500">
                Total weight recycled in Kg.
              </p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border bg-gray-100 p-6">
            <div>
              <OpacityIcon className="text-secondary"></OpacityIcon>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>

              <p className="text-sm text-gray-500">Total trees saved</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border bg-gray-100 p-6">
            <div>
              <ForestIcon className="text-secondary"></ForestIcon>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>

              <p className="text-sm text-gray-500">
                Total water saved in Ltrs.
              </p>
            </div>
          </article>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <article className="md:w-2/4 relative flex iems-center gap-4 rounded-lg  bg-hite p-6 flex-col bg-gray-100">
            <Tooltip title="Edit">
              <IconButton className="absolute right-6">
                <EditIcon className="text-secondary"></EditIcon>
              </IconButton>
            </Tooltip>

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-2xl font-medium text-gray-900">
                {userData?.name}
              </p>
            </div>
            <Divider></Divider>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-2xl font-medium text-gray-900">
                {userData?.phoneNumber}
              </p>
            </div>
            <Divider></Divider>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-2xl font-medium text-gray-900">
                {userData?.email}
              </p>
            </div>
          </article>

          <article className="md:w-2/4 rounded-lg border bg-gray-100 b p-6">
            <p>Address</p>
            {removeDuplicate(userAddresses,"addressLine").length == 0 ? (
              <p className="p-4 ">No Address Found</p>
            ) : (
              removeDuplicate(userAddresses,"addressLine")?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-medium text-gray-900">{item?.nickName}</p>
                      <Tooltip title="Edit">
                        <IconButton>
                          <EditIcon className="text-secondary"></EditIcon>
                        </IconButton>
                      </Tooltip>
                    </div>

                    <p className="text-sm text-gray-500">
                      {item?.addressLine}
                    </p>
                    <Divider className="my-4"></Divider>
                  </div>
                );
              })
            )}
            <FormDialog></FormDialog>
          </article>
        </div>
      </div>}
    </>
  );
}

export default profile;
