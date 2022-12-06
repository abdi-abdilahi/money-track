import React, { useState } from 'react'
import SimpleMenu from '../../SimpleMenu'
import TransactionsForm from '../TransactionsForm'
import { TableCell, Avatar, TableRow, Checkbox } from '@mui/material'
import { delTransaction } from '../../../actions/transactions'

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
          onClick={(event) => handleClick(event, row.id)}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Avatar
          sx={{
            background:
              'linear-gradient(9deg, rgba(15,61,62,1) 58%, rgba(16,15,15,0.948338270855217) 98%)',
            width: 160,
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
        <SimpleMenu
          dataId={row.id}
          setUpdate={setUpdate}
          thunk={delTransaction}
        />
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
