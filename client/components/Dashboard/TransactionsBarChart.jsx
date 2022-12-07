import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import Paper from '@mui/material/Paper'

export default function App() {
  const transactionsData = useSelector((state) => state.transactions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [])

  const transactionHistory = [
    { month: 'Jan', Total: 0 },
    { month: 'Feb', Total: 0 },
    { month: 'Mar', Total: 0 },
    { month: 'Apr', Total: 0 },
    { month: 'May', Total: 0 },
    { month: 'Jun', Total: 0 },
    { month: 'Jul', Total: 0 },
    { month: 'Aug', Total: 0 },
    { month: 'Sep', Total: 0 },
    { month: 'Oct', Total: 0 },
    { month: 'Nov', Total: 0 },
    { month: 'Dec', Total: 0 },
  ]

  const sortData =
    transactionsData.data?.sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
    ) || null

  sortData?.map((transaction) => {
    const date = transaction.dateCreated.split(/[- :]/)
    const monthHistory = transactionHistory[date[1] - 1]
    monthHistory.Total += transaction.amount
  })

  return (
    <Paper
      elevation={2}
      sx={{
        width: '100%',
        height: 380,
        borderRadius: 5,
        margin: 0,
        padding: 0,
        background: '#FFFFFF',
      }}
    >
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#0F3D3E' }}>
        Transactions
      </h2>
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
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="20%" stopColor="rgba(5,74,87,100)" />
            <stop offset="80%" stopColor="rgba(5,38,38,100)" />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" scale="point" padding={{ left: 20, right: 5 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="url(#myGradient)" radius={[10, 10, 0, 0]} />
      </BarChart>
    </Paper>
  )
}
