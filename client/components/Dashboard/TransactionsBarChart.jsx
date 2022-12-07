import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../actions/transactions'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

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
      height={400}
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
      <XAxis dataKey="month" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="url(#myGradient)" />
    </BarChart>
  )
}
