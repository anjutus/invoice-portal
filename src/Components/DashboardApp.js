/*
***
@author: 
*/

import { Grid, Container} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PieChart from "./PieChart";
import { InvoiceData } from "../utils/PieData";
import { properties } from '../utils/properties.js';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export const numofInvoiceAmountData = {
    labels: InvoiceData.filter(invoice => invoice.status !== properties.REJECTED).map((invoice) => invoice.status),
    datasets: [
        {
            label: '# of Invoices',
            data: InvoiceData.filter(invoice => invoice.status !== properties.REJECTED).map((invoice) => invoice.invoiceCount),
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)'

            ],
            borderColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)'
            ],
            borderWidth: 1,
        },
    ],
};

export const numofInvoiceData = {
    labels: InvoiceData.map((invoice) => invoice.status),
    datasets: [
        {
            label: 'Invoice Amounts ',
            data: InvoiceData.map((invoice) => invoice.invoiceCount),
            backgroundColor: [
                'rgba(253, 172, 96)',
                'rgba(253, 96, 96)',
                'rgba(96, 253, 253)'
            ],
            borderColor: [
                'rgba(253, 172, 96)',
                'rgba(253, 96, 96)',
                'rgba(96, 253, 253)'
            ],
            borderWidth: 1,
        },
    ],
};


export default function DashboardApp() {


    return (
        <Container maxWidth="xl">
            <Grid container spacing={8} alignItems="center"
                justifyContent="center" paddingTop={8}>

                <Grid item xs={12} md={6} lg={4}>
                    <Box sx={{width: '80%',}}>
                        <Item>
                            <h2>Number of Invoices</h2>
                            <PieChart data={numofInvoiceData} />
                        </Item>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                <Box sx={{width:'80%',}}>
                    <Item>
                        <h2>Invoice Amount</h2>
                        <PieChart data={numofInvoiceAmountData} />
                    </Item>
                </Box>
                </Grid>
            </Grid>
        </Container>
    )
}