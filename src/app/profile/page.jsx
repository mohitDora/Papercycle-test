import Heading from "@/app/@components/ui/Heading";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ScaleIcon from "@mui/icons-material/Scale";
import { Divider, IconButton, Tooltip } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import ForestIcon from "@mui/icons-material/Forest";

function profile() {
  return (
    <>
      <Heading title="My Profile"></Heading>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <article className="flex items-center gap-4 rounded-lg border border-gray-500 p-6">
            <div>
              <ScaleIcon className="text-secondary"></ScaleIcon>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>

              <p className="text-sm text-gray-500">Total Sales</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-gray-500 p-6">
            <div>
              <OpacityIcon className="text-secondary"></OpacityIcon>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>

              <p className="text-sm text-gray-500">Total Sales</p>
            </div>
          </article>
          <article className="flex items-center gap-4 rounded-lg border border-gray-500 p-6">
            <div>
              <ForestIcon className="text-secondary"></ForestIcon>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>

              <p className="text-sm text-gray-500">Total Sales</p>
            </div>
          </article>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <article className="md:w-1/3 relative flex iems-center gap-4 rounded-lg border border-gray-500 bg-hite p-6 flex-col">
            <Tooltip title="Edit">
              <IconButton className="absolute right-6">
                <EditIcon className="text-secondary"></EditIcon>
              </IconButton>
            </Tooltip>

            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-medium text-gray-900">
                email@gmail.com
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-medium text-gray-900">$240.94</p>
            </div>
          </article>

          <article className="rounded-lg border border-gray-500 b p-6">
            <div>
              <p>Address</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-medium text-gray-900">Home</p>
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon className="text-secondary"></EditIcon>
                  </IconButton>
                </Tooltip>
              </div>

              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
                eius animi quidem quae quia quasi quos ad explicabo alias modi.
              </p>
              <Divider className="my-4"></Divider>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-medium text-gray-900">Home</p>
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon className="text-secondary"></EditIcon>
                  </IconButton>
                </Tooltip>
              </div>

              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
                eius animi quidem quae quia quasi quos ad explicabo alias modi.
              </p>
              <Divider className="my-4"></Divider>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-medium text-gray-900">Home</p>
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon className="text-secondary"></EditIcon>
                  </IconButton>
                </Tooltip>
              </div>

              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
                eius animi quidem quae quia quasi quos ad explicabo alias modi.
              </p>
              <Divider className="my-4"></Divider>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default profile;
