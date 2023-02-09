import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
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
import {useQuery} from 'react-query';

// Create 

// Create Document Component
export default function ViewInvoiceDoc() {
    
    const [formdata, setFormdata] = useState([]);

    var invoiceHeader=["Product ID","Product Name","Quantity","Price","Line Total"];

    var invoiceObjectID = "63dd3e64666b5b5c9d5980af";
    const url = `https://esqsuiva17.execute-api.us-east-2.amazonaws.com/default/invoice/${invoiceObjectID}`;
    const findOneRequestPayload = {
        dataSource: "Cluster0",
        database: "InvoicePortal",
        collection: "Invoices"
    };
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' :'*',
        }
    }
    
    //React query implenentation
    // Fetcher function
	// Using the hook

    const { isLoading, data, error} = useQuery(["invoiceData"], () =>
    axios
      .get(url, findOneRequestPayload, header)
      .then((res) => res.data)
  );

    console.log(data);
    // Error and Loading states
	if (error) return <div>Request Failed</div>;
	if (isLoading) return <div>Loading...</div>;


    // useEffect(() => {
    //     axios.get(url, findOneRequestPayload, header).then(res => {
    //        setFormdata(res.data.invoiceData);
    //         console.log("this is"+res.data.invoiceData.invoiceID);
    //        console.log("this is Hello");
    //     })
    // }, [])
    

    return (

        <Container maxWidth="xl" sx={{ display:"-ms-flexbox"}}>
            <Card  sx={{ display: "flex" }}>
                <Grid>
                    <CardContent sx={{justifyContent:"left"}}>
                        {data.invoiceData.supplierName}
                    </CardContent>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <CardContent sx={{float:"right"}}>
                        <TableContainer sx={{border:"1px"}}>
                            <Table sx={{ minWidth: 100}} aria-label="customized table">
                                <TableBody>
                                    <TableRow sx={{backgroundColor:"#DFECC3"}}>
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
                                    <TableRow sx={{backgroundColor:"#DFECC3"}}>
                                        <TableCell sx={{fontWeight: 'bold'}}>
                                            Total Amount
                                        </TableCell>
                                        <TableCell>
                                            {/* {formdata.payment.totalAmount} */}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Grid>
            </Card>
            <Grid container justifyContent="center">
                    <CardContent>
                        <TableComponent invoiceData={data.invoiceData} invoiceHeader={invoiceHeader}></TableComponent>
                    </CardContent>
            </Grid>
        </Container>
    )

};