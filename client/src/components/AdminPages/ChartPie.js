import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { fetchChartTags, fetchTags } from '../../http/tagAPI';

ChartJS.register(ArcElement, Tooltip, Legend);


export const datas = {
  labels: [],
  
  datasets: 
    [{
      label: '# of Votes',
      data: [1,1,1,1,1,1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },]
  
};
console.log(datas.labels)

export function ChartPie() {
  const [tag, setTag] = useState([])
    useEffect(() => {
      fetchChartTags().then(data => setTag(data))
    }, [])
    console.log(tag)
    datas.labels = []
    // tag.map(tag => datas.labels.push(tag.name))
    // console.log(datas.labels)
    // datas.labels = ['1','2','3']
    // datas.datasets[0].data = [3,2,1]
  return <Doughnut data={datas} />;
}