"use client"
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Subheading from "@/Components/ui/Subheading";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const Router=useRouter()
  return (
    <>
    <IconButton onClick={()=>Router.back()}>
<ArrowBackIosNewIcon></ArrowBackIosNewIcon>
</IconButton>
      <Subheading title="Order Details"></Subheading>
      <div className="flex flex-col md:flex-row-reverse gap-4">
      <article className="md:w-2/4 relative flex iems-center gap-4 rounded-lg border border-gray-500 bg-hite p-6 flex-col">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-2xl font-medium text-gray-900">$240.94</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-medium text-gray-900">email@gmail.com</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="text-2xl font-medium text-gray-900">email@gmail.com</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Download </p>
        </div>
      </article>
      
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      </div>
    </>
  );
}
