import React from 'react';

const ExpensesTable = ({ expenses }) => {
    console.log(expenses);
    const { date, category, amount, description } = expenses;
    return (
        <tr>
            <td>{date}</td>
            <td>{category}</td>
            <td>{amount}</td>
            <td>{description}</td>
        </tr>
    );
};

export default ExpensesTable;