export function InvoicesStats(data) {
    var approvedCount=0;
    var pendingCount=0;
    var rejectedCount=0; 
    var approvedAmount=0;
    var pendingAmount=0;
    var rejectedAmount = 0;
    data.map((item) => {

        if ((item.invoiceData.status === "PENDING")) {
            pendingCount = pendingCount + 1;
            pendingAmount = item.invoiceData.payment.totalAmount+ pendingAmount;

        } else if ((item.invoiceData.status === "APPROVED")) {

            approvedCount = approvedCount + 1;
            approvedAmount = item.invoiceData.payment.totalAmount + approvedAmount;
        } else if ((item.invoiceData.status === "REJECTED")) {

            rejectedCount = rejectedCount + 1;
            rejectedAmount = item.invoiceData.payment.totalAmount + rejectedAmount;
        }
    })
    console.log( "approvedCount"+approvedCount);
    console.log( "approvedAmount"+approvedAmount);
    const invoicesStats = {
        "approvedCount": approvedCount,
        "pendingCount": pendingCount,
        "rejectedCount": rejectedCount,
        "approvedAmount": approvedAmount,
        "pendingAmount": pendingAmount,
        "rejectedAmount": rejectedAmount
    }
    return invoicesStats
}