import Card from "@/app/@components/ui/Card";
import Heading from "@/app/@components/ui/Heading";
import React from "react";
import { COMPONENTS_DATA2 } from "../../../../utils/Constant";
import Card2 from "@/app/@components/ui/Card2";

function Why() {
  return (
    <>
      <Heading title="Why papercycle.in ?"></Heading>
      <div className="flex flex-col md:grid grid-cols-2 w-[100%] gap-4">
        {COMPONENTS_DATA2?.map((item, index) => {
          return (
            <Card2 key={index} title={item.title} desc={item.description} image={item.image}/>
          );
        })}
      </div>
    </>
  );
}

export default Why;
