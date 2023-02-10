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
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#99CB79',
    fontWeight: 'bold'

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#E9FEDB',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#F5FFEE',
  },
  
}));

//Add invoice data array in local variable

export default function TableComponent(props) {


  //console.log("props details" + JSON.stringify(props.invoiceData.payment.tax));


  const invoiceHeader = props.invoiceHeader;
  //console.log("invoiceheader"+invoiceHeader);
  const data = props.invoiceData.invoiceProductDetails;
  //console.log("payment details" + JSON.stringify(props.invoiceData));

  //console.log("invoice details"+invoicedata);
  return (
    <div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000}} aria-label="customized table">
          <TableHead>
            <TableRow>

              {invoiceHeader.map((item, index) => (
                <StyledTableCell key={index}>{item}</StyledTableCell>
              ))}

            </TableRow>

          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell >{item.productID}</StyledTableCell>
                <StyledTableCell >{item.productName}</StyledTableCell>
                <StyledTableCell >{item.productQuantity}</StyledTableCell>
                <StyledTableCell ><AttachMoneyIcon sx={{ fontSize: '17px' }} />{item.productPrice}</StyledTableCell>
                <StyledTableCell ><AttachMoneyIcon sx={{ fontSize: '17px' }} />{item.lineTotal}</StyledTableCell>
              </StyledTableRow>
            ))}
            <TableRow sx={{ borderTop: 2,borderBottom:0 ,borderTopColor: "#99CB79"}}>
            <TableCell rowSpan={3} />
              <TableCell colSpan={3}>Tax</TableCell>
              <TableCell>{props.invoiceData.payment.tax}<PercentIcon sx={{ fontSize: '15px' }} /></TableCell>
            </TableRow>
            <TableRow sx={{ border: 0 }}>
              <TableCell colSpan={3}>Discount</TableCell>
              <TableCell><AttachMoneyIcon sx={{ fontSize: '17px' }} />{props.invoiceData.payment.discount}</TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#DFECC3", borderTop: 2, borderColor: "black", borderTopColor: "black" }}>

              <TableCell sx={{ fontWeight: 'bold' }} colSpan={3}>Total Amount</TableCell>
              <TableCell ><AttachMoneyIcon sx={{ fontSize: '17px' }} />{props.invoiceData.payment.totalAmount}</TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}
