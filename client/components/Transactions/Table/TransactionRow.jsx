import React, { useState } from 'react'
import SimpleMenu from '../../SimpleMenu'
import TransactionsForm from '../TransactionsForm'
import { TableCell, Avatar, TableRow, Checkbox } from '@mui/material'
import {
  indigo,
  orange,
  teal,
  green,
  cyan,
  blue,
  lightBlue,
} from '@mui/material/colors'

const getAvatarBgColor = ({ expensesName }) =>
  ({
    Petrol: lightBlue[400],
    Fitness: cyan[400],
    Groceries: green[400],
    'Health Insurance': teal[400],
    'Car Insurance': green[600],
    'Car Maintenance': cyan[600],
    Shopping: orange[400],
    'Food/Dining Out': indigo[400],
  }[expensesName] || blue[500])

export default function Transaction({
  row,
  isItemSelected,
  labelId,
  handleClick,
}) {
  const [update, setUpdate] = useState(false)

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Avatar
          sx={{
            bgcolor: getAvatarBgColor(row),
            width: 130,
            height: 30,
            fontSize: 16,
          }}
          variant="rounded"
        >
          {row.expensesName}
        </Avatar>
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="right">{row.amount}</TableCell>
      <TableCell align="right">
        {new Date(row.dateCreated).toDateString()}
      </TableCell>
      <TableCell align="right">
        <SimpleMenu dataId={row.id} setUpdate={setUpdate} />
        {update ? (
          <TransactionsForm
            transactionData={row}
            title={'Edit Transaction'}
            setStatus={setUpdate}
          />
        ) : null}
      </TableCell>
    </TableRow>
  )
}
