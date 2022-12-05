import { combineReducers } from 'redux'

import transactions from './transactions'
import expenses from './expenses'
import incomes from './incomes'
import budget from './budget'

export default combineReducers({ transactions, expenses, incomes, budget })
