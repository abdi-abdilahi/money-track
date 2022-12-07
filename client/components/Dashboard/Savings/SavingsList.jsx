import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSavings } from '../../../actions/savings'
import { Box, Grid, IconButton, Typography } from '@mui/material/'
import AddSharpIcon from '@mui/icons-material/AddSharp'
import SavingsForm from './SavingsForm'
import SavingsCard from './SavingsCard'

export default function SavingsList() {
  const savings = useSelector((state) => state.savings)

  const dispatch = useDispatch()
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    dispatch(fetchSavings(1))
  }, [])
  return (
    <Box>
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
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="p"
            sx={{ fontSize: 24, fontWeight: 700, color: '#0F3D3E' }}
          >
            Goals
          </Typography>

          <IconButton
            color="primary"
            fontSize="large"
            onClick={() => {
              setAdding(true)
            }}
          >
            <AddSharpIcon />
          </IconButton>
        </Box>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,12fr)' }}>
        {savings.data?.map((saving, i) => {
          return (
            <Grid key={i} container direction="row" spacing="1">
              <Grid item>
                <SavingsCard saving={saving} />
              </Grid>
            </Grid>
          )
        })}
      </Box>
    </Box>
  )
}
