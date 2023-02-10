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


export default function InvoiceTable(props) {

  const data = props.allInvoiceData;


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
            <StyledTableRow key={invoicedata.invoiceData.invoiceId}>
              <StyledTableCell component="th" scope="row">
                {invoicedata.invoiceData.invoiceID}
              </StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceData.supplierName}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceData.issueDate}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceData.dueDate}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceData.payment.totalAmount}</StyledTableCell>
              <StyledTableCell align="right">{invoicedata.invoiceData.status}</StyledTableCell>
            </StyledTableRow>
          ))} 

        </TableBody>
      </Table>
    </TableContainer>
  );
}
