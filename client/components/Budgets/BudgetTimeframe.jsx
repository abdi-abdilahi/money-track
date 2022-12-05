import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MenuItem, FormControl, Select } from '@mui/material'
import { patchBudget } from '../../actions/budget'

export default function BudgetTimeframe({ budget }) {
  const [timeFrame, setTimeframe] = useState(6)

  useEffect(() => {
    setTimeframe(getDateDifference(budget))
  }, [])

  const dispatch = useDispatch()

  const today = new Date()

  const startDate = new Date(today.setDate(today.getDate() - today.getDay()))
  const endDate = new Date(
    today.setDate(today.getDate() - today.getDay() + timeFrame)
  )

  useEffect(() => {
    dispatch(
      patchBudget(budget.id, { start_date: startDate, end_date: endDate })
    )
  }, [timeFrame])

  const handleChange = (event) => {
    setTimeframe(event.target.value)
  }

  return (
    <FormControl size="large" sx={{ width: 160 }}>
      <Select
        labelId="select-timeFrame"
        id="select"
        value={timeFrame}
        onChange={handleChange}
      >
        <MenuItem value={6}>Weekly</MenuItem>
        <MenuItem value={14}>Fortnightly</MenuItem>
        <MenuItem value={30}>Monthly</MenuItem>
      </Select>
    </FormControl>
  )
}

function getDateDifference(data) {
  return (
    (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) /
    (1000 * 3600 * 24)
  )
}
