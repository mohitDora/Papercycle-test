import React from "react";
import Heading from "@/app/@components/ui/Heading";
import { COMPONENTS_DATA1 } from "../../../../utils/Constant";
import Card2 from "@/app/@components/ui/Card2";

function How() {
  return (
    <>
      <Heading title="How papercycle.in Works"/>
      <div className="flex flex-col lg:grid grid-cols-3 w-[100%] gap-4">
        {COMPONENTS_DATA1?.map((item, index) => {
          return (
            <Card2 key={index} title={item.title} desc={item.description} image={item.image}/>
          );
        })}
      </div>
    </>
  );
}

export default How;
