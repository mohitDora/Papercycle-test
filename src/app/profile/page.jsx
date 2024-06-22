"use client";
import Heading from "@/app/@components/ui/Heading";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ScaleIcon from "@mui/icons-material/Scale";
import { Divider, IconButton, Tooltip } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import ForestIcon from "@mui/icons-material/Forest";
import { useStoreContext } from "@/Context/store";
import Loading from "../@components/ui/Loading";

function profile() {
  const [userData, setUserData] = useState({});

  const { getMe,isLoading } = useStoreContext();

  useEffect(() => {
    const getMeData = async () => {
      const res = await getMe();
      setUserData(res?.data);
    };
    getMeData();
  }, []);

  console.log(userData);
  return (
    <>
      <Heading title="My Profile"></Heading>
      {
        Object.keys(userData).length === 0?<Loading num={6}></Loading>
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
            {userData?.savedAddresses === 0 ? (
              <p>No Address</p>
            ) : (
              userData?.savedAddresses?.map((item, index) => {
                return (
                  <div>
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
                      {item?.landmark}
                      {item?.selectedLocality}
                    </p>
                    <Divider className="my-4"></Divider>
                  </div>
                );
              })
            )}
          </article>
        </div>
      </div>}
    </>
  );
}

export default profile;
