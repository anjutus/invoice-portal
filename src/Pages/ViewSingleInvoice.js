/*
*Implentation of API call for get Single invoice and displaying it using ViewInvoiceComponent
**@author: Anju Tuscano

*/

import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ViewInvoiceDetails from '../Components/ViewSingleInvoice/ViewInvoiceDetails';

export default function ViewSingleInvoice() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    //state param contains the value InsertID received from response after successful insertion of Invoice in DB 
    const { state } = useLocation();
    //API call for retrieving single invoice
    const url = `https://esqsuiva17.execute-api.us-east-2.amazonaws.com/default/invoice/${state}`;

    useEffect(() => {
        axios.get(url).then(response => {
          setData(response.data);
          setLoading(false);
        });
      }, []);
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
      }

    return (
        <div>
            <ViewInvoiceDetails invoicedata={data}></ViewInvoiceDetails>
        </div>
    )
};