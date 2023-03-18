import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

const data = [
  { month: 'Jan', cashflow: 1000 },
  { month: 'Feb', cashflow: 1200 },
  { month: 'Mar', cashflow: 800 },
  { month: 'Apr', cashflow: 1500 },
  { month: 'May', cashflow: 900 },
  { month: 'Jun', cashflow: 1100 },
  { month: 'Jul', cashflow: 1400 },
  { month: 'Aug', cashflow: 1700 },
  { month: 'Sep', cashflow: 1300 },
  { month: 'Oct', cashflow: 1600 },
  { month: 'Nov', cashflow: 1800 },
  { month: 'Dec', cashflow: 2000 },
];

const CashFlowChart = ({ properties, allMonths, year }) => {
  // const cashFlow = payments - expenses;
  // const data = [
  //     { month: 'Jan', cashflow: cashFlow },
  // ];


  console.log(allMonths);

  return (
    <div>
      <VictoryChart>
        <VictoryLine data={allMonths} x="month" y="cashFlow" />
        <VictoryAxis
          label="Month"
          width={200}
          style={{ axisLabel: { padding: 35 } }}
          tickValues={allMonths?.map((calc) =>
            new Date(Date(0, calc.month - 1)).toLocaleString("default", {
              month: "short",
            })
          )}
        />
        <VictoryAxis
          dependentAxis
          label="Cashflow ($)"
          width={200}
          style={{ axisLabel: { padding: 40 } }}
        // tickValues={allMonths?.map((calc) => calc?.month)}
        />
      </VictoryChart>
    </div>
  );
};

export default CashFlowChart;

// import React, { useState } from 'react';
// import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

// const data = [
//     { month: 'Jan', cashflow: 1000 },
//     { month: 'Feb', cashflow: 1200 },
//     { month: 'Mar', cashflow: 800 },
//     { month: 'Apr', cashflow: 1500 },
//     { month: 'May', cashflow: 900 },
//     { month: 'Jun', cashflow: 1100 },
//     { month: 'Jul', cashflow: 1400 },
//     { month: 'Aug', cashflow: 1700 },
//     { month: 'Sep', cashflow: 1300 },
//     { month: 'Oct', cashflow: 1600 },
//     { month: 'Nov', cashflow: 1800 },
//     { month: 'Dec', cashflow: 2000 },
// ];

// const CashFlowChart = ({ expenses, payments, allMonth, calculations }) => {

//     // const e = calculations?.map(calc => calc?.map(d => d?.date))
//     // console.log(e);

//     console.log(allMonth);



//     return (
//         <VictoryChart>
//             <VictoryLine data={data} x="month" y="cashflow" />
//             <VictoryAxis
//                 label="Month"
//                 style={{ axisLabel: { padding: 35 } }}
//                 tickValues={data.map((d) => d.month)}
//             />
//             <VictoryAxis
//                 dependentAxis
//                 label="Cashflow ($)"
//                 style={{ axisLabel: { padding: 40 } }}
//             />
//         </VictoryChart>
//     );
// };

// export default CashFlowChart;
