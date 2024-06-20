import React from "react";
import Card from "@/Components/ui/Card";
import Heading from "@/Components/ui/Heading";

import { COMPONENTS_DATA1 } from "../../../../utils/Constant";
import Card2 from "@/Components/ui/Card2";

function How() {
  return (
    <>
      <Heading title="How papercycle.in Works"></Heading>
      <div className="flex flex-col md:grid grid-cols-3 w-[100%] gap-4">
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
