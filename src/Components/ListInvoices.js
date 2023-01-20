import React from 'react';
import { Grid, Container, Typography, Box, Item } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ViewInvoiceData } from "../utils/ViewInvoiceData";
import { styled } from '@mui/material/styles';
import { FormatAlignJustify } from '@mui/icons-material';
import InvoiceTable from '../utils/InvoiceTable';

export const numofInvoiceData = ViewInvoiceData.map((invoice) => invoice.invoiceId)

export default function ListInvoices() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 0,
    }));



    return (
        <Container maxWidth="xl">
            <Grid container justifyContent="center" spacing={2}>
                <Grid item sx={{
                    p: 9,
                    m: 1,
                    boxShadow: 0,
                }}>
                    <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 1,
                            m: 1,
                            justifyContent : "center",
                            boxShadow: 0,
                        }}
                    > <Item><h3>Pending</h3>
                            <h4>6</h4></Item>
                       </Box></Grid><Grid item sx={{
                    p: 9,
                    m: 1
                }}>
                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 1,
                            m: 1,
                            justifyContent : "center",
                            bgcolor: 'background.paper',
                        }}
                    > 
                        <Item><h3>Rejected</h3><h4>6</h4></Item></Box>
                </Grid>
                <Grid item sx={{
                    p: 9,
                    m: 1
                }}>
                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 1,
                            m: 1,
                            justifyContent : "center",
                            bgcolor: 'background.paper',
                        }}
                    > 
                        <Item><h3>Approved</h3><h4>6</h4></Item></Box>
                </Grid>
                <Grid item xs={12}>
                        {/* <InvoiceTable data={numofInvoiceData}/> */}
                        <InvoiceTable/>
                </Grid>
            </Grid>

        </Container>
    )
}