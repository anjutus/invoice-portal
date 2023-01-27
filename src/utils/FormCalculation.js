export function FormCalculation(data) {
  

    var lineTotal = 0;
    data.invoiceData.invoiceProductDetails.map((item) => {
      if ((data.invoiceData.payment.tax >= "1")) {
        item.lineTotal = item.productQuantity * item.productPrice;
        return (
          lineTotal = lineTotal + item.lineTotal
        )
      }
      else return item.lineTotal = item.productQuantity * item.productPrice;

    })
    if (data.invoiceData.payment.tax >= "1") {
      data.invoiceData.payment.totalAmount = (lineTotal - (lineTotal * (data.invoiceData.payment.tax / 100))) + +data.invoiceData.payment.discount;
    }
    return data
  }
