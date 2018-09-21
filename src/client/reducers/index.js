import { combineReducers } from 'redux'
import { itemReducer } from 'client/reducers/item'
import { itemsReducer } from 'client/reducers/items'

const rootReducer = combineReducers({
  itemReducer,
  itemsReducer
})

export default rootReducer
