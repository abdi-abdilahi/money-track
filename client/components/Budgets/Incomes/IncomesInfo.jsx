import React, { useEffect, useState } from 'react'
import Incomes from './Incomes'
import IncomesForm from './IncomesForm'
import { fetchIncomes } from '../../../actions/incomes'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

function IncomesInfo() {
  const incomes = useSelector((state) => state.incomes)
  const dispatch = useDispatch()
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchIncomes(1))
  }, [])

  function addIncomes(incomes) {
    return incomes.data?.reduce(
      (total, income) => total + Number(income.amount),
      0
    )
  }

  return (
    <div>
      <div>{incomes.loading && <p>Loading.....</p>}</div>
      <div>{incomes.error && <p>Something went wrong!</p>}</div>

      <div>
        <Typography variant="h4" sx={{ color: '#3277d5' }}>{`$${
          addIncomes(incomes) || '0.00'
        }`}</Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={() => setAdding(true)}
        >
          Edit Income
        </Button>
      </div>

      {adding ? (
        <>
          {incomes.data?.map((income, i) => (
            <Incomes key={i} income={income} />
          ))}

          <IncomesForm setAdding={setAdding} />
        </>
      ) : null}
    </div>
  )
}

export default IncomesInfo
