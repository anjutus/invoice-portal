import React, { useState,useCallback } from 'react'
import { Paper, Box, Grid, TextField, Typography, Button, Container, FormControl, FormLabel } from '@mui/material';
import { invoiceData } from '../utils/invoiceData';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formValidationSchema } from '../utils/formValidationSchema';
import { FormCalculation } from '../utils/FormCalculation';
import PercentIcon from '@mui/icons-material/Percent';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function CreateInvoiceNew() {
    //set a blank Invoice Data in a Create Form state
    var [formData, setFormData] = useState({
        invoiceData
    }
    );

    //Update the current state with input value from a header component
    const handleHeaderInputChange = (e, ...elementName) => {
        var date = new Date(e);
        //console.log(e);
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
                formData.invoiceData.payment.tax = value
                FormCalculation(formData)
            }
            else if (name === "discount") {

                formData.invoiceData.payment.discount = value
                FormCalculation(formData)
            }
            else if (name === "comment") {
                formData.invoiceData.payment.comment = value
            }

        }
        setFormData(oldFormData => ({
            ...oldFormData,
            ...formData
        }))
        //console.log(JSON.stringify(formData))
    }

    //Update the current state with input value from a Add product component

    const handleProductInputChange = (e, index) => {
        const { name, value } = e.target

        setFormData((prevFormData)=>{
            const newFormData={...prevFormData}
            if (name === ('invoiceProductDetails.' + index + '.productID')) {
                formData.invoiceData.invoiceProductDetails[index].productID = value;
            }
            else if (name === ('invoiceProductDetails.' + index + '.productName')) {
                formData.invoiceData.invoiceProductDetails[index].productName = value;
            }
            else if (name === ('invoiceProductDetails.' + index + '.productQuantity')) {
                formData.invoiceData.invoiceProductDetails[index].productQuantity = value;
                FormCalculation(formData)
            }
            else if (name === ('invoiceProductDetails.' + index + '.productPrice') && !Number.isNaN(value)) {
                formData.invoiceData.invoiceProductDetails[index].productPrice = value;
                FormCalculation(formData)
            }
            else if (name === "lineTotal" && !Number.isNaN(value)){
                formData.invoiceData.invoiceProductDetails[index].lineTotal = value;
            }
           return newFormData
        })
    }

    //Add new product button appends a new Product component 
    const onAddBtnClick = useCallback((e, index) => {
        e.preventDefault()

        setFormData((prevFormData)=>{
            const newFormData={...prevFormData}
            newFormData.invoiceData.invoiceProductDetails.push({

                productID: "",
                productName: "",
                productQuantity: "",
                productPrice: "",
                lineTotal: 0
            })
           return newFormData
        })

    },[formData])

    // Delete the Product details Row
    const onDeleteBtnDelete = useCallback( (e, index) => {  
        setFormData((prevFormData)=>{
            const newFormData={...prevFormData}
            newFormData.invoiceData.invoiceProductDetails=formData.invoiceData.invoiceProductDetails.filter((item, i) => {
                    return i !== index;
                 })
                 return newFormData
        })
    },[formData]);

    // On Submit Form
    //Call an API to post the data into MongoDB
    const url = `https://esqsuiva17.execute-api.us-east-2.amazonaws.com/Devlopment/invoice`;

    const header = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    }

    const navigate = useNavigate();
    const onSubmitBtn = async (index, e) => {
        // console.log("Previous insertedId" + JSON.stringify(response));

        const response = await axios.post(url, formData, header);
        console.log("insertedId" + JSON.stringify(response.data.insertedId));
        console.log("ACK" + JSON.stringify(response.data.acknowledged));
        console.log("status " + JSON.stringify(response.status));
        // console.log(JSON.stringify(formData))
        console.log("Submitted!!!")
        if(response.data.acknowledged && (response.data.insertedId !== ""))
        {
            navigate("/viewSingleInvoice",{ state: response.data.insertedId });
        }
        else {
            console.log("Didnt navigate")
        }
        
    }

    //Passing the validation rules in react hook form using yup Resolver function
    //YupResolver take in custom validation for the create ivoice form
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
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
                                        <Typography color="error" sx={{ fontSize: '10px' }}>
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
                                        <Typography color="error" sx={{ fontSize: '10px' }}>
                                            {errors.supplierName?.message}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3} sx={{ textAlign: 'left' }}>
                                        <FormLabel>Issue Date</FormLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                                            error={invalid}
                                                            sx={{ bgcolor: 'white', marginTop: '7px', marginBottom: '7px' }} size="small" />}
                                                    />
                                                )} />
                                        </LocalizationProvider>
                                        <Typography sx={{ fontSize: '10px' }} color="error">
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
                                                        openTo="year"
                                                        views={['year', 'month', 'day']}
                                                        value={formData.invoiceData.dueDate}
                                                        onChange={(e) => handleHeaderInputChange(e, "dueDate")}
                                                        renderInput={(params) => <TextField {...params}
                                                            error={invalid}
                                                            sx={{ bgcolor: 'white', marginTop: '7px', marginBottom: '7px' }} size="small" />}
                                                    />
                                                )} />
                                        </LocalizationProvider>
                                        <Typography sx={{ fontSize: '10px' }} color="error">
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

                                            <React.Fragment key={`invoiceProductDetails.${index}.productID`}>
                                                {/* {console.log(index)} */}
                                                <Grid container spacing={1} key={`invoiceProductDetails.${index}.productID`}>
                                                    <Grid item xs={1.5} sm={1.5} key={"productID"+index}>
                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                                width: '40'
                                                            }}
                                                            required
                                                            id={"productID" + index}
                                                            name="productID"
                                                            value={(item.productID===0)?"":item.productID}
                                                            margin="dense"
                                                            size="small"
                                                            {...register(`invoiceProductDetails.${index}.productID`)}
                                                            error={errors.invoiceProductDetails?.[index]?.productID ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)} />
                                                        <Typography sx={{ fontSize: '10px' }} color="error">
                                                            {errors.invoiceProductDetails?.[index]?.productID?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={5} sm={5}  key={"productName"+index}>
                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id={"productName" + index}
                                                            name="productName"
                                                            value={item.productName}
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            {...register(`invoiceProductDetails.${index}.productName`)}
                                                            error={errors.invoiceProductDetails?.[index]?.productName ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)} />
                                                        <Typography sx={{ fontSize: '10px' }} color="error">
                                                            {errors.invoiceProductDetails?.[index]?.productName?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1} sm={1}  key={"productQuantity"+index}>

                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id={"productQuantity" + index}
                                                            name="productQuantity"
                                                            value={(item.productQuantity===0)? "" :item.productQuantity}
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            {...register(`invoiceProductDetails.${index}.productQuantity`)}
                                                            error={errors.invoiceProductDetails?.[index]?.productQuantity ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                        <Typography sx={{ fontSize: '10px' }} color="error">
                                                            {errors.invoiceProductDetails?.[index]?.productQuantity?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1.5} sm={1.5}  key={"productPrice"+index}>
                                                        <TextField
                                                            sx={{
                                                                bgcolor: 'white',
                                                            }}
                                                            required
                                                            id={"productPrice" + index}
                                                            name="productPrice"
                                                            value={(item.productPrice===0)?"":item.productPrice}
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            {...register(`invoiceProductDetails.${index}.productPrice`)}
                                                            error={errors.invoiceProductDetails?.[index]?.productPrice ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                        />
                                                        <Typography sx={{ fontSize: '10px' }} color="error">
                                                            {errors.invoiceProductDetails?.[index]?.productPrice?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={1.5} sm={1.5} key={"lineTotal"+index}>
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
                                                            key={"lineTotal"+index}
                                                            // value={currencyFormatter.format(formData.invoiceData.invoiceProductDetails[index].lineTotal, { code: 'USD' })}
                                                            value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(formData.invoiceData.invoiceProductDetails[index].lineTotal)}
                                                            {...register(`invoiceProductDetails.${index}.lineTotal`)}
                                                            error={errors.invoiceProductDetails?.[index]?.lineTotal ? true : false}
                                                            onChange={(e) => handleProductInputChange(e, index)}
                                                            disabled={true}
                                                        />
                                                        <Typography sx={{ fontSize: '10px' }} color="error">
                                                            {errors.invoiceProductDetails?.[index]?.lineTotal?.message}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={0.5} sm={0.5} key={"button"+index}>
                                                        <Button
                                                            variant="text"
                                                            color="primary"
                                                            onClick={(e) => onDeleteBtnDelete(e, index)}
                                                        >
                                                            Remove
                                                        </Button>

                                                    </Grid></Grid> </React.Fragment>
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
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment disableTypography position="end" >
                                                        <PercentIcon sx={{ fontSize: '15px' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Typography sx={{ fontSize: '10px' }} color="error">
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
                                            // value={currencyFormatter.format(formData.invoiceData.payment.totalAmount, { code: 'USD' })}
                                            value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(formData.invoiceData.payment.totalAmount)}
                                            {...register('totalAmount')}
                                            error={errors.totalAmount ? true : false}
                                            disabled={true}
                                        >

                                        </TextField>
                                        <Typography color="error" sx={{ fontSize: '10px' }}>
                                            {errors.totalAmount?.message}
                                        </Typography>
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
