/*
*Table component for displaying Invoice details
**@author: Anju Tuscano

*/

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//Add invoice data array in local variable

export default function TableComponent(props) {


  const [invoicedata, setInvoiceData] = useState([]);

  useEffect(() => {
    
    setInvoiceData(props.invoiceData);
        //console.log("this is"+res.data.invoiceData.invoiceID);
       // console.log("this is Hello");
    },[]);


const invoiceHeader=props.invoiceHeader;
//console.log("invoiceheader"+invoiceHeader);
const data=invoicedata.invoiceProductDetails;
console.log("product details"+data);

//console.log("invoice details"+invoicedata);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            
        {invoiceHeader.map((item, index) => (
            <StyledTableCell key={index}>{item}</StyledTableCell>
          ))}

          </TableRow>

        </TableHead>
        <TableBody>
        {data?.map((item, index) => (
            <StyledTableRow  key={index}>
              <StyledTableCell >{item.productID}</StyledTableCell>
              <StyledTableCell >{item.productName}</StyledTableCell>
              <StyledTableCell >{item.productQuantity}</StyledTableCell>
              <StyledTableCell >{item.productPrice}</StyledTableCell>
              <StyledTableCell >{item.lineTotal}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        {/* <TableBody>
          {data.map((item,index) => (  
            <StyledTableRow  key={item.productID}>
              <StyledTableCell align="right">{item.productName}</StyledTableCell>
              
              <StyledTableCell align="right">{invoicedata.invoiceProductDetails.productName}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceProductDetails.productQuantity}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceProductDetails.productPrice}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceProductDetails.lineTotal}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}
