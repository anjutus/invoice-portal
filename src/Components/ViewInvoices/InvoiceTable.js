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
import { ViewInvoiceData } from "../../utils/ViewInvoiceData";
import { useQuery } from 'react-query';
import axios from "axios";
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
const data=ViewInvoiceData;

export default function InvoiceTable() {



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Id</StyledTableCell>
            <StyledTableCell align="right">Client Name</StyledTableCell>
            <StyledTableCell align="right">Issue Date</StyledTableCell>
            <StyledTableCell align="right">Due Date</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((invoicedata) => (
            <StyledTableRow key={invoicedata.invoiceId}>
              <StyledTableCell component="th" scope="row">
                {invoicedata.invoiceId}
              </StyledTableCell>
              <StyledTableCell align="right">{invoicedata.clientName}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.issueDate}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.dueDate}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.amount}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
