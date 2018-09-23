import {
  FETCH_SETTINGS_ERROR,
  FETCH_SETTINGS_REQUESTED,
  FETCH_SETTINGS_SUCCESS
} from 'client/actions/settings'

const initialState = {
  settings: undefined,
  error: undefined,
  loading: false,
}

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        settings: action.payload.settings,
        loading: false,
      })
    }
    case FETCH_SETTINGS_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error,
        loading: false,
      })
    }
    case FETCH_SETTINGS_REQUESTED: {
      return Object.assign({}, state, {
        loading: true,
      })
    }
    default:
      return state
  }
}
