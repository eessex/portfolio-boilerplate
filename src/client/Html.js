import serialize from "serialize-javascript"

export const Html = ({ data, markup }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
      </head>
      <body style="margin:0">
        <div id="app">${markup}</div>
      </body>
    </html>
  `
}
