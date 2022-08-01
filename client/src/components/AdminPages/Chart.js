import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Количество постов в категориях',
    },
  },
};

var labels = [];
var count = []

export const data = {
  labels,
  datasets: [
    {
      label: 'Посты',
      data: count,
      backgroundColor: 'rgba(55, 239, 132, 0.7)',
    },
  ],
};

export function Chart({dataChart}) {
  labels.length = 0
  count.length = 0
  dataChart.map(lab => {labels.push(lab.title); count.push(lab.total)})
  console.log(dataChart)
  return <Bar options={options} data={data} />;
}