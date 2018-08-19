import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { ErrorBoundary } from 'client/Components/ErrorBoundary'
import { ItemPage } from 'client/Components/Item/ItemPage'
const appTitle = process.env.PAGE_TITLE

export class Item extends Component {
  constructor(props) {
    super(props)

    let data
    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = this.props.staticContext.data
    }

    this.state = {
      data
    }

    this.fetchItem = this.fetchItem.bind(this)
  }

  componentDidMount () {
    const { params } = this.props.match

    if (!this.state.data) {
      this.fetchItem(params.id)
    }
  }

  componentDidUpdate (prevProps) {
    const { params, path } = this.props.match

    if (prevProps.match.path !== path) {
      this.fetchItem(params.id)
    }
  }

  fetchItem (query) {
    this.props.fetchInitialData(query)
      .then(data => {
        this.setState(() => ({
        data
      }))
    })
  }

  render() {
    const { data } = this.state

    if (!data) {
      return (
        <p>LOADING</p>
      )
    } else {
      const { error, title } = data
      const pageTitle = `${appTitle}${title ? ` | ${title}` : ''}`

      return (
        <ErrorBoundary>
          <Helmet>
            <title>{pageTitle}</title>
          </Helmet>

          {error}
          <div>
            <ItemPage item={data} />
          </div>
        </ErrorBoundary>
      )
    }
  }
}
