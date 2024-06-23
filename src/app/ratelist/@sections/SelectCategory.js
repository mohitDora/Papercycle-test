import Subheading from "@/app/@components/ui/Subheading";
import React from "react";

export default function SelectCategory({ selectedTab, onTabChange,tabs }) {
  // console.log(tabs[0].category)
  return (
    <div className="py-4">
      <div className="block">
        
        <nav className="flex gap-6 align-middle" aria-label="Tabs">
        <Subheading title="Filters"></Subheading>
        <div className="flex gap-4 flex-wrap">
        <button
            onClick={() => onTabChange("All")}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
              selectedTab === "All"
                ? "text-white bg-secondary"
                : "text-gray-500  hover:text-gray-700"
            }`}
          >
            All
          </button>
        {
          tabs?.map((item,index)=>{
            return(
<button key={index}
            onClick={() => onTabChange(item.category)}
            className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
              selectedTab === item.category
                ? "text-white bg-secondary"
                : "text-gray-500  hover:text-gray-700"
            }`}
          >
            {item.category}
          </button>
            )
            
          })
        }


          
          </div>
        </nav>
      </div>
    </div>
  );
}
