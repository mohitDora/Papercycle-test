import React from "react";
import Subheading from "@/app/@components/ui/Subheading";
import { Chip } from "@mui/material";
import Image from "next/image";


function ShowCategoryData({ prices, category }) {
  return (
    <>
      <Subheading title={category}></Subheading>
      <div className="flex gap-4">
        <div className="bg-slte-300">
         
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            {prices?.map((item, index) => {
              return (
                <Chip
                  className="p-8 bg-gray-200"
                  label={
                    <>
                      <p className="font-bold text-lg">{item?.item}</p>
                      <p className="text-sm font-medium">
                        {item?.price}/{item?.unit}
                      </p>
                    </>
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowCategoryData;
