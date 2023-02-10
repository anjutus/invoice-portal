import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { ViewInvoiceData } from "../../utils/ViewInvoiceData";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { Box, CardContent } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import TableComponent from '../TableComponent';
import { useQuery } from 'react-query';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon   from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// Create Document Component
export default function ViewInvoiceDoc() {

    const [formdata, setFormdata] = useState([]);

    var invoiceHeader = ["Product ID", "Product Name", "Quantity", "Price", "Line Total"];

    const { state } = useLocation();
    const url = `https://esqsuiva17.execute-api.us-east-2.amazonaws.com/default/invoice/${state}`;
    const findOneRequestPayload = {
        dataSource: "Cluster0",
        database: "InvoicePortal",
        collection: "Invoices"
    };
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    //React query implenentation
    // Fetcher function
    // Using the hook

    const { isLoading, data, error } = useQuery(["invoiceData"], () =>
        axios
            .get(url, findOneRequestPayload, header)
            .then((res) => res.data)
    );

    console.log(data);
    // Error and Loading states
    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;

    //Back buttton implementation
    // const navigate = useNavigate();
	// const goBack = () => {
	// 	navigate(-1);
	// }

    return (

        <Container maxWidth="lg" sx={{ display: "-ms-flexbox" }}>
            <Card sx={{ display: "-ms-grid" }}>
                    <Grid container justifyContent="space-between" direction="row" padding="20px" >
                        <CardContent>
                            <Typography fontSize="18px" fontWeight="bold" fontFamily="sans-serif" textAlign="left">
                                {data.invoiceData.supplierName}
                            </Typography>
                            <Typography fontSize="12px" fontFamily="sans-serif" textAlign="left">
                            4209 Crowfield Road</Typography>
                            <Typography fontSize="12px" fontFamily="sans-serif" textAlign="left"> Gilbert,Arizona 85233</Typography>
                            <Typography fontSize="12px" fontFamily="sans-serif" textAlign="left">TN : 602-885-7101</Typography>
                            <Typography fontSize="12px"fontFamily="sans-serif" textAlign="left">Email : SkywardsHandset@skywards.com</Typography> 
                            
                        </CardContent>
                        <CardContent>
                            <TableContainer sx={{ border: "1px" }}>
                                <Table sx={{ minWidth: 100 }} aria-label="customized table">
                                    <TableBody>
                                        <TableRow sx={{ backgroundColor: "#99CB79" }}>
                                            <TableCell>
                                                InvoiceID
                                            </TableCell>
                                            <TableCell>
                                                {data.invoiceData.invoiceID}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Issue Date
                                            </TableCell>
                                            <TableCell>
                                                {data.invoiceData.issueDate}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Due Date
                                            </TableCell>
                                            <TableCell>
                                                {data.invoiceData.dueDate}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: "#99CB79" }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>
                                                Total Amount
                                            </TableCell>
                                            <TableCell>
                                                <AttachMoneyIcon sx={{ fontSize: '17px' }} />  {data.invoiceData.payment.totalAmount}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Grid>

                <Grid container padding="10px" justifyContent="center">
                    <CardContent>
                        <TableComponent invoiceData={data.invoiceData} invoiceHeader={invoiceHeader}></TableComponent>
                    </CardContent>
                </Grid>

                <Grid container padding="20px" justifyContent="left">
                    <CardContent>
                        <Typography fontSize="14px" fontWeight="bold" fontFamily="sans-serif" textAlign="left">
                                Comment : 
                        </Typography>{data.invoiceData.payment.comment}
                    </CardContent>
                </Grid>

            </Card>
            <Grid sx={{padding:"20px"}}>
               <Button variant="contained">Back</Button>
            </Grid>
        </Container>
    )

};