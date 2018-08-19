import {
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_REQUESTED,
  FETCH_ITEMS_SUCCESS
} from 'client/actions/items'

const initialState = {
  items: undefined,
  error: undefined,
  loading: false,
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS: {
      return Object.assign({}, state, {
        items: action.payload.items,
        loading: false,
      })
    }
    case FETCH_ITEMS_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error,
        loading: false,
      })
    }
    case FETCH_ITEMS_REQUESTED: {
      return Object.assign({}, state, {
        loading: true,
      })
    }
    default:
      return state
  }
}
