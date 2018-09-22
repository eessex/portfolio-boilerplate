import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import createStore from 'client/store'
import routes from 'client/routes'
import { App } from 'client/App'
import { Html } from 'client/Html'

require("babel-core/register")
require("babel-polyfill")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use((req, res, next) => {
  next()
})

app.use(cors())
app.use(express.static('public'))
app.use('/api', require('./api'))

app.get('*', (req, res, next) => {
  const { store } = createStore(req.url)
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path, store)
    : Promise.resolve({})

  promise.then(data => {
    const context = { data } 

    const title = activeRoute ? activeRoute.title : (data && data.title)

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    )
    const helmet = Helmet.renderStatic()

    res.send(
      Html({
        title,
        data,
        markup
      })
    )
  }).catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})
