import { combineReducers } from 'redux'

import transactions from './transactions'
import expenses from './expenses'
import incomes from './incomes'

export default combineReducers({ transactions, expenses, incomes })
