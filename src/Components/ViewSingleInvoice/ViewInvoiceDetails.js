import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import {CardContent } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import ProductDetailsTable from './ProductDetailsTable';
import { useNavigate } from 'react-router-dom';

var invoiceHeader = ["Product ID", "Product Name", "Quantity", "Price", "Line Total"];

export default function ViewInvoiceDetails(props) {

    const data=props.invoicedata;

    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    return (<div>
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
                        <Typography fontSize="12px" fontFamily="sans-serif" textAlign="left">Email : SkywardsHandset@skywards.com</Typography>

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
                                    <TableRow>
                                        <TableCell>
                                            Status
                                        </TableCell>
                                        <TableCell>
                                            {data.invoiceData.status}
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
                        <ProductDetailsTable invoiceData={data.invoiceData} invoiceHeader={invoiceHeader}></ProductDetailsTable>
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
            <Grid sx={{ padding: "20px" }}>
                <Button variant="contained" onClick={goBack}>Back</Button>
            </Grid>
        </Container>
    </div>)

}