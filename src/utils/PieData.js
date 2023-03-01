export  const InvoiceData = [
  {

    invoiceID: 1,
    supplierName: "A",
    issueDate: "02/28/2023",
    dueDate: "04/28/2023",
    status:"PENDING",
    payment: {
        tax: 10,
        discount: 0,
        comment: "",
        totalAmount: 90
    },
    invoiceProductDetails: [{
        productID: 1,
        productName: "A",
        productQuantity: 10,
        productPrice: 10,
        lineTotal: 100
    }]
},
    {

      invoiceID: 2,
      supplierName: "B",
      issueDate: "02/28/2023",
      dueDate: "02/28/2023",
      status:"APPROVED",
      payment: {
          tax: 10,
          discount: 0,
          comment: "",
          totalAmount: 90
      },
      invoiceProductDetails: [{
          productID: 1,
          productName: "B",
          productQuantity: 10,
          productPrice: 10,
          lineTotal: 100
      }]
  },
    {

      invoiceID: 3,
      supplierName: "C",
      issueDate: "02/28/2023",
      dueDate: "02/28/2023",
      status:"REJECTED",
      payment: {
          tax: 10,
          discount: 0,
          comment: "",
          totalAmount: 90
      },
      invoiceProductDetails: [{
          productID: 1,
          productName: "C",
          productQuantity: 10,
          productPrice: 10,
          lineTotal: 100
      }]
  }
  ];

