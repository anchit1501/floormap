import React from 'react'
import OrderInvoice from './OrderInvoice'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Detailed from './Detailed';

export default function Report() {
    return (
        <div>
            <Detailed />
            <OrderInvoice />
        </div>
    )
}
