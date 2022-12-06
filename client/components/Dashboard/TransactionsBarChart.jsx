import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
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
  const transactionsData = useSelector((state) => state.transactions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  const transactionHistory = [
    { month: 'Jan', total: 0 },
    { month: 'Feb', total: 0 },
    { month: 'Mar', total: 0 },
    { month: 'Apr', total: 0 },
    { month: 'May', total: 0 },
    { month: 'Jun', total: 0 },
    { month: 'Jul', total: 0 },
    { month: 'Aug', total: 0 },
    { month: 'Sep', total: 0 },
    { month: 'Oct', total: 0 },
    { month: 'Nov', total: 0 },
    { month: 'Dec', total: 0 },
  ]

  const sortData =
    transactionsData.data?.sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
    ) || null

  sortData?.map((transaction) => {
    const date = transaction.dateCreated.split(/[- :]/)
    const monthHistory = transactionHistory[date[1] - 1]
    monthHistory.total += transaction.amount
  })

  return (
    <BarChart
      width={600}
      height={300}
      data={transactionHistory}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="month" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="#0F3D3E" />
    </BarChart>
  )
}
