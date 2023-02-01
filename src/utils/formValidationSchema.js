
//Form validation using Yup schema validation library
import * as Yup from 'yup';

export const formValidationSchema = Yup.object().shape({
    invoiceID: Yup.number()
    .transform((_, val) => (val !== "" ? Number(val) : null))
    .nullable()
    .typeError('Invoice ID should be Numeric')
    .required('Invoice ID number is required'),
    supplierName: Yup.string()
   .required('Supplier Name is required'),
   issueDate: Yup.mixed()
   .required('Issue Date is required'),
   dueDate: Yup.mixed()
   .required('Due Date is required'),

   invoiceProductDetails: Yup.array().of(
    Yup.object().shape({
    productID :Yup.number()
    .required('Product ID is required')
    .typeError('Invoice ID should be Numeric')
    .transform((_, val) => (val !== "" ? Number(val) : null))
    .nullable(),
    productName :Yup.string()
    .required('Product Name is required'),
    productQuantity :Yup.number()
    .required('Product quantity is required')
    .typeError('Invoice ID should be Numeric')
    .transform((_, val) => (val !== "" ? Number(val) : null))
    .nullable(),
    productPrice :Yup.number()
    .required('Product price is required')
    .typeError('Please enter correct price')
    .transform((_, val) => (val !== "" ? Number(val) : null))
    .nullable(),
    lineTotal :Yup.number()
    .typeError('Please enter correct price')
    .transform((_, val) => (val !== "" ? Number(val) : null))
    .nullable(),
    })),
    tax :Yup.number()
    .required('Tax details is required')
    .transform((_, val) => (val !== "" ? Number(val) : null))
    .nullable(),
    totalAmount :Yup.number()
    .required('Invoice Total cannot be less than zero')
    .test(
      'Is positive?', 
      'ERROR: Invoice Total cannot be less than zero', 
      (value) => value > 0
    )
  });