import {
  FETCH_ITEM_ERROR,
  FETCH_ITEM_REQUESTED,
  FETCH_ITEM_SUCCESS
} from 'client/actions/item'

const initialState = {
  item: undefined,
  error: undefined,
  loading: false,
}

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM_SUCCESS: {
      return Object.assign({}, state, {
        item: action.payload.item,
        loading: false,
      })
    }
    case FETCH_ITEM_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error,
        loading: false,
      })
    }
    case FETCH_ITEM_REQUESTED: {
      return Object.assign({}, state, {
        loading: true,
      })
    }
    default:
      return state
  }
}
