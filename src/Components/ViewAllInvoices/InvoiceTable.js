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
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#99CB79",
    color: theme.palette.common.black,
    fontWeight: "bold"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#F3FCDF",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#F0FFCF",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#C2DC8B",
  },
}));


export default function InvoiceTable(props) {
  const navigate = useNavigate();
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
          {data.map((invoicedata,index) => (
            <StyledTableRow key={index} onClick={() => navigate("/viewSingleInvoice", { state: invoicedata._id })}>
              <StyledTableCell component="th" scope="row" key={"invoiceId"+index} >
                {invoicedata.invoiceData.invoiceID}
              </StyledTableCell>
              <StyledTableCell align="right" key={"supplierName"+index}>{invoicedata.invoiceData.supplierName}</StyledTableCell>
              <StyledTableCell align="right" key={"issueDate"+index}>{invoicedata.invoiceData.issueDate}</StyledTableCell>
              <StyledTableCell align="right" key={"dueDate"+index}>{invoicedata.invoiceData.dueDate}</StyledTableCell>
              <StyledTableCell align="right"key={"totalAmount"+index} >{invoicedata.invoiceData.payment.totalAmount}</StyledTableCell>
              <StyledTableCell align="right" key={"status"+index}>{invoicedata.invoiceData.status}</StyledTableCell>
            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
