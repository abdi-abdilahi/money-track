import React, { useState } from 'react'
import { MenuItem, FormControl, Select } from '@mui/material'

export default function BudgetTimeframe() {
  const [timeFrame, setTimeframe] = useState('Weekly')

  const handleChange = (event) => {
    setTimeframe(event.target.value)
  }

  return (
    <FormControl required="true" size="large" sx={{ width: 160 }}>
      <Select
        labelId="select-timeFrame"
        id="select"
        value={timeFrame}
        onChange={handleChange}
      >
        <MenuItem value="Weekly">Weekly</MenuItem>
        <MenuItem value="Fortnightly">Fortnightly</MenuItem>
        <MenuItem value="Monthly">Monthly</MenuItem>
      </Select>
    </FormControl>
  )
}
