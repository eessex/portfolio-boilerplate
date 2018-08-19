import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { App } from 'client/App'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)