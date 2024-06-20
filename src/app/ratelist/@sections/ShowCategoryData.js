import Heading from "@/app/@components/ui/Heading";
import Image from "next/image";
import React from "react";
import Price from "../@components/Price";
import Subheading from "@/app/@components/ui/Subheading";

function ShowCategoryData({prices,category}) {
  return (
    <div className="flex flex-col py-4">
      <Subheading title={category}></Subheading>
      <div className="flex gap-4 py-4">
        {/* <div className="w-52 h-52 bg-lime-500 rounded-2xl"></div> */}

        <div className="flex flex-wrap gap-4">
        {/* <div className="w-52 h-52 bg-lime-500"></div> */}
          {
            prices?.map((item,index)=>{
              return(
                <Price key={index} item={item.item} price={item.price} unit={item.unit}></Price>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default ShowCategoryData;
