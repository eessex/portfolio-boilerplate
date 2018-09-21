import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import routes from 'client/routes'
import { ErrorBoundary } from 'client/Components/ErrorBoundary'
import { Nav } from 'client/Components/Nav'
import { NotFound } from 'client/Components/NotFound'
const appTitle = process.env.PAGE_TITLE

export class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <ErrorBoundary>
          <Switch>
            {routes.map(({ path, exact, component: Component, title, ...rest }) => (
              <Route key={path} path={path} exact={exact} render={
                props => {
                  const pageTitle = `${appTitle}${title ? ` | ${title}` : ''}`
                  return (
                    <div>
                      <Helmet>
                        <title>{pageTitle}</title>
                      </Helmet>
                      <Component {...props} {...rest} title={title} />
                    </div>
                  )
                }
              } />
            ))}
            <Route render={props => <NotFound {...props} /> } />
          </Switch>
        </ErrorBoundary>
      </div>
    )
  }
}
