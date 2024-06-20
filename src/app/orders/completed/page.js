"use client";
import React, { useEffect } from "react";
import Table from "@/app/@components/ui/Table";
import { useStoreContext } from "@/Context/store";

function Completed() {
  const { setTab } = useStoreContext();
  useEffect(() => {
    setTab("completed");
  });

  function createData(name, calories, fat, abc) {
    return { name, calories, fat, abc };
  }

  const columns = ["name", "calories", "fat", "abc", "download invoice"];
  const rows = [
    createData("Cupcake", 305, 3.7, 67),
    createData("Donut", 452, 25.0, 67),
    createData("Eclair", 262, 16.0, 67),
    createData("Frozen yoghurt", 159, 6.0, 67),
    createData("Gingerbread", 356, 16.0, 67),
    createData("Honeycomb", 408, 3.2, 67),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
  return <Table rows={rows} columns={columns}></Table>;
}

export default Completed;
