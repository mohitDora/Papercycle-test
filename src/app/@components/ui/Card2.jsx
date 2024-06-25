import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function Card2({ title, desc, image, image2, value, time }) {
  if (image2) {
    return (
      <article id="keen-slider" class="keen-slider" className="flex flex-col gap-4 rounded-lg border bg-gray-100 p-6 shadow-sm">
        <div className="flex flex-col">
          <FormatQuoteIcon
            sx={{ fontSize: "5rem" }}
            className="rotate-180 text-secondary"
          ></FormatQuoteIcon>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Image src={image2} alt="author.png" width={50} height={50}></Image>
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
    <article className="flex items-center gap-4 rounded-lg border bg-gray-100 p-6 shadow-sm">
      <div>
        {image}

        <p className="text-2xl font-medium text-gray-900">{title}</p>

        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </article>
  );
}

export default Card2;
