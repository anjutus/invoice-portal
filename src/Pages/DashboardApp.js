/*
*Dashboard Page for Supplier displaying Pie Chart of invoice status and imvoice amount.
**@author: Anju Tuscano

*/

import { Grid, Container} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PieChart from "../Components/Dashboard/PieChart";
import { InvoiceData } from "../utils/PieData";
import { properties } from '../utils/properties.js';
import { InvoicesStats } from '../Components/ViewAllInvoices/InvoicesStats';
import { useQuery } from 'react-query';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function DashboardApp() {
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

const invoicesAmount = InvoicesStats(data);
console.log("invoicesAmount.approvedAmount"+invoicesAmount.approvedAmount);
const numofInvoiceAmountData = {
    labels: ['Approved','Pending','Rejected'],//InvoiceData.filter(invoice => invoice.status !== properties.REJECTED).map((invoice) => invoice.status),
    datasets: [
        {
            label: '# of Invoices',
            data: [invoicesAmount.approvedAmount,invoicesAmount.pendingAmount,invoicesAmount.rejectedAmount],//InvoiceData.filter(invoice => invoice.status !== properties.REJECTED).map((invoice) => invoice.invoiceCount),
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(202, 73, 140)'

            ],
            borderColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(202, 73, 140)'
            ],
            borderWidth: 1,
        },
    ],
};

const numofInvoiceData = {
    labels: ['Approved','Pending','Rejected'],//InvoiceData.map((invoice) => invoice.status),
    datasets: [
        {
            label: 'Invoice Amounts ',
            data: [invoicesAmount.approvedCount,invoicesAmount.pendingCount,invoicesAmount.rejectedCount],
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


    return (
        <Container maxWidth="xl">
            <Grid container spacing={8} alignItems="center" justifyContent="center" paddingTop={8}>
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