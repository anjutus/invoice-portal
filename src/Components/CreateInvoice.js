import React, { useState } from "react";
import { Paper, Box, Grid, TextField, Typography, Button, Container } from '@mui/material';

//Add new Product component
const AddNewProduct = () => {
    return (<Grid container spacing={1}>
                <Grid item xs={6} sm={1.5}>
                    <TextField
                        sx={{
                            bgcolor: 'white',
                            }}
                        required
                        id="productId"
                        name="productId"
                        label="Product ID"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        sx={{
                            bgcolor: 'white',
                        }}
                        required
                        id="productName"
                        name="productName"
                        label="Product Name"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={1.5}>
                    <TextField
                        sx={{
                            bgcolor: 'white',
                        }}
                        required
                        id="quantity"
                        name="quantity"
                        label="Quantity"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        sx={{
                            bgcolor: 'white',
                        }}
                        required
                        id="price"
                        name="price"
                        label="Price"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        sx={{
                            bgcolor: 'white',
                        }}
                        required
                        id="amount"
                        name="amount"
                        label="Amount"
                        fullWidth
                        margin="dense"
                    />
                </Grid>
            </Grid>);
};

export default function CreateInvoice() {


    const [newAddProductList, setnewAddProductList] = useState([]);

    //Add new Product button event
    const onAddBtnClick = event => {
        setnewAddProductList(newAddProductList.concat(<AddNewProduct key={AddNewProduct.length} />));
    };

    const [quantity, setquantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState(null);
    const [tax, setTax] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    // function displayAmount(){
    //     setAmount(Number(quantity)*Number(price))
    // }

    return (
        <Container sx={{ pt: 4}}  >
            <Paper >
                <Box px={3} py={2} sx={{backgroundColor: '#FFFDEB' }}>
                    <Typography variant="h6" align="center" margin="dense">
                        Create new Invoice
                    </Typography>
                    {/* Invoice Header */}
                    <Box sx={{
                            bgcolor: '#DFECC3',
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 2,
                            }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="invoiceId"
                                    name="invoiceId"
                                    label="Invoice ID"
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
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
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
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
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Create Invoice Add new Product  */}
                    <Box mt={3} sx={{ bgcolor: '#DFECC3', boxShadow: 1, borderRadius: 2, p: 2, }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={1.5}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="productId"
                                    name="productId"
                                    label="Product ID"
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="productName"
                                    name="productName"
                                    label="Product Name"
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} sm={1.5}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="quantity"
                                    name="quantity"
                                    label="Quantity"
                                    fullWidth
                                    margin="dense"
                                    onChange={(event)=>{
                                        setquantity(event.target.value);
                                    }}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="price"
                                    name="price"
                                    label="Price"
                                    fullWidth
                                    margin="dense"
                                    onChange={(event)=>{
                                        setPrice(event.target.value);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    id="amount"
                                    name="amount"
                                    label="Amount"
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>

                            {newAddProductList}
                            <Box mt={3} marginLeft={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onAddBtnClick}
                                >
                                    Add New Product
                                </Button>
                            </Box>
                        </Grid>
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
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="tax"
                                    name="tax"
                                    label="Tax"
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="discount"
                                    name="discount"
                                    label="Discount"
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    required
                                    id="totalAmount"
                                    name="totalAmount"
                                    label="Total Amount"
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    sx={{
                                        bgcolor: 'white',
                                    }}
                                    id="comment"
                                    name="comment"
                                    label="Comment"
                                    fullWidth
                                    margin="dense"
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
    );
};
