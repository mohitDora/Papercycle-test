import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function Card2({ title, desc, image, image2, value, time }) {
  if (image2) {
    return (
      <article className="flex flex-col gap-4 rounded-lg border bg-gray-100 p-6">
        <div className="flex flex-col">
          <FormatQuoteIcon
            sx={{ fontSize: "5rem" }}
            className="rotate-180 text-secondary"
          ></FormatQuoteIcon>
          <p className="text-sm text-gray-500">{desc}</p>
          {/* <FormatQuoteIcon
            sx={{ fontSize: "5rem" }}
            className="self-end text-secondary"
          ></FormatQuoteIcon> */}
        </div>
        <div className="flex gap-4 items-center">
          <Image src={image2} alt="author.png" width={70} height={70}></Image>
          <div>
            <p className="text-2xl font-medium text-gray-900">{title}</p>
            <div className="flex items-center gap-2 ">
              <Rating readOnly value={value}></Rating>
              <p>({value.toFixed(1)})</p>
            </div>
            <p>({time})</p>
          </div>
        </div>
      </article>
    );
  }
  return (
    <article className="flex items-center gap-4 rounded-lg border bg-gray-100 p-6">
      <div>
        {image}

        <p className="text-2xl font-medium text-gray-900">{title}</p>

        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </article>
  );
}

export default Card2;
