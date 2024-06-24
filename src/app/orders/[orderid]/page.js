"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Subheading from "@/app/@components/ui/Subheading";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/Context/store";
import { useParams } from "next/navigation";
import DateConverter from "@/DateConverter";
import CircularLoader from "@/app/@components/ui/CircularLoader";

export default function BasicTable() {
  const Router = useRouter();
  const { getRecycleOrderById } = useStoreContext();
  const [singleOrderData, setSingleOrderData] = React.useState({});
  const { orderid } = useParams();
  const [totalValue, setTotalvalue] = React.useState({});

  const getSingleOrderData = async () => {
    const res = await getRecycleOrderById(orderid);
    const fetchedData = res?.data;

    if (fetchedData) {
      setSingleOrderData(fetchedData);
      const totalPrice =
        fetchedData.items?.reduce((sum, obj) => sum + obj.subTotal, 0) || 0;
      const totalQuantity =
        fetchedData.items?.reduce((sum, obj) => sum + obj.itemQuantity, 0) || 0;
      setTotalvalue({ totalPrice, totalQuantity });
    }
  };
  console.log("data", singleOrderData);
  console.log("data", totalValue);

  React.useEffect(() => {
    getSingleOrderData();
  }, [orderid]);

  const columns = ["itemPrice", "itemQuantity", "itemType", "subTotal"];
  const columnsToDisplay = ["Rate/kg", "Qty. in kg", "Items", "Amount"];
  return Object.keys(singleOrderData)?.length === 0 ? (
    <CircularLoader></CircularLoader>
  ) : (
    <>
      <IconButton onClick={() => Router.back()}>
        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
      </IconButton>
      <div className="my-4">
      <Subheading title="Order Details"></Subheading>
      </div>
      
      <div className="flex flex-col lg:flex-row-reverse gap-12">
        <article className="lg:w-2/5 relative flex iems-center gap-4 rounded-lg border bg-gray-200 bg-hite p-6 flex-col">
          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="text-2xl font-medium text-gray-900">
              {DateConverter(singleOrderData?.orderTime)}
            </p>
          </div>
          {singleOrderData?.status === "upcoming" ? (
            <>
              <div>
                <p className="text-sm text-gray-500">Order Status</p>
                <p className="text-2xl font-medium text-gray-900">
                  Order Placed
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Edit</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-500">Transaction Status</p>
                <p className="text-2xl font-medium text-secondary">
                  {singleOrderData?.paymentId?.status === "success"
                    ? `Transaction Successful on ${DateConverter(
                        singleOrderData?.completionTime
                      )}`
                    : "Transaction Pending"}
                </p>
              </div>

              {singleOrderData?.paymentId?.status === "success" ? (
                <div>
                  <p className="text-sm text-gray-500">Transaction Id</p>
                  <p className="text-2xl font-medium text-gray-900">
                    {singleOrderData?.paymentId?.payout_id}
                  </p>
                </div>
              ) : (
                ""
              )}

              <div>
                <p className="text-sm text-gray-500 underline">
                  Download Invoice
                </p>
              </div>
            </>
          )}
        </article>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columnsToDisplay?.map((item, index) => {
                  return <TableCell key={index}>{item}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {singleOrderData?.items?.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {columns?.map((item, index) => {
                      return <TableCell key={index}>{row[item]}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex gap-4">
          <div className="flex items-center justify-center">Total Price : &nbsp;<Subheading title={`RS ${totalValue?.totalPrice}`}></Subheading></div>
          <div className="flex items-center justify-center">Total Quantity : &nbsp;<Subheading title={`${totalValue?.totalQuantity} Kg`}></Subheading></div>
          </div>

        </TableContainer>
        
      </div>
    </>
  );
}
