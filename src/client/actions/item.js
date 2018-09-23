import fetch from 'isomorphic-fetch'
const { API_URL } = process.env

export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS'
export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR'
export const FETCH_ITEM_REQUESTED = 'FETCH_ITEM_REQUESTED'

export const fetchItem = (model = '', slug, query = {}) => dispatch => {
  const encodedURI = encodeURI(`${API_URL}/${model}/${slug}`)

  dispatch({
    type: FETCH_ITEM_REQUESTED
  })

  return fetch(encodedURI, query)
    .then(res => {
      return res.json()
    })
    .then(item => {
      dispatch({
        type: FETCH_ITEM_SUCCESS,
        payload: {
          item
        }
      })
      return item
    })
    .catch(error => {
      dispatch({
        type: FETCH_ITEM_ERROR,
        payload: {
          error
        }
      })
      return null
    })
}
