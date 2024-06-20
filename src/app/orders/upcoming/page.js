"use client";
import React, { useEffect } from "react";
import Table from "@/app/@components/ui/Table";
import { useStoreContext } from "@/Context/store";

export default function Upcoming() {
    const {setTab}=useStoreContext()
    useEffect(()=>{
        setTab("upcoming")
    })

    function createData(name, calories, fat) {
        return { name, calories, fat };
      }
      const columns=["name","calories","fat","edit"] 
    const rows = [
        createData('Cupcake', 305, 3.7),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375, 0.0),
        createData('KitKat', 518, 26.0),
        createData('Lollipop', 392, 0.2),
        createData('Marshmallow', 318, 0),
        createData('Nougat', 360, 19.0),
        createData('Oreo', 437, 18.0),
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1));
  return (
    <>
      <Table rows={rows} columns={columns}></Table>
    </>
  );
}
