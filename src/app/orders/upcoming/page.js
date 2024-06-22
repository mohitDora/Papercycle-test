"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/@components/ui/Table";
import { useStoreContext } from "@/Context/store";
import CircularLoader from "@/app/@components/ui/CircularLoader";

export default function Upcoming() {
    const {setTab,getRecycleOrderByUser,isLoading}=useStoreContext();
    const [upcomingOrderData,setUpcomingOrderData]=useState([])

  const getUpcomingOrderData=async()=>{
    const res=await getRecycleOrderByUser()
    console.log("upcoming",res)
    const data=res?.data?.filter((item,index)=>{
      return item?.status==="upcoming"
    })
    const newArray = data?.map(({ date, id }) => ({ date,id }));
    setUpcomingOrderData(newArray);
  }

    useEffect(()=>{
        setTab("upcoming");
        getUpcomingOrderData()
    },[])

      const columns=["date","id","edit"] 
 const columnsToDisplay=["Date","Message"]
  return (
   
        isLoading?<CircularLoader></CircularLoader>:<Table rows={upcomingOrderData} columns={columns} columnsToDisplay={columnsToDisplay}></Table>
   
  );
}
