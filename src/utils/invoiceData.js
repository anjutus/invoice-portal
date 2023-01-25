export const invoiceData = 
    {

        invoiceID: 0,
        supplierName: "",
        issueDate: "",
        dueDate: "",
        comments: "",
        status:"",
        payment: {
            taxes: 0,
            discount: 0,
            totalAmount: 0
        },
        invoiceProductDetails: [{
            productID: 0,
            productName: "",
            productQuantity: 0,
            productPrice: 0,
            lineTotal: 0
        }]
    }

