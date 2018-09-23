import { combineReducers } from 'redux'
import { itemReducer } from 'client/reducers/item'
import { itemsReducer } from 'client/reducers/items'
import { settingsReducer } from 'client/reducers/settings'

const rootReducer = combineReducers({
  itemReducer,
  itemsReducer,
  settingsReducer
})

export default rootReducer
