import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSavings } from '../../../actions/savings'
import { Box, Button, Grid } from '@mui/material/'

//import TransactionsList from '../../Transactions/TransactionsList'
import SavingsForm from './SavingsForm'
import SavingsCard from './SavingsCard'

export default function SavingsList() {
  const savings = useSelector((state) => state.savings)
  //const transactions = useSelector((state) => state.transactions)
  // Temp transactions, to be replaced by the above when transactions feature is finished
  // const transactions = [
  //   {
  //     transactionId: 1,
  //     savingId: 2,
  //     transactionAmount: 25,
  //   },
  //   {
  //     transactionId: 2,
  //     savingId: 2,
  //     transactionAmount: 15,
  //   },
  //   {
  //     transactionId: 3,
  //     savingId: 2,
  //     transactionAmount: 10,
  //   },
  // ]

  // function getSavingsTransactionsTotal(savingsId, transactionsList) {
  //   let total = 0
  //   transactionsList.forEach((transaction) => {
  //     if (transaction.savingsId == savingsId) {
  //       total += transaction.transactionAmount
  //     }
  //   })
  //   return total
  // }

  const dispatch = useDispatch()
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchSavings(1))
  }, [])

  return (
    <>
      {savings.loading && <p>Loading....</p>}
      {savings.error && <p>expenses.error</p>}

      {adding ? (
        <SavingsForm
          title={'Add New Saving'}
          savingsData={{
            name: '',
            amount: '',
            goalDate: '',
            budgetId: 1,
          }}
          setStatus={setAdding}
        />
      ) : (
        <Box
          className="add-btn"
          sx={{ display: 'flex', justifyContent: 'flex-end', m: 1, p: 1 }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setAdding(true)
            }}
          >
            +
          </Button>
        </Box>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
        {savings.data?.map((saving, i) => {
          return (
            <Grid key={i} container direction="row" spacing="2">
              <Grid item>
                <SavingsCard
                  saving={saving}
                  // transactionsTotal={getSavingsTransactionsTotal(
                  //   savings.id,
                  //   transactions
                  // )}
                />
              </Grid>
            </Grid>
          )
        })}
      </Box>
    </>
  )
}
