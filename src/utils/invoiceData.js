export const invoiceData = 
    {

        invoiceID: 0,
        supplierName: "",
        issueDate: "",
        dueDate: "",
        status:"",
        payment: {
            taxes: 0,
            discount: 0,
            comment: "",
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

