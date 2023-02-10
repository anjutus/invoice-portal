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


  console.log("props details"+JSON.stringify(props.invoiceData.payment.tax));


const invoiceHeader=props.invoiceHeader;
//console.log("invoiceheader"+invoiceHeader);
const data=props.invoiceData.invoiceProductDetails;
console.log("payment details"+JSON.stringify(props.invoiceData));

//console.log("invoice details"+invoicedata);
  return (
    <div>
        
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
        <TableRow sx={{ backgroundColor: "#DFECC3" ,borderTop:1}}>
                <TableCell colSpan={4}>Tax</TableCell>
                <TableCell>{props.invoiceData.payment.tax}</TableCell> 
              </TableRow>
              <TableRow sx={{ backgroundColor: "#DFECC3" }}>
                
                <TableCell colSpan={4}>Discount</TableCell>
                <TableCell >{props.invoiceData.payment.discount}</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: "#DFECC3", borderTop:3 ,borderColor:"black",borderTopColor:"black"}}>
                
                <TableCell sx={{ fontWeight: 'bold' }} colSpan={4}>Total Amount</TableCell>
                <TableCell>{props.invoiceData.payment.totalAmount}</TableCell>
              </TableRow>
        </TableBody>
        
      </Table>
    </TableContainer>
    </div>
  );
}
