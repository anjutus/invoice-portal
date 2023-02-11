/*
* List of invoices and thier count accordng to status
**@author: Anju Tuscano

*/


import React from 'react';
import { Grid, Container, Typography, Box, Item } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ViewInvoiceData } from "../../utils/ViewInvoiceData";
import { styled } from '@mui/material/styles';

import { useQuery } from 'react-query';
import axios from "axios";

import InvoiceTable from './InvoiceTable';
import { InvoicesStats } from '../InvoicesStats';
//export const numofInvoiceData = ViewInvoiceData.map((invoice) => invoice.invoiceId)

export default function ListInvoices() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 0,
    }));

    const boxStyle = { display: 'flex', flexDirection: 'row', p: 1, m: 1, justifyContent: "center" };


    const url = `https://esqsuiva17.execute-api.us-east-2.amazonaws.com/default/invoices`;
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

    const { isLoading, data, error } = useQuery(["invoiceData"], async () =>
        await axios
            .get(url, findOneRequestPayload, header)
            .then((res) => res.data
            )
    );

    // Error and Loading states
    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;
    
    const invoiceStatus = InvoicesStats(data);
    //calculate 

    // const calculatePending = () => {
    //     var count = 0;
    //     data.map((item) => {
    //         if ((item.invoiceData.status === "PENDING")) {
    //             count = count + 1;
    //         }
    //     })
    //     return count;
    // }
    // const calculateApproved = () => {
    //     var count = 0;
    //     data.map((item) => {
    //         if ((item.invoiceData.status === "APPROVED")) {
    //             count = count + 1;
    //         }
    //     })
    //     return count;
    // }
    // const calculateRejected = () => {
    //     var count = 0;
    //     data.map((item) => {
    //         if ((item.invoiceData.status === "REJECTED")) {
    //             count = count + 1;
    //         }
    //     })
    //     return count;
    // }

    return (
        <Container maxWidth="xl">
            <Grid container justifyContent="center" spacing={2}>
                <Grid item sx={{ p: 9, m: 1, boxShadow: 0, }}>
                    <Box sx={{ ...boxStyle }}>
                        <Item>
                            <h3>Pending</h3>
                            <h4>{invoiceStatus.pendingCount}</h4>
                        </Item>
                    </Box>
                </Grid>
                <Grid item sx={{ p: 9, m: 1 }}>
                    <Box sx={{ ...boxStyle }}>
                        <Item>
                            <h3>Rejected</h3>
                            <h4>{invoiceStatus.rejectedCount}</h4>
                        </Item>
                    </Box>
                </Grid>
                <Grid item sx={{ p: 9, m: 1 }}>
                    <Box sx={{ ...boxStyle }}>
                        <Item>
                            <h3>Approved</h3>
                            <h4>{invoiceStatus.approvedCount}</h4>
                        </Item>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <InvoiceTable allInvoiceData={data}></InvoiceTable>
                </Grid>
            </Grid>
        </Container>
    )
}