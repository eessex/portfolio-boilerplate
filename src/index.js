import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { App } from 'client/App'
import routes from 'client/routes'
import { Html } from 'client/Html'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  next()
})

app.use(cors())
app.use(express.static('public'))
app.use('/api', require('./api'))

app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve({})

  promise.then(data => {
    const context = { data }
    const title = activeRoute ? activeRoute.title : (data && data.title)

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
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
