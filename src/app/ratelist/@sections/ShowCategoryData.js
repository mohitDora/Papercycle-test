import React from "react";
import Subheading from "@/app/@components/ui/Subheading";
import Image from "next/image";

function ShowCategoryData({ prices, category }) {
  return (
    <>
      <Subheading title={category}></Subheading>
      <div className="flex gap-4">
        <div ></div>
        <div>
          <div className="flex flex-wrap gap-4">
            {prices?.map((item, index) => {
              return (
                <div key={index} className="px-8 text-enter py-2 rounded bg-gray-100 border">
                  <>
                    <p className="font-medium text-md">{item?.item}</p>
                    <p className="text-xl font-bold">
                      <span className="text-secondary">RS {item?.price}</span>/
                      {item?.unit}
                    </p>
                  </>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowCategoryData;
