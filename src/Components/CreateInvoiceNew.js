import React, { useState } from 'react'
import { Paper, Box, Grid, TextField, Typography, Button, Container, FormControl, FormGroup, FormLabel, Table, TableRow, TableCell, TableBody, TableHead } from '@mui/material';
import { invoiceData } from '../utils/invoiceData';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formValidationSchema } from '../utils/formValidationSchema';
import * as Yup from 'yup';

export default function CreateInvoiceNew() {
    //set a blank Invoice Data in a Create Form state
    var [formData, setFormData] = useState({
        invoiceData
    }
    );


    // const formCalculation = (formDataInput) => {

    //     console.log(JSON.stringify(formDataInput))
    //     // formDataInput.map( (item) =>({ })
    //     // formDataInput.invoiceData.invoiceProductDetails.map((item) => ())
    //     var lineTotal =0;
    //     formDataInput.invoiceData.invoiceProductDetails.map((item) => 
        
    //     item.lineTotal=item.productQuantity*item.productPrice
    //     lineTotal=lineTotal+item.lineTotal
        
    //     )

    //     formDataInput.invoiceData.payment.totalAmount=lineTotal+ (lineTotal * (formDataInput.invoiceData.payment.tax/100)) - formDataInput.invoiceData.payment.discount
    //     // =lineTotal
    //     console.log(JSON.stringify(formDataInput))
    //     // return formDataInput
    // }
    //Update the current state with input value from a header component
    const handleHeaderInputChange = (e, ...elementName) => {
        var date = new Date(e);
        if (elementName[0] === "issueDate") {
            formData.invoiceData.issueDate = date.toLocaleDateString();
        }
        else if (elementName[0] === "dueDate") {
            formData.invoiceData.dueDate = date.toLocaleDateString();
        }
        else {
            const { name, value } = e.target

            if (name === "invoiceID")
                formData.invoiceData.invoiceID = value
            else if (name === "supplierName")
                formData.invoiceData.supplierName = value
            else if (name === "tax") {
                formData.invoiceData.payment.taxes = value
                // formCalculation(formData)
            }
            else if (name === "discount") {

                formData.invoiceData.payment.discount = value
                // formCalculation(formData)
            }
            else if (name === "comment") {
                formData.invoiceData.payment.comment = value
            }

        }
        setFormData(oldFormData => ({
            ...oldFormData,
            ...formData
        }))
        console.log(JSON.stringify(formData))
    }

    //Update the current state with input value from a Add product component
    const handleProductInputChange = (e, index) => {
        const { name, value } = e.target
        // const list = [...formData.invoiceData.invoiceProductDetails]
        // list[index][name] = value
        // setFormData(list)
        if (name === "productID") {
            formData.invoiceData.invoiceProductDetails[index].productID = value;
        }
        else if (name === "productName") {
            formData.invoiceData.invoiceProductDetails[index].productName = value;
        }
        else if (name === "productQuantity") {
            formData.invoiceData.invoiceProductDetails[index].productQuantity = value;
            // formCalculation(formData)
        }
        else if (name === "productPrice") {
            formData.invoiceData.invoiceProductDetails[index].productPrice = value;
            // formCalculation(formData)
        }
        // else if (name === "lineTotal")
        //     formData.invoiceData.invoiceProductDetails[index].lineTotal = value;
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

    // Delete the Product details Row
    const onDeleteBtnDelete = (e, index) => {
        //console.log("previous: ", JSON.stringify(formData))
        //console.log("index: ", index)
        formData.invoiceData.invoiceProductDetails = formData.invoiceData.invoiceProductDetails.filter((item, i) => {
            return i !== index;
        })

        setFormData(oldFormData => ({
            ...oldFormData,
            ...formData
        }))

        //console.log("after delete: ", JSON.stringify(formData))
    }

    // On Submit Form
    const onSubmitBtn = (index, e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData))
    }

    //Passing the validation rules in react hook form using yup Resolver function
    //YupResolver take in custom validation for the create ivoice form
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(formValidationSchema)
    });



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
                                mt: 2,
                                p: 2,
                            }}>
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={3} sx={{ textAlign: 'left' }}>
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
                                            {...register('invoiceID')}
                                            error={errors.invoiceID ? true : false}
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                        <Typography color="textSecondary" sx={{ fontSize: '10px' }}>
                                            {errors.invoiceID?.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} sx={{ textAlign: 'left' }}>
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
                                            {...register('supplierName')}
                                            error={errors.supplierName ? true : false}
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                        <Typography color="textSecondary" sx={{ fontSize: '10px' }}>
                                            {errors.supplierName?.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} sx={{ textAlign: 'left' }}>
                                        <FormLabel>Issue Date</FormLabel>
                                        <LocalizationProvider id dateAdapter={AdapterDayjs}>
                                            <Controller name="issueDate"
                                                control={control}
                                                defaultValue={null}
                                                render={({
                                                    fieldState: { invalid }
                                                }) => (
                                                    <DatePicker
                                                        disableFuture
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                        value={formData.invoiceData.issueDate}
                                                        onChange={(e) => handleHeaderInputChange(e, "issueDate")}
                                                        renderInput={(params) => <TextField {...params}
                                                            {...register('issueDate')}
                                                            error={invalid}
                                                            sx={{ bgcolor: 'white', marginTop: '7px', marginBottom: '7px' }} size="small" />}
                                                    />
                                                )} />
                                        </LocalizationProvider>
                                        <Typography sx={{ fontSize: '10px' }} color="textSecondary">
                                            {errors.issueDate?.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} sx={{ textAlign: 'left' }}>
                                        <FormLabel>Due Date</FormLabel>
                                        <LocalizationProvider id dateAdapter={AdapterDayjs}>
                                            <Controller name="dueDate"
                                                control={control}
                                                defaultValue={null}
                                                render={({
                                                    fieldState: { invalid }
                                                }) => (
                                                    <DatePicker
                                                        disableFuture
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                        value={formData.invoiceData.dueDate}
                                                        onChange={(e) => handleHeaderInputChange(e, "dueDate")}
                                                        renderInput={(params) => <TextField {...params}
                                                            {...register('dueDate')}
                                                            error={invalid}
                                                            sx={{ bgcolor: 'white', marginTop: '7px', marginBottom: '7px' }} size="small" />}
                                                    />
                                                )} />
                                        </LocalizationProvider>
                                        <Typography sx={{ fontSize: '10px' }} color="textSecondary">
                                            {errors.dueDate?.message}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Create Invoice Add new Product  */}
                            <Box mt={3} sx={{ bgcolor: '#DFECC3', boxShadow: 1, borderRadius: 2, p: 2, }}>
                                <Grid container spacing={1} sx={{ overflowX: "auto" }}>
                                    {/*Header of the Add new Product Component  */}
                                    <Grid container >
                                        <Grid item xs={1.5} sm={1.5} sx={{ textAlign: 'left' }}>
                                            <FormLabel>Product ID</FormLabel>
                                        </Grid>
                                        <Grid item xs={5} sm={5} sx={{ textAlign: 'left' }}>
                                            <FormLabel>Product Name</FormLabel>
                                        </Grid>
                                        <Grid item xs={1} sm={1} sx={{ textAlign: 'left' }}>
                                            <FormLabel>Quantity</FormLabel>
                                        </Grid>
                                        <Grid item xs={1.5} sm={1.5} sx={{ textAlign: 'left' }}>
                                            <FormLabel>Price</FormLabel>
                                        </Grid>
                                        <Grid item xs={1.5} sm={1.5} sx={{ textAlign: 'left' }}>
                                            <FormLabel>Amount</FormLabel>
                                        </Grid>
                                    </Grid>

                                    {/* Iterating Row of add product detail */}
                                    <Grid container sx={{ overflowY: "auto", maxHeight: "250px", }}>
                                        {invoiceData.invoiceProductDetails.map((item, index) => (

                                            <>
                                                {/* {console.log(index)} */}
                                                <Grid container spacing={1} key={index}>
                                                    <Grid item xs={1.5} sm={1.5}>
                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                                width: '40'
                                                            }}
                                                            required
                                                            id={"productID"+index}
                                                            name="productID"
                                                            margin="dense"
                                                            size="small"
                                                            {...register('productID'+index)}
                                                            error={errors.productID+index ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)} />
                                                        <Typography sx={{ fontSize: '10px' }} color="textSecondary">
                                                            {errors.productID+index?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={5} sm={5}>
                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id={"productName"+index}
                                                            name="productName"
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            {...register('productName'+index)}
                                                            error={errors.productName+index ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)} />
                                                        <Typography sx={{ fontSize: '10px' }} color="textSecondary">
                                                            {errors.productName+index?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} sm={1}>

                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id={"productQuantity"+index}
                                                            name="productQuantity"
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            {...register('productQuantity'+index)}
                                                            error={errors.productName+index ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                        <Typography sx={{ fontSize: '10px' }} color="textSecondary">
                                                            {errors.productQuantity+index?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1.5} sm={1.5}>
                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id={"productPrice"+index}
                                                            name="productPrice"
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            {...register('productPrice'+index)}
                                                            error={errors.productPrice+index ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                        <Typography sx={{ fontSize: '10px' }} color="textSecondary">
                                                            {errors.productPrice+index?.message}
                                                        </Typography>
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
                                                            // value={formData.invoiceData.invoiceProductDetails[index].lineTotal}
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={0.5} sm={0.5}>
                                                        <Button
                                                            variant="text"
                                                            color="primary"
                                                            key={index}
                                                            onClick={(e) => onDeleteBtnDelete(e, index)}
                                                        >
                                                            Remove
                                                        </Button>

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
                                    <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
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
                                            {...register('tax')}
                                            error={errors.tax ? true : false}
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                        <Typography sx={{ fontSize: '10px' }} color="textSecondary">
                                            {errors.tax?.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
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
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
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
                                    <Grid item xs={12} sm={12} sx={{ textAlign: 'left' }}>
                                        <FormLabel sx={{}}>Comment</FormLabel>
                                        <TextField
                                            sx={{
                                                bgcolor: 'white',
                                            }}
                                            id="comment"
                                            name="comment"
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                            onChange={(e) => handleHeaderInputChange(e)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit(onSubmitBtn)}
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