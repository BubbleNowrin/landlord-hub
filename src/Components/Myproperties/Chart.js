// import React from 'react';
// import { VictoryLabel, VictoryPie } from 'victory';



// const Chart = ({ total, expenses, payments, cashflow }) => {

//     // console.log(expenses);
//     const data = [
//         { x: "Payments", y: payments },
//         { x: "Expenses", y: expenses }

//     ];



//     return (
//         <div className='relative'>
//             <VictoryPie
//                 data={data}
//                 innerRadius={80}
//                 width={300}
//                 colorScale={["#4CAF50", "#FF0000"]}
//                 labels={({ datum }) => `${datum.x}: ${datum.y}`}
//                 style={{
//                     data: {
//                         stroke: "white",
//                         strokeWidth: 10
//                     },
//                     labels: {
//                         fill: "black",
//                         fontSize: 16,
//                         padding: 30
//                     }
//                 }}

//             />
//             <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center'>
//                 <p>Cashflow</p>
//                 <span className={cashflow > 0 ? "text-green-500" : "text-red-500"}>{cashflow}</span>
//             </div>
//         </div>

//     );
// };

// export default Chart;
