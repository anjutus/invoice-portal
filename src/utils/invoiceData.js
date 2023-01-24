export const Invoices = [
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
            name: "",
            quantity: 0,
            price: 0,
            lineTotal: 0
        }]
    }
]
