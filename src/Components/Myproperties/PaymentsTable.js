import React from 'react';

const PaymentsTable = ({ payments }) => {

    const { date, category, amount, description } = payments;

    return (
        <tr>
            <td>{date}</td>
            <td>{category}</td>
            <td>{amount}</td>
            <td>{description}</td>
        </tr>
    );
};

export default PaymentsTable;