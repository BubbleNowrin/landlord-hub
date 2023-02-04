import React from 'react';
import { VictoryPie } from 'victory';

const data = [
    { x: "A", y: 35 },
    { x: "B", y: 40 },
    { x: "C", y: 55 },
    { x: "D", y: 20 }
];

const Chart = () => {
    return (
        <VictoryPie
            data={data}
            innerRadius={100}
            colorScale={["#4CAF50", "#2196F3", "#FF5722", "#9E9E9E"]}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            style={{
                data: {
                    stroke: "white",
                    strokeWidth: 2
                },
                labels: {
                    fill: "red",
                    fontSize: 12
                }
            }}
        />
    );
};

export default Chart;
