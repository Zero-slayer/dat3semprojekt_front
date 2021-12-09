import React from "react";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart'
        }
    }
}

export default function BarChart(){
    const dataImport = [];
    const labels = [1,2,3,4,5,6,7];
    const data = {
        labels,
        datasets:[
            {
                label: "Temperature",
                data: dataImport,
                backgroundColor: "rgba(53,162, 235, 0.5)"
            }
        ]
    }

    return <Bar options={options} data={data}/>;
}