import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const data = [
  {
    name: 'Jan',
    'Total Spent': 4000,
  },
  {
    name: 'Feb',
    'Total Spent': 3000,
  },
  {
    name: 'Mar',
    'Total Spent': 2000,
  },
  {
    name: 'Apr',
    'Total Spent': 2800,
  },
  {
    name: 'May',
    'Total Spent': 3500,
  },
  {
    name: 'Jun',
    'Total Spent': 4500,
  },
  {
    name: 'Jul',
    'Total Spent': 4300,
  },
  {
    name: 'Aug',
    'Total Spent': 3908,
  },
  {
    name: 'Sep',
    'Total Spent': 4800,
  },
  {
    name: 'Oct',
    'Total Spent': 3800,
  },
  {
    name: 'Nov',
    'Total Spent': 4300,
  },
  {
    name: 'Dec',
    'Total Spent': 4300,
  },
]

export default function App() {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="Total Spent" fill="#0F3D3E" background={{ fill: '#eee' }} />
    </BarChart>
  )
}
