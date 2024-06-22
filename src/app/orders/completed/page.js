"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/@components/ui/Table";
import { useStoreContext } from "@/Context/store";
import { CircularProgress } from "@mui/material";
import CircularLoader from "@/app/@components/ui/CircularLoader";

function Completed() {
  const { setTab,getRecycleOrderByUser,isLoading } = useStoreContext();
  const [completedOrderData,setCompletedOrderData]=useState([])

  const getUpcomingOrderData=async()=>{
    const res=await getRecycleOrderByUser()
    console.log("upcoming",res)
    const data=res?.data?.filter((item,index)=>{
      return item?.status==="complete"
    })
    const newArray = data?.map(obj => {
      const date=new Date(obj?.date).toISOString().split('T')[0];
      const totalWeight = obj?.items?.reduce((sum, item) => sum + item?.itemPrice, 0);
      const totalQuantity = obj?.items?.reduce((sum, item) => sum + item?.subTotal, 0);
      const items = obj?.items?.map(item => item?.itemType).join(", ");
      return {
        id:obj?.id,
        date,
        totalWeight,
        totalQuantity,
        items
      };
    });
    
    console.log(newArray);
    
    setCompletedOrderData(newArray);
  }

  useEffect(() => {
    setTab("completed");
    getUpcomingOrderData()
  },[]);

  const columns = ["date", "totalWeight","totalQuantity","items", "download invoice"];
  const columnsToDisplay=["Date", "Total Weight in Kg.","Payment","items", "download invoice"];

  return(
    
    isLoading?<CircularLoader></CircularLoader>:<Table rows={completedOrderData} columns={columns} columnsToDisplay={columnsToDisplay}></Table>
    
  ) 
}

export default Completed;
