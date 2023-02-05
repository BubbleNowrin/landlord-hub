import React from 'react';

const ExpensesTable = ({ expenses }) => {
    console.log(expenses);
    const { date, category, amount, description } = expenses;
    return (
        <tr>
            <td>{date}</td>
            <td>{category}</td>
            <td>{description}</td>
            <td>{amount}</td>
        </tr>
    );
};

export default ExpensesTable;