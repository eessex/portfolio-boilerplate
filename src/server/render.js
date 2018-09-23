import React from 'react'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { App } from 'client/App'
import serialize from 'serialize-javascript'

export const ServerRender = (path, store, context) => {
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )
  const helmet = Helmet.renderStatic()

  return `
    <!DOCTYPE html>
    <html>
      <head>
        ${helmet.title}
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(store.getState())}</script>
      </head>
      <body style="margin:0">
        <div id="app">${markup}</div>
      </body>
    </html>
  `
}
