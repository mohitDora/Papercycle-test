import React from "react";

function Price({item,price,unit}) {
  return (
    <div className="rounded-lg bg-gray-200 px-12 py-2">
      <p className="font-bold text-lg">{item}</p>
      <p>{price}/{unit}</p>
    </div>
  );
}

export default Price;
