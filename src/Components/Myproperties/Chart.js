import React from 'react';
import { VictoryPie } from 'victory';



const Chart = ({ total, expenses, payments }) => {

    console.log(expenses);
    const data = [
        { x: "Total Expenses", y: expenses },
        { x: "Total Payments", y: payments },
        { x: "Total", y: total }
    ];

    return (
        <VictoryPie
            data={data}
            innerRadius={80}
            width={900}
            colorScale={["#4CAF50", "#2196F3", "#9E9E9E"]}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            style={{

                data: {
                    stroke: "white",
                    strokeWidth: 10
                },
                labels: {
                    fill: "black",
                    fontSize: 12
                }
            }}
        />

    );
};

export default Chart;
