import React, { useState } from 'react'
import { Paper, Box, Grid, TextField, Typography, Button, Container, FormControl, FormGroup, FormLabel, Table, TableRow, TableCell, TableBody, TableHead } from '@mui/material';
import { invoiceData } from '../utils/invoiceData';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CreateInvoiceNew() {
    //set a blank Invoice Data in a Create Form state
    var [formData, setFormData] = useState({
        invoiceData
    }
    );

    //Update the current state with input value from a header component
    const handleHeaderInputChange = (e, ...elementName) => {

        if (elementName[0] === "issueDate")
            formData.invoiceData.issueDate = e;
        else if (elementName[0] === "dueDate")
            formData.invoiceData.dueDate = e
        else {
            const { name, value } = e.target

            if (name === "invoiceID")
                formData.invoiceData.invoiceID = value
            else if (name === "supplierName")
                formData.invoiceData.supplierName = value
            //console.log(formData.invoiceData)
        }
    }

    //Update the current state with input value from a Add product component
    const handleProductInputChange = (e, index) => {
        const { name, value } = e.target
        // const list = [...formData.invoiceData.invoiceProductDetails]
        // list[index][name] = value
        // setFormData(list)
        if (name === "productID")
            formData.invoiceData.invoiceProductDetails[index].productID=value;
        else if (name === "productName")
             formData.invoiceData.invoiceProductDetails[index].productName=value;
        else if (name === "productQuantity")  
            formData.invoiceData.invoiceProductDetails[index].productQuantity=value;
        else if (name === "productPrice")  
            formData.invoiceData.invoiceProductDetails[index].productPrice=value;
        else if (name === "lineTotal")  
            formData.invoiceData.invoiceProductDetails[index].lineTotal=value;
        //console.log( JSON.stringify(formData))
        setFormData(oldFormData => ({
            ...oldFormData,
            ...formData
        }))
    }

    //Add new product button appends a new Product component 
    const onAddBtnClick = (e, index) => {
        //console.log("Start ", formData)
        e.preventDefault()
        
        
        formData.invoiceData.invoiceProductDetails.push({

            productID: 0,
            productName: "",
            productQuantity: 0,
            productPrice: 0,
            lineTotal: 0
        })
        //Sets new state of the appended product details component to a current state
        setFormData(oldFormData => ({
            ...oldFormData,
            ...formData
        }))
        //console.log("End ",formData)

    }

    return (
        <div>
            <FormControl>
                <Container sx={{ pt: 4 }}  >
                    <Paper >
                        <Box px={3} py={2} sx={{ backgroundColor: '#FFFDEB' }}>
                            <Typography variant="h6" align="center" margin="dense">
                                Create new Invoice
                            </Typography>
                            {/* Invoice Header */}
                            <Box sx={{
                                bgcolor: '#DFECC3',
                                boxShadow: 1,
                                borderRadius: 2,
                                mt:2,
                                p: 2,
                            }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={3}>
                                        <FormLabel>Invoice ID </FormLabel>
                                        <TextField sx={{
                                            bgcolor: 'white',
                                        }}
                                            required
                                            id="invoiceID"
                                            name="invoiceID"
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        ></TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormLabel>Supplier Name</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            required
                                            id="supplierName"
                                            name="supplierName"
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormLabel>Issue Date</FormLabel>
                                        <LocalizationProvider id dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                disableFuture
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                onChange={(e) => handleHeaderInputChange(e, "issueDate")}
                                                renderInput={(params) => <TextField {...params} sx={{ bgcolor: 'white',marginTop : '7px' }} size="small" />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormLabel>Due Date</FormLabel>
                                        <LocalizationProvider id dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                disableFuture
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                onChange={(e) => handleHeaderInputChange(e, "dueDate")}
                                                renderInput={(params) => <TextField {...params} sx={{ bgcolor: 'white',marginTop : '7px'  }} size="small" />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Create Invoice Add new Product  */}
                            <Box mt={3} sx={{ bgcolor: '#DFECC3', boxShadow: 1, borderRadius: 2, p: 2, }}>
                                <Grid container spacing={1} sx={{overflowX: "auto" ,width :"800"}}>

                                    <Grid container direction="row" >
                                        <Grid item xs={1.5} sm={1.5}>
                                            <FormLabel>Product ID</FormLabel>
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <FormLabel>Product Name</FormLabel>
                                        </Grid>
                                        <Grid item xs={1.5} sm={1.5}>
                                            <FormLabel>Quantity</FormLabel>
                                        </Grid>
                                        <Grid item xs={1.5} sm={1.5}>
                                            <FormLabel>Price</FormLabel>
                                        </Grid>
                                        <Grid item xs={1.5} sm={1.5}>
                                            <FormLabel>Amount</FormLabel>
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid container sx={{overflowY: "scroll", maxHeight: "250px",}}>
                                        {invoiceData.invoiceProductDetails.map((item, index) => (
                                            <> <Grid container spacing={1} key={index}>
                                                <Grid item xs={1.5} sm={1.5}>
                                                    <TextField
                                                        sx={{
                                                            bgcolor: 'white',
                                                            width: '40'
                                                        }}
                                                        required
                                                        id="productID"
                                                        name="productID"
                                                        margin="dense"
                                                        size="small"
                                                        onChange={(e) => handleProductInputChange(e, index)} />
                                                </Grid>
                                                <Grid item xs={6} sm={6}>
                                                    <TextField
                                                        sx={{
                                                            bgcolor: 'white',
                                                        }}
                                                        required
                                                        id="productName"
                                                        name="productName"
                                                        fullWidth
                                                        margin="dense"
                                                        size="small"
                                                        onChange={(e) => handleProductInputChange(e, index)} />
                                                </Grid>
                                                <Grid item xs={1.5} sm={1.5}>
                                                
                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id="productQuantity"
                                                            name="productQuantity"
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                </Grid>
                                                <Grid item xs={1.5} sm={1.5}>
                                                <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id="productPrice"
                                                            name="productPrice"
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                </Grid>
                                                <Grid item xs={1.5} sm={1.5}>
                                                <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id="lineTotal"
                                                            name="lineTotal"
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                </Grid></Grid> </>
                                        ))}
                                    </Grid>     
                                    </Grid>
                                    <Box mt={3} marginLeft={2}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={onAddBtnClick}
                                            >
                                                Add New Product
                                            </Button>
                                        </Box>
                                
                            </Box>

                            {/* Create Invoice Payment */}
                            <Box mt={3} sx={{
                                bgcolor: '#DFECC3',
                                boxShadow: 1,
                                borderRadius: 2,
                                p: 2,
                            }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={4}>
                                    <FormLabel>Tax</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            required
                                            id="tax"
                                            name="tax"
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                    <FormLabel>Discount</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            required
                                            id="discount"
                                            name="discount"
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                    <FormLabel>Total Amount</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            required
                                            id="totalAmount"
                                            name="totalAmount"
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                    <FormLabel sx={{justifyContent:'left'}}>Comment</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            id="comment"
                                            name="comment"
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    color="primary"

                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </FormControl>
        </div>
    )

}