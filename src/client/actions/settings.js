import fetch from 'isomorphic-fetch'
const { API_URL } = process.env

export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS'
export const FETCH_SETTINGS_ERROR = 'FETCH_SETTINGS_ERROR'
export const FETCH_SETTINGS_REQUESTED = 'FETCH_SETTINGS_REQUESTED'

export const fetchSettings = () => dispatch => {
  dispatch({
    type: FETCH_SETTINGS_REQUESTED
  })

  return fetch(`${API_URL}/settings`)
    .then(res => {
      return res.json()
    })
    .then(settings => {
      dispatch({
        type: FETCH_SETTINGS_SUCCESS,
        payload: {
          settings
        }
      })
      return settings
    })
    .catch(error => {
      console.log(error)
      dispatch({
        type: FETCH_SETTINGS_ERROR,
        payload: {
          error
        }
      })
      return error
    })
}
