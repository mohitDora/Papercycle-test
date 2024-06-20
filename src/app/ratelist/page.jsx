"use client";
import React, { useEffect, useState } from "react";
import SelectCity from "./@sections/SelectCity";
import SelectCategory from "./@sections/SelectCategory";
import { Input, TextField } from "@mui/material";
import Heading from "@/app/@components/ui/Heading";
import ShowCategoryData from "./@sections/ShowCategoryData";
import { BASE_URL } from "../../../utils/Constant";
import Loading from "@/app/@components/ui/Loading";

function page() {
  const [city, setCity] = useState(["Bhubaneswar"]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleDataOfCity = (data) => {
    setCity(data);
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const getData = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/recycle/getRateChart/${city[0]}`
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();
      console.log(result)
      setData(result?.data?.categories);
      setFilteredData(result?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [city]);

  useEffect(() => {
    setFilteredData(
      data?.filter((item) => {
        if (selectedTab === "All") {
          return item;
        }

        return selectedTab === item.category;
      })
    );
  }, [selectedTab]);

  const showCategories = filteredData?.map((item, index) => {
    return (
      <ShowCategoryData
        key={index}
        category={item.category}
        prices={item.prices}
      ></ShowCategoryData>
    );
  });

  return (
    <>
      <Heading title="Dry waste rate list"></Heading>
      <div className="flex flex-col md:flex-row gap-4">
        <SelectCity selectCity={handleDataOfCity}></SelectCity>
        <TextField
          fullWidth
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search any material"
        />
      </div>
     
      {showCategories.length?
      <>
       <SelectCategory
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        tabs={data}
      />
      {showCategories}
      </>
      :<Loading num={6}></Loading>}
    </>
  );
}

export default page;
