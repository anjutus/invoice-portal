import React, { useState } from 'react'
import { Paper, Box, Grid, TextField, Typography, Button, Container, FormControl, FormGroup, FormLabel, Table, TableRow, TableCell } from '@mui/material';
import { invoiceData } from '../utils/invoiceData';

export default function CreateInvoiceNew() {

    var [formData, setFormData] = useState({
        invoiceData
    }

    );
    

    // console.log(formData.invoiceData.invoiceID);
    const handleHeaderInputChange = (e) => {
        const { name, value } = e.target

        if (name === "invoiceID")
            formData.invoiceData.invoiceID = value
        else if (name === "supplierName")
            formData.invoiceData.supplierName = value
        else if (name === "issueDate")
            formData.invoiceData.issueDate = value
        else if (name === "dueDate")
            formData.invoiceData.dueDate = value

        console.log(formData.invoiceData)
    }

    return (
        <div>
            <FormControl>
                <Container sx={{ pt: 4 }}>
                    <Typography variant="h6" align="center" margin="dense">
                        Create new Invoice
                    </Typography>
                    <Box sx={{
                        bgcolor: '#DFECC3',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                    }}>
                        <Table>
                            {/* Form Header */}
                            <TableRow>
                                <TableCell>
                                    <FormGroup>
                                        <FormLabel>Invoice ID </FormLabel>
                                        <TextField sx={{
                                            bgcolor: 'white',
                                        }}
                                            required
                                            id="invoiceID"
                                            name="invoiceID"
                                            label="Invoice ID"
                                            fullWidth
                                            margin="dense"
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        ></TextField>
                                    </FormGroup>
                                </TableCell>
                                <TableCell>
                                    <FormGroup>
                                        <FormLabel>Supplier Name</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            required
                                            id="supplierName"
                                            name="supplierName"
                                            label="Supplier Name"
                                            fullWidth
                                            margin="dense"
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                    </FormGroup>
                                </TableCell>
                                <TableCell>
                                    <FormGroup>
                                        <FormLabel>Issue Date</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            required
                                            id="issueDate"
                                            name="issueDate"
                                            label="Issue Date"
                                            fullWidth
                                            margin="dense"
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                    </FormGroup>
                                </TableCell>
                                <TableCell>
                                    <FormGroup>
                                        <FormLabel>Due Date</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            required
                                            id="dueDate"
                                            name="dueDate"
                                            label="Due Date"
                                            fullWidth
                                            margin="dense"
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                    </FormGroup>
                                </TableCell>
                            </TableRow>
                            {/* Form Add Product */}

                        </Table>
                    </Box>
                </Container>
            </FormControl>
        </div>
    )

}