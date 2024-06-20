import Heading from "@/app/@components/ui/Heading";
import React from "react";
import { PARAGRAPHS } from "../../../utils/Constant";

function about() {
  return (
    <div className="flex flex-col text-justify">
      <Heading title="About Us"></Heading>
      <p className=" text-2xl font-semibold tracking-tight text-secondary">Odisha's 1st and leading Recycling Platform</p>
      <div>
        {PARAGRAPHS.map((paragraph, index) => (
          <p key={index} className="text-gray-500 mt-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default about;
