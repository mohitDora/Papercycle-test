import React from "react";

function Card({ title, desc, image }) {
  return (
    <div className="group relative h-44 lg:h-64">
      <span className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg"></span>
      <div className="relative flex h-full transform items-end border-2 rounded-lg border-gray-500 bg-neutral-100 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-4 pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
          {image}
          <h2 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h2>
        </div>
        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          <h3 className="mt-4 text-xl font-medium sm:text-2xl">{title}</h3>
          <p className="mt-4 text-sm sm:text-base text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
