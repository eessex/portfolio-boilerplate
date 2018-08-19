import fetch from 'isomorphic-fetch'
const { API_URL } = process.env

export function fetchItems (model = '', query = {}) {
  const encodedURI = encodeURI(`${API_URL}/${model}`)

  return fetch(encodedURI, query)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.warn(error)
      return null
    })
}

export function fetchItem (model = '', id, query = {}) {
  const encodedURI = encodeURI(`${API_URL}/${model}/${id}`)

  return fetch(encodedURI, query)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.warn(error)
      return null
    })
}
